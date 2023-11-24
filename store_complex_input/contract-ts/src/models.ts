import { AccountId, Vector } from 'near-sdk-js';

export class MockStructure {
  big: bigint;
  small: number;
  vector: Vector<BigInt>;

  constructor({ big, small, vector }: { big: bigint, small: number, vector: Vector<BigInt> }) {
    this.big = big;
    this.small = small;
    this.vector = vector;
  }
}

export class MockReturn {
  account: AccountId;
  x: number;
  structure: MockStructure;

  constructor({ account, x, structure }: { account: string, x: number, structure: MockStructure }) {
    this.account = account;
    this.x = x;
    this.structure = structure;
  }
}

export class Point {
  x: number;
  y: number;

  constructor({ x, y }: { x: number, y: number }) {
    this.x = x;
    this.y = y;
  }
}
