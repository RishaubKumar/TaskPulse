function ProgressCard({ icon, uppertext, lowertext, selected, onClick }) {
  const selectedStyle = selected
    ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600'
    : 'border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50';

  return (
    <div
      onClick={onClick}
      className={`border rounded-lg p-4 cursor-pointer transition-all flex items-start gap-3.5 text-left ${selectedStyle}`}
    >
      <div className={`w-8 h-8 flex items-center justify-center shrink-0 rounded-full font-bold text-xs ${
        selected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
      }`}>
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-sm text-gray-900">{uppertext}</h3>
        <p className="text-xs text-gray-600 mt-0.5">{lowertext}</p>
      </div>
    </div>
  );
}

export default ProgressCard;