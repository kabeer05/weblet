import CodeMirror from "@uiw/react-codemirror";

export default function CodeEditor({
  code,
  language,
  onChange,
}: {
  code: string;
  onChange: (code: string) => void;
  language?: any;
}) {
  return <CodeMirror value={code} height="200px" extensions={language} />;
}
