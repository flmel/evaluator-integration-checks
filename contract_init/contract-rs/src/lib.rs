// Find all our documentation at https://docs.near.org
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::env::log_str;
use near_sdk::near_bindgen;

// Define the contract structure
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Contract {
    greeting: String,
}

// Define the default, which automatically initializes the contract
impl Default for Contract {
    fn default() -> Self {
        Self {
            greeting: "Hello".to_string(),
        }
    }
}

// Implement the contract structure
#[near_bindgen]
impl Contract {
    // Add initialization method called 'init' that accepts (greeting: string) and returns Self
    #[init]
    pub fn init(greeting: String) -> Self {
        Self { greeting }
    }

    // Public method - returns the greeting saved
    pub fn get_greeting(&self) -> String {
        return self.greeting.clone();
    }

    // Public method - accepts a greeting, such as "howdy", and records it
    pub fn set_greeting(&mut self, greeting: String) {
        log_str(&format!("Saving greeting: {greeting}"));
        self.greeting = greeting;
    }
}
