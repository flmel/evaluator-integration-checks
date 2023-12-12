// Find all documentation at https://docs.near.org
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::Vector;
use near_sdk::json_types::U128;
use near_sdk::serde::Serialize;
use near_sdk::{env, near_bindgen, AccountId, Balance};

const POINT_ONE: Balance = 100_000_000_000_000_000_000_000;

#[derive(BorshDeserialize, BorshSerialize, Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct PostedMessage {
    pub premium: bool,
    pub sender: AccountId,
    pub text: String,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
struct GuestBook {
    messages: Vector<PostedMessage>,
}

impl Default for GuestBook {
    fn default() -> Self {
        Self {
            messages: Vector::new(b"m"),
        }
    }
}

#[near_bindgen]
impl Contract {
    // TODO: Add a [payable] function `add_message` that takes a text (String) as argument and stores it in the messages vector in the contract state.
    //       If the user attaches more than 0.01N the message should be premium.

    // TODO: Add a function `get_messages` that returns a list of messages from the contract state.
    //       The function should take two optional arguments: `from_index` and `limit`. to implement pagination.
    //       The function should return a list of messages starting from `from_index` and up to `limit` number of messages.

    // TODO: Add a function `total_messages` that returns the total number of messages in the contract state.
}
