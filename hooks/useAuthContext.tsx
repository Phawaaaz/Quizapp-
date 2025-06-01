import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextData {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, studentId: string, password: string) => Promise<void>;
  signOut: () => void;
  getUserInfo: () => Promise<void>;
}

// Create context with default values
const AuthContext = createContext<AuthContextData>({
  user: null,
  isLoading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: () => {},
  getUserInfo: async () => {},
});

// Mock authentication for demo purposes
const mockUser: User = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john.doe@university.edu',
  studentId: '12345678',
};

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getUserInfo = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://quiz-app-7hcr.onrender.com/api/auth/users/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // You might need to add authorization header here if required
          // 'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      }

      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Failed to fetch user info:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user is already logged in
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        setIsLoading(true);
        await getUserInfo();
      } catch (error) {
        console.error('Failed to check login status', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      const response = await fetch('https://quiz-app-7hcr.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const userData = await response.json();
      
      // Store the token if it's in the response
      if (userData.token) {
        // You might want to store this token in AsyncStorage or SecureStore
        // await AsyncStorage.setItem('authToken', userData.token);
      }

      setUser(userData);
    } catch (error) {
      console.error('Sign in failed', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (
    name: string, 
    email: string, 
    studentId: string, 
    password: string
  ) => {
    try {
      setIsLoading(true);
      
      const response = await fetch('https://quiz-app-7hcr.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          studentId,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const userData = await response.json();
      
      // Store the token if it's in the response
      if (userData.token) {
        // You might want to store this token in AsyncStorage or SecureStore
        // await AsyncStorage.setItem('authToken', userData.token);
      }

      setUser(userData);
    } catch (error) {
      console.error('Sign up failed', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut, getUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;