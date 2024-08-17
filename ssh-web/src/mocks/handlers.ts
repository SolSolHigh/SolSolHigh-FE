import { http, HttpResponse } from "msw";

const baseURL = process.env.REACT_APP_API_BASE_URL;
export const userHandler = [
  http.post("http://localhost:3000/api/login", (req) => {
    return HttpResponse.json({
      email: "",
      username: "",
    });
  }),
];

export const handlers = [...userHandler];
