function LandingpageBLcard({ icon, uppertext, lowertext }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm flex items-start gap-4 text-left">
      <div className="w-8 h-8 flex items-center justify-center shrink-0 rounded-full bg-blue-600 text-white font-bold text-sm">
        {icon}
      </div>
      <div>
        <h3 className="text-base font-bold text-gray-900 mb-1">{uppertext}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{lowertext}</p>
      </div>
    </div>
  );
}

export default LandingpageBLcard;
