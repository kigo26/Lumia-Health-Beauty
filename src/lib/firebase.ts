import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult, signOut, User } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { handleFirestoreError, OperationType } from './logger';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithRedirect(auth, googleProvider);
export { getRedirectResult };

export const ensureUserProfile = async (user: User) => {
  try {
    // Check if user profile exists
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);
    
    // Get role from localStorage if provided
    const role = localStorage.getItem('login_role') || 'client';
    localStorage.removeItem('login_role'); // Clear it
    
    if (!userDoc.exists()) {
      // Create profile with selected role
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: role, 
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        isVerified: false,
        subscriptionTier: 'free'
      });
    }
    return user;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'users');
    throw error;
  }
};

export const logout = () => signOut(auth);
