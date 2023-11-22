use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{near_bindgen, PanicOnDefault};

// TODO: Derive a macro to enforce initialization
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    greeting: String,
}

#[near_bindgen]
impl Contract {
    // TODO: Add initialization function called 'init' that accepts (greeting: string) and returns Self and sets the state with this value

    pub fn get_greeting(&self) -> String {
        return self.greeting.clone();
    }

    pub fn set_greeting(&mut self, greeting: String) {
        self.greeting = greeting;
    }
}
