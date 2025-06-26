import { BrowserRouter, Route, Routes } from "react-router";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Login } from "./pages/auth/Login.jsx";
import { Register } from "./pages/auth/Register.jsx";
import { MainPage } from "./pages/MainPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/"} element={<MainPage />}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
