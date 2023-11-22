// Find all our documentation at https://docs.near.org
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::near_bindgen;

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Contract {}

impl Default for Contract {
    fn default() -> Self {
        Self {}
    }
}

#[near_bindgen]
impl Contract {
    // TODO: Add a method 'check_caller_is_bob' that returns true if the caller account_id is 'bob.test.near'

    // TODO: Add a method 'check_caller_is_the_contract' that returns true if the contract is calling itself

    // TODO: Add a method 'get_height' that returns the current execution block height

    // TODO: Add a method 'check_enough_deposit' that returns true if the user deposited more than 1N to the call

    // TODO: Add a method 'check_enough_gas' that returns true if the user attached more than 250TGas to the call
}
