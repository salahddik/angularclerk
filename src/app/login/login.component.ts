import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {Clerk} from "@clerk/clerk-js";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements AfterViewInit {
  clerk: Clerk;

  constructor(private elementRef: ElementRef) {
    // Initialize Clerk with your publishable key
    this.clerk = new Clerk(environment.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  }

  async ngAfterViewInit() {
    try {
      // Load Clerk and wait for the initialization
      await this.clerk.load();

      const appDiv = this.elementRef.nativeElement.querySelector('#app') as HTMLDivElement;

      if (this.clerk.user) {
        // If the user is authenticated, render the user button
        appDiv.innerHTML = `
          <div id="user-button"></div>
        `;
        const userButtonDiv = appDiv.querySelector('#user-button') as HTMLDivElement;
        this.clerk.mountUserButton(userButtonDiv);
      } else {
        // If no user is authenticated, render the sign-in button
        appDiv.innerHTML = `
          <div id="sign-in"></div>
        `;
        const signInDiv = appDiv.querySelector('#sign-in') as HTMLDivElement;
        this.clerk.mountSignIn(signInDiv);
      }
    } catch (error) {
      console.error('Error loading Clerk:', error);
    }
  }
}
