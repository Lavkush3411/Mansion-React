import { Link, useNavigate } from "react-router-dom";
import "./mansionlginpage.scss";
import { FormEvent, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../../../UserContextProvider";
import LoadOnApiCall from "../../../loadonapicall/LoadOnApiCall";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/userSlice";
import { RootState } from "../../../redux/store";
import { Spinner } from "@chakra-ui/react";
const env = import.meta.env;

function MansionLogInPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [spinner, setSpinner] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { userDispatch } = useContext(UserContext);
  const [err, setErr] = useState<string>("");
  const dispatch = useDispatch();

  //login check effect

  const authenticated = useSelector(
    (store: RootState) => store.authentication.authenticated
  );

  useEffect(() => {
    if (authenticated) {
      navigate("/home");
    }
  }, [authenticated]);

  async function onSubmitHandler(e: FormEvent<HTMLFormElement>) {
    console.log("login is called");
    e.preventDefault();
    setIsLoading(true);
    setSpinner(true);
    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);

    try {
      const res = await fetch(env.VITE_BASE_URL + "user/login", {
        credentials: "include",
        method: "POST",
        body: formdata,
      });
      if (res.status === 200) {
        const data = await res.json();
        const jsontoken = data.Token;
        const user = jwtDecode(jsontoken);
        localStorage.setItem("Token", jsontoken);
        userDispatch({ type: "login", payload: user });
        dispatch(login(user));
        // We will modify this to go to the page originally requested.
        // const redirectTo = location.state?.path || "/";
        // console.log(redirectTo);
        setIsLoading(false);
        navigate("/");
      } else if (res.status === 404) {
        const error = await res.json();
        if (error.msg === "WrongPasswordError") {
          throw { msg: "Incorrect password, try again !!" };
        } else if (error.msg === "NonExistingError") {
          throw { msg: "User does Not Exists" };
        }
      }
    } catch (error: any) {
      setIsLoading(false);
      setErr(error.msg);
      console.error(error.msg);
    } finally {
      setSpinner(false);
    }
  }

  return (
    <LoadOnApiCall isLoading={isLoading}>
      <div className="mansionloginpage">
        <form
          action=""
          className="loginform"
          onSubmit={(e) => onSubmitHandler(e)}
        >
          <h1>Login</h1>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Link to={"/forgot"}>Forgot Password ??</Link>
          {err !== "" && <span className="error">{err}</span>}
          <button type="submit">{spinner ? <Spinner /> : "Login"}</button>
          <Link to={"/signup"}>Create Account</Link>
        </form>
      </div>
    </LoadOnApiCall>
  );
}

export default MansionLogInPage;
