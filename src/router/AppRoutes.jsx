import { Routes, Route } from "react-router-dom";
import MarketPage from "../pages/MarketPage";
import Layout from "../components/Layout";
import DetailPage from "../pages/DetailPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
const AppRoutes = () => {
    return (
        <Routes> 
            <Route path="/" element={<Layout><MarketPage /></Layout>} />
            <Route path="/detail" element={<Layout><DetailPage /></Layout>} />
            <Route path="/login" element={<Layout><LoginPage /></Layout>} />
            <Route path="/register" element={<Layout><RegisterPage /></Layout>} />
        </Routes>
    )
}
export default AppRoutes;