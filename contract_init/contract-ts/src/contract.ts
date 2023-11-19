// Find all our documentation at https://docs.near.org
import { NearBindgen, near, call, view, initialize } from 'near-sdk-js';

@NearBindgen({})
class HelloNear {
  greeting: string = "Hello";

  // Add initialization method called 'init' that accepts (greeting: string) and sets the state
  @initialize({})
  init({ greeting }: { greeting: string }): void {
    this.greeting = greeting;
  }

  @view({}) // This method is read-only and can be called for free
  get_greeting(): string {
    return this.greeting;
  }

  @call({}) // This method changes the state, for which it cost gas
  set_greeting({ greeting }: { greeting: string }): void {
    near.log(`Saving greeting ${greeting}`);
    this.greeting = greeting;
  }
}
