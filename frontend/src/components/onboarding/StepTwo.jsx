import { useState } from "react";
import ProgressCard from "./ProgressCard";
import CommentCard from "./CommentCard";

function StepTwo({ formData, updateFormData }) {
  const selected = formData.goal;

  return (
    <>
      <div className="m-5">
        <CommentCard comment="Great! Now the big question: what does success look like for you after graduation? Be honest, there are no wrong answers." />
        <h1 className="inline text-left text-black font-bold text-3xl">
          What's your primary goal?
        </h1>

        <p className="text-xl">
          Your entire roadmap is built around this. You can refine it later.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mx-40 mt-5">

          <ProgressCard
            icon="1"
            uppertext="Product-based job"
            lowertext="FAANG, unicorns, top tech companies"
            selected={selected === "Product"}
            onClick={() => updateFormData("goal", "Product")}
          />

          <ProgressCard
            icon="2"
            uppertext="Start a startup"
            lowertext="Build something from scratch"
            selected={selected === "startup"}
            onClick={() => updateFormData("goal", "startup")}
          />

          <ProgressCard
            icon="3"
            uppertext="Higher studies / MS"
            lowertext="GATE, GRE, research abroad"
            selected={selected === "abroad"}
            onClick={() => updateFormData("goal", "abroad")}
          />

          <ProgressCard
            icon="4"
            uppertext="Government / PSU"
            lowertext="UPSC, SSC, banking exams"
            selected={selected === "gov"}
            onClick={() => updateFormData("goal", "gov")}
          />

        </div>

      </div>
    </>
  );
}

export default StepTwo;