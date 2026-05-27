import { useState } from "react";
import ProgressCard from "./ProgressCard";

function StepTwo() {

  const [selected, setSelected] = useState("");

  return (
    <>
      <div className="m-5">

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
            onClick={() => setSelected("Product")}
          />

          <ProgressCard
            icon="2"
            uppertext="Start a startup"
            lowertext="Build something from scratch"
            selected={selected === "startup"}
            onClick={() => setSelected("startup")}
          />

          <ProgressCard
            icon="3"
            uppertext="Higher studies / MS"
            lowertext="GATE, GRE, research abroad"
            selected={selected === "abroad"}
            onClick={() => setSelected("abroad")}
          />

          <ProgressCard
            icon="4"
            uppertext="Government / PSU"
            lowertext="UPSC, SSC, banking exams"
            selected={selected === "gov"}
            onClick={() => setSelected("gov")}
          />

        </div>

      </div>
    </>
  );
}

export default StepTwo;