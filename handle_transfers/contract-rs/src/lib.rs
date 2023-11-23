use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::env::log_str;
use near_sdk::json_types::U128;
use near_sdk::{env, near_bindgen, Balance, Promise};

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Contract {
    donated_amount: Balance,
    donation_goal: Balance,
}

impl Default for Contract {
    fn default() -> Self {
        Self {
            donated_amount: 0,
            donation_goal: 30000000000000000000000000,
        }
    }
}

#[near_bindgen]
impl Contract {
    // TODO: Add function `donate` that accepts deposits and keeps track of the amount donated
    // if the deposit exceeds the donation goal, the function should return the excess to the sender

    pub fn get_amount_donated(&self) -> U128 {
        U128(self.donated_amount)
    }
}
