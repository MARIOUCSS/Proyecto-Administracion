import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepages from "./Pages/Homepages";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Policy from "./Pages/Policy";
import Pagenotfound from "./Pages/Pagenotfound";
import Register from "./Pages/auth/Register";
import Login from "./Pages/auth/Login";
import Dashboard from "./Pages/User/Dashboard";
import PrivateRoute from "./Components/Routes/PrivateRoute";
import ForgotPassword from "./Pages/auth/ForgotPassword";
import AdminRoute from "./Components/Routes/AdminRoute";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import CreateCategory from "./Pages/Admin/CreateCategory";
import CreateProd from "./Pages/Admin/CreateProd";
import Userss from "./Pages/Admin/Userss";
import Orders from "./Pages/User/Orders";
import Profile from "./Pages/User/Profile";

function App() {
  //ojo :Si quieres acceder al dashboard de manera directa primero tiene que
  //entrar al componente PrivateRoute y despues de eso recien entras al
  //dashbord
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepages />} />
        {/* //user */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
        </Route>
        {/* //admin */}
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProd />} />
          <Route path="admin/users" element={<Userss />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
