import {
    Navigation,
    Filter,
    Controller,
    Footer,
    RootContainer,
} from '@nxt-ui/cp/components';
import { Ibpe1 } from '@nxt-ui/cp/screens';

export function App() {
    return (
        <>
            <Navigation username="Alexandr" />
            <RootContainer>
                <Filter />
                <Controller from={1} to={20} len={100} />
                <Ibpe1 />
                <Footer />
            </RootContainer>
        </>
    );
}

export default App;
