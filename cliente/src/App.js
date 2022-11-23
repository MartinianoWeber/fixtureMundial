import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import './App.css';
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import Navbar from "./components/Navbar";
import Login from "./components/pages/Login";


const NavLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);
function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route element={<NavLayout />}>
          <Route path="/" element={<Home />} />


        </Route>

        {/* ERROR 404 */}
        <Route path="*" element={<NotFound />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
