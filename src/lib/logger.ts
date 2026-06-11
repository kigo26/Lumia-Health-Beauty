import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from './firebase';

export interface ErrorLogData {
  message: string;
  stack?: string;
  componentStack?: string;
  userId?: string;
}

export const logError = async (errorData: ErrorLogData) => {
  try {
    const logsCollection = collection(db, 'logs');
    await addDoc(logsCollection, {
      ...errorData,
      userId: auth.currentUser?.uid || 'anonymous',
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.error('Failed to log error to Firestore:', err);
  }
};

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  
  const errInfo: FirestoreErrorInfo = {
    error: errorMessage,
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
    },
    operationType,
    path
  }
  
  // Log locally
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  
  // Log to Firestore
  logError({
    message: errorMessage,
    stack: error instanceof Error ? error.stack : undefined,
  });
  
  throw new Error(JSON.stringify(errInfo));
}
