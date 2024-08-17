import "./App.css";

import { Button } from "./components/atoms/Button";
function App() {
  //   useEffect(() => {
  //     const loginHandler = async () => {
  //       await api.post(REQUEST_DOMAINS.auth + "/login");
  //     };
  //     loginHandler();
  //   }, []);

  return (
    <div className="flex font-bold">
      <div>this is test</div>&nbsp;
      <div className="font-thin">tailwind</div>
      <div className="flex flex-col gap-3 ml-2 w-36 border-2 border-gray-400">
        <Button>버튼1</Button>
        <Button color="gray">버튼2</Button>
        <Button outlined>버튼3</Button>
        <Button rounded>버튼4</Button>
        <Button rounded outlined>
          버튼5
        </Button>
        <Button fullWidth>fullWidth</Button>
      </div>
    </div>
  );
}

export default App;
