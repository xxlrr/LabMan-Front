import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { withAuth, AuthRoute } from "./components/Authorize";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Equipment from "./pages/Equipment";
import Borrow from "./pages/Borrow";
import About from "./pages/About";

// add feature that redirect to `/login` if the user is not logged in
// const LayoutWithAuth = withAuth(Layout, [], <Navigate to="/login" />);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<About />} />
          <Route path="borrow">
            <Route path="" element={<Borrow />} />
            <Route path="add" />
            <Route path="edit" />
          </Route>
          <Route path="equipment">
            <Route path="" element={<Equipment />} />
            <Route path="add" />
            <Route path="edit" />
          </Route>
          <Route path="*" element={<About />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
