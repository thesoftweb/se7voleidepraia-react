import { type } from "os";
import { ReactElement, useState } from "react"


export function useForm(steps: ReactElement[]) {

    const [currentStepIndex, SetCurrentStepIndex] = useState(0);

    function next() {
        SetCurrentStepIndex(i => {
            if (i >= steps.length - 1) return i
            return i + 1
        })
    }
    function back() {
        SetCurrentStepIndex(i => {
            if (i <= 0) return i
            return i - 1
        })
    }

    function goTo(index: number) {
        SetCurrentStepIndex(index)
    }

    return {
        currentStepIndex,
        step: steps[currentStepIndex],
        steps,
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === steps.length - 1,
        goTo,
        next, back
    }
}