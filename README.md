NEAR Evaluator: Integration Checks
==============

> This is a work in progress

This repository contains a set of complimentary challenges to the [NEAR Evaluator](https://github.com/flmel/evaluator). Each challenge is a set of integration tests that are ran against a smart contract you will be writing. The challenges are designed to help you learn how to write smart contracts on NEAR.

---
 
### How to use ?

1. cd into the tests of choice (e.g. `contract_init`)
```
cd contract_init
```
2. Install dependencies 
```
npm install
```
3. Write the smart contract in the language of your choice (Rust, TS)
4. Run the tests scripts 
```
npm run tests-rs
```
or 
```
npm run tests-ts
```


Challenges: 
-
### contract_init
The `contract_init` would require you to explicitly initialize contracts state.
```
// TODO: Derive a macro to enforce initialization
// TODO: Add initialization function called 'init' that accepts (greeting: string) and returns Self and sets the state with this value
```

### env_variables
The `env_variables` would present you with the following challenges.
```
// TODO: Add a function 'check_caller_is_bob' that returns true if the caller account_id is 'bob.test.near'

// TODO: Add a function 'check_caller_is_the_contract' that returns true if the contract is calling itself

// TODO: Add a function 'get_height' that returns the current execution block height

// TODO: Add a function 'check_enough_deposit' that returns true if the user deposited more than 1N to the call

// TODO: Add a function 'check_enough_gas' that returns true if the user attached more than 250TGas to the call
```

### handle_transfers
The `handle_transfers` requires you to build a mock donation contract that handles NEAR transfers.
```
// TODO: Add function `donate` that accepts deposits and keeps track of the amount donated
// if the deposit exceeds the donation goal, the function should return the excess to the sender
```

### private_functions
The `private_functions` would present you with the following challenges.
```
// TODO: Write a internal function "add" that's only callable by the contracts code
// The function should accept two integers (u8) a and b and returns the sum of the two parameters

// TODO: Write a public function "get_sum" that accepts two integers (u8) a and b and returns the sum of the two parameters
// Make use of the internal function "add" that you wrote above

// TODO: Write a public function "set_answer" that's only callable (private) from the Account ID that the contract has been deployed to
// The function should set the answer to 42 (self.answer = 42)
```
