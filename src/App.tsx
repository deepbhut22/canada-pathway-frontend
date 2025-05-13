import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Questionnaire from './components/questionnaire/Questionnaire';
import Report from './pages/Report';
import Profile from './pages/Profile';
import ProtectedRoute from './components/auth/ProtectedRoute';
import useAuthStore from './store/authStore';
import AllNewsPage from './pages/AllNews';
import { getGeneralNews, getProvincialNews } from './data/dummyNews';
import LegalInfoComponent from './pages/PrivacyPolicy';
import GoogleCallback from './pages/GoogleCallback';  
import Charts from './pages/Charts';
import MapleAI from './pages/MapleAi';
import PNPResourcesPage from './pages/PNPResourcesPage';
import Blog from './pages/Blog';
import BlogPostPage from './pages/BlogPost';
// import Blog from './pages/Blog';
export default function App() {
  const initializeAuth = useAuthStore(state => state.initializeAuth);
  const isAuth = useAuthStore((state) => state.isAuthenticated);
  const generalNews = getGeneralNews();
  const provincialNews = getProvincialNews();
  useEffect(() => {
    initializeAuth();
  }, [isAuth]);

  return (
    <>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/legal-info/:tab" element={<LegalInfoComponent />} />
          <Route path="/auth/google" element={<GoogleCallback />} />
          <Route path="/auth/google/:token" element={<GoogleCallback />} />
          <Route path="/immigration-statistics" element={<Charts />} />
          <Route path="/immigration-resources" element={<PNPResourcesPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route
            path="/news"
            element={
              <AllNewsPage allNews={[...generalNews, ...provincialNews]} />
            }
          />

          {/* Protected routes */}
          <Route
            path="/questionnaire"
            element={
              <ProtectedRoute>
                <Questionnaire />
              </ProtectedRoute>
            }
          />

          <Route
            path='/mapleAi'
            element={
              <ProtectedRoute>
                <MapleAI />
              </ProtectedRoute>
            }
          />

          <Route
            path="/questionnaire/:step"
            element={
              <ProtectedRoute>
                <Questionnaire />
              </ProtectedRoute>
            }
          />
          <Route
            path="/report"
            element={
              <ProtectedRoute>
                <Report />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}
