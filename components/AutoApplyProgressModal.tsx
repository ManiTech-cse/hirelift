import React from 'react';

interface AutoApplyProgressModalProps {
  steps: string[];
  currentStep: number;
  isOpen: boolean;
  onClose: () => void;
  error?: string | null;
}

const AutoApplyProgressModal: React.FC<AutoApplyProgressModalProps> = ({
  steps,
  currentStep,
  isOpen,
  onClose,
  error
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full border border-slate-200 text-center animate-in zoom-in duration-300">
        <h3 className="text-lg font-bold mb-2 text-blue-700">Auto-Applying for You...</h3>
        <div className="mb-4">
          {steps.map((step, idx) => (
            <div key={idx} className={`flex items-center gap-2 mb-1 ${idx === currentStep ? 'font-bold text-blue-600' : idx < currentStep ? 'text-green-600' : 'text-slate-400'}`}>
              <span>{idx < currentStep ? '✔️' : idx === currentStep ? '➡️' : '⏳'}</span>
              <span>{step}</span>
            </div>
          ))}
        </div>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <button onClick={onClose} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Close</button>
      </div>
    </div>
  );
};

export default AutoApplyProgressModal;
