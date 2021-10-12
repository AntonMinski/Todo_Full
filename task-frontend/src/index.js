import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';



import './index.scss';
import App from './App';
import { AuthContextProvider } from './store/auth-context';

import store from './store/index';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
  <AuthContextProvider>
    <BrowserRouter>
    <ToastProvider autoDismiss autoDismissTimeout={3500} placement='top-right'>
      <App />
      </ToastProvider>
    </BrowserRouter>
  </AuthContextProvider>
  </Provider>,
  document.getElementById('root')
);
