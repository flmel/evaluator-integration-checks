// Find all our documentation at https://docs.near.org
import { NearBindgen, near, call, view, initialize } from 'near-sdk-js';

@NearBindgen({})
class HelloNear {
  // 1. Add a method 'check_predecessor' that returns true if the predecessor account_id is 'bob.test.near'

  // 2. Add a method 'get_height' that returns the current execution block height

  // 3. Add a method 'check_deposit' that returns true if the attached deposit is greater than 1N
}
