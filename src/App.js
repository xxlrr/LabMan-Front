import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { withAuth, AuthRoute, AuthChildren } from "./components/Authorize";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Equipment from "./pages/Equipment";
import Borrow from "./pages/Borrow";
import About from "./pages/About";
import Notification from "./pages/Notification";

// add feature that redirect to `/login` if the user is not logged in
const LayoutWithAuth = withAuth(Layout, [], <Navigate to="/login" />);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutWithAuth/>}>
          <Route index element={<About />} />
          <Route path="borrow">
            <Route path="" element={<Borrow />} />
            <Route path="add" element={<AuthChildren roles={["Manager"]}><Borrow.Add /></AuthChildren>}/>
            <Route path="edit/:id/" element={<AuthChildren roles={["Manager"]}><Borrow.Edit /></AuthChildren>} />
          </Route>
          <Route path="equipment">
            <Route path="" element={<Equipment />} />
            <Route path="add" element={<AuthChildren roles={["Manager"]}><Equipment.Add /></AuthChildren>} />
            <Route path="edit/:id/" element={<AuthChildren roles={["Manager"]}><Equipment.Edit /></AuthChildren>} />
          </Route>
          <Route path="/notification" element={<Notification />} />
          <Route path="*" element={<About />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
