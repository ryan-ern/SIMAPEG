import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./layout/Index";
import Dashboard from "./pages";
import Profil from "./pages/profil";


export default function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/">
                        <Route index element={<Dashboard/>} />
                    </Route>
                    <Route path="/panel/profil">
                        <Route index element={<Profil/>} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
