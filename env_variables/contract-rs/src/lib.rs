// Find all our documentation at https://docs.near.org
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::near_bindgen;
use near_sdk::{env, AccountId, ONE_NEAR};
// Define the contract structure
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Contract {}

// Define the default, which automatically initializes the contract
impl Default for Contract {
    fn default() -> Self {
        Self {}
    }
}

// Implement the contract structure
#[near_bindgen]
impl Contract {
    // 1. Add a method 'check_predecessor' that returns true if the predecessor account_id is 'bob.test.near'

    // 2. Add a method 'get_height' that returns the current execution block height}

    // 3. Add a method 'check_deposit' that returns true if the attached deposit is greater than 1N
}
