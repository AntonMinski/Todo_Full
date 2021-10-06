import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';


import Layout from './components/Layout/Layout';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './store/auth-context';
// import {TokenStore} from '../src/mobx/TokenStore'

function App() {
  const autCtx = useContext(AuthContext);


  return (
    <Layout>
      <Switch>
            
              <Route path='/' exact>
              {autCtx.isLoggeiIn && <HomePage />}
              {!autCtx.isLoggeiIn && <Redirect to='/auth' />}
            </Route>
         
        {!autCtx.isLoggeiIn && (
            <Route path='/auth'>
            <AuthPage /> 
          </Route>
        )}
        <Route path='*'>
          <Redirect to='/' /> 
        </Route>
      </Switch> 
    </Layout>
  );
}



export default App;