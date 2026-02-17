"use client";

import { useState, useRef, useCallback } from "react";
import { MAX_CODE_EXECUTION_TIMEOUT } from "@/lib/constants";

interface ExecutionResult {
  output: string;
  error: string | null;
  isRunning: boolean;
}

export function useCodeExecution() {
  const [result, setResult] = useState<ExecutionResult>({
    output: "",
    error: null,
    isRunning: false,
  });
  const workerRef = useRef<Worker | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const executeJavaScript = useCallback((code: string) => {
    setResult({ output: "", error: null, isRunning: true });

    // Use a simple approach: capture console.log output
    try {
      const outputs: string[] = [];

      // Capture console output
      const capturedLog = (...args: unknown[]) => {
        outputs.push(args.map(String).join(" "));
      };

      // Create a sandboxed execution
      const fn = new Function(
        "console",
        `"use strict";\n${code}`
      );

      const timeout = setTimeout(() => {
        setResult({
          output: outputs.join("\n"),
          error: "Execution timed out (5s limit)",
          isRunning: false,
        });
      }, MAX_CODE_EXECUTION_TIMEOUT);

      fn({ log: capturedLog, error: capturedLog, warn: capturedLog });

      clearTimeout(timeout);
      setResult({
        output: outputs.join("\n"),
        error: null,
        isRunning: false,
      });
    } catch (err) {
      setResult({
        output: "",
        error: err instanceof Error ? err.message : String(err),
        isRunning: false,
      });
    }
  }, []);

  const executePython = useCallback(async (code: string) => {
    setResult({ output: "", error: null, isRunning: true });

    try {
      // Dynamically import pyodide (loaded from CDN at runtime)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pyodideModule = await (import("pyodide" as any) as Promise<any>);
      const pyodide = await pyodideModule.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/",
      });

      // Capture stdout
      pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
`);

      const timeout = setTimeout(() => {
        setResult({
          output: "",
          error: "Execution timed out (5s limit)",
          isRunning: false,
        });
      }, MAX_CODE_EXECUTION_TIMEOUT);

      await pyodide.runPythonAsync(code);

      clearTimeout(timeout);

      const stdout = pyodide.runPython("sys.stdout.getvalue()");
      const stderr = pyodide.runPython("sys.stderr.getvalue()");

      setResult({
        output: stdout || "",
        error: stderr || null,
        isRunning: false,
      });
    } catch (err) {
      setResult({
        output: "",
        error: err instanceof Error ? err.message : String(err),
        isRunning: false,
      });
    }
  }, []);

  const execute = useCallback(
    (code: string, language: "javascript" | "python") => {
      if (language === "javascript") {
        executeJavaScript(code);
      } else {
        executePython(code);
      }
    },
    [executeJavaScript, executePython]
  );

  const cleanup = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  return { ...result, execute, cleanup };
}
