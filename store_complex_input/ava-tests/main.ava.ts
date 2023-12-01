import * as borsh from 'borsh';
import { Worker, NearAccount } from 'near-workspaces';
import anyTest, { TestFn } from 'ava';

const test = anyTest as TestFn<{
  worker: Worker;
  accounts: Record<string, NearAccount>;
}>;

test.beforeEach(async (t) => {
  // Init the worker and start a Sandbox server
  const worker = await Worker.init();

  // Deploy contract
  const root = worker.rootAccount;
  const contract = await root.createSubAccount('test-account');
  // Get wasm file path from package.json test script in folder above
  await contract.deploy(
    process.argv[2],
  );

  // Save state for test runs, it is unique for each test
  t.context.worker = worker;
  t.context.accounts = { root, contract };
});

test.afterEach.always(async (t) => {
  // Stop Sandbox server
  await t.context.worker.tearDown().catch((error) => {
    console.log('Failed to stop the Sandbox:', error);
  });
});

const schema = {
  struct: {
    account: 'string',
    x: 'i32',
    structure: {
      struct: {
        big: 'u64',
        small: 'u8',
        'vector': { array: { type: 'u64' } }
      }
    }
  }
}

const inputArgs = {
  account_id: 'evaluator.near',
  number_big: '3298749238747777',
  number_small: 231,
  point: {
    x: 19,
    y: 6,
  }
}

const expectedOutput = {
  account: 'evaluator.near',
  x: 19,
  structure: {
    big: 3298749238747777,
    small: 231,
    vector: ['3298749238747777', '42']
  }
}

test('provide_output returns the correct data structure', async (t) => {
  const { contract } = t.context.accounts;
  const output = await contract.call(contract, 'provide_output', inputArgs);

  t.deepEqual(output, expectedOutput);
});


test('provide_output stores the correct data structure', async (t) => {
  const { contract } = t.context.accounts;
  await contract.call(contract, 'provide_output', inputArgs);

  const state = await contract.viewState();
  const data = state.getRaw('STATE');

  const storedStruct: any = borsh.deserialize(schema, data);

  const { structure: { big, vector } } = expectedOutput;
  const typedOutput = {
    ...expectedOutput,
    structure: {
      ...expectedOutput.structure,
      big: BigInt(big),
      vector: vector.map(value => BigInt(value))
    }
  };

  t.deepEqual(storedStruct, typedOutput);
});
