import { http, HttpResponse } from "msw";

export const userHandler = [
  http.post("/api/login", (req) => {
    return HttpResponse.json({
      email: "",
      username: "",
    });
  }),
];

export const handlers = [...userHandler];
