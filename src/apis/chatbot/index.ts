import axios from "axios";

export class ChatbotApi {
  static async getMessageRes(message: string): Promise<string> {
    const url = process.env.NEXT_PUBLIC_COZE_URL || "";
    const botId = process.env.NEXT_PUBLIC_BOT_ID || "";
    const res =  await axios.post(
      url,
      {
        bot_id: botId,
        user: "binh",
        query: message,
        stream: false,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_COZE_TOKEN}`,
        },
      }
    );
    if(res.status == 200) {
      return res.data.messages[1].content;
    }
    else return "I don't understand!"
    

  }
}
