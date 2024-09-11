import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { firebaseProjectConfig } from './shared/config/firebase-project';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp(firebaseProjectConfig))),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    {
      provide: FIREBASE_OPTIONS, useValue: firebaseProjectConfig
    }
  ]
};
