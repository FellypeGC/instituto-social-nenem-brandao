type StepsProps = {
  currentStep: number;
}

const Steps = ({ currentStep }: StepsProps) => {
  const steps = [1, 2, 3];
  
  return (
    <div className="flex justify-center items-center gap-3 py-6">
      {steps.map((step, index) => (
        <>
          <div key={step} className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${currentStep === step - 1 ? "bg-blue-600 text-white" : "text-gray-400 bg-gray-200"}`}>
            {currentStep > step ? "" : step}
          </div>

          {index < steps.length - 1 && (
            <div className={`w-8 h-0.5 transition-colors ${currentStep > step ? "bg-green-500" : "bg-gray-200"}`}></div>
          )}
        </>
      ))}
    </div>
    
  )
}

export default Steps