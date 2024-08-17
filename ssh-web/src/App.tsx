import './App.css';
import axios from 'axios';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    axios.get('/users').then((res) => {
      console.log(res.data);
    });
  }, []);

  return (
    <div className="flex font-bold">
      <div>안뇽</div>&nbsp;
      <div className="font-thin">tailwind</div>
    </div>
  );
}

export default App;
