import {Button} from "@nxt-ui/components";
import {Navigation, Notifications, Footer, RootContainer, ProcessingContainer} from "@nxt-ui/cp/components";
import {useVisibilityChange} from "@nxt-ui/cp/hooks";
import {IpbeListScreen, IpbeEditScreen, Ibpe3, Ibpe4, TxrListScreen, TxrEditScreen} from "@nxt-ui/cp/screens";
import {BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {commonActions} from "@nxt-ui/cp-redux";

// todo: remove this mock pages
const NodesListPage = () => <div>Nodes list page</div>;

const NodeItemPage = () => <div>Node item page</div>;

const Four0FourScreen = () => {
    const navigate = useNavigate();
    const navigateHome = () => navigate("/");
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyItems: "center",
            }}>
            <span style={{padding: "5rem", fontSize: "3rem"}}>You are lost</span>
            <Button onClick={navigateHome}>GO HOME</Button>
        </div>
    );
};

const HomeScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const navigateToIpbe = () => navigate("/ipbes");
    const navigateToTxr = () => navigate("/txrs");
    const navigateToAppList = () => navigate("/app-list");
    const navigateToPopups = () => navigate("/popups");
    const navigateToMonitoring = () => navigate("/monitoring");

    useEffect(() => {
        dispatch(commonActions.userActions.getUser());
    }, [dispatch]);

    return (
        <div style={{width: "100%", display: "flex"}}>
            <div style={{width: "30%", display: "flex", flexDirection: "column"}}>
                <span style={{fontSize: "2rem"}}>User settings</span>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <span style={{fontSize: "1rem"}}>Name</span>
                    <span style={{fontSize: "1rem"}}>Preferences</span>
                    <span style={{fontSize: "1rem"}}>Something else</span>
                </div>
            </div>
            <div style={{width: "70%", display: "flex", flexDirection: "column"}}>
                <span style={{fontSize: "2rem"}}>Screens</span>
                <div style={{display: "grid", gap: "0.5rem"}}>
                    <Button onClick={navigateToIpbe}>SDI to IP encoder</Button>
                    <Button onClick={navigateToTxr}>Transfers</Button>
                    <Button onClick={navigateToAppList}>APP LIST</Button>
                    <Button onClick={navigateToPopups}>POPUPS</Button>
                    <Button onClick={navigateToMonitoring}>MONITORING</Button>
                </div>
            </div>
        </div>
    );
};

interface CpProps {
    deployPath?: string;
}

//todo: make proper routing
export function Cp({deployPath}: CpProps) {
    useVisibilityChange();
    return (
        <RootContainer>
            <Router basename={deployPath}>
                <Navigation username="Alexandr" />
                <ProcessingContainer>
                    <Routes>
                        {/*App routing*/}
                        <Route path="/" element={<HomeScreen />} />
                        <Route path="/ipbes" element={<IpbeListScreen />} />
                        <Route path="/ipbe">
                            <Route index element={<IpbeEditScreen />} />
                            <Route path=":id" element={<IpbeEditScreen />} />
                        </Route>
                        <Route path="/txrs" element={<TxrListScreen />} />
                        <Route path="/txr">
                            <Route index element={<TxrEditScreen />} />
                            <Route path=":id" element={<TxrEditScreen />} />
                        </Route>
                        <Route path="/node">
                            <Route index element={<NodesListPage />} />
                            <Route path="edit/:id" element={<NodeItemPage />} />
                        </Route>
                        {/*Individual screens*/}
                        <Route path="/app-list" element={<Ibpe3 />} />
                        <Route path="/popups" element={<Ibpe4 />} />
                        <Route path="*" element={<Four0FourScreen />} />
                    </Routes>
                </ProcessingContainer>
                <Footer />
                <Notifications />
            </Router>
        </RootContainer>
    );
}

export default Cp;
