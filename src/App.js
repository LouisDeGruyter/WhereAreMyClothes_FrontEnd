
import './App.css';
import {Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Kleerkastenlijst from './components/kleerkasten/Kleerkastenlijst';
import Kledinglijst from './components/kleren/Kledinglijst';
function App() {
  return (
    <div className="App">
      <Navbar />
            <Routes>
                <Route path="/kleerkasten" element={<Kleerkastenlijst />} />
                <Route path="/kleren" element={<Kledinglijst />} />
            </Routes>
    </div>
    
  );
}

export default App;
