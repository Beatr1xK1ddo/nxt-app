import { ROOT_STORE } from '@nxt-ui/cp/ducks';
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import './styles.scss';
import App from './app/app';

const Application = (
    <Provider store={ROOT_STORE}>
        <App />
    </Provider>
);

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(Application);

