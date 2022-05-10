import {Button} from "@nxt-ui/components";
import {Navigation, Footer, RootContainer, LoaderContainer} from "@nxt-ui/cp/components";
import {Ibpe1, Ibpe2, Ibpe3, Ibpe4} from "@nxt-ui/cp/screens";
import {BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom";

const Greet = () => {
    const navigate = useNavigate();
    const navigateToIbpe = () => navigate("/ibpe");
    const navigateToEditApp = () => navigate("/edit-form");
    const navigateToAppList = () => navigate("/app-list");
    const navigateToPopups = () => navigate("/popups");

    return (
        <div>
            <Button onClick={navigateToIbpe}>Go to IBPE</Button>
            <Button style={{marginLeft: 10}} onClick={navigateToEditApp}>
                Go to EDIT APP
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

export function App() {
    return (
        <RootContainer>
            <Router>
                <Navigation username="Alexandr" />
                <LoaderContainer>
                    <Routes>
                        <Route path="/" element={<Greet />} />
                        <Route path="/ibpe" element={<Ibpe1 />} />
                        <Route path="/edit-form" element={<Ibpe2 />} />
                        <Route path="/app-list" element={<Ibpe3 />} />
                        <Route path="/popups" element={<Ibpe4 />} />
                    </Routes>
                </LoaderContainer>
                <Footer />
            </Router>
        </RootContainer>
    );
}

export default App;
