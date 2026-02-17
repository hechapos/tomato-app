"use client";

import { Loader2, CheckCircle2, XCircle } from "lucide-react";

interface OutputPanelProps {
  output: string;
  error: string | null;
  isRunning: boolean;
  expectedOutput?: string | null;
}

export function OutputPanel({
  output,
  error,
  isRunning,
  expectedOutput,
}: OutputPanelProps) {
  const hasOutput = output || error;
  const matches =
    expectedOutput && output.trim() === expectedOutput.trim();

  return (
    <div className="bg-gray-900 rounded-md p-3 font-code text-sm min-h-[80px] max-h-[200px] overflow-auto">
      {isRunning ? (
        <div className="flex items-center gap-2 text-gray-400">
          <Loader2 className="h-4 w-4 animate-spin" />
          Running...
        </div>
      ) : !hasOutput ? (
        <span className="text-gray-500">Output will appear here...</span>
      ) : (
        <div className="space-y-2">
          {output && (
            <pre className="text-green-400 whitespace-pre-wrap">{output}</pre>
          )}
          {error && (
            <pre className="text-red-400 whitespace-pre-wrap">{error}</pre>
          )}
          {expectedOutput && hasOutput && !error && (
            <div className="flex items-center gap-2 pt-2 border-t border-gray-700">
              {matches ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 text-xs">
                    Output matches expected!
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 text-red-400" />
                  <span className="text-red-400 text-xs">
                    Expected: {expectedOutput}
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
