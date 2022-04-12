import { Navigation, Filter, Controller, Footer } from '@nxt-ui/cp/components';
import { Ibpe1 } from '@nxt-ui/cp/screens';

export function App() {
    return (
        <>
            <Navigation username="Alexandr" />
            <Filter />
            <Controller from={1} to={20} len={100} />
            <Ibpe1 />
            <Footer />
        </>
    );
}

export default App;
