export default function RecommendSpinner() {
    return (
      <div className="flex gap-4 items-end">
        <span className="text-6xl">🧍</span>
        <span className="text-sm animate-loading" style={{ animationDelay: '0s' }}>⚫</span>
        <span className="text-sm animate-loading" style={{ animationDelay: '0.5s' }}>⚫</span>
        <span className="text-sm animate-loading" style={{ animationDelay: '1s' }}>⚫</span>
        <span className="text-6xl">🚶‍➡️</span>
        <span className="text-sm animate-loading" style={{ animationDelay: '1.5s' }}>⚫</span>
        <span className="text-sm animate-loading" style={{ animationDelay: '2s' }}>⚫</span>
        <span className="text-sm animate-loading" style={{ animationDelay: '2.5s' }}>⚫</span>
        <span className="text-6xl">🏃‍➡️</span>
      </div>
    );
  }