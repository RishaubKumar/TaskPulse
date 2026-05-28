function CommentCard({comment}){
    return(
        <div className=" m-2 bg-gray-50 border border-gray-200 rounded-2xl p-4 text-gray-800 text-sm md:text-base leading-relaxed ">
            {comment}
        </div>
    );
}

export default CommentCard;