// Find all documentation at https://docs.near.org
import { NearBindgen, Vector } from 'near-sdk-js'

const POINT_ONE = '100000000000000000000000';

class PostedMessage {
  premium: boolean;
  sender: string;
  text: string;

  constructor({ premium, sender, text }: PostedMessage) {
    this.premium = premium;
    this.sender = sender;
    this.text = text;
  }
}

@NearBindgen({})
class Contract {
  messages: Vector<PostedMessage> = new Vector<PostedMessage>("v-uid");

  // TODO: Add a payable function `add_message` that adds a new message to the state.
  //       The function should accept a single parameter `text` that is a string.
  //       If the user attaches more than 0.1N the message should be premium.

  // TODO: Add a view function `get_messages` that returns an array of messages.
  //       The function should accept two parameters `from_index` and `limit`.
  //       The function should return an array of PostedMessage starting from `from_index` with length `limit`.

  // TODO: Add a view function `total_messages` that returns the total number of messages.
}
