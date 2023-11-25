// Find all our documentation at https://docs.near.org
import { NearBindgen, view, initialize, } from 'near-sdk-js';

@NearBindgen({ requireInit: true })
class Contract {
  donatedAmount: bigint = BigInt(0);
  donationGoal: bigint = BigInt(0);

  @initialize({ privateFunction: true })
  init({ donated_amount, donation_goal }: { donated_amount: string, donation_goal: string }): void {
    this.donatedAmount = BigInt(donated_amount)
    this.donationGoal = BigInt(donation_goal)
  }

  // TODO: Add function `donate` that accepts deposits and keeps track of the amount donated
  // if the deposit exceeds the donation goal, the function should return the excess to the sender

  @view({})
  get_amount_donated(): string {
    return this.donatedAmount.toString();
  }
}
