import { Link } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';


import classes from './MainNavigation.module.css';
import { authActions } from '../../store/auth-slice';


const MainNavigation = () => {
  // const authCtx = useContext(AuthContext);

  const storeIsLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    // authCtx.logout();
    dispatch(authActions.setLogout())
    console.log('logged_out');
  }

  
  return (
    <header className={classes.header}>

            <Link to='/'>
              <div className={classes.logo}>Todo app</div>
            </Link>
          
      
      <div>
        <ul>
            <li>
            <Link to='/auth'>Login</Link>
            </li>
          { storeIsLoggedIn && (
            <li>
            <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default MainNavigation;
