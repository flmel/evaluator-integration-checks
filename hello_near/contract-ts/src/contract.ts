// Find all documentation at https://docs.near.org
import { NearBindgen } from 'near-sdk-js';

@NearBindgen({})
class Contract {
  greeting: string = "Hello";
  // TODO: Add a public function `get_greeting` that returns the current greeting from contracts state

  // TODO: Add a public function `set_greeting` that takes a string argument `greeting` and sets the contracts state to that value
}
