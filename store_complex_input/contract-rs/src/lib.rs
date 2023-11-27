// Find all our documentation at https://docs.near.org
use near_sdk::{
    borsh::{self, BorshDeserialize, BorshSerialize},
    near_bindgen,
};

// TODO: Add all the data structures necessary

// TODO: Make sure you store your data structures in the contract storage
#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]
pub struct Contract {}

// TODO: Implement default for contract and initialize mock_return

#[near_bindgen]
impl Contract {
    // TODO: Add function `provide_output` that takes input: {account_id: AccountId, number_big: U64, number_small: u8, point: {x: u8, y: u8}}
    // The function should store and return the following structure:
    // {account: string, x: point.x, nested: {big: number_big, small: number_small, vector: [number_big , 42]: [U64; 2] }}
}
