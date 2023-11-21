import { NearBindgen, near, call, view, initialize } from 'near-sdk-js';

// Change the decorator to enforce initialization
@NearBindgen({})
class HelloNear {
  greeting: string;

  // Add initialization method called 'init' that accepts (greeting: string) and sets the state

  @view({})
  get_greeting(): string {
    return this.greeting;
  }

  @call({})
  set_greeting({ greeting }: { greeting: string }): void {
    near.log(`Saving greeting ${greeting}`);
    this.greeting = greeting;
  }
}
