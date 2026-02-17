export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-2xl" role="img" aria-label="tomato">
                🍅
              </span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">Tomato</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Pomodoro + Spaced Repetition for Coders
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
