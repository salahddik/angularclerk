import { bootstrapApplication } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { Clerk } from '@clerk/clerk-js';

if (environment.production) {
  enableProdMode();
}

(async () => {
  const clerk = new Clerk(environment.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  try {
    await clerk.load();
    console.log('Clerk initialized successfully!');
    await bootstrapApplication(AppComponent, appConfig);
  } catch (error) {
    console.error('Error initializing Clerk:', error);
  }
})();
