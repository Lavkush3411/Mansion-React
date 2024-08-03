import { ChangeEvent, useState } from "react";
import "./passwordreset.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const env = import.meta.env;

function PasswordReset() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [errorWhileOtpSend, setErrorWhileOtpSend] = useState<string | null>(
    null
  );
  const [wrongOtpError, setWrongOtpError] = useState<string | null>(null);
  const [showPinbox, setShowPinbox] = useState<boolean | null>(null);
  const [resendOtp, setResendOtp] = useState(false);
  const navigate = useNavigate();

  async function sendOTP(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setErrorWhileOtpSend(null);
    setWrongOtpError(null);

    try {
      const res = await axios.post(
        env.VITE_BASE_URL + "user/password-reset-otp",
        {
          email: email,
        }
      );
      if (res.status === 200) {
        setShowPinbox(true);
        console.log(res.data.msg);
      }
    } catch (e: any) {
      setErrorWhileOtpSend(e.response.data.msg);
    }
  }

  async function resetPassword() {
    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("otp", otp);
    formdata.append("password", password);
    try {
      const res = await axios.post(
        env.VITE_BASE_URL + "user/reset-password",
        formdata
      );
      if (res.status === 200) {
        navigate("/login");
      }
    } catch (e: any) {
      if (e.response.status === 400) {
        setWrongOtpError(e.response.data.msg);
        setShowPinbox(false);
        setOtp("");
        setPassword("");
        setResendOtp(true);
      }
    }
  }

  function onChangeOtp(e: ChangeEvent<HTMLInputElement>) {
    const pattern: RegExp = /^\d*$/;
    if (pattern.test(e.target.value)) {
      setOtp(e.target.value);
    } else {
      console.log("integer expected");
    }
  }

  return (
    <section className="password-reset">
      <form
        className="password-reset-form"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1>Reset Password</h1>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          disabled={showPinbox ? true : false}
          onChange={(e) => setEmail(e.target.value)}
        />
        {showPinbox && (
          <>
            <label htmlFor="OTP">OTP</label>
            <input
              required
              id="OTP"
              type="text"
              pattern="[0-9]{6}"
              value={otp}
              minLength={6}
              maxLength={6}
              onChange={onChangeOtp}
            />
            <label htmlFor="password">New Password</label>
            <input
              required
              type="password"
              id="password"
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        )}
        {errorWhileOtpSend && (
          <span className="error">{errorWhileOtpSend}</span>
        )}
        {wrongOtpError && <span className="error">{wrongOtpError}</span>}
        {!showPinbox && (
          <button onClick={sendOTP}>
            {resendOtp ? "Send OTP Again" : "Send OTP"}
          </button>
        )}

        {showPinbox && <button onClick={resetPassword}> Reset Password</button>}
        {/* <input type="submit" onSubmit={(e)=>e.preventDefault()} /> */}
      </form>
    </section>
  );
}

export default PasswordReset;
