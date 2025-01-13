import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import ArticleList from "./pages/ArticleList";
import Article from "./pages/Article";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import EditArticle from "./pages/EditArticle";
import FAQ from "./pages/FAQ";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme as toggle } from "./store/authSlice";
import Footer from "./components/Footer";
import ForgotPassword from './components/ForgotPassword';
import Contributors from "./pages/Contributors";

function App() {
  const theme = useSelector((state) => state.auth.theme);
  const loggedInUser = useSelector((state) => state.auth.user); // Get the logged-in user's data
  const loggedInUserId = loggedInUser ? loggedInUser._id : null; // Extract user ID if logged in
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    dispatch(toggle());
  };

  return (
    <Router>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <div className="w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/article-list" element={<ArticleList />} />
          <Route path="/contributors" element={<Contributors />} />
          <Route
            path="/article/:name"
            element={<Article loggedInUserId={loggedInUserId} />}
          />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route
            path="/edit-article/:id"
            element={<EditArticle loggedInUserId={loggedInUserId} />}
          />
          <Route path="/forgot-password" element={<ForgotPassword theme={theme} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
