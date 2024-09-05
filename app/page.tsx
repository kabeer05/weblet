"use client";

import CodeEditor from "@/components/CodeEditor";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { useState } from "react";
import endpoints from "@/lib/endpoints";

export default function Home() {
  const [code, setCode] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<{
    stdout: string | null;
    stderr: string | null;
    exception: string | null;
    executionTime: number;
  }>({
    stdout: "",
    stderr: "",
    exception: "",
    executionTime: 0,
  });

  async function compileCode() {
    try {
      const response = await fetch(endpoints.onecompiler, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-key": process.env.NEXT_PUBLIC_ONE_COMPILER_API_KEY!,
          "x-rapidapi-host": "onecompiler-apis.p.rapidapi.com",
        },
        body: JSON.stringify({
          language: "python",
          stdin: input,
          files: [
            {
              name: "main.py",
              content: code,
            },
          ],
        }),
      });
      const data = await response.json();
      console.log(data);

      if (data.status === "success") {
        setOutput({
          stdout: data.stdout,
          stderr: data.stderr,
          exception: data.exception,
          executionTime: data.executionTime,
        });
      } else {
        console.log("Error: ", data);
      }
    } catch (_) {}
  }

  return (
    <div className="h-screen w-full grid grid-cols-3 grid-rows-6 gap-4 px-6 py-6">
      <div className="bg-dracula-bg col-span-2 row-span-6 rounded-lg">
        <CodeEditor
          code={code}
          language={loadLanguage("python")!}
          onChange={(value: string) => setCode(value)}
        />
      </div>

      {/* Config Buttons */}
      <div className="bg-transparent col-start-3 rounded-lg flex items-center justify-center">
        <button
          onClick={compileCode}
          className="px-6 py-3 rounded-full relative bg-[#292A2F] text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600"
        >
          <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
          <span className="relative z-20">Get Disappointed</span>
        </button>
      </div>

      {/* Input */}
      <div className="bg-dracula-bg row-span-2 col-start-3 row-start-2 rounded-lg flex flex-col">
        <h1 className="text-white text-md font-semibold px-4 py-2 border-b border-white border-opacity-25 ">
          Input
        </h1>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full bg-dracula-bg text-white p-4 border-none outline-none resize-none flex-1 overflow-auto rounded-b-lg border-t"
          placeholder="Enter input here"
        />
      </div>

      {/* Output */}
      <div className="bg-dracula-bg row-span-3 col-start-3 row-start-4 rounded-lg overflow-auto">
        <h1 className="text-white text-md font-semibold px-4 py-2 border-b min-w-full border-white border-opacity-25">
          Output
        </h1>
        {output.stdout && (
          <div className="p-4">
            <pre className="text-white text-sm">{output.stdout}</pre>
          </div>
        )}
        {output.stderr && (
          <div className="p-4">
            <pre className="text-red-500 text-sm">{`${output.stderr}`}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
