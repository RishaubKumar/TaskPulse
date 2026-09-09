import ProgressCard from './ProgressCard';
import CommentCard from './CommentCard';

function StepOne({ formData, updateFormData }) {
  const selected = formData.branch;

  return (
    <div>
      <CommentCard comment="Hey! I'm your TaskPulse AI advisor. Let's answer 5 quick questions to generate your personalized 4-year roadmap. What are you studying?" />
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">What's your branch?</h2>
        <p className="text-sm text-gray-600 mt-1">
          This helps calibrate core engineering subjects and relevant semester milestones.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProgressCard
          icon="1"
          uppertext="Computer Science / IT"
          lowertext="Software development, DSA, and systems"
          selected={selected === 'cs'}
          onClick={() => updateFormData('branch', 'cs')}
        />

        <ProgressCard
          icon="2"
          uppertext="Electronics / ECE"
          lowertext="Circuits, embedded systems, and IoT"
          selected={selected === 'ece'}
          onClick={() => updateFormData('branch', 'ece')}
        />

        <ProgressCard
          icon="3"
          uppertext="Mechanical / Civil"
          lowertext="Core design, structures, and analytics"
          selected={selected === 'mech'}
          onClick={() => updateFormData('branch', 'mech')}
        />

        <ProgressCard
          icon="4"
          uppertext="Commerce / BBA / MBA"
          lowertext="Business analytics, finance, and product management"
          selected={selected === 'commerce'}
          onClick={() => updateFormData('branch', 'commerce')}
        />
      </div>
    </div>
  );
}

export default StepOne;