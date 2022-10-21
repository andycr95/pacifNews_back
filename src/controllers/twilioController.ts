const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
import tw from "twilio";

const client = tw(accountSid, authToken);

export default class TwilioController {
    public static async sendSMS(argument: any): Promise<any | unknown> {
        const message = await client.messages.create({
            body: argument.body,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: argument.to,
        });

        return message;
    }
    
}