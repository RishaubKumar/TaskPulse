function LandingPageCard({upperValue,lowerValue}){
    return(
        <div className="mx-10 border rounded-lg bg-gray-200 px-5 py-3 border-gray-200 shadow-sm">
            <h2 className="text-3xl text-blue-600">{upperValue}</h2>
            <p className="text-gray-700 text-lg">{lowerValue}</p>
        </div>
    );
}
export default LandingPageCard;