import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { readRequiredEnv } from "@/utils/env";

interface FirebaseClientConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export function getFirebaseClientConfig(): FirebaseClientConfig {
  return {
    apiKey: readRequiredEnv("NEXT_PUBLIC_FIREBASE_API_KEY"),
    authDomain: readRequiredEnv("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"),
    projectId: readRequiredEnv("NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
    storageBucket: readRequiredEnv("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"),
    messagingSenderId: readRequiredEnv("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"),
    appId: readRequiredEnv("NEXT_PUBLIC_FIREBASE_APP_ID"),
  };
}

export function getFirebaseClientApp(): FirebaseApp {
  if (getApps().length > 0) {
    return getApp();
  }

  return initializeApp(getFirebaseClientConfig());
}
