import { useContext } from 'react';
import { Link } from 'react-router-dom';

import Notification from '../Notification/Notification';
import AuthContext from '../../store/auth-context'; 
import classes from './MainNavigation.module.css';


const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
    console.log('logged_out');
  }

  // const storeErro = useSelector(state => state.task.tasks);



  
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>Todo app</div>
      </Link>
      <div>
        <ul>
          { !isLoggedIn && (
            <li>
              <Link to='/auth'>Login</Link>
            </li>
            )
          }
          { !isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </div>
      {/* <Notification /> */}
    </header>
  );
};

export default MainNavigation;
