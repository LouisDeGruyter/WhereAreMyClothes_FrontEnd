
import './App.css';
import {Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Kleerkastenlijst from './components/kleerkasten/Kleerkastenlijst';
import Kledinglijst from './components/kleren/Kledinglijst';
import Kledingstuk from './components/kleren/Kledingstuk';
import KledingstukForm from './components/kleren/KledingstukForm';
import 'antd/dist/reset.css';
import RequireAuth from './components/authentication/RequireAuth';
import AuthLanding from './components/authentication/AuthLanding';
import KleerkastForm from './components/kleerkasten/KleerkastForm';


function App() {
  return (
    <div className="App">
      <Navbar />
            <Routes>
                <Route path="/kleerkasten" element={<RequireAuth><Kleerkastenlijst /></RequireAuth> } > </Route>
                <Route path="/kleren" element={<RequireAuth><Kledinglijst /></RequireAuth>} > </Route>
                <Route path="/" element={<div>Home</div>} ></Route>
                <Route path="/kleren/add" element={<RequireAuth><KledingstukForm/></RequireAuth>} ></Route>
                <Route path="/kleren/:id" element={<RequireAuth><Kledingstuk/></RequireAuth>} ></Route>
                <Route path="kleren/:id/edit" element={<RequireAuth><KledingstukForm/></RequireAuth>} ></Route>
                <Route path="/kleerkasten/add" element={<RequireAuth><KleerkastForm/></RequireAuth>} ></Route>
                <Route path="/kleerkasten/:id/edit" element={<RequireAuth><KleerkastForm/></RequireAuth>} ></Route>
                <Route path="/kleerkasten/:id" element={<RequireAuth><div>kleerkastDetail to be implemented</div></RequireAuth>} ></Route>
                <Route path="/login" element={<AuthLanding/>} ></Route>
            </Routes>
            
    </div>
    
  );
}

export default App;
