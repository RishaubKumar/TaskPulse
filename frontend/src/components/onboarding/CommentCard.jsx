function CommentCard({ comment }) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-900 text-sm leading-relaxed mb-6">
      <span className="font-semibold block text-xs uppercase tracking-wider text-blue-700 mb-1">
        AI Academic Advisor
      </span>
      {comment}
    </div>
  );
}

export default CommentCard;