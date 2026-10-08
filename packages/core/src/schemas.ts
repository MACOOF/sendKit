import { z } from "zod"

export const telegramMessageInputSchema = z.object({
  chatId: z.coerce.number().min(1,"chatId should be greater then 0"),
  message: z.string().min(1,"length of message should be greater then 0")
});

export type telegramMessageInput = z.infer<typeof telegramMessageInputSchema>;

export const telegramMessageOptionSchema = telegramMessageInputSchema.extend({
  botToken: z.string().min(1,"length of botToken should be greater then 0")
});

export type telegramMessageOption = z.infer<typeof telegramMessageOptionSchema>;

export const telegramSendMessageRequestSchema = z.object({
  chat_id: z.coerce.string().min(1,"length of chat_id should be greater then 0"),
  text: z.string().min(1,"length of text should be greater then 0")
});

export const telegramSendMessageResponseSchema = z.object({
  ok: z.boolean(),
  result: z.object({
    message_id: z.number()
  }).optional(),
  description : z.string().optional()
});

export const telegramSendMessageOutputSchema = z.object({
  ok: z.literal(true),
  chatId: z.coerce.number(),
  messageId: z.number()
});


export type telegramSendMessageOutput = z.infer<typeof telegramSendMessageOutputSchema>;