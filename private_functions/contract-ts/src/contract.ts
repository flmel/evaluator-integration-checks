// Find all documentation at https://docs.near.org
import { NearBindgen, view } from 'near-sdk-js';

@NearBindgen({})
class Contract {
  answer: number = 7;

  // Get the answer (public)
  @view({})
  get_answer(): number {
    return this.answer;
  }

  // TODO: Write an internal function "add" that's only callable by the contracts code
  // The function should accept two numbers a and b and returns the sum of the two parameters

  // TODO: Write a public function "get_sum" that accepts two numbers a and b and returns the sum of the two parameters
  // Make use of the internal function "add" that you wrote above

  // TODO: Write a public function "set_answer" that's only callable (private) from the Account ID that the contract has been deployed to
  // The function should set the answer to 42 (self.answer = 42)
}
