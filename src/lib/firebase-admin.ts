import { initializeApp, getApps, getApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

export function getAdminApp() {
  if (getApps().length > 0) return getApp();
  
  const hasEnvVars = !!process.env.FIREBASE_PRIVATE_KEY;
  const config: any = {
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'mock_bucket'
  };

  if (hasEnvVars) {
    config.credential = cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'mock_project_id',
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL || 'mock@email.com',
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    });
  }

  return initializeApp(config);
}

export const adminDb = () => getFirestore(getAdminApp());
export const adminStorage = () => getStorage(getAdminApp());
