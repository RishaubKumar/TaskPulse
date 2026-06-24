function ReviewCard({upperValue,lowerValue}){
    return(
        <div className=" border rounded-lg px-5 py-3 border-blue-500 shadow-sm">
            <p className="text-white ">{upperValue}</p>
            <h2 className="text-md mt-2 text-blue-100 font-semibold">{lowerValue}</h2>
        </div>
    );
}
export default ReviewCard;