import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";

function ProgressBar() {
  const [formData, setFormData] = useState({
    branch: "",
    goal: "",
    level: "",
    companies: [],
    currentYear: "Year 2"
  });

  const updateFormData = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const navigate = useNavigate();
  const [index, setIndex] = useState(0); 

  const components = [
    <StepOne formData={formData} updateFormData={updateFormData} />,
    <StepTwo formData={formData} updateFormData={updateFormData} />,
    <StepThree formData={formData} updateFormData={updateFormData} />,
    <StepFour formData={formData} updateFormData={updateFormData} />,
    <StepFive formData={formData} />
  ];

  const progress = (index + 1) * 20;
  let nextButtonText = "Next";
  if (index === components.length - 1) {
    nextButtonText = "Finish";
  }

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
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors cursor-pointer"
        >
          Previous
        </button>

        <button
          onClick={() => {
            if (index === components.length - 1) {
              navigate("/");
            } else {
              setIndex(index + 1);
            }
          }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors cursor-pointer"
        >
          {nextButtonText}
        </button>
      </div>
    </div>
  );
}

export default ProgressBar;