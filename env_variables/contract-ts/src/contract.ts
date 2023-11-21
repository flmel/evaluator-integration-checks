// Find all our documentation at https://docs.near.org
import { NearBindgen } from 'near-sdk-js';

@NearBindgen({})
class HelloNear {
  // 1. Add a method 'check_caller_is_bob' that returns true if the caller account_id is 'bob.test.near'

  // 2. Add a method 'check_caller_is_the_contract' that returns true if the contract is calling itself

  // 2. Add a method 'get_height' that returns the current execution block height

  // 3. Add a method 'check_enough_deposit' that returns true if the user deposited more than 1N to the call

  // 4. Add a method 'check_enough_gas' that returns true if the user attached more than 250TGas to the call
}
