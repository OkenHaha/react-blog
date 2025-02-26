import { useEffect, useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme as toggle } from "./store/authSlice";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { LoadingSpinner } from "./Utils/loader";
import AchievementPage from "./components/AchievementComp/AchievementComp";
import SavedArticles from "./pages/SavedArticles";
import Preloader from "./components/Preloader";

// Lazy load components
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const ArticleList = lazy(() => import("./pages/ArticleList"));
const Article = lazy(() => import("./pages/Article"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const EditProfilePage = lazy(() => import("./pages/EditProfilePage"));
const EditArticle = lazy(() => import("./pages/EditArticle"));
const FAQ = lazy(() => import("./pages/FAQ"));
const ForgotPassword = lazy(() => import("./components/ForgotPassword"));
const Contributors = lazy(() => import("./pages/Contributors"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AddarticlePage = lazy(() => import("./pages/AddarticlePage"));
const Error404 = lazy(() => import("./pages/Error404"));
const PublicProfile = lazy(() => import("./pages/PublicProfile"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const DraftsPage = lazy(() => import("./pages/DraftsPage"));


function App() {
  const [loading, setLoading] = useState(true);
  const theme = useSelector((state) => state.auth.theme);
  const loggedInUser = useSelector((state) => state.auth.user); // Get the logged-in user's data
  const loggedInUserId = loggedInUser ? loggedInUser._id : null; // Extract user ID if logged in
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    dispatch(toggle());
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <div className="w-full">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/article-list" element={<ArticleList />} />
            <Route path="/contributors" element={<Contributors />} />
            <Route
              path="/article/:name"
              element={<Article loggedInUserId={loggedInUserId} />}
            />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/achievements" element={<AchievementPage/>} />
            <Route path="/edit-profile" element={<EditProfilePage />} />
            <Route
              path="/edit-article/:id"
              element={<EditArticle loggedInUserId={loggedInUserId} />}
            />
            <Route path="/forgot-password" element={<ForgotPassword theme={theme} />} />
            <Route path="*" element={<Error404 />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addarticle" element={<AddarticlePage />} />
            <Route path="/profile/:userId" element={<PublicProfile />} />
            <Route path="/drafts" element={<DraftsPage />} />
            <Route path="/savedArticles" element={<SavedArticles/>} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
