import {
  AuthContextProvider,
  RequireAdmin,
  RequireAuth,
} from "./AuthContextProvider";
import "./stylesheets/main.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import Home from "./Components/Home";
import Logout from "./Components/Logout";
import Layout from "./Components/Layout";
import SignupForm from "./Components/SignupForm";
import Calendar from "./Components/Calendar";
import DayDetails from "./Components/DayDetails";
import ManageSchedule from "./Components/ManageSchedule";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Calendar />
                </RequireAuth>
              }
            />
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
            <Route
              path="/day/details/:year/:monthIndex/:day"
              element={
                <RequireAuth>
                  <DayDetails />
                </RequireAuth>
              }
            />
            <Route path="/create/schedule" element={<ManageSchedule />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;