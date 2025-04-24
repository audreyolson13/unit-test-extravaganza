//give me an example of a component that is better tested with userEvent than fireEvent

import React from "react";

const LoginForm: React.FC<{
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  message: string;
  setMessage: (password: string) => void;
}> = ({ email, setEmail, password, setPassword, message, setMessage }) => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "test@example.com" && password === "password123") {
      setMessage("Login successful!");
    } else {
      setMessage("Invalid email or password.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default LoginForm;
