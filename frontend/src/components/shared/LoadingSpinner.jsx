export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gold-400 border-t-transparent" />
    </div>
  );
}
