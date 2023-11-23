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
  const contract = await root.createSubAccount('test-account');
  const someDonor = await root.createSubAccount('some-donor');

  root.transfer(contract, NEAR.parse("1 N").toString());
  root.transfer(someDonor, NEAR.parse("10 N").toString());

  // Get wasm file path from package.json test script in folder above
  await contract.deploy(
    process.argv[2],
  );

  // Save state for test runs, it is unique for each test
  t.context.worker = worker;
  t.context.accounts = { root, someDonor, contract };
});

test.afterEach.always(async (t) => {
  // Stop Sandbox server
  await t.context.worker.tearDown().catch((error) => {
    console.log('Failed to stop the Sandbox:', error);
  });
});

test('donate returns the exceeded funds upon reaching the donation_goal', async (t) => {
  const { root, someDonor, contract } = t.context.accounts;

  await root.callRaw(contract, 'donate', {}, { attachedDeposit: NEAR.parse("27 N").toString() });

  // someDonor has initial balance of 10N
  await someDonor.callRaw(contract, 'donate', {}, { attachedDeposit: NEAR.parse("5 N").toString() });

  const postDonationAmount: bigint = await contract.view('get_amount_donated', {});
  let donorBalance = await someDonor.availableBalance();

  t.is(BigInt(postDonationAmount), NEAR.parse("30 N").toBigInt());
  t.true(donorBalance.toBigInt() >= NEAR.parse("5 N").toBigInt()), 'Donor balance should be greater than 5N as the contract has reached the donation goal and returns the exceeded funds';
});

test('get_amount_donated returns initial amount of 0', async (t) => {
  const { contract } = t.context.accounts;
  const initialDonationAmount = await contract.view('get_amount_donated', {});

  t.true(initialDonationAmount == 0, 'Initial donated amount should be 0');
});

test('get_amount_donated returns correct amount after donation', async (t) => {
  const { root, contract } = t.context.accounts;
  const donationAmount = NEAR.parse("10 N").toBigInt();

  await root.callRaw(contract, 'donate', {}, { attachedDeposit: donationAmount.toString() });
  const postDonationAmount: bigint = await contract.view('get_amount_donated', {});

  t.true(donationAmount == postDonationAmount, 'Donated amount should be 10 N');
})
