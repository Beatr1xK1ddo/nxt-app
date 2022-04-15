import { ROOT_STORE } from '@nxt-ui/cp/ducks';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './styles.scss';
import App from './app/app';

const Application = (
    <Provider store={ROOT_STORE}>
        <App />
    </Provider>
);

ReactDOM.render(Application, document.getElementById('root'));
