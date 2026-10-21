import { useState, type FormEvent } from "react";
import { authClient } from "./auth/auth-client";

const App = () => {
  const { data: session, isPending } = authClient.useSession();
  const [isSignUp, setIsSignUp] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const result = isSignUp
        ? await authClient.signUp.email({ name, email, password })
        : await authClient.signIn.email({ email, password });

      if (result.error) {
        setError(result.error.message ?? "Authentication failed.");
      }
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to reach the authentication server.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSignOut() {
    setError(null);

    try {
      const result = await authClient.signOut();
      if (result.error) {
        setError(result.error.message ?? "Unable to sign out.");
      }
    } catch (signOutError) {
      setError(
        signOutError instanceof Error
          ? signOutError.message
          : "Unable to reach the authentication server.",
      );
    }
  }

  if (isPending) {
    return <main className="p-8 text-center">Checking your session...</main>;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <section className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        {session?.user ? (
          <div className="space-y-5 text-center">
            <h1 className="text-2xl font-semibold text-slate-900">You’re signed in</h1>
            <p className="text-slate-600">{session.user.email}</p>
            <button
              className="w-full rounded-md bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-700"
              onClick={() => void handleSignOut()}
              type="button"
            >
              Sign out
            </button>
          </div>
        ) : (
          <>
            <h1 className="mb-6 text-2xl font-semibold text-slate-900">
              {isSignUp ? "Create your account" : "Welcome back"}
            </h1>
            <form className="space-y-4" onSubmit={(event) => void handleSubmit(event)}>
              {isSignUp && (
                <label className="block space-y-1 text-sm font-medium text-slate-700">
                  Name
                  <input
                    autoComplete="name"
                    className="w-full rounded-md border border-slate-300 px-3 py-2"
                    onChange={(event) => setName(event.target.value)}
                    required
                    value={name}
                  />
                </label>
              )}
              <label className="block space-y-1 text-sm font-medium text-slate-700">
                Email
                <input
                  autoComplete="email"
                  className="w-full rounded-md border border-slate-300 px-3 py-2"
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  type="email"
                  value={email}
                />
              </label>
              <label className="block space-y-1 text-sm font-medium text-slate-700">
                Password
                <input
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  className="w-full rounded-md border border-slate-300 px-3 py-2"
                  minLength={8}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  type="password"
                  value={password}
                />
              </label>
              {error && (
                <p className="text-sm text-red-700" role="alert">
                  {error}
                </p>
              )}
              <button
                className="w-full rounded-md bg-blue-700 px-4 py-2 font-medium text-white hover:bg-blue-800 disabled:opacity-60"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting
                  ? "Please wait..."
                  : isSignUp
                    ? "Sign up"
                    : "Sign in"}
              </button>
            </form>
            <p className="mt-5 text-center text-sm text-slate-600">
              {isSignUp ? "Already have an account?" : "New here?"}{" "}
              <button
                className="font-medium text-blue-700 hover:underline"
                onClick={() => {
                  setError(null);
                  setIsSignUp(!isSignUp);
                }}
                type="button"
              >
                {isSignUp ? "Sign in" : "Create an account"}
              </button>
            </p>
          </>
        )}
        {session?.user && error && (
          <p className="mt-4 text-sm text-red-700" role="alert">
            {error}
          </p>
        )}
      </section>
    </main>
  );
};

export default App;