"use client";

import CodeEditor from "@/components/CodeEditor";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState<string>("");

  return (
    <div className="h-screen w-full grid grid-cols-3 grid-rows-6 gap-4 px-6 py-6">
      <div className="bg-dracula-bg col-span-2 row-span-6 rounded-lg">
        <CodeEditor
          code={code}
          language={loadLanguage("cpp")!}
          onChange={(value: string) => setCode(value)}
        />
      </div>
      {/* Config Buttons */}
      <div className="bg-transparent col-start-3 rounded-lg flex items-center justify-center">
        <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            Get Disappointed
          </span>
        </button>
      </div>

      {/* Input */}
      <div className="bg-dracula-bg row-span-2 col-start-3 row-start-2 rounded-lg">
        <h1 className="text-white text-md font-semibold px-4 py-2">Input</h1>
        <hr className="opacity-25" />
      </div>

      {/* Output */}
      <div className="bg-dracula-bg row-span-3 col-start-3 row-start-4 rounded-lg">
        <h1 className="text-white text-md font-semibold px-4 py-2">Output</h1>
        <hr className="opacity-25" />
      </div>
    </div>
  );
}
