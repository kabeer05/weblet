"use client";

import CodeEditor from "@/components/CodeEditor";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";

export default function Home() {
  return (
    <div className="h-screen w-full grid grid-cols-3 grid-rows-6 gap-4 px-6 py-6">
      <div className="bg-dracula-bg col-span-2 row-span-6 rounded-lg">
        <CodeEditor
          code="console.log('Hello, World!')"
          language={loadLanguage("javascript")!}
        />
      </div>
      <div className="bg-dracula-bg col-start-3 rounded-lg"></div>
      <div className="bg-dracula-bg row-span-2 col-start-3 row-start-2 rounded-lg"></div>
      <div className="bg-dracula-bg row-span-3 col-start-3 row-start-4 rounded-lg"></div>
    </div>
  );
}
