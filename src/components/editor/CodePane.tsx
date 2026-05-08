"use client";

import { FileText, Sparkles } from "lucide-react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { useRef, useEffect } from "react";

interface CodePaneProps {
  onOpenAI: () => void;
  latexSource: string;
  onChange: (value: string) => void;
  onCompile: () => void;
}

export function CodePane({ onOpenAI, latexSource, onChange, onCompile }: CodePaneProps) {
  const monaco = useMonaco();
  const editorRef = useRef<any>(null);

  // Define custom theme when monaco is ready
  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme("atelier-dark", {
        base: "vs-dark",
        inherit: true,
        rules: [
          { token: "keyword.latex", foreground: "569cd6", fontStyle: "bold" }, // \commands
          { token: "type.latex", foreground: "c586c0" },                      // {environments}
          { token: "string.latex", foreground: "ce9178" },                    // arguments
          { token: "comment.latex", foreground: "6a9955", fontStyle: "italic" }, // % comments
          { token: "number.latex", foreground: "b5cea8" },
        ],
        colors: {
          "editor.background": "#0f172a", // Deep Navy Black
          "editor.lineHighlightBackground": "#1e293b",
          "editorLineNumber.foreground": "#475569",
          "editor.selectionBackground": "#334155",
        },
      });
    }
  }, [monaco]);

  const handleEditorDidMount = (editor: any, monacoInstance: any) => {
    editorRef.current = editor;

    // Add Ctrl+S or Cmd+S shortcut to trigger compilation
    editor.addCommand(monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.KeyS, () => {
      onCompile();
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0f172a] text-[#d4d4d4] font-mono text-sm relative h-full">
      {/* Editor Tabs */}
      <div className="flex bg-[#020617] border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0f172a] border-t-2 border-[#0066ff] text-white">
          <FileText className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-bold tracking-tight">main.tex</span>
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 relative">
        <Editor
          height="100%"
          defaultLanguage="latex"
          theme="atelier-dark" // Using our custom theme
          value={latexSource}
          onChange={(value) => onChange(value || "")}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: "on",
            padding: { top: 20, bottom: 20 },
            fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: "expand",
            lineNumbersMinChars: 3,
          }}
        />
      </div>

      {/* Ask AI Floating Button */}
      <button
        onClick={onOpenAI}
        className="absolute bottom-6 right-6 z-10 bg-[#0066ff] hover:bg-[#0055cc] text-white px-5 py-3 rounded-full shadow-lg shadow-blue-500/40 flex items-center gap-2 font-bold transition-all hover:scale-105 active:scale-95"
      >
        <div className="bg-white/20 p-1 rounded-lg">
          <Sparkles className="w-4 h-4" />
        </div>
        Ask AI
      </button>
    </div>
  );
}
