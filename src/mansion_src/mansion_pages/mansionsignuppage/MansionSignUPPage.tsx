import { Link, useNavigate } from "react-router-dom";
import "./mansionsignuppage.scss";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../../../UserContextProvider";
import LoadOnApiCall from "../../../loadonapicall/LoadOnApiCall";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
const env = import.meta.env;

interface UserType {
  name: string;
  email: string;
  password: string;
  contact: string;
  [key: string]: string;
}

function MansionSignUpPage() {
  // const [userExistError, setUserExsistError] = useState<string>("");
  const navigate = useNavigate();
  const { userDispatch } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [err, setErr] = useState<string>("");
  const [userData, setUserData] = useState<UserType>({
    name: "",
    email: "",
    password: "",
    contact: "",
  });

  const authenticated = useSelector(
    (store: RootState) => store.authentication.authenticated
  );

  useEffect(() => {
    if (authenticated) {
      navigate("/home");
    }
  }, [authenticated]);

  function onDetailsChange(e: ChangeEvent<HTMLInputElement>) {
    setUserData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  async function onSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    //we check if all the data is filled
    const isFormFilled = Object.keys(userData).every((key) => key != "");
    try {
      if (isFormFilled) {
        setIsLoading(true);
        const formdata = new FormData();
        Object.keys(userData).forEach((key) => {
          formdata.append(key, String(userData[key]));
        });

        const res: any = await fetch(env.VITE_BASE_URL + "user/create", {
          method: "POST",
          body: formdata,
        });

        // if api results 200 that means user is created
        if (res.status === 200) {
          // we will try to login with same data
          try {
            const loginRes: any = await fetch(
              env.VITE_BASE_URL + "user/login",
              {
                method: "POST",
                body: formdata,
              }
            );

            if (loginRes.status === 200) {
              const data = await loginRes.json();
              const jsontoken = data.Token;
              const user = jwtDecode(jsontoken);
              console.log(data.msg);
              localStorage.setItem("Token", jsontoken);
              userDispatch({ type: "login", payload: user });

              navigate("/");
            }
          } catch (e) {
            console.log(e);
          }
        } else {
          const err = await res.json();
          console.log(err);
          setErr(err.msg);
          setIsLoading(false);

          navigate("/signup");
        }
      } else {
        // if form is not filled this block will be executed
        setErr("Please fill form completely");
      }
    } catch (e: any) {
      console.log(e);
    }
  }

  return (
    <LoadOnApiCall isLoading={isLoading}>
      <div className="mansionsignuppage">
        <form
          action=""
          className="signupform"
          onSubmit={(e) => onSubmitHandler(e)}
        >
          <h1>SignUp</h1>
          <label htmlFor="name">Name</label>
          <input
            type="name"
            required
            maxLength={20}
            minLength={4}
            id="name"
            name="name"
            value={userData.name}
            onChange={(e) => onDetailsChange(e)}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            required
            id="email"
            name="email"
            onChange={(e) => onDetailsChange(e)}
            value={userData.email}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={userData.password}
            onChange={(e) => onDetailsChange(e)}
          />
          <label htmlFor="contact">Contact</label>
          <input
            required
            type="string"
            name="contact"
            pattern="[0-9]*"
            minLength={10}
            maxLength={10}
            id="contact"
            value={userData.contact}
            onChange={(e) => onDetailsChange(e)}
          />
          {err != "" && <span className="error">{err}</span>}
          <button type="submit">SignUp</button>
          <Link to={"/login"}>Already Have an account login ??</Link>
        </form>
      </div>
    </LoadOnApiCall>
  );
}

export default MansionSignUpPage;
