export default function ProgressBar({ value, max }: { value: number; max: number }) {
  const percentage = Math.min((value / max) * 100, 100);
  
  return (
    <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
      <div 
        className="bg-yellow-400 h-full transition-all duration-500 ease-out shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)]"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}