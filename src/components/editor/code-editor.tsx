"use client";

import { useRef, useEffect } from "react";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";
import { useTheme } from "next-themes";

interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  language: "javascript" | "python";
  readOnly?: boolean;
  height?: string;
}

export function CodeEditor({
  value,
  onChange,
  language,
  readOnly = false,
  height = "200px",
}: CodeEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;

    // Clean up previous editor
    if (viewRef.current) {
      viewRef.current.destroy();
    }

    const extensions = [
      basicSetup,
      language === "javascript" ? javascript() : python(),
      EditorView.theme({
        "&": { height, fontSize: "14px" },
        ".cm-scroller": { overflow: "auto" },
      }),
    ];

    if (resolvedTheme === "dark") {
      extensions.push(oneDark);
    }

    if (readOnly) {
      extensions.push(EditorState.readOnly.of(true));
    }

    if (onChange) {
      extensions.push(
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChange(update.state.doc.toString());
          }
        })
      );
    }

    const state = EditorState.create({
      doc: value,
      extensions,
    });

    viewRef.current = new EditorView({
      state,
      parent: containerRef.current,
    });

    return () => {
      viewRef.current?.destroy();
      viewRef.current = null;
    };
    // Only recreate on language or theme change, not value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, resolvedTheme, readOnly]);

  return (
    <div
      ref={containerRef}
      className="border rounded-md overflow-hidden font-code"
    />
  );
}
