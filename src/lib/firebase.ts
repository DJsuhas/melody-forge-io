import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  type User
} from 'firebase/auth';

interface AuthResponse {
  user: User | null;
  error?: string;
}

const firebaseConfig = {
  apiKey: "AIzaSyCfMy0BDVaW4aWD5ALS82JihNazaI0SD8E",
  authDomain: "music-45188.firebaseapp.com",
  projectId: "music-45188",
  storageBucket: "music-45188.firebasestorage.app",
  messagingSenderId: "38229767935",
  appId: "1:38229767935:web:117737cdb6ba61d10abeca"
};

import { getAuth, Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged as firebaseOnAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

let auth: Auth | null = null;

// Firebase Auth functions
export const initAuth = (): Auth => {
  if (!auth) {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
  }
  return auth;
};

export const signInWithEmail = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const auth = initAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user };
  } catch (error) {
    console.error('Sign in error:', error);
    return { user: null, error: 'Failed to sign in. Please check your credentials.' };
  }
};

export const signUpWithEmail = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const auth = initAuth();
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user };
  } catch (error) {
    console.error('Sign up error:', error);
    return { user: null, error: 'Failed to create account. Email might be already in use.' };
  }
};

export const signOut = async (): Promise<void> => {
  try {
    const auth = initAuth();
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Sign out error:', error);
    throw new Error('Failed to sign out');
  }
};

export const onAuthStateChanged = (callback: (user: User | null) => void): (() => void) => {
  const auth = initAuth();
  return firebaseOnAuthStateChanged(auth, callback);
};

export { firebaseConfig };
