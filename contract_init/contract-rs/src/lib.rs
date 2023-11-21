use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::env::log_str;
use near_sdk::near_bindgen;

// TODO: Derive a macro to enforce initialization
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Contract {
    greeting: String,
}

#[near_bindgen]
impl Contract {

    // TODO: Add initialization method called 'init' that accepts (greeting: string) and returns Self

    pub fn get_greeting(&self) -> String {
        return self.greeting.clone();
    }

    pub fn set_greeting(&mut self, greeting: String) {
        self.greeting = greeting;
    }
}
