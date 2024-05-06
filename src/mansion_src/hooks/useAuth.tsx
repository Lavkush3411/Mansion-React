import axios from "axios";

const env = import.meta.env;

async function useAuth(path: string) {
  return new Promise(async (resolve) => {
    try {
      await axios.get(env.VITE_BASE_URL + path, {
        withCredentials: true,
      });
      resolve(true);
    } catch (e) {
      resolve(false);
    }
  });
}

export default useAuth;
