import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { withAuth, AuthRoute } from "./components/Authorize";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Equipment from "./pages/Equipment";
import Borrow from "./pages/Borrow";

// add feature that redirect to `/login` if the user is not logged in
const LayoutWithAuth = withAuth(Layout, [], <Navigate to="/login" />);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutWithAuth/>}>
          <Route path="borrow" element={<AuthRoute roles={["User", "Manager"]} />}>
            <Route path="" element={<Borrow />} />
            <Route path="add" />
            <Route path="edit" />
          </Route>
          <Route path="equipment" element={<AuthRoute roles={["Manager"]} />}>
            <Route path="" element={<Equipment />} />
            <Route path="add" />
            <Route path="edit" />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
