import { Command } from "commander";
import { telegramApi } from "./api"; 
import { sendTelegramMessage, telegramMessageOptionSchema, telegramSendMessageOutput } from "sendkit-core"


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
    
    const parseData = telegramMessageOptionSchema.safeParse({
      botToken: token,
      chatId: chatId,
      message: message
    });

    if(!parseData.success){
      console.error("Invalid Data:", parseData.error);
      process.exit(1);
    }

    try{
      const result = await sendTelegramMessage(parseData.data);
      console.log(`Message Sent Successfully to chat ${result.chatId} : ${result.messageId}`)
    }catch(error){ 
      const errorMessage = (error instanceof Error) ?error.message: String(error);
      
      console.error("Error in TelegramApi: ",errorMessage);
      
      process.exit(1);
    }
  });

program.parseAsync(process.argv);
