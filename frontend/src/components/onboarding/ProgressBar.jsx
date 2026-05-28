import { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";

function ProgressBar() {
  const components = [<StepOne/>,<StepTwo/>,<StepThree/>,<StepFour/>,<StepFive/>];
  const [index, setIndex] = useState(0); 
  const progress = (index +1)*20;
  return (
    <div className="p-5 " >
    <div className="flex pt-5 pb-3 space-x-280">
    <div className="text-xl font-bold tracking-tight text-gray-900 select-none">
        task<span className="text-blue-800">pulse</span>
      </div>
    <div>Step {index+1} of 5</div>
    </div>

      <div className=" h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* <p className="text-lg font-semibold">{progress}%</p> */}
        <div className="mb-5 ">
            {components[index]}
        </div>
      <div className="flex space-x-250 p-3">
        <button
          onClick={() => setIndex(Math.max(index - 1, 0))}
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          Previous
        </button>

        <button
          onClick={() =>
            setIndex(Math.min(index + 1, components.length - 1))
          }
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ProgressBar;