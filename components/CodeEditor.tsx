import CodeMirror, { Extension } from "@uiw/react-codemirror";
import { xcodeDarkInit } from "@uiw/codemirror-theme-xcode";

interface CodeEditorProps {
  code: string;
  language: Extension;
  onChange?: (value: string) => void;
}

export default function CodeEditor({
  code,
  language,
  onChange,
}: CodeEditorProps) {
  return (
    <CodeMirror
      value={code}
      onChange={onChange}
      draggable={false}
      basicSetup={{
        lineNumbers: true,
        bracketMatching: true,
        closeBrackets: true,
        autocompletion: true,
        highlightActiveLine: false,
        highlightSpecialChars: true,
        syntaxHighlighting: true,
        indentOnInput: true,
      }}
      theme={xcodeDarkInit()}
      className="h-full w-full overflow-y-auto rounded-lg"
      extensions={[language]}
    />
  );
}
