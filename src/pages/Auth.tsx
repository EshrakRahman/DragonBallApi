import { useState } from "react";
import { LoginForm } from "@/components/auth/login-form";
import { SignupForm } from "@/components/auth/signup-form";
import { cn } from "@/lib/utils";

type AuthMode = "login" | "register";

export default function Auth({ initialMode = "login" }: { initialMode?: AuthMode }) {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        {/* Tab Toggle */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={() => setMode("login")}
            className={cn(
              "text-lg font-semibold pb-2 border-b-2 transition-colors hover:cursor-pointer",
              mode === "login"
                ? "border-black text-black"
                : "border-transparent text-black/40 hover:text-black/60"
            )}
          >
            Login
          </button>
          <button
            onClick={() => setMode("register")}
            className={cn(
              "text-lg font-semibold pb-2 border-b-2 transition-colors hover:cursor-pointer",
              mode === "register"
                ? "border-black text-black"
                : "border-transparent text-black/40 hover:text-black/60"
            )}
          >
            Sign Up
          </button>
        </div>

        {mode === "login" ? (
          <LoginForm onSignUp={() => setMode("register")} />
        ) : (
          <SignupForm onSignIn={() => setMode("login")} />
        )}
      </div>
    </div>
  );
}
