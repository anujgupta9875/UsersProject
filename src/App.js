import './css/App.css';
import { BrowserRouter,Route,Routes} from "react-router-dom";
import { UserList,UserProfile } from './components';


function App() {
  return (
    <div className="App App-baground App-header">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<UserList />}></Route>
          <Route path='/user/:userId' element={<UserProfile/>}></Route>
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
