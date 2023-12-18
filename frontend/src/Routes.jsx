import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./layout/Index";
import Dashboard from "./pages/dashboard";
import Profil from "./pages/profil";
import Login from "./pages/auth";
import { Authenticated } from "./middleware/auth.middleware";
import Jabatan from "./pages/admin/jabatan";
import JabatanAdd from "./pages/admin/addJabatan";
import Karyawan from "./pages/admin/karyawan";
import KaryawanAdd from "./pages/admin/addKaryawan";

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
                    <Route path="jabatan" element={<Jabatan />} />
                    <Route path="users" element={<Karyawan />} />
                    <Route path="profil" element={<Profil />} />
                    <Route path="presence" element={<Profil />} />
                    <Route path="salary" element={<Profil />} />
                    <Route path="leave" element={<Profil />} />
                    <Route path="add-jabatan" element={<JabatanAdd />} />
                    <Route path="add-karyawan" element={<KaryawanAdd />} />

                </Route>
            </Routes>
        </BrowserRouter>
    );
}
