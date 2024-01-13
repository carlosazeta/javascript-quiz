import { create } from 'zustand'
import { type Question } from '@/types'

interface State {
	questions: Question[]
	currentQuestion: number
	fetchQuestions: (limit: number) => Promise<void>
	selectAnswer: (questionId: number, answerIndex: number) => void
}

export const useQuestionsStore = create<State>((set, get) => {
	return {
		questions: [],
		currentQuestion: 0,

		fetchQuestions: async (limit: number) => {
			const res = await fetch('http://localhost:5173/data.json')
			const json = await res.json()

			const questions = json
				.sort(() => Math.random() - 0.5)
				.slice(0, limit)
				.map((question: Question) => ({
					...question,
					userSelectedAnswer: null, // Asegurar que cada pregunta tenga esta propiedad inicializada
				}))
			set({ questions })
		},

		selectAnswer: (questionId: number, answerIndex: number) => {
			const { questions } = get()
			const newQuestions = structuredClone(questions)
			const questionIndex = newQuestions.findIndex((q) => q.id === questionId)
			const questionInfo = newQuestions[questionIndex]

			const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex

			newQuestions[questionIndex] = {
				...questionInfo,
				isCorrectUserAnswer,
				userSelectedAnswer: answerIndex,
			}
			set({ questions: newQuestions })
		},
	}
})
