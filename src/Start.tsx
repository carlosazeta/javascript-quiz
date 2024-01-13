import { Button } from './components/ui/button'
import { useQuestionsStore } from './store/questions'

const LIMIT_QUESTIONS = 10

export const Start = () => {
	const fetchQuestions = useQuestionsStore((state) => state.fetchQuestions)

	const handleClick = () => {
		fetchQuestions(LIMIT_QUESTIONS)
	}

	return <Button onClick={handleClick}>Empezar!</Button>
}
