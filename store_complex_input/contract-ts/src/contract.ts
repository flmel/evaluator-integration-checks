// Find all our documentation at https://docs.near.org
import { NearBindgen, view, call, Vector, AccountId } from 'near-sdk-js';
import { MockReturn, MockStructure, Point } from './models';

@NearBindgen({})
class Contract {
  vector: Vector<MockReturn> = new Vector<MockReturn>("mr");

  @call({})
  store_input({ account_id, number_big, number_small, point }: {
    account_id: AccountId,
    number_big: string,
    number_small: number,
    point: Point
  }): MockReturn {

    const mock = new MockReturn({
      account: account_id,
      x: point.x,
      structure: new MockStructure({
        big: BigInt(number_big),
        small: number_small,
        vector: [number_big.toString(), '42']
      })
    });

    this.vector.push(mock);


    return mock;
  }
}
