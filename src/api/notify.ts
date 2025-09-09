// // /pages/api/notify.ts
// // Handles email subscription via Resend + Cloudflare Turnstile validation
// //
import {Resend} from "resend";

const resend = new Resend(process.env.VITE_RESEND_API_KEY);

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();
    const {email, captchaToken} = req.body;
    if (!email || !captchaToken) return res.status(400).json({error: "Missing data"});

    // Verify Cloudflare Turnstile
    const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: `secret=${process.env.CF_SECRET_KEY}&response=${captchaToken}`,
    });
    const outcome = await verify.json();
    if (!outcome.success) return res.status(400).json({error: "Captcha failed"});

    try {
        await resend.emails.send({
            from: "upshutin <no-reply@upshutin.com>",
            to: email,
            subject: "Thanks for subscribing!",
            html: `<p>We’ll notify you when Upshutin launches 🎉</p>`,
        });
        res.status(200).json({ok: true});
    } catch (err) {
        res.status(500).json({error: "Failed to send email"});
    }
}