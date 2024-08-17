import { useEffect } from "react";
import "./App.css";

import { api } from "./apis/interceptors";

function App() {
  useEffect(() => {
    const loginHandler = async () => {
      await api.post("api/login");
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
