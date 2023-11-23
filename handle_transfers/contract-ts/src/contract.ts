
import { NearBindgen, near, call, view, NearPromise } from 'near-sdk-js';

@NearBindgen({})
class Contract {
  donationGoal = BigInt('30000000000000000000000000');
  donatedAmount = BigInt(0);

  // TODO: Add function `donate` that accepts deposits and keeps track of the amount donated
  // if the deposit exceeds the donation goal, the function should return the excess to the sender


  @view({})
  get_amount_donated(): string {
    return this.donatedAmount.toString()
  }
}
