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

function App() {
  const theme = useSelector((state) => state.auth.theme);
  const dispatch = useDispatch()

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    dispatch(toggle())
  };

  return (
    <Router>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <div className="w-full mt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/article-list" element={<ArticleList />} />
          <Route path="/article/:name" element={<Article />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path="/edit-article/:id" element={<EditArticle />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
