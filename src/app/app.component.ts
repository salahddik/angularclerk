import {AfterViewInit, Component, ElementRef} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Clerk } from '@clerk/clerk-js';
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  clerk = new Clerk(environment.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  constructor(private elementRef: ElementRef) {}

  async ngAfterViewInit() {
    try {
      // Load Clerk
      await this.clerk.load();

      // Get HTMLDivElements for Clerk components
      const signInDiv = this.elementRef.nativeElement.querySelector('#sign-in') as HTMLDivElement;
      const signUpDiv = this.elementRef.nativeElement.querySelector('#sign-up') as HTMLDivElement;

      // Mount Clerk components
      this.clerk.mountSignIn(signInDiv);
      this.clerk.mountSignUp(signUpDiv);
    } catch (error) {
      console.error('Error loading Clerk components:', error);
    }
  }
}
