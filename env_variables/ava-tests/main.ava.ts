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

test('check_predecessor returns true when called by specific accountId', async (t) => {
  const { contract, bob } = t.context.accounts;
  const result = await bob.call(contract, 'check_predecessor', {});

  t.is(result, true);
});

test('check_predecessor returns false when called by non-expected accountId', async (t) => {
  const { contract, bob } = t.context.accounts;
  const result = await contract.call(contract, 'check_predecessor', {});

  t.is(result, false);
});

test('get_block_height returns correct height', async (t) => {
  const { root, contract } = t.context.accounts;
  const rawResult = await contract.viewRaw('get_height');

  let returnedHeight = JSON.parse(rawResult.result.map((x) => String.fromCharCode(x)).join(''));

  t.is(true, returnedHeight == rawResult.block_height);
});

test('check_deposit returns true when deposit is greater than 1N', async (t) => {
  const { contract, bob } = t.context.accounts;
  const result = await bob.call(contract, 'check_deposit', {}, { attachedDeposit: '1000000000000000000000000' });

  t.is(result, true);
});

test('check_deposit returns false when deposit is less than 1N', async (t) => {
  const { contract, bob } = t.context.accounts;
  const result = await bob.call(contract, 'check_deposit', {}, { attachedDeposit: '500000000000000000000000' });

  t.is(result, false);
});
