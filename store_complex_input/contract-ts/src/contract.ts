// Find all our documentation at https://docs.near.org
import { NearBindgen, view, call, Vector, AccountId } from 'near-sdk-js';
import { MockReturn, MockStructure, Point } from './models';

@NearBindgen({})
class Contract {
  vector: Vector<MockReturn> = new Vector<MockReturn>("mr");

  @call({})
  store_input({ account, number_big, number_small, point }: {
    account: AccountId,
    number_big: string,
    number_small: number,
    point: Point
  }): MockReturn {

    let vec = new Vector<BigInt>("vec");
    vec.push(BigInt(1));
    vec.push(BigInt(2));

    const mock = new MockReturn({
      account,
      x: point.x,
      structure: new MockStructure({
        big: BigInt(number_big),
        small: number_small,
        vector: vec,
      })
    });

    this.vector.push(mock);


    return mock;
  }

  // Get the answer (public)
  @view({})
  get_data(): Array<MockReturn> {
    return this.vector.toArray();
  }
}
