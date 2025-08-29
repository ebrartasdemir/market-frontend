import { Routes, Route } from "react-router-dom";
import MarketPage from "../pages/MarketPage";
import Layout from "../components/Layout";
import DetailPage from "../pages/DetailPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import CartPage from "../pages/CartPage";
import AccountPage from "../pages/AcountPage";
const AppRoutes = () => {
    return (
        <Routes> 
            <Route path="/" element={<Layout><MarketPage /></Layout>} />
            <Route path="/detail/:id" element={<Layout><DetailPage /></Layout>} />
            <Route path="/login" element={<Layout><LoginPage /></Layout>} />
            <Route path="/register" element={<Layout><RegisterPage /></Layout>} />
            <Route path="/cart" element={<Layout><CartPage /></Layout>} />
            <Route path="/account" element={<Layout><AccountPage /></Layout>} />

        </Routes>
    )
}
export default AppRoutes;