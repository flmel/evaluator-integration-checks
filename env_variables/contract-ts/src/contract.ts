// Find all our documentation at https://docs.near.org
import { NearBindgen, near } from 'near-sdk-js';

@NearBindgen({})
class EnvVariables {
  // TODO: Add a method 'check_caller_is_bob' that returns true if the caller account_id is 'bob.test.near'

  // TODO: Add a method 'check_caller_is_the_contract' that returns true if the contract is calling itself

  // TODO: Add a method 'get_height' that returns the current execution block height

  // TODO: Add a method 'check_enough_deposit' that returns true if the user deposited more than 1N to the call

  // TODO: Add a method 'check_enough_gas' that returns true if the user attached more than 250TGas to the call
}
