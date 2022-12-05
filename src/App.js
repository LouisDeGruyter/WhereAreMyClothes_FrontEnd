
import './App.css';
import {Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Kleerkastenlijst from './components/kleerkasten/Kleerkastenlijst';
import Kledinglijst from './components/kleren/Kledinglijst';
import 'antd/dist/reset.css';
function App() {
  return (
    <div className="App">
      <Navbar />
            <Routes>
                <Route path="/kleerkasten" element={<Kleerkastenlijst />} > </Route>
                <Route path="/kleren" element={<Kledinglijst />} > </Route>
                <Route path="/" element={<div>Home</div>} ></Route>
                <Route path="/login" element={<div>Log in</div>} ></Route>
                <Route path="/register" element={<div> Registreer </div>} ></Route>
            </Routes>
            
    </div>
    
  );
}

export default App;
