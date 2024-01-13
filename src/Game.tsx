import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useQuestionsStore } from './store/questions'
import { type Question as QuestionType } from './types'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from './components/ui/card'
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'
import { Button } from './components/ui/button'

const getBackgroundColor = (info: QuestionType, index: number) => {
	const { userSelectedAnswer, correctAnswer } = info

	if (userSelectedAnswer === null) return 'bg-black'
	if (index !== correctAnswer && index !== userSelectedAnswer) return 'bg-black'
	if (index === correctAnswer) return 'bg-green-400'
	if (index === userSelectedAnswer) return 'bg-red-400'

	return 'bg-black'
}

const Question = ({ info }: { info: QuestionType }) => {
	const selectAnswer = useQuestionsStore((state) => state.selectAnswer)

	const createHandleClick = (answerIndex: number) => () => {
		selectAnswer(info.id, answerIndex)
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>{info.question}</CardTitle>
			</CardHeader>
			<CardContent className='text-left'>
				<SyntaxHighlighter language='javascript' style={atomOneDark}>
					{info.code}
				</SyntaxHighlighter>

				<ul className='flex flex-col mt-6'>
					{info.answers.map((answer, index) => (
						<Button
							key={index}
							disabled={info.userSelectedAnswer !== null}
							onClick={createHandleClick(index)}
							className={`my-2 ${getBackgroundColor(info, index)}`}
						>
							{answer}
						</Button>
					))}
				</ul>
			</CardContent>
		</Card>
	)
}

export const Game = () => {
	const questions = useQuestionsStore((state) => state.questions)
	const currentQuestion = useQuestionsStore((state) => state.currentQuestion)
	const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion)
	const goPreviousQuestion = useQuestionsStore(
		(state) => state.goPreviousQuestion
	)
	const questionInfo = questions[currentQuestion]

	const disableNavigation =
		'text-slate-200 hover:text-slate-200 hover:bg-transparent cursor-not-allowed'

	return (
		<>
			<Question info={questionInfo} />
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							onClick={goPreviousQuestion}
							className={`cursor-pointer ${
								currentQuestion === 0 ? disableNavigation : ''
							}`}
						/>
					</PaginationItem>
					<PaginationItem>
						{currentQuestion + 1} / {questions.length}
					</PaginationItem>
					<PaginationItem>
						<PaginationNext
							onClick={goNextQuestion}
							className={`cursor-pointer ${
								currentQuestion >= questions.length - 1 ? disableNavigation : ''
							}`}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</>
	)
}
