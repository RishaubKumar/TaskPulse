function ReviewCard({upperValue,lowerValue}){
    return(
        <div className=" border rounded-lg px-5 py-3 border-gray-200 shadow-sm">
            <p className="text-white ">{upperValue}</p>
            <h2 className="text-md mt-2 text-indigo-600">{lowerValue}</h2>
        </div>
    );
}
export default ReviewCard;