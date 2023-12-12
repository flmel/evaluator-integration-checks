use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{log, near_bindgen};

const DEFAULT_MESSAGE: &str = "Hello";

// Define the contract structure
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Contract {
    greeting: String,
}

impl Default for Contract {
    // The default trait with which to initialize the contract
    fn default() -> Self {
        Self {
            greeting: DEFAULT_MESSAGE.to_string(),
        }
    }
}

// Implement the contract structure
#[near_bindgen]
impl Contract {
    // TODO: Add a public function `get_greeting` that returns the stored greeting from the contracts state

    // TODO: Add a public function `set_greeting` Takes a `greeting (String)` as a parameter, such as 'howdy', and saves it to the contracts state
}
