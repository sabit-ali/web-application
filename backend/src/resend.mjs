import { Resend } from "resend";




const resend = new Resend("re_9kLNUmTS_B9eCPMb6QRGnYa7niYmurKv6");


export const verifyEmailWithResend =async (username,email,verifyCode)=>{
    await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: email,
        subject: "Verification email",
        html: `<strong>it works! ${username} ,code : ${verifyCode}</strong>`,
      });
}

