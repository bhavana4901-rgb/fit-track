import { useEffect } from 'react'
import { RegisterStep1, RegisterStep2, RegisterStep3, RegisterStep4, RegisterStep5, RegisterLayout } from '../components/auth'
import { useRegisterForm } from '../hooks/useRegisterForm'
export default function Register() {
  const {
    step,
    formData,
    handleNext,
    handlePrevious,
    handleSkip,
  } = useRegisterForm()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step])
  return (
    <RegisterLayout step={step}>
      {step === 1 && (
        <RegisterStep1 onNext={handleNext} onPrevious={handlePrevious} initialData={formData} />
      )}
      {step === 2 && (
        <RegisterStep2 onNext={handleNext} onPrevious={handlePrevious} initialData={formData} />
      )}
      {step === 3 && (
        <RegisterStep3 onNext={handleNext} onPrevious={handlePrevious} initialData={formData} />
      )}
      {step === 4 && (
        <RegisterStep4 onNext={handleNext} onPrevious={handlePrevious} initialData={formData} onSkip={handleSkip} />
      )}
      {step === 5 && (
        <RegisterStep5
          onNext={handleNext}
          onPrevious={handlePrevious}
          initialData={formData}
          onSkip={handleSkip}
        />
      )}
    </RegisterLayout>
  )
}
