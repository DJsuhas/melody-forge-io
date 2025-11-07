// Firebase configuration with environment variable placeholders
// DO NOT commit real API keys to version control

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
};

// Firebase Auth placeholder functions
export const initAuth = () => {
  console.warn("Firebase not configured. Please add your Firebase credentials to .env file");
  return null;
};

export const signInWithEmail = async (email: string, password: string) => {
  // TODO: Implement Firebase signInWithEmailAndPassword
  console.log("Sign in attempt:", email);
  return { user: null, error: "Firebase not configured" };
};

export const signUpWithEmail = async (email: string, password: string) => {
  // TODO: Implement Firebase createUserWithEmailAndPassword
  console.log("Sign up attempt:", email);
  return { user: null, error: "Firebase not configured" };
};

export const signOut = async () => {
  // TODO: Implement Firebase signOut
  console.log("Sign out");
};

export const onAuthStateChanged = (callback: (user: any) => void) => {
  // TODO: Implement Firebase onAuthStateChange listener
  return () => {};
};

export { firebaseConfig };
