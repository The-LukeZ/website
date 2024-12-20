// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      loggedIn: boolean;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }

  namespace DBModels {
    interface Location {
      _id: string;
      name: string;
      address: string;
      city: string;
      postalCode: string;
      province: string;
      country: string;
    }
  }
}

export {};
