import './App.css'
import { Game } from './Game'
import { Start } from './Start'
import { useQuestionsStore } from './store/questions'

function App() {
	const questions = useQuestionsStore((state) => state.questions)
	console.log(questions)
	return (
		<>
			<h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
				Javascript Quiz
			</h1>

			{questions.length === 0 && <Start />}
			{questions.length > 0 && <Game />}
		</>
	)
}

export default App
