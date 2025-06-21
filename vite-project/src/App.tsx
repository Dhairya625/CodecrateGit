import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CardSpotlightDemo from './components/StartStudy/startstudy';
import VirtualStudyRoom from './components/classroom/class';
import { CombinedDemo } from "./pages/Home";
import NotFound from './pages/notfound';


function App() {  
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CombinedDemo />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/StartStudy/startstudying" element={<CardSpotlightDemo />} />
        <Route path="/Classroom" element={<VirtualStudyRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
