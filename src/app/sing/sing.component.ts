import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {Clerk} from "@clerk/clerk-js";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-sing',
  standalone: true,
  imports: [],
  templateUrl: './sing.component.html',
  styleUrl: './sing.component.css'
})

export class SingComponent implements AfterViewInit {
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

