import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  supabase, 
  isSupabaseConfigured, 
  authService, 
  formatAuthError 
} from '../lib/supabaseClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDemoUser, setIsDemoUser] = useState(false);
  const [isRecoveryMode, setIsRecoveryMode] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // Detect if current URL has recovery tokens or path
    const checkRecoveryFromUrl = () => {
      const path = window.location.pathname;
      const hash = window.location.hash || '';
      const search = window.location.search || '';
      if (
        path === '/reset-password' ||
        hash.includes('type=recovery') ||
        search.includes('type=recovery')
      ) {
        setIsRecoveryMode(true);
      }
    };

    checkRecoveryFromUrl();

    // 1. Check existing session on application mount
    const initAuth = async () => {
      try {
        if (isSupabaseConfigured && supabase) {
          const { data, error } = await supabase.auth.getSession();
          if (error) {
            console.warn('Session retrieval error:', error);
          }
          if (isMounted) {
            setSession(data?.session || null);
            setUser(data?.session?.user || null);
          }
        }
      } catch (err) {
        console.error('Session init error:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initAuth();

    // 2. Real-time auth listener for SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED, PASSWORD_RECOVERY
    if (isSupabaseConfigured && supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, newSession) => {
          if (!isMounted) return;

          setSession(newSession || null);
          setUser(newSession?.user || null);

          if (event === 'SIGNED_IN') {
            setIsDemoUser(false);
          } else if (event === 'SIGNED_OUT') {
            setUser(null);
            setSession(null);
            setIsDemoUser(false);
            setIsRecoveryMode(false);
          } else if (event === 'PASSWORD_RECOVERY') {
            setIsRecoveryMode(true);
          }

          setLoading(false);
        }
      );

      return () => {
        isMounted = false;
        subscription?.unsubscribe();
      };
    } else {
      setLoading(false);
    }
  }, []);

  // Real Supabase sign in with password
  const signIn = useCallback(async (email, password) => {
    try {
      const data = await authService.signInWithPassword({ email, password });
      setIsDemoUser(false);
      return data;
    } catch (err) {
      throw new Error(formatAuthError(err));
    }
  }, []);

  // Real Supabase sign up
  const signUp = useCallback(async (email, password, fullName) => {
    try {
      const data = await authService.signUp({ email, password, fullName });
      setIsDemoUser(false);
      return data;
    } catch (err) {
      throw new Error(formatAuthError(err));
    }
  }, []);

  // Real Supabase Google OAuth
  const signInWithGoogle = useCallback(async () => {
    try {
      return await authService.signInWithGoogle();
    } catch (err) {
      throw new Error(formatAuthError(err));
    }
  }, []);

  // Real Supabase sign out
  const signOut = useCallback(async () => {
    try {
      await authService.signOut();
    } catch (err) {
      console.warn('Sign out error:', err);
    } finally {
      setUser(null);
      setSession(null);
      setIsDemoUser(false);
      setIsRecoveryMode(false);
    }
  }, []);

  // Real Supabase send password reset email
  const resetPasswordForEmail = useCallback(async (email) => {
    try {
      return await authService.resetPasswordForEmail(email);
    } catch (err) {
      throw new Error(formatAuthError(err));
    }
  }, []);

  // Real Supabase update password for authenticated recovery user
  const updatePassword = useCallback(async (newPassword) => {
    try {
      const res = await authService.updatePassword(newPassword);
      setIsRecoveryMode(false);
      return res;
    } catch (err) {
      throw new Error(formatAuthError(err));
    }
  }, []);

  // Guest Demo Tour: strictly in-memory demo, not treated as real authentication
  const loginAsGuest = useCallback(() => {
    const guestUser = {
      id: 'guest_demo_' + Math.random().toString(36).substring(2, 8),
      email: 'guest.preview@resumeforge.io',
      user_metadata: {
        full_name: 'Guest Professional',
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      },
    };
    setUser(guestUser);
    setIsDemoUser(true);
  }, []);

  const exitRecoveryMode = useCallback(() => {
    setIsRecoveryMode(false);
    if (window.location.pathname === '/reset-password') {
      window.history.replaceState({}, document.title, '/');
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isDemoUser,
        isSupabaseConfigured,
        isRecoveryMode,
        setIsRecoveryMode,
        exitRecoveryMode,
        signIn,
        signUp,
        signOut,
        signInWithGoogle,
        resetPasswordForEmail,
        updatePassword,
        // Aliases to ensure 100% backward compatibility
        loginWithPassword: signIn,
        signupWithPassword: signUp,
        logout: signOut,
        loginWithGoogle: signInWithGoogle,
        loginAsGuest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
