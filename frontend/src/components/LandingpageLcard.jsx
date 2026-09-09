function LandingpageLcard({ uppertext, lowertext }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm text-left">
      <h3 className="text-base font-bold text-gray-900 mb-1">{uppertext}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{lowertext}</p>
    </div>
  );
}

export default LandingpageLcard;