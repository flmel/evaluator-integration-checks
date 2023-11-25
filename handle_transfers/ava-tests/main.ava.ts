import { Worker, NearAccount, NEAR } from 'near-workspaces';
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
  const contract = await root.createSubAccount('test-account', { initialBalance: NEAR.parse('10 N').toString() });
  const donor = await root.createSubAccount('donor', { initialBalance: NEAR.parse('10 N').toString() });

  // Get wasm file path from package.json test script in folder above
  await contract.deploy(
    process.argv[2],
  );

  // initialize the contract
  await contract.call(contract, 'init', { donated_amount: '0', donation_goal: NEAR.parse('5 N').toString() }, {});

  // Save state for test runs, it is unique for each test
  t.context.worker = worker;
  t.context.accounts = { root, donor, contract };
});

test.afterEach.always(async (t) => {
  // Stop Sandbox server
  await t.context.worker.tearDown().catch((error) => {
    console.log('Failed to stop the Sandbox:', error);
  });
});

test('get_amount_donated returns initial amount of 0', async (t) => {
  const { contract } = t.context.accounts;
  const initialDonationAmount = await contract.view('get_amount_donated', {});

  t.is(true, initialDonationAmount == 0, 'Initial donated amount should be 0');
});

test('get_amount_donated returns correct amount after donation', async (t) => {
  const { root, contract } = t.context.accounts;
  const donationAmount = NEAR.parse('1 N').toBigInt();

  await root.callRaw(contract, 'donate', {}, { attachedDeposit: donationAmount.toString() });
  const postDonationAmount: bigint = await contract.view('get_amount_donated', {});

  t.true(BigInt(donationAmount) == postDonationAmount, 'Donated amount should be 1 N');
})

test('donate returns the exceeded funds upon reaching the donation_goal', async (t) => {
  const { donor, contract } = t.context.accounts;
  const initialDonorBalance = await donor.availableBalance();

  let result = await donor.callRaw(contract, 'donate', {}, { attachedDeposit: NEAR.parse('6 N').toString() });

  const postDonationDonorBalance = await donor.availableBalance();
  const postDonationAmount: bigint = await contract.view('get_amount_donated', {});

  const tokensBurnt = result.outcomes.reduce((amount, outcome) => BigInt(outcome.tokens_burnt) + amount, BigInt(0));
  const expectedBalance = initialDonorBalance.toBigInt() - NEAR.parse('5 N').toBigInt() - tokensBurnt;

  t.is(BigInt(postDonationAmount), NEAR.parse('5 N').toBigInt());
  t.true(postDonationDonorBalance.toBigInt() === expectedBalance);
});
