import './App.css';
import { api } from './apis/interceptors';
import REQUEST_DOMAINS from './apis/axiosConfig';

function App() {
  api.post(`${REQUEST_DOMAINS.auth}/users`).then((res) => console.log(res));

  return (
    <div className="flex font-bold">
      <div>안뇽</div>&nbsp;
      <div className="font-thin">tailwind</div>
    </div>
  );
}

export default App;
