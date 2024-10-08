import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <SignUp path="/sign-up" signInUrl="/sign-in" />
    </main>
  );
}
