import { createContext, useReducer, useContext, useEffect } from 'react';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        userId: action.payload.userId,
        userName: action.payload.userName,
        userPassword: action.payload.userPassword
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        userId: null,
        userName: null,
        userPassword: null
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const sessionTimeout =  60 * 60 * 1000;
  const storedLoginTime = localStorage.getItem('loginTime');
  const isLoggedIn = storedLoginTime && new Date().getTime() - parseInt(storedLoginTime, 10) <= sessionTimeout;

  const [state, dispatch] = useReducer(authReducer, {
    isLoggedIn,
    userId: null,
    userName: localStorage.getItem('userName') || null,
    userPassword: localStorage.getItem('userPassword') || null,
    loginTime: storedLoginTime ? parseInt(storedLoginTime, 10) : null
  });

  useEffect(() => {
    const checkSessionTimeout = () => {
      const loginTime = localStorage.getItem('loginTime');

      if (loginTime && new Date().getTime() - loginTime > sessionTimeout) {
        dispatch({ type: 'LOGOUT' });
        // Clear local storage
        localStorage.removeItem('userName');
        localStorage.removeItem('userPassword');
        localStorage.removeItem('loginTime');
      }
    };

    // Attach event listener to handle storage changes (e.g., in other tabs)
    const handleStorageChange = () => {
      checkSessionTimeout();
    };

    window.addEventListener('storage', handleStorageChange);

    checkSessionTimeout(); // Check session timeout on component mount

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (state.isLoggedIn) {
      localStorage.setItem('userName', state.userName);
      localStorage.setItem('userPassword', state.userPassword);
      localStorage.setItem('loginTime', new Date().getTime().toString());
    }
  }, [state.isLoggedIn, state.userName, state.userPassword]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext
