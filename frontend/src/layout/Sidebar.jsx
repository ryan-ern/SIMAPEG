import { useEffect, useState } from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import { useLocation, useNavigate } from "react-router-dom";
import '../assets/styles.css'

export default function Sidebar({ setOutletMargin }) {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const currentRoute = location.pathname.replace("/", "");

    const handleToggle = expanded => {
        setIsVisible(expanded);
        const isAndroid = window.innerWidth <= 768;
        if (!isAndroid){
            setOutletMargin(expanded ? '5%' : '-20%')
        }
    };

    useEffect(() => {
        const handleResize = () => {
            const isAndroid = window.innerWidth <= 768;
            if (isAndroid) {
                setIsVisible(false);
                setOutletMargin('5%');
            } else {
                setIsVisible(true)
                setOutletMargin('5%');
            }
        };

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [setOutletMargin]);

    return (
        <SideNav
            expanded={isVisible}
            onToggle={handleToggle}
            style={{ position: "fixed", height: "100%" }}
            onSelect={(selected) => {
                const to = "/" + selected;
                if (window.location.pathname !== to) {
                    navigate(to);
                }
            }}
        >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected={currentRoute}>
                <NavItem eventKey="panel">
                    <NavIcon>
                        <FontAwesomeIcon icon="fa-solid fa-display" />
                    </NavIcon>
                    <NavText>Home</NavText>
                </NavItem>
                <NavItem eventKey="panel/profil">
                    <NavIcon>
                        <FontAwesomeIcon icon="fa-solid fa-user-pen" />
                    </NavIcon>
                    <NavText>Edit Profil</NavText>
                </NavItem>
                <NavItem eventKey="presence">
                    <NavIcon>
                        <FontAwesomeIcon icon="fa-solid fa-file-circle-check" />
                    </NavIcon>
                    <NavText>Absensi</NavText>
                </NavItem>
                <NavItem eventKey="salary">
                    <NavIcon>
                        <FontAwesomeIcon icon="fa-solid fa-money-bill-wave" />
                    </NavIcon>
                    <NavText>Gaji</NavText>
                </NavItem>
                <NavItem eventKey="leave">
                    <NavIcon>
                        <FontAwesomeIcon icon="fa-solid fa-file-circle-exclamation" />
                    </NavIcon>
                    <NavText>Cuti</NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
    );
}
