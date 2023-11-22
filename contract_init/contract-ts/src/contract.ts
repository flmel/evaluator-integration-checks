import { NearBindgen, near, call, view, } from 'near-sdk-js';

// TODO: Add the decorator to enforce initialization
@NearBindgen({})
class Contract {
  // TODO: Add and initialize a field called 'greeting' of type string

  // TODO: Add initialization function called 'init' that accepts (greeting: string) and sets the state with this value

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
