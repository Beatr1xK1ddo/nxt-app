import {Button} from "@nxt-ui/components";
import {Navigation, Footer, RootContainer, ProcessingContainer} from "@nxt-ui/cp/components";
import {IpbeScreen, Ibpe2, Ibpe3} from "@nxt-ui/cp/screens";
import {BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom";

const Greet = () => {
    const navigate = useNavigate();
    const navigateToIpbe = () => navigate("/ipbe");
    const navigateToEditApp = () => navigate("/edit-form");
    const navigateToAppList = () => navigate("/app-list");

    return (
        <div>
            <Button onClick={navigateToIpbe}>Go to IPBE</Button>
            <Button style={{marginLeft: 10}} onClick={navigateToEditApp}>
                Go to EDIT APP
            </Button>
            <Button style={{marginLeft: 10}} onClick={navigateToAppList}>
                Go to APP List
            </Button>
        </div>
    );
};

export function App() {
    return (
        <RootContainer>
            <Router>
                <Navigation username="Alexandr" />
                <ProcessingContainer>
                    <Routes>
                        <Route path="/" element={<Greet />} />
                        <Route path="/ipbe" element={<IpbeScreen />} />
                        <Route path="/edit-form" element={<Ibpe2 />} />
                        <Route path="/app-list" element={<Ibpe3 />} />
                    </Routes>
                </ProcessingContainer>
                <Footer />
            </Router>
        </RootContainer>
    );
}

export default App;
