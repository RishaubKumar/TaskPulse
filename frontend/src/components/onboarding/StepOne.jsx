import { useState } from "react";
import ProgressCard from "./ProgressCard";

function StepOne() {

  const [selected, setSelected] = useState("");

  return (
    <>
      <div className="m-5">

        <h1 className="inline text-left text-black font-bold text-3xl">
          What's your branch?
        </h1>

        <p className="text-xl">
          This helps align your roadmap to the right skills and opportunities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mx-40 mt-5">

          <ProgressCard
            icon="1"
            uppertext="Computer Science / IT"
            lowertext="Software development and coding"
            selected={selected === "cs"}
            onClick={() => setSelected("cs")}
          />

          <ProgressCard
            icon="2"
            uppertext="Electronics / ECE"
            lowertext="Hardware, circuits and embedded systems"
            selected={selected === "ece"}
            onClick={() => setSelected("ece")}
          />

          <ProgressCard
            icon="3"
            uppertext="Mechanical / Civil"
            lowertext="Machines, structures and manufacturing"
            selected={selected === "mech"}
            onClick={() => setSelected("mech")}
          />

          <ProgressCard
            icon="4"
            uppertext="Commerce / BBA / MBA"
            lowertext="Business, finance and management"
            selected={selected === "commerce"}
            onClick={() => setSelected("commerce")}
          />

        </div>

      </div>
    </>
  );
}

export default StepOne;