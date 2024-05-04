const env = import.meta.env;
function useFetch(endPoint: string, body: any) {
  return new Promise(async (resolve) => {
    const res = await fetch(env.VITE_BASE_URL + endPoint, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(body),
    });
    resolve(res);
  });
}

export default useFetch;
