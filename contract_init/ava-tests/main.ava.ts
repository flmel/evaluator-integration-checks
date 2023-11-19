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

test('init initializes the greeting', async (t) => {
  const { root, contract } = t.context.accounts;
  await root.call(contract, 'init', { greeting: 'Hello World!' });
  const greeting: string = await contract.view('get_greeting', {});

  t.is(greeting, 'Hello World!');
});

test('init fails to reinitialize the greeting', async (t) => {
  const { root, contract } = t.context.accounts;
  await root.call(contract, 'init', { greeting: 'Hello World!' });
  const resultError: any = await contract.callRaw(contract, 'init', { greeting: 'Greetings to the  World!' });

  t.is(checkResultError(resultError), true);
});

test('get_greeting returns the default greeting', async (t) => {
  const { contract } = t.context.accounts;
  const greeting: string = await contract.view('get_greeting', {});

  t.is(greeting, 'Hello');
});

test('set_greeting changes the greeting', async (t) => {
  const { root, contract } = t.context.accounts;
  await root.call(contract, 'set_greeting', { greeting: 'Howdy' });
  const greeting: string = await contract.view('get_greeting', {});

  t.is(greeting, 'Howdy');
});

function checkResultError(result: any): boolean {
  if (result.receiptFailureMessagesContain('Smart contract panicked: Contract already initialized')) {
    return true;
  } else {
    return result.receiptFailureMessagesContain('The contract has already been initialized');
  }
}
