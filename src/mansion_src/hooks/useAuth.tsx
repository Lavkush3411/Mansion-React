import axios from "axios";
const env = import.meta.env;

async function useAuth(path: string) {
  return new Promise(async (resolve) => {
    const token = localStorage.getItem("Token");
    if (!token) return resolve(false);
    try {
      await axios.post(env.VITE_BASE_URL + path, { Token: token });
      resolve(true);
    } catch (error) {
      resolve(false);
    }
  });
}

export default useAuth;
