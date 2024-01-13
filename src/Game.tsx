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

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

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

				<ToggleGroup
					type='multiple'
					variant='outline'
					className='flex flex-col mt-6'
				>
					{info.answers.map((answer, index) => (
						<ToggleGroupItem
							key={index}
							value={answer}
							onClick={createHandleClick(index)}
							className='my-2'
						>
							{answer}
						</ToggleGroupItem>
					))}
				</ToggleGroup>
			</CardContent>
		</Card>
	)
}

export const Game = () => {
	const questions = useQuestionsStore((state) => state.questions)
	const currentQuestion = useQuestionsStore((state) => state.currentQuestion)

	const questionInfo = questions[currentQuestion]
	return (
		<>
			<Question info={questionInfo} />
		</>
	)
}
