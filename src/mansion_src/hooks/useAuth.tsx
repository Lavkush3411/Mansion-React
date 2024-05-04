import useFetch from "./useFetch";

async function useAuth() {
  return new Promise(async (resolve) => {
    const token = localStorage.getItem("Token");
    if (!token) {
      resolve(false);
      return;
    }
    try {
      const res: any = await useFetch("user/verify", {
        Token: token,
      });
      if (res.status === 200) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (err) {
      resolve(false);
    }
  });
}

export default useAuth;
