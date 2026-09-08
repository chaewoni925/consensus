import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import MemberPage from './pages/Member/MemberPage';
import ActivityPage from './pages/Activity/ActivityPage';
import JoinUsPage from './pages/JoinUs/JoinUsPage.jsx';
import ContactPage from './pages/Contact/ContactPage.jsx';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<AboutPage />} />
          <Route path="/members" element={<MemberPage />} />
          <Route path="/activities" element={<ActivityPage />} />
          <Route path="/join-us" element={<JoinUsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
  );
}

export default App;