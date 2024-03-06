import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import SignInPage from "./pages/signInPage/SigninPage.jsx";
import SignUpPage from "./pages/signUpPage/SignUpPage.jsx";
import LoginHelpPage from "./pages/signInPage/LoginHelpPage.jsx";
import ResetPwdPage from "./pages/resetPage/ResetPwdPage.jsx";
import MyListPage from "./pages/myListPage/MyListPage.jsx";
// import HomePage from "./pages/homePage/HomePage.jsx";
// import MoviesPage from "./pages/moviesPage/MoviesPage.jsx";
// import SeriesPage from "./pages/seriesPage/SeriesPage.jsx";
import ContentPage from "./pages/contentPage/ContentPage.jsx";
import SearchPage from "./pages/search/SearchPage.jsx";
import NavBar from "./components/Shared/NavBar/NavBar.jsx";
import { useEffect, useState } from "./imports.js";

function App() {

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [])
  
  return (
    <BrowserRouter>
       <NavBar className={isScrolled ? 'navBarInHomePage scrolled' : 'navBarInHomePage'} />
      <Routes>
        <Route path="/" element={<ContentPage />} />
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/series" element={<ContentPage />} />
        {/* <Route path="/series" element={<SeriesPage />} /> */}
        <Route path="/movies" element={<ContentPage />} />
        {/* <Route path="/movies" element={<MoviesPage />} /> */}
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/forgotPwd" element={<LoginHelpPage />} />
        <Route path="/resetPwd" element={<ResetPwdPage />} />
        {/* <Route path="/info" element={<DescriptionPage />} /> */}
        <Route path="/myList" element={<MyListPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
