import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

export const userHandler = new AxiosMockAdapter(axios);

userHandler.onGet("/users").reply(200, {
    users: [{ id: 1, name: "John Smith" }],
});
