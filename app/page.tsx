"use client";

import CodeEditor from "@/components/CodeEditor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { useState } from "react";
import endpoints from "@/lib/endpoints";
import langs from "@/lib/langs";
import { LanguageName } from "@uiw/codemirror-extensions-langs";

export default function Home() {
  const [code, setCode] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [language, setLanguage] = useState<{
    name: string;
    code: string;
    extension: string;
    label: string;
  }>({
    name: "python",
    code: `print('Hello, World!')`,
    extension: "py",
    label: "Python",
  });

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

  function changeLanguage(lang: string) {
    const language_set = langs.find((l) => l.name === lang)!;
    setLanguage(language_set);
    setCode(language_set.code);
  }

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
          language: language.name,
          stdin: input,
          files: [
            {
              name: `main.${language.extension}`,
              content: code,
            },
          ],
        }),
      });
      const data = await response.json();

      if (data.status === "success") {
        setOutput({
          stdout: data.stdout,
          stderr: data.stderr,
          exception: data.exception,
          executionTime: data.executionTime,
        });
      } else {
        console.log("Error (API): ", data);
      }
    } catch (err) {
      console.log("Error (Try/Catch): ", err);
    }
  }

  return (
    <div className="h-screen w-full grid grid-cols-3 grid-rows-6 gap-4 px-6 py-6 ">
      <div className="bg-dracula-bg col-span-2 row-span-6 rounded-lg relative">
        <CodeEditor
          code={code}
          language={loadLanguage(`${language.name}` as LanguageName)!}
          onChange={(value: string) => setCode(value)}
        />

        <div className="absolute top-4 right-4 z-10">
          <Select onValueChange={changeLanguage}>
            <SelectTrigger className="w-[160px] bg-[#212124] text-white outline-none border border-white">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent className="bg-[#212124] text-white">
              {langs.map(
                (
                  lang: {
                    name: string;
                    code: string;
                    extension: string;
                    label: string;
                  },
                  index: number
                ) => {
                  return (
                    <SelectItem key={index} value={lang.name}>
                      {lang.label}
                    </SelectItem>
                  );
                }
              )}
            </SelectContent>
          </Select>
        </div>
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
          className="w-full bg-dracula-bg text-white p-4 border-none outline-none resize-none flex-1 overflow-auto rounded-b-lg border-t text-sm"
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
