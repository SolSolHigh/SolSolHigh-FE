import { useEffect } from "react";
import "./App.css";

import { api } from "./apis/interceptors";
import REQUEST_DOMAINS from "./apis/axiosConfig";
function App() {
  useEffect(() => {
    const loginHandler = async () => {
      await api.post(REQUEST_DOMAINS.auth + "/login");
    };
    loginHandler();
  }, []);

  return (
    <div className="flex font-bold">
      <div>this is test</div>&nbsp;
      <div className="font-thin">tailwind</div>
    </div>
  );
}

export default App;
