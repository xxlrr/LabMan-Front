import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Layout from "./pages/Layout";
import { AuthRoute } from "./components/Authorize";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthRoute>
              <Layout />
            </AuthRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
