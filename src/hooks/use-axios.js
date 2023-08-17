import axios from "axios";

const useAxios = () => {
  const Axios = axios.create({
    baseURL: process.env.REACT_APP_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  Axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const { status } = error.response;
      if (status === 401) {
        localStorage.clear();
        window.location = "/";
      }
      return Promise.reject(error);
    }
  );

  return Axios;
};

export default useAxios;
