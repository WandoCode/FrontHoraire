import {
  AuthContextProvider,
  RequireAdmin,
  RequireAuth,
} from "./AuthContextProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import Home from "./Components/Home";
import Logout from "./Components/Logout";
import Layout from "./Components/Layout";
import SignupForm from "./Components/SignupForm";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route
              path="logout"
              element={
                <RequireAuth>
                  <Logout />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;