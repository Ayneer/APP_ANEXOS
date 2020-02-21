import React from 'react';
import ReactDOM from 'react-dom';
import './assets/base.scss';
import App from './Main/App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './config/configureStore';

const store = configureStore();

const renderApp = Componente => (
    <Provider store={store}>
        <BrowserRouter> {/* HashRouter BrowserRouter */}
            <Componente />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(renderApp(App), document.getElementById('root'));
