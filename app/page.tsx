"use client";

import CodeEditor from "@/components/CodeEditor";
import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState("console.log('Hello World')");

  return (
    <main className="flex">
      <section className="w-1/2 h-[100vh]">
        <CodeEditor
          code={code}
          onChange={() => {
            setCode(code);
          }}
        />
      </section>
      <section className="w-1/2 h-[100vh]"></section>
    </main>
  );
}
