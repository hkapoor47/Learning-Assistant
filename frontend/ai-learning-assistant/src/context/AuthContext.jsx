import React, {createContext, useContent,useState, useEffect, Children} from "react";

const AuthContext = createContext();

export const useAuth = () =>{
  const context = useContext(AuthContext);
  if(!content){
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ Children}) =>{
  const [user,serUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated , setIsAuthenticated] = useState(false);

  useEffect(()=>{
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () =>{
    try {
      const token = localStorage.getItem('token');
      const  userStr = localStorage.getItem('user');

      if(token && userStr){
        const userData = JSON.parse(userStr);
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log('Auth check failed:', error);
      logout();
    }finally{
      setLoading(false);
    }
  };

  const login  =(userData, token)=>{
    localStorage.setitem('token', token);
    localStorage.setItem('user',JSON.stringify(userData));

    setUser(userData);
    setIsAuthenticated(true);
};

const logout =  ()=>{
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  setUser(null);
  setIsAuthenticated(false);
  window.location.href = '/'
};

const updateUser = (updatedUserData) =>{
  const newUserData = {...user , ...updatedUserData};
 localStorage.setItem('user', JSON.stringify(newUserData));
 setUser(newUserData);
};
  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    updateUser,
    checkAuthStatus
  };
  
  return <AuthContext.Provider value = {value}>{Children}</AuthContext.Provider>
}