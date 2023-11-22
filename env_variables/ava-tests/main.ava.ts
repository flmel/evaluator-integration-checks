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
  const bob = await root.createSubAccount('bob');
  // Get wasm file path from package.json test script in folder above
  await contract.deploy(
    process.argv[2],
  );

  // Save state for test runs, it is unique for each test
  t.context.worker = worker;
  t.context.accounts = { root, contract, bob };
});

test.afterEach.always(async (t) => {
  // Stop Sandbox server
  await t.context.worker.tearDown().catch((error) => {
    console.log('Failed to stop the Sandbox:', error);
  });
});

test('check_caller_is_bob returns true when called by specific accountId', async (t) => {
  const { contract, bob } = t.context.accounts;
  const result = await bob.call(contract, 'check_caller_is_bob', {});

  t.is(result, true);
});

test('check_caller_is_bob returns false when called by non-expected accountId', async (t) => {
  const { contract, bob } = t.context.accounts;
  const result = await contract.call(contract, 'check_caller_is_bob', {});

  t.is(result, false);
});

test('check_caller_is_the_contract returns true when called by the contracts own accountId', async (t) => {
  const { contract } = t.context.accounts;
  const result = await contract.call(contract, 'check_caller_is_the_contract', {});

  t.is(result, true);
});

test('check_caller_is_the_contract returns false when called by non-expected accountId', async (t) => {
  const { contract, bob } = t.context.accounts;
  const result = await bob.call(contract, 'check_caller_is_the_contract', {});

  t.is(result, false);
});

test('get_height returns correct block height', async (t) => {
  const { root, contract } = t.context.accounts;
  const rawResult = await contract.viewRaw('get_height');

  const returnedHeight = JSON.parse(rawResult.result.map((x) => String.fromCharCode(x)).join(''));

  t.is(true, returnedHeight == rawResult.block_height);
});

test('check_enough_deposit returns true when deposit is greater than 1N', async (t) => {
  const { contract, bob } = t.context.accounts;
  const result = await bob.call(contract, 'check_enough_deposit', {}, { attachedDeposit: '1000000000000000000000000' });

  t.is(result, true);
});

test('check_enough_deposit returns false when deposit is less than 1N', async (t) => {
  const { contract, bob } = t.context.accounts;
  const result = await bob.call(contract, 'check_enough_deposit', {}, { attachedDeposit: '500000000000000000000000' });

  t.is(result, false);
});

test('check_enough_gas returns true when gas is greater than 250TGas', async (t) => {
  const { contract, bob } = t.context.accounts;
  const result = await bob.call(contract, 'check_enough_gas', {}, { gas: '260000000000000' });

  t.is(result, true);
});

test('check_enough_gas returns false when gas is less than 250TGas', async (t) => {
  const { contract, bob } = t.context.accounts;
  const result = await bob.call(contract, 'check_enough_gas', {}, { gas: '100000000000000' });

  t.is(result, false);
});
