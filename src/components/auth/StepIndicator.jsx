export default function StepIndicator({ currentStep = 1, totalSteps = 5 }) {
  return <div className="mb-8">Step {currentStep} of {totalSteps}</div>
}
