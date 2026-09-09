import ProgressCard from './ProgressCard';
import CommentCard from './CommentCard';

function StepThree({ formData, updateFormData }) {
  const selected = formData.level;

  return (
    <div>
      <CommentCard comment="Perfect. Let me understand where you stand right now so your roadmap starts at the right pace without being overwhelming." />

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">What's your current programming level?</h2>
        <p className="text-sm text-gray-600 mt-1">
          Be honest so the AI can calibrate your starting milestones realistically.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProgressCard
          icon="1"
          uppertext="Beginner"
          lowertext="Just started coding, learning syntax and basics"
          selected={selected === 'Beginner'}
          onClick={() => updateFormData('level', 'Beginner')}
        />

        <ProgressCard
          icon="2"
          uppertext="Intermediate"
          lowertext="Comfortable with basic DSA and built small projects"
          selected={selected === 'Intermediate'}
          onClick={() => updateFormData('level', 'Intermediate')}
        />

        <ProgressCard
          icon="3"
          uppertext="Strong"
          lowertext="Solved 100+ DSA problems, built full stack applications"
          selected={selected === 'Strong'}
          onClick={() => updateFormData('level', 'Strong')}
        />

        <ProgressCard
          icon="4"
          uppertext="Advanced"
          lowertext="Active in competitive coding, open-source, or hackathons"
          selected={selected === 'Advanced'}
          onClick={() => updateFormData('level', 'Advanced')}
        />
      </div>
    </div>
  );
}

export default StepThree;