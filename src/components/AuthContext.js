// AuthContext.js
import { createContext, useReducer, useContext } from 'react';

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
  const [state, dispatch] = useReducer(authReducer, {
    isLoggedIn: false,
    userId: null,
    userName: null,
    userPassword: null
  });

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
