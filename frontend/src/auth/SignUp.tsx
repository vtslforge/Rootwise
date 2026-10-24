import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router";
import { authClient } from "../lib/auth.client";

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        setError(error.message ?? "Unable to create account");
        return;
      }

      navigate("/dashboard");
    } catch {
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>Create your account</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Full name</label>
          <input
            id="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a strong password"
            minLength={8}
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"} password
          </button>

          <p>Use at least 8 characters.</p>
        </div>

        {error && <p role="alert">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p>
        Already have an account? <Link to="/signin">Sign in</Link>
      </p>

      <p>
        By creating an account, you agree to our Terms of Service and
        Privacy Policy.
      </p>
    </main>
  );
};

export default SignUp;