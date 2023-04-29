import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import { withAuth } from "./components/Authorize";

const LayoutWithAuth = withAuth(Layout, [], <Navigate to="/login" />);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutWithAuth />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
