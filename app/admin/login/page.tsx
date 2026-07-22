"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Invalid email or password.");
      }
      router.push(searchParams.get("from") || "/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-svh bg-secondary/40">
      <div className="w-full max-w-sm p-8 mx-4 bg-white border shadow-sm rounded-2xl border-border">
        <Image
          src="/logo/CCFSI_ICON_B.png"
          alt="Constant Care Family Services"
          width={100}
          height={50}
          className="w-10 h-auto mx-auto mb-4"
        />
        <h1 className="text-xl font-bold text-center text-primary">
          Admin Sign In
        </h1>
        <p className="mt-1 text-sm text-center text-muted-foreground">
          Internal access only.
        </p>

        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          <div className="grid gap-1.5">
            <label htmlFor="login-email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="login-email"
              name="email"
              type="email"
              required
              autoComplete="username"
            />
          </div>
          <div className="grid gap-1.5">
            <label htmlFor="login-password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="login-password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" disabled={loading} className="mt-2">
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
