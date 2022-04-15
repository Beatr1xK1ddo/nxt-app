import { Button } from '@nxt-ui/components';
import { Navigation, Footer, RootContainer } from '@nxt-ui/cp/components';
import { Ibpe1 } from '@nxt-ui/cp/screens';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
} from 'react-router-dom';

const Greet = () => {
    const navigate = useNavigate();
    const navigateToIbpe = () => navigate('/ibpe');

    return <Button onClick={navigateToIbpe}>Go to IBPE</Button>;
};

export function App() {
    return (
        <>
            <Navigation username="Alexandr" />
            <RootContainer>
                <Router>
                    <Routes>
                        <Route path="/" element={<Greet />} />
                        <Route path="/ibpe" element={<Ibpe1 />} />
                    </Routes>
                </Router>
            </RootContainer>
            <Footer />
        </>
    );
}

export default App;
