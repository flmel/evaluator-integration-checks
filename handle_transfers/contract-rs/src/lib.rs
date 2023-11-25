// Find all our documentation at https://docs.near.org
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::json_types::U128;
use near_sdk::{near_bindgen, Balance, PanicOnDefault};

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    donated_amount: Balance,
    donation_goal: Balance,
}

#[near_bindgen]
impl Contract {
    #[init]
    pub fn init(donated_amount: U128, donation_goal: U128) -> Self {
        Self {
            donated_amount: donated_amount.0,
            donation_goal: donation_goal.0,
        }
    }

    // TODO: Add function `donate` that accepts deposits and keeps track of the amount donated
    // if the deposit exceeds the donation goal, the function should return the excess to the sender

    pub fn get_amount_donated(&self) -> U128 {
        U128(self.donated_amount)
    }
}
