import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./layout/Index";
import Dashboard from "./pages/dashboard";
import Profil from "./pages/profil";
import Login from "./pages/auth";
import { Authenticated } from "./middleware/auth.middleware";

export default function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<Login />} />
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/panel" element={
                    <Authenticated>
                        <Layout />
                    </Authenticated>
                }>
                    <Route index element={<Dashboard />} />
                    <Route path="jabatan" element={<Profil />} />
                    <Route path="karyawan" element={<Profil />} />
                    <Route path="profil" element={<Profil />} />
                    <Route path="presence" element={<Profil />} />
                    <Route path="salary" element={<Profil />} />
                    <Route path="leave" element={<Profil />} />

                </Route>
                {/* Not Found */}
                {/* <Route path="/404" element={<Login />} />
                <Route path="*" element={<Login />} /> */}
            </Routes>
        </BrowserRouter>
    );
}
