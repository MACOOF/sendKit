import { TelegramResponse } from "./types";


export const telegramApi = async(token:string,chatId:string,message:string):Promise<TelegramResponse> => {
  try{
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`,{
      method:"POST",
      headers:{
        "content-type": "application/json"
      },
      body:JSON.stringify({
        chat_id:chatId,
        text:message
      })
    });

    const data = await response.json() as TelegramResponse;

    return data;
  }catch(error){
    console.error("Error in TelegramApi: ",error);

    return {
      ok: false
    };
  }
}