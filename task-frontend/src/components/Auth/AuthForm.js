import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import classes from './AuthForm.module.css';
import AuthContext from '../../store/auth-context';

import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';


const AuthForm = () => {
  const history = useHistory();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordConfirmRef = useRef();

  const authCtx = useContext(AuthContext);

  const dispatch = useDispatch();


  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    let url;
    let passwordConfirm;

     if (isLogin) { 
      
      url = `${process.env.REACT_APP_BASE_URL}/login`;
      passwordConfirm = enteredPassword;

    } else {
    
      url = `${process.env.REACT_APP_BASE_URL}/register`;

      passwordConfirm = passwordConfirmRef.current.value;
    }
  
    axios.post(url, {
      email: enteredEmail,
      password: enteredPassword,
      password_confirm: passwordConfirm,
  })
  .then(response => 
    { 
      authCtx.login(response.data.access_token);

      dispatch(authActions.setLogin(response.data.access_token))

      history.replace('/'); // redirect after login
    })
  .catch(error => {
    let errorMessage = error.message;
    alert(errorMessage);
  });

}

  return (
    <div className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        {!isLogin && <div className={classes.control}>
          <label htmlFor='password_confirm'>Password Confirmation</label>
          <input type='password' id='password_confirm' required ref={passwordConfirmRef} />
        </div>}
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
