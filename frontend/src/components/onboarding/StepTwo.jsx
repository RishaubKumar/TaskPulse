import ProgressCard from './ProgressCard';
import CommentCard from './CommentCard';

function StepTwo({ formData, updateFormData }) {
  const selected = formData.goal;

  return (
    <div>
      <CommentCard comment="Great! Now the big question: what does success look like for you after graduation? Be candid, there are no wrong answers." />

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">What's your primary career goal?</h2>
        <p className="text-sm text-gray-600 mt-1">
          Your entire 4-year roadmap milestones will be prioritized around this direction.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProgressCard
          icon="1"
          uppertext="Product-Based Company"
          lowertext="FAANG, high-growth startups, top tech companies"
          selected={selected === 'Product'}
          onClick={() => updateFormData('goal', 'Product')}
        />

        <ProgressCard
          icon="2"
          uppertext="Start a Tech Venture"
          lowertext="Build products from scratch and launch startups"
          selected={selected === 'startup'}
          onClick={() => updateFormData('goal', 'startup')}
        />

        <ProgressCard
          icon="3"
          uppertext="Higher Studies / MS / GATE"
          lowertext="GATE exam, GRE, research publications abroad"
          selected={selected === 'abroad'}
          onClick={() => updateFormData('goal', 'abroad')}
        />

        <ProgressCard
          icon="4"
          uppertext="Government / PSU / Services"
          lowertext="Public sector units, core engineering jobs, exams"
          selected={selected === 'gov'}
          onClick={() => updateFormData('goal', 'gov')}
        />
      </div>
    </div>
  );
}

export default StepTwo;