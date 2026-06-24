function ProgressCard({icon,uppertext,lowertext,selected,onClick,}) {
  let cardClass = "border-gray-400";
  if (selected) {
    cardClass = "border-blue-600 bg-blue-50";
  }

  return (
    <div
      onClick={onClick}
      className={`border rounded-2xl items-start gap-4 p-4 max-w-md cursor-pointer transition-all ${cardClass}`}
    >
      <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-full bg-blue-600 text-white font-bold text-base">
        {icon}
      </div>
      <div className="flex flex-col pt-1">
        <h3 className="inline text-left text-black font-bold">
          {uppertext}
        </h3>
        <p className="text-left">
          {lowertext}
        </p>
      </div>
    </div>
  );
}

export default ProgressCard;