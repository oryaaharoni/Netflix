import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SigninPage from "./pages/signInPage/SigninPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SigninPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
