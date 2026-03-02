type StepsProps = {
  currentStep: number;
}

const Steps = ({ currentStep }: StepsProps) => {
  const steps = [1, 2, 3];
  
  return (
    <div className="flex justify-center items-center gap-3 py-6">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center gap-3">

          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${currentStep > index ? "bg-blue-600 text-white" : "text-gray-400 bg-gray-200"}`}> {/* bg-blue-600 or bg-green-600 */}
            {currentStep > index ? "✓" : step}
          </div>

          {index < steps.length - 1 && (
            <div className={`w-8 h-0.5 transition-colors ${currentStep > index ? "bg-blue-600" : "bg-gray-200"}`} /> 
          )} {/* bg-blue-600 or bg-green-600 */}
        </div>
      ))}
    </div>
  )
}

export default Steps