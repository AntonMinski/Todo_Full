import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';


import Layout from './components/Layout/Layout';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';



function App() {
  const logged = useSelector(state => state.auth.isLoggedIn);


  return (
    <Layout>
      <Switch>
            
              <Route path='/' exact>
              {logged && <HomePage />}
              {!logged && <Redirect to='/auth' />}
            </Route>
         
        {!logged && (
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