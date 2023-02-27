import './App.css';
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import { Home } from './comopents/Home';
import { Register } from './comopents/Register';
import { Login } from './comopents/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </Router>
    </div>
  )
}


export default App
