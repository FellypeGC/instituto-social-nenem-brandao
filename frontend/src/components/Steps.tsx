import React from 'react'

type Props = {}

const Steps = (props: Props) => {
  return (
    <div className="flex justify-center items-center gap-3 py-6">
      <div id="ind1" className="step-indicator bg-blue-600 text-white">1</div>
      <div className="w-8 h-0.5 bg-gray-200" id="line1"></div>
      <div id="ind2" className="step-indicator bg-gray-200 text-gray-400">2</div>
      <div className="w-8 h-0.5 bg-gray-200" id="line2"></div>
      <div id="ind3" className="step-indicator bg-gray-200 text-gray-400">3</div>
  </div>
  )
}

export default Steps