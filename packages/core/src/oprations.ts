import z from "zod";
import {
  telegramMessageInputSchema,
  type telegramMessageInput,
  type telegramMessageOption,
  telegramMessageOptionSchema,
  type telegramSendMessageOutput,
  telegramSendMessageOutputSchema,
  telegramSendMessageRequestSchema,
  telegramSendMessageResponseSchema
} from "./schemas";


export async function sendTelegramMessage(
  input: telegramMessageOption
) : Promise<telegramSendMessageOutput> {
  const parsedInput = telegramMessageOptionSchema.parse(input);

  const requestBody = telegramSendMessageRequestSchema.parse({
    chat_id: input.chatId,
    text: input.message
  });

  const response = await fetch(`https://api.telegram.org/bot${parsedInput.botToken}/sendMessage`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(requestBody)
  });

  const data = telegramSendMessageResponseSchema.parse(await response.json());

  if(!data.ok || !data.result){
    throw new Error(data.description || "Telegram message request failed");
  }
  
  return telegramSendMessageOutputSchema.parse({
    ok:true,
    chatId: parsedInput.chatId,
    messageId: data.result.message_id
  });
}