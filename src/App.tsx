import { ReactElement, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import { Toaster } from "./components/ui/toaster";
import LoginView from "./views/LoginView";
import { supabase } from ".";
import IndexView from "./views/IndexView";
import DashboardView from "./views/DashboardView";
import ProjectView from "./views/ProjectView";
import MyNavButton from "./components/MyNavButton";
import SignUpView from "./views/SignUpView";
import BugDetailView from "./views/BugDetailView";

interface Props {
  children: ReactElement;
}

const RequireAuth = ({ children }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const data = await supabase.auth.getSession();
      if (!data.data.session) {
        navigate("/login");
      }
    };

    checkAuth();
  }, [children]);

  return (
    <>
      <MyNavButton></MyNavButton>
      {children}
    </>
  );
};

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <IndexView />
              </RequireAuth>
            }
          />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <DashboardView />
              </RequireAuth>
            }
          />
          <Route
            path="/project/:projectId"
            element={
              <RequireAuth>
                <ProjectView />
              </RequireAuth>
            }
          />
          <Route
            path="/bug/:bugId"
            element={
              <RequireAuth>
                <BugDetailView />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<LoginView />} />
          <Route path="/signup" element={<SignUpView />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
