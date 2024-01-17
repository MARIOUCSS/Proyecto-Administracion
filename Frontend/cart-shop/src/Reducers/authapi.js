export const url = "http://localhost:5000/api/v1";

export const SetHeader = () => {
  const headers = {
    headers: {
      Authorization: localStorage.getItem("token"), // Utiliza el token almacenado en el estado local
    },
  };
  return headers;
};
