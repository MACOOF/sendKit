import { Command } from "commander";
import { telegramApi } from "./api";

const program = new Command();

program
  .name("sendkit")
  .description("SendKit CLI")
  .version("0.0.0")
  .command("telegram")
  .description("Send a telegram message")
  .argument("<chatId>", "telegram chat id")
  .argument("<message>", "message to send")
  .action(async (chatId: string, message: string) => {
    console.log("Chat ID:", chatId);
    console.log("Message:", message);

    const token = process.env.TELEGRAM_BOT_TOKEN;
    if(!token){
      console.error("NO Token Found!!");
      process.exit(1);
    }

    if(!chatId){
      console.error("NO chatId is Provided!!");
      process.exit(1);
    }

    if(!message){
      console.error("NO message is Provided!!");
      process.exit(1);
    }

    const result = await telegramApi(token,chatId,message);

    if(!result.ok){
      const detail = result.description;
      console.error(`Failed to Send Message. ${detail}`);
      process.exit(1);
    }

    const messageId = result.result?.message_id;

    console.log(`Message Sent Successfully to chat ${chatId} : ${messageId}`)
  });

program.parseAsync(process.argv);
