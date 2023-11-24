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

test("store_input transforms and returns the datastructure", async (t) => {
  const { root, contract } = t.context.accounts;
  const result = await contract.call(contract, 'store_input', {
    account: root.accountId,
    number_big: '1234567890123456789012345678901234567890',
    number_small: 123,
    point: {
      x: 1,
      y: 2,
    }
  });

  console.log(result);
  // t.is(result, true);
});


test('get_data returns the correct datastructure', async (t) => {
  const { contract } = t.context.accounts;



});

