import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Instagram, ShoppingBag, TimerReset } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

/**
 * Upshutin – Under Construction / Coming Soon
 * Countdown target:
 *   3 months from September 1, 2025 → November 24, 2025
 */

function useCountdown(targetDate: Date) {
  const calc = () => {
    const now = new Date().getTime();
    const target = targetDate.getTime();
    const distance = Math.max(target - now, 0);

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return { distance, days, hours, minutes, seconds };
  };

  const [state, setState] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => setState(calc()), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return state;
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

const App = () => {
  // const router = useRouter();

  // Preview route with password protection
  // useEffect(() => {
  //     if (router.pathname === "/preview") {
  //         const pwd = prompt("Enter preview password");
  //         if (pwd !== process.env.NEXT_PUBLIC_PREVIEW_PASSWORD) {
  //             alert("Unauthorized");
  //             router.push("/");
  //         }
  //     }
  // }, [router]);

  // Target: 3 months from September 10, 2025 → December 10, 2025
  const target = useMemo(() => new Date("2025-11-24T00:00:00"), []);
  const start = useMemo(() => new Date("2025-08-01T00:00:00"), []);
  const { days, hours, minutes, seconds } = useCountdown(target);

  const total = target.getTime() - start.getTime();
  const elapsed = Math.min(
    Math.max(new Date().getTime() - start.getTime(), 0),
    total,
  );
  const pct = total > 0 ? (elapsed / total) * 100 : 0;

  // const [email, setEmail] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [success, setSuccess] = useState(false);
  // const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  // async function handleNotify() {
  //   if (!email || !captchaToken) {
  //     alert("Please complete the CAPTCHA before submitting.");
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     const res = await fetch("/api/notify", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email, captchaToken }),
  //     });

  //     if (res.ok) {
  //       alert("Thanks! You’ll be notified when we launch.");
  //     } else {
  //       alert("Something went wrong. Try again later.");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //     setSuccess(true);
  //   }
  // }

  return (
    <div className="bg-black min-h-screen w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black text-slate-100 flex items-center justify-center p-6">
      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-3xl"
      >
        <div className="mb-8 flex items-center gap-3">
          <div className="grid size-11 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
            <ShoppingBag className="size-6" />
          </div>
          <div>
            <p className="uppercase tracking-widest text-xs text-white/60">
              Brand
            </p>
            <h1 className="text-3xl font-extrabold tracking-tight">Upshutin</h1>
          </div>
        </div>

        <Card className="border-white/10 bg-white/5 backdrop-blur-md shadow-none shadow-black/40">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-xl">
              <TimerReset className="size-5" />
              Under construction • Coming soon
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-2">
            <p className="text-white/70 mb-6">
              We’re crafting a shopping experience with taste. Stay tuned while
              we put the final polish on the new
              <span className="font-semibold"> upshutin</span> storefront.
            </p>

            {/* Countdown */}
            <div className="grid grid-cols-4 gap-3 sm:gap-4">
              {[
                { label: "Days", value: days },
                { label: "Hours", value: hours },
                {
                  label: "Minutes",
                  value: minutes,
                },
                { label: "Seconds", value: seconds },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-2xl border border-white/10 bg-black/30 p-4 text-center"
                >
                  <div className="text-3xl text-white font-black tabular-nums leading-none">
                    {pad(item.value)}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-white/60">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Progress */}
            <div className="mt-6">
              <div className="flex justify-between text-xs text-white/60 mb-2">
                <span>Launch progress</span>
                <span>{pct.toFixed(0)}%</span>
              </div>
              <Progress value={pct} className="h-2 bg-white/10" />
              <div className="mt-2 text-xs text-white/50">
                Launch target:{" "}
                <span className="font-medium text-white/80">
                  November 24, 2025
                </span>
              </div>
            </div>

            {/* Notify form */}
            {/*<div className="mt-8 flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/50" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Get notified when we launch"
                    className="pl-10 h-11 rounded-2xl border-white/10 bg-black/30 text-white placeholder:text-white/40"
                  />
                </div>
                <Turnstile
                  sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                  onVerify={(token) => setCaptchaToken(token)}
                />
                <Button
                  className="h-11 rounded-2xl"
                  onClick={handleNotify}
                  disabled={loading || success || !captchaToken}
                >
                  {success
                    ? "Subscribed"
                    : loading
                      ? "Sending..."
                      : "Notify me"}
                </Button>
              </div>
              <div id="cf-turnstile" className="w-full" />
            </div>*/}

            {/* Socials */}
            <div className="mt-6 flex items-center gap-4 text-white/70">
              <a
                href="https://www.instagram.com/upshutinwears"
                className="inline-flex items-center gap-2 hover:text-white/90 transition-colors text-sm"
              >
                <Instagram className="size-4" />
                Instagram
              </a>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Upshutin. All rights reserved.</p>

          <p>
            Built with ❤ by the tech folks @{" "}
            <span className="font-medium text-white/70">
              TechFusion Studios
            </span>
          </p>
        </div>
      </motion.main>
    </div>
  );
};

export default App;
