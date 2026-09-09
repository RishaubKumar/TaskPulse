function LandingPageCard({ upperValue, lowerValue }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm">
      <h2 className="text-2xl font-bold text-blue-600">{upperValue}</h2>
      <p className="text-gray-600 text-sm mt-1">{lowerValue}</p>
    </div>
  );
}

export default LandingPageCard;