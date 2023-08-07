const baseUrl = "https://halonix-one.onrender.com/";

const token = localStorage.getItem("token");

// const userHeaders = new Headers();
// userHeaders.append("Content-Type", "application/json");

export const useRequest = async (
  userUrl,
  userMethod = "GET",
  userHeaders,
  userBody
) => {
  const response = await fetch(baseUrl + userUrl, {
    method: { userMethod },
    headers: { userHeaders },
    body: JSON.stringify(userBody),
  });

  const res = await response.json();

  return res;
};
