export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="rounded-2xl glass overflow-hidden animate-pulse">
          <div className="aspect-square bg-white/5" />
          <div className="p-6 space-y-3">
            <div className="h-4 bg-white/5 rounded w-1/4" />
            <div className="h-6 bg-white/5 rounded w-3/4" />
            <div className="h-8 bg-white/5 rounded w-1/2" />
            <div className="flex gap-2">
              <div className="flex-1 h-12 bg-white/5 rounded-xl" />
              <div className="w-12 h-12 bg-white/5 rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
