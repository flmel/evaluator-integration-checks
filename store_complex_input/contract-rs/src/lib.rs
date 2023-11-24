use near_sdk::{
    borsh::{self, BorshDeserialize, BorshSerialize},
    json_types::U64,
    near_bindgen,
    serde::{Deserialize, Serialize},
    store::Vector,
    AccountId,
};

// #[derive(Serialize, Deserialize, BorshSerialize, BorshDeserialize)]
// #[serde(crate = "near_sdk::serde")]
// pub struct Args {
//     account: AccountId,
//     number_big: U64,
//     number_small: u8,
//     point: Point,
// }

#[derive(Serialize, Deserialize, BorshSerialize, BorshDeserialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct MockStructure {
    big: u64,
    small: u8,
    vector: Vec<u64>,
}

#[derive(Serialize, Deserialize, BorshSerialize, BorshDeserialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct MockReturn {
    account: String,
    x: i32,
    structure: MockStructure,
}

#[derive(Serialize, Deserialize)] //BorshSerialize, BorshDeserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Point {
    x: i32,
    y: i32,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Contract {
    output: MockReturn,
}

impl Default for Contract {
    fn default() -> Self {
        Self {
            output: new MockReturn()
        }
    }
}

#[near_bindgen]
impl Contract {

    // define store input
    // define default 
    //  test 
    pub fn store_input(
        &mut self,
        account_id: AccountId,
        number_big: U64,
        number_small: u8,
        point: Point,
    ) -> MockReturn {
        let number = number_big.0 - 1;

        let mock = MockReturn {
            account: account_id.to_string(),
            x: point.x,
            structure: MockStructure {
                big: number_big,
                small: number_small,
                vector: vec![number_big, U64::from(number)],
            },
        };

        self.vector.push(mock.clone());

        return mock;
        retunr json here 
    }

    pub fn get_data(&self) -> MockReturn {
        return self.output;
    }
}