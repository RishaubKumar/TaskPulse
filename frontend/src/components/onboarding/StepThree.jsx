import { useState } from "react";
import ProgressCard from "./ProgressCard";
import CommentCard from "./CommentCard";

function StepThree({ formData, updateFormData }) {
  const selected = formData.level;

  return (
    <>
      <div className="m-5">
        <CommentCard comment="Perfect. Let me understand where you are today so your roadmap starts at exactly the right point (not too easy, not overwhelming)."/>
        <h1 className="inline text-left text-black font-bold text-3xl">
         What's your programming level?
        </h1>

        <p className="text-xl">
          Be honest: the AI calibrates your starting point from this.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mx-40 mt-5">

          <ProgressCard
            icon="1"
            uppertext="Beginner"
            lowertext="Just started, basics only"
            selected={selected === "begineer"}
            onClick={() => updateFormData("level", "begineer")}
          />

          <ProgressCard
            icon="2"
            uppertext="Intermediate"
            lowertext="Built a few small projects"
            selected={selected === "Intermediate"}
            onClick={() => updateFormData("level", "Intermediate")}
          />

          <ProgressCard
            icon="3"
            uppertext="Strong"
            lowertext="Internship or real projects done"
            selected={selected === "Strong"}
            onClick={() => updateFormData("level", "Strong")}
          />

          <ProgressCard
            icon="4"
            uppertext="Advanced"
            lowertext="Competitive coding, open source"
            selected={selected === "Advanced"}
            onClick={() => updateFormData("level", "Advanced")}
          />

        </div>

      </div>
    </>
  );
}

export default StepThree;