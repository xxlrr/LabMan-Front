import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Equipment from "./pages/Equipment";
import Borrow from "./pages/Borrow";
import About from "./pages/About";
import Notification from "./pages/Notification";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<About />} />
          <Route path="borrow">
            <Route path="" element={<Borrow />} />
            <Route path="add" element={<Borrow.Add />}/>
            <Route path="edit/:id/" element={<Borrow.Edit />} />
          </Route>
          <Route path="equipment">
            <Route path="" element={<Equipment />} />
            <Route path="add" element={<Equipment.Add />} />
            <Route path="edit/:id/" element={<Equipment.Edit />} />
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
