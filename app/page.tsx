import Link from "next/link";

export default function page() {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page</p>
      <Link href="/dashboard" className="text-blue-500 underline">
        Go to Dashboard
      </Link>
    </div>
  );
}
