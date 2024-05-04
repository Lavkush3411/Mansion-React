import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Forgot() {
  const [timer, setTimer] = useState<number>(5);
  const navigate = useNavigate();
  useEffect(() => {
    const timeout = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    if (timer === 0) {
      clearInterval(timeout);
      navigate("/");
    }
    return () => clearInterval(timeout);
  }, [timer, navigate]);
  return (
    <div>
      Sorry we are yet to implement forgot password page redirecting to homepage
      in {timer}
    </div>
  );
}

export default Forgot;
