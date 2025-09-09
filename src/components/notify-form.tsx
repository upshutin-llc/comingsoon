import React, {useState} from "react";
import Turnstile from "react-turnstile";

export default function NotifyForm() {
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!captchaToken) {
            alert("Please complete the CAPTCHA before submitting.");
            return;
        }

        const res = await fetch("/api/notify", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: (e.target as any).email.value,
                token: captchaToken,
            }),
        });

        if (res.ok) {
            alert("Thanks! You’ll be notified when we launch.");
        } else {
            alert("Something went wrong. Try again later.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="p-2 border rounded-md w-full"
            />
            <Turnstile
                sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                onVerify={(token) => setCaptchaToken(token)}
            />
            <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
            >
                Notify Me
            </button>
        </form>
    );
}
