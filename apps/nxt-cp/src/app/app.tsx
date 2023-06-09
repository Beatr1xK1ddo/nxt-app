import {Button} from "@nxt-ui/components";
import {Navigation, Notifications, Footer, RootContainer, ProcessingContainer} from "@nxt-ui/cp/components";
import {
    InitializationScreen,
    IpbeListScreen,
    IpbeEditScreen,
    Ibpe3,
    Ibpe4,
    TxrListScreen,
    TxrEditScreen,
    NotificationsRulesScreen,
    NotificationRuleEditScreen,
} from "@nxt-ui/cp/screens";
import {useInitialRequest, useUserNotificationList, useVisibilityChange} from "@nxt-ui/cp/hooks";
import {BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom";

// // todo: remove this mock pages
// const NodesListPage = () => <div>Nodes list page</div>;

// const NodeItemPage = () => <div>Node item page</div>;

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
    const navigate = useNavigate();
    const navigateToIpbe = () => navigate("/ipbes");
    const navigateToTxr = () => navigate("/txrs");
    const navigateToAppList = () => navigate("/app-list");
    const navigateToPopups = () => navigate("/popups");
    const navigateToNotifications = () => navigate("/notifications");
    const navigateToMonitoring = () => navigate("/monitoring");

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
                    <Button onClick={navigateToNotifications}>Notifications</Button>
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
    useUserNotificationList();
    const logged = useInitialRequest();

    if (logged) {
        return (
            <RootContainer>
                <Router basename={deployPath}>
                    <Navigation />
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
                            {/* <Route path="/node">
                                <Route index element={<NodesListPage />} />
                                <Route path="edit/:id" element={<NodeItemPage />} />
                            </Route> */}
                            <Route path="/notifications" element={<NotificationsRulesScreen />} />
                            <Route path="/notification">
                                <Route index element={<NotificationRuleEditScreen />} />
                                <Route path=":id" element={<NotificationRuleEditScreen />} />
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
    } else {
        return <InitializationScreen />;
    }
}

export default Cp;
