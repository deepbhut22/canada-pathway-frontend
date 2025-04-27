import { create } from 'zustand';
import type { User, AuthState } from '../types';
import { useUserStore } from './userStore';

import api from '../utils/axios';

const User: User = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  profileComplete: false,
}


const useAuthStore = create<AuthState & {
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  initializeAuth: () => Promise<void>;

}>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  initializeAuth: async () => {
    set({ isLoading: true });
    
    const token = localStorage.getItem('canda-pathway-auth-token');
    if (token) {
      try {
        const response = await api.get('/auth/profile');
        if (response.status === 200) {
          set({ 
            user: response.data.user,
            isAuthenticated: true,
          });
          useUserStore.getState().resetUserProfile();
          useUserStore.setState({ userProfile: response.data.userProfile });
          set({ isLoading: false });
        } else {
          localStorage.removeItem('canda-pathway-auth-token');
          set({ 
            user: null,
            isAuthenticated: false,
            isLoading: false 
          });
        }
      } catch (error) {
        localStorage.removeItem('canda-pathway-auth-token');
        set({ 
          user: null,
          isAuthenticated: false,
          isLoading: false 
        });
      }
    } else {
      set({ isLoading: false });
    }
  },

  login: async (email: string, password: string): Promise<boolean> => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      if (response.status === 200) {
        set({ user: response.data, isAuthenticated: true, isLoading: false });
        localStorage.setItem('canda-pathway-auth-token', response.data.token);

        const profileResponse = await api.get('/auth/profile');

        const { useUserStore } = await import('./userStore');
        useUserStore.getState().resetUserProfile();
        useUserStore.setState({ userProfile: profileResponse.data.userProfile });

        return true;
      } else {
        return false;
      }
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      return false;
    }
  },

  register: async (email: string, password: string, firstName: string, lastName: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/auth/register', {
        email,
        firstName,
        lastName,
        password,
      });

      if (response.status === 201) {
        set({ user: response.data, isAuthenticated: false, isLoading: false });
        localStorage.setItem('canda-pathway-auth-token', response.data.token);
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  loginWithGoogle: async () => {
    set({ isLoading: true, error: null });
    try {
      // Implement Google login
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  logout: () => {
    localStorage.removeItem('canda-pathway-auth-token');
    set({ user: null, isAuthenticated: false, error: null });
  }
}));

export default useAuthStore; 