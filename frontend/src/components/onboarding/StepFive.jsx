// roadmap preview

import CommentCard from "./CommentCard";

// branch
function StepFive(){
    return(
        <>
        <CommentCard comment="Your roadmap is ready. Here's your personalised 4-year plan to go from intermediate to placement-ready at a top product company."/>
        <div className="mb-6">
        <h1 className="inline text-left text-black font-bold text-3xl">Your 4-year roadmap</h1>
        <p className="text-gray-600 text-sm md:text-base">AI-generated based on your answers. You can adjust milestones anytime.</p>
        <h1>Output from AI here </h1>
      </div>
        </>
    );
}

export default StepFive;