import { Inter } from "next/font/google";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { user, error, isLoading } = useUser();

  return (
    <div>
      <h1>Next.js + Auth0 Example</h1>
      {isLoading && <p>Loading login info...</p>}
      {error && <p>{error.message}</p>}
      {user && (
        <>
          <p>Welcome {user.name}!</p>
          <p>Email: {user.email}</p>
        </>
      )}
      <Link href="/api/auth/login">Login</Link>
      <Link href="/api/auth/logout">Logout</Link>
    </div>
  );
}
