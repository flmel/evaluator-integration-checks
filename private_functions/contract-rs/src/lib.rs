// Find all our documentation at https://docs.near.org
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::env::log_str;
use near_sdk::near_bindgen;

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Contract {
    answer: u8,
}

impl Default for Contract {
    fn default() -> Self {
        Self { answer: 7 }
    }
}

#[near_bindgen]
impl Contract {
    // Get the answer (public)
    pub fn get_answer(&self) -> u8 {
        log_str(format!("The answer is {}", self.answer).as_str());
        self.answer
    }

    // TODO: Write a internal function "add" that's only callable by the contracts code
    // The function should accept two integers (u8) a and b and returns the sum of the two parameters

    // TODO: Write a public function "get_sum" that accepts two integers (u8) a and b and returns the sum of the two parameters
    // Make use of the internal function "add" that you wrote above

    // TODO: Write a public function "set_answer" that's only callable (private) from the Account ID that the contract has been deployed to
    // The function should set the answer to 42 (self.answer = 42)
}
