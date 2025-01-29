import { getChatsId } from './service/getChatsId';
import './App.css';

function App() {
  getChatsId().then((data) => console.log(data));
  return <h2>App</h2>;
}

export default App;
