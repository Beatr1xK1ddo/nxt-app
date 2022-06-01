import {Button} from "@nxt-ui/components";
import {Navigation, Footer, RootContainer, ProcessingContainer} from "@nxt-ui/cp/components";
import {IpbeListScreen, IpbeEditScreen, Ibpe3, Ibpe4, IpbeCreateScreen} from "@nxt-ui/cp/screens";
import {BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom";

const Greet = () => {
    const navigate = useNavigate();
    const navigateToIpbe = () => navigate("/ipbe");
    const navigateToEditApp = () => navigate("/edit-form");
    const navigateToAppList = () => navigate("/app-list");
    const navigateToPopups = () => navigate("/popups");
    const navigateToCreateApp = () => navigate("/create-form");

    return (
        <div>
            <Button onClick={navigateToIpbe}>Go to IPBE</Button>
            <Button style={{marginLeft: 10}} onClick={navigateToEditApp}>
                Go to EDIT APP
            </Button>
            <Button style={{marginLeft: 10}} onClick={navigateToCreateApp}>
                Go to CREATE APP
            </Button>
            <Button style={{marginLeft: 10}} onClick={navigateToAppList}>
                Go to APP List
            </Button>
            <Button style={{marginLeft: 10}} onClick={navigateToPopups}>
                Go to popups page
            </Button>
        </div>
    );
};

interface CpProps {
    deployPath?: string;
}

export function Cp({deployPath}: CpProps) {
    return (
        <RootContainer>
            <Router basename={deployPath}>
                <Navigation username="Alexandr" />
                <ProcessingContainer>
                    <Routes>
                        <Route path="/" element={<Greet />} />
                        <Route path="/ipbe" element={<IpbeListScreen />} />
                        <Route path="/edit-form" element={<IpbeEditScreen />} />
                        <Route path="/create-form" element={<IpbeCreateScreen />} />
                        <Route path="/app-list" element={<Ibpe3 />} />
                        <Route path="/popups" element={<Ibpe4 />} />
                    </Routes>
                </ProcessingContainer>
                <Footer />
            </Router>
        </RootContainer>
    );
}

export default Cp;
