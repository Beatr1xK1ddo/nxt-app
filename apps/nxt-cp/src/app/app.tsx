import { Button } from '@nxt-ui/components';
import { Navigation, Footer, RootContainer } from '@nxt-ui/cp/components';
import { Ibpe1, Ibpe2 } from '@nxt-ui/cp/screens';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
} from 'react-router-dom';

const Greet = () => {
    const navigate = useNavigate();
    const navigateToIbpe = () => navigate('/ibpe');
    const navigateToEditApp = () => navigate('/edit-form');

    return (
        <div>
            <Button onClick={navigateToIbpe}>Go to IBPE</Button>
            <Button onClick={navigateToEditApp}>Go to EDIT APP</Button>
        </div>
    );
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
                        <Route path="/edit-form" element={<Ibpe2 />} />
                    </Routes>
                </Router>
            </RootContainer>
            <Footer />
        </>
    );
}

export default App;
