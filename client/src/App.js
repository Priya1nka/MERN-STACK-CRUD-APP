
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import {Routes,Route} from 'react-router-dom';
import Edit from './components/Edit';
import Detail from './components/Detail';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <>
          <Navbar/>
          <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/register' element={<Register/>}/>
            <Route exact path='/edit/:id' element={<Edit/>}/>
            <Route exact path='/view/:id' element={<Detail/>}/>
          </Routes>
        </>
      </header>
    </div>
  );
}

export default App;
