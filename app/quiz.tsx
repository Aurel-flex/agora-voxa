// components/QuizCard.tsx
export default function QuizCard({ question, options }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border-b-4 border-gray-200">
      <h2 className="text-xl font-bold mb-6 text-slate-800">{question}</h2>
      <div className="space-y-3">
        {options.map((opt: string) => (
          <button key={opt} className="w-full text-left p-4 rounded-xl border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all font-medium">
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}