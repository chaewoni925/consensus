import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import MemberPage from './pages/Member/MemberPage';
import ActivityPage from './pages/Activity/ActivityPage';
import JoinUsPage from './pages/JoinUs/JoinUsPage.jsx';
import ContactPage from './pages/Contact/ContactPage.jsx';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check for PageDown (or Space) / PageUp key pressed
      if (e.key === 'PageDown' || e.code === 'PageDown') {
        e.preventDefault();
        window.scrollBy({
          top: window.innerHeight * 0.85,
          behavior: 'smooth'
        });
      } else if (e.key === 'PageUp' || e.code === 'PageUp') {
        e.preventDefault();
        window.scrollBy({
          top: -window.innerHeight * 0.85,
          behavior: 'smooth'
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
      <BrowserRouter>
        <ScrollToTop />
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