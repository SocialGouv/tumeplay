import React, { memo, useEffect, useState } from 'react';
import './index.css';
import { Block, Container, Wave } from './components';
import { get, orderBy } from 'lodash';
import { auth } from 'strapi-helper-plugin';
import _ from 'lodash';
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { request } from 'strapi-helper-plugin';

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const HomePage = ({ global: { plugins }, history: { push } }) => {

	const [boxes, setBoxes] = useState([])

	const [responsesMetropole, setResponsesMetropole] = useState([])
	const [responsesGuyane, setResponsesGuyane] = useState([])

	const [quizTimeByIterationsMetropole, setQuizTimeByIterationsMetropole] = useState([])
	const [quizAverageScoreByThemesMetropole, setQuizAverageScoreByThemesMetropole] = useState([])
	const [quizAverageScoreByThemesGuyane, setQuizAverageScoreByThemesGuyane] = useState([])
	const [quizTimeUsedThemesMetropole, setQuizTimeUsedThemesMetropole] = useState([])

	const [quizTimeByIterationsGuyane, setQuizTimeByIterationsGuyane] = useState([])
	const [quizTimeUsedThemesGuyane, setQuizTimeUsedThemesGuyane] = useState([])

	const [quizAverageScoreByAgeMetropole, setQuizAverageScoreByAgeMetropole] = useState([])
	const [quizAverageScoreByAgeGuyane, setQuizAverageScoreByAgeGuyane] = useState([])

	const [quizAverageScoreByIterationMetropole, setQuizAverageScoreByIterationMetropole] = useState([])
	const [quizAverageScoreByIterationGuyane, setQuizAverageScoreByIterationGuyane] = useState([])

	const [top10QuestionsMetropole, setTop10QuestionsMetropole] = useState([])
	const [top10QuestionsGuyane, setTop10QuestionsGuyane] = useState([])
	const [flop10QuestionsMetropole, setFlop10QuestionsMetropole] = useState([])
	const [flop10QuestionsGuyane, setFlop10QuestionsGuyane] = useState([])

	const [switchZoneResponses, setSwitchZoneResponses] = useState('metropole')
	const [switchZoneQuizTimeByIteration, setSwitchZoneQuizTimeByIteration] = useState('metropole')
	const [switchZoneQuizAverageScoreByThemes, setSwitchZoneQuizAverageScoreByThemes] = useState('metropole')
	const [switchZoneQuizAverageScoreByAge, setSwitchZoneQuizAverageScoreByAge] = useState('metropole')
	const [switchZoneQuizAverageScoreByIteration, setSwitchZoneQuizAverageScoreByIteration] = useState('metropole')
	const [switchZoneTop10Questions, setSwitchZoneTop10Questions] = useState('metropole')
	const [switchZoneFlop10Questions, setSwitchZoneFlop10Questions] = useState('metropole')

	const [nbResponses, setNbResponses] = useState(0);
	const [nbCompletedQuiz, setNbCompletedQuiz] = useState(0);
	const [nbOrders7days, setNbOrders7days] = useState(0);
	const [percentUserLowQuizTime, setPercentUserLowQuizTime] = useState(0);

	const fetchOrders = async () => {
		const now = new Date().getTime()
		const sevenDaysAgo = now - (7 * 24 * 60 * 60 * 1000)
		const data = await request('/commandes/count', {
			method: 'GET',
			params: {
				created_at_gte: sevenDaysAgo
			}
		})

		setNbOrders7days(data);
	}

  const fetchStocks = async () => {
		const data = await request('/boxes', {
			method: 'GET',
			params: {},
		});
		setBoxes(
			orderBy(
				data.map((box) => {
					if (box.stock < 100) {
						box.fill = '#e74c3c'
					} else if (box.stock < 500) {
						box.fill = '#f39c12'
					} else {
						box.fill = '#007eff'
					}

					return box
				}), 
				['number'], 
				['asc']
			)
		)
  };

	const fetchResponses = async () => {
		const themes = await request('/thematiques', {
			method: 'GET',
			params: {
				'display_quiz': true
			},
		});

		const count = await request('/reponses/count', {
			method: 'GET',
			params: {},
		});

		setNbResponses(count);

		const data = await request('/reponses', {
			method: 'GET',
			params: {
				_limit: 10000
			},
		});

		const tmpResponsesMetropole = []
		const tmpResponsesGuyane = []

		themes.forEach((theme) => {
			const rs = data.filter((response) => {
				return response.question.theme === theme.id
			})
			let countRightAnswers = 0
			let countBadAnswers = 0

			rs.forEach((r) => {
				if (r.question.responses.right_answer === r.response) {
					countRightAnswers += 1;
				} else {
					countBadAnswers +=1;
				}
			})

			if (theme.environnement.slug === 'metropole') {
				tmpResponsesMetropole.push({
					title: theme.title,
					bonnes: countRightAnswers,
					mauvaises: countBadAnswers,
					percentageRightAnswer: countRightAnswers / (countRightAnswers + countBadAnswers) * 100
				})
			} else if (theme.environnement.slug === 'guyane') {
				tmpResponsesGuyane.push({
					title: theme.title,
					bonnes: countRightAnswers,
					mauvaises: countBadAnswers,
					percentageRightAnswer: countRightAnswers / (countRightAnswers + countBadAnswers) * 100,
				})
			}
		})

		setResponsesMetropole(tmpResponsesMetropole)
		setResponsesGuyane(tmpResponsesGuyane)

		const orderedQuestionsMetropole = _(data)
		.filter(x => {
			const theme = themes.find((t) => t.id === x.question.theme)
			return theme.environnement.slug === 'metropole'
		})
		.groupBy(x => x.question.text_question)
		.map((value, key) => {
			let countRightAnswers = 0;
			let countBadAnswers = 0;

			value.forEach((v) => {
				if (v.question.responses.right_answer === v.response) {
					countRightAnswers += 1;
				} else {
					countBadAnswers += 1;
				}
			})

			return {
				question: key,
				percentageRightAnswers: countRightAnswers / (countRightAnswers + countBadAnswers) * 100
			}
		});

		setTop10QuestionsMetropole(orderedQuestionsMetropole
			.orderBy(['percentageRightAnswers', 'question'], ['desc', 'asc'])
			.splice(0, 9)
			.value()
		)

		setFlop10QuestionsMetropole(orderedQuestionsMetropole
			.orderBy(['percentageRightAnswers', 'question'], ['asc', 'asc'])
			.splice(0, 9)
			.value()
		)

		const orderedQuestionsGuyane = _(data)
		.filter(x => {
			const theme = themes.find((t) => t.id === x.question.theme)
			return theme.environnement.slug === 'guyane'
		})
		.groupBy(x => x.question.text_question)
		.map((value, key) => {
			let countRightAnswers = 0;
			let countBadAnswers = 0;

			value.forEach((v) => {
				if (v.question.responses.right_answer === v.response) {
					countRightAnswers += 1;
				} else {
					countBadAnswers += 1;
				}
			})

			return {
				question: key,
				percentageRightAnswers: countRightAnswers / (countRightAnswers + countBadAnswers) * 100
			}
		});

		setTop10QuestionsGuyane(orderedQuestionsGuyane
			.orderBy(['percentageRightAnswers', 'question'], ['desc', 'asc'])
			.splice(0, 9)
			.value()
		)

		setFlop10QuestionsGuyane(orderedQuestionsGuyane
			.orderBy(['percentageRightAnswers', 'question'], ['asc', 'asc'])
			.splice(0, 9)
			.value()
		)
	}

	const fetchQuizTimes = async () => {

		const count = await request('/quiz-times/count', {
			method: 'GET',
			params: {},
		});
		const countLowerThan30s = await request('/quiz-times/count', {
			method: 'GET',
			params: {
				nb_seconds_lte: 30
			},
		});

		setPercentUserLowQuizTime(countLowerThan30s / count * 100);

		const data = await request('/quiz-times', {
			method: 'GET',
			params: {
				_limit: 10000
			},
		});

		setNbCompletedQuiz(data.length);

		const iterations = _(data).map('quizz_iteration').uniq().sortBy().value();

		const dataGroupedByThemes = _(data).groupBy(x => x.thematique.id)
		.map((value, key) => ({thematique: key, data: value, environnement: value[0].thematique.environnement, title: value[0].thematique.title}))
		.value();

		const dataGroupedByAgeMetropole = _(data)
		.filter(x => x.thematique.environnement === 1)
		.groupBy(x => x.age)
		.map((value, key) => ({age: key, data: value}))
		.value();
		const dataGroupedByAgeGuyane = _(data)
		.filter(x => x.thematique.environnement === 2)
		.groupBy(x => x.age)
		.map((value, key) => ({age: key, data: value}))
		.value();

		const dataGroupedByIterationsMetropole = _(data)
		.filter(x => x.thematique.environnement === 1)
		.groupBy(x => x.iteration)
		.map((value, key) => ({iteration: key, data: value}))
		.value();
		const dataGroupedByIterationsGuyane = _(data)
		.filter(x => x.thematique.environnement === 2)
		.groupBy(x => x.iteration)
		.map((value, key) => ({iteration: key, data: value}))
		.value();


		const tmpQuizTimeByIterationsMetropole = []
		const usedThemesMetropole = []
		const tmpQuizTimeByIterationsGuyane = []
		const usedThemesGuyane = []

		const tmpAverageScoreByThemesMetropole = []
		const tmpAverageScoreByThemesGuyane = []

		const tmpAverageScoreByAgeMetropole = []
		const tmpAverageScoreByAgeGuyane = []

		const tmpAverageScoreByIterationMetropole = []
		const tmpAverageScoreByIterationGuyane = []

		iterations.forEach(i => {
			let pointTimeMetropole = {
				name: i
			}
			let pointTimeGuyane = {
				name: i
			}

			dataGroupedByThemes.forEach((dgbt) => {
				const iterationData = _.filter(dgbt.data, (d) => d.quizz_iteration === i)
				if (iterationData.length) {
					if (dgbt.environnement === 1) {
						pointTimeMetropole[dgbt.title] = _.meanBy(iterationData, (d) => parseInt(d.nb_seconds));
						usedThemesMetropole.push(dgbt.title)
					} else if (dgbt.environnement === 2) {
						pointTimeGuyane[dgbt.title] = _.meanBy(iterationData, (d) => parseInt(d.nb_seconds));
						usedThemesGuyane.push(dgbt.title)
					}
				}
			})

			if (Object.keys(pointTimeMetropole).length > 1)
				tmpQuizTimeByIterationsMetropole.push(pointTimeMetropole)
			if (Object.keys(pointTimeGuyane).length > 1)
				tmpQuizTimeByIterationsGuyane.push(pointTimeGuyane)
		})

		dataGroupedByThemes.forEach((dgbt) => {
			if (dgbt.environnement === 1) {
				tmpAverageScoreByThemesMetropole.push({
					title: dgbt.title,
					score: _.meanBy(dgbt.data, (d) => parseInt(d.score))
				})
			} else if (dgbt.environnement === 2) {
				tmpAverageScoreByThemesGuyane.push({
					title: dgbt.title,
					score: _.meanBy(dgbt.data, (d) => parseInt(d.score))
				})
			}
		})

		dataGroupedByAgeMetropole.forEach((dgba) => {
				tmpAverageScoreByAgeMetropole.push({
					age: dgba.age,
					score: _.meanBy(dgba.data, (d) => parseInt(d.score))
				})
		})
		dataGroupedByAgeGuyane.forEach((dgba) => {
			tmpAverageScoreByAgeGuyane.push({
				age: dgba.age,
				score: _.meanBy(dgba.data, (d) => parseInt(d.score))
			})
		})

		iterations.forEach(i => {
			let pointScoreMetropole = {
				name: i
			}
			let pointScoreGuyane = {
				name: i
			}

			dataGroupedByIterationsMetropole.forEach((dgbi) => {
				const iterationData = _.filter(dgbi.data, (d) => d.quizz_iteration === i)
				if (iterationData.length) {
					pointScoreMetropole['score'] = _.meanBy(iterationData, (d) => parseInt(d.score));
				}
			})

			dataGroupedByIterationsGuyane.forEach((dgbi) => {
				const iterationData = _.filter(dgbi.data, (d) => d.quizz_iteration === i)
				if (iterationData.length) {
					pointScoreGuyane['score'] = _.meanBy(iterationData, (d) => parseInt(d.score));
				}
			})

			if (Object.keys(pointScoreMetropole).length > 1)
				tmpAverageScoreByIterationMetropole.push(pointScoreMetropole)
			if (Object.keys(pointScoreGuyane).length > 1)
				tmpAverageScoreByIterationGuyane.push(pointScoreGuyane)
		})
		
		setQuizTimeUsedThemesMetropole(_.uniq(usedThemesMetropole))
		setQuizTimeByIterationsMetropole(tmpQuizTimeByIterationsMetropole)
		setQuizTimeUsedThemesGuyane(_.uniq(usedThemesGuyane))
		setQuizTimeByIterationsGuyane(tmpQuizTimeByIterationsGuyane)

		setQuizAverageScoreByThemesMetropole(tmpAverageScoreByThemesMetropole)
		setQuizAverageScoreByThemesGuyane(tmpAverageScoreByThemesGuyane)

		setQuizAverageScoreByAgeMetropole(tmpAverageScoreByAgeMetropole)
		setQuizAverageScoreByAgeGuyane(tmpAverageScoreByAgeGuyane)

		setQuizAverageScoreByIterationMetropole(tmpAverageScoreByIterationMetropole)
		setQuizAverageScoreByIterationGuyane(tmpAverageScoreByIterationGuyane)
	}

  useEffect(() => {
    fetchStocks();
		fetchResponses();
		fetchQuizTimes();
		fetchOrders();
  }, [])
  
  const username = get(auth.getUserInfo(), 'firstname', '');

	const ZoneSwitcher = (variable, setter) => {
		return(
			<>
				<button className={`switcher-button ${variable === 'metropole' ? 'active' : ''}`} onClick={() => setter('metropole')}>Métropole</button>
				<button className={`switcher-button ${variable === 'guyane' ? 'active' : ''}`} onClick={() => setter('guyane')}>Guyane</button>
			</>
		)
	}

  return (
    <>
      <Container className="container-fluid">
        <div className="row">
          <div className="col-12">
            <h1><Wave /> Bonjour {username}!</h1>
          </div>
          <div className="col-3 text-center">
						<Block>
							<h2 className="mt-4">
								{nbCompletedQuiz}
							</h2>
							<p>Quiz complétés</p>
						</Block>
					</div>
          <div className="col-3 text-center">
						<Block>
							<h2 className="mt-4">
								{nbResponses}
							</h2>
							<p>Réponses aux questions</p>
						</Block>
					</div>
          <div className="col-3 text-center">
						<Block>
							<h2 className="mt-4">
								{nbOrders7days}
							</h2>
							<p>Commandes passées sur 7 jours</p>
						</Block>
					</div>
          <div className="col-3 text-center">
						<Block>
							<h2 className="mt-4">
								{percentUserLowQuizTime.toFixed(2)} %
							</h2>
							<p>De quiz complétés sous les 30 secondes</p>
						</Block>
					</div>
          <div className="col-6">
							<Block style={{height: '500px', padding: '4rem 3rem 6rem 3rem'}}>
              	<h2>État des stocks par boxes</h2>
								<ResponsiveContainer width="100%" height="100%">
									<BarChart 
											width={150} 
											height={500}
											margin={{
												top: 30,
												right: 30,
												left: 20,
												bottom: 5,
											}}
											data={boxes}>
										<CartesianGrid strokeDasharray="3 3" />
										<Tooltip />
										<XAxis dataKey="number" />
										<YAxis />
											<Bar barSize={40} dataKey="stock">
												{
													boxes.map((entry, index) => (
														<Cell key={index} fill={entry.fill}/>
													))
												}
											</Bar>
									</BarChart>
								</ResponsiveContainer>
							</Block>
          </div>
          <div className="col-6">
							<Block style={{height: '500px', padding: '4rem 3rem 6rem 3rem'}}>
              	<h2>Distribution des réponses par thèmes</h2>
								<div className="zone-switcher">
									{ZoneSwitcher(switchZoneResponses, setSwitchZoneResponses)}
								</div>
								<ResponsiveContainer width="100%" height="100%">
									<BarChart
										width={500}
										height={300}
										data={switchZoneResponses === 'metropole' ? responsesMetropole : responsesGuyane}
										margin={{
											top: 20,
											right: 30,
											left: 20,
											bottom: 40,
										}}
									>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="title" />
										<YAxis />
										<Tooltip />
										<Legend />
										<Bar barSize={60} dataKey="bonnes" stackId="a" fill="#007eff" />
										<Bar barSize={60} dataKey="mauvaises" stackId="a" fill="#e74c3c" />
									</BarChart>
								</ResponsiveContainer>
							</Block>
          </div>
          <div className="col-7">
							<Block style={{height: '501px', padding: '4rem 3rem 6rem 3rem'}}>
              	<h2>Temps de complétion des quizz par itérations</h2>
								<div className="zone-switcher">
									{ZoneSwitcher(switchZoneQuizTimeByIteration, setSwitchZoneQuizTimeByIteration)}
								</div>
								<ResponsiveContainer width="100%" height="100%">
									<LineChart
										width={500}
										height={300}
										data={switchZoneQuizTimeByIteration === 'metropole' ? quizTimeByIterationsMetropole : quizTimeByIterationsGuyane}
										margin={{
											top: 20,
											right: 30,
											left: 20,
											bottom: 40,
										}}
									>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="name" />
										<YAxis />
										<Tooltip />
										<Legend />
										{
											(switchZoneQuizTimeByIteration === 'metropole' ? quizTimeUsedThemesMetropole : quizTimeUsedThemesGuyane).map((theme_name) => {
												return(<Line key={theme_name} type="monotone" dataKey={theme_name} stroke={getRandomColor()} strokeWidth={2} activeDot={{ r: 8 }} />)
											})
										}
									</LineChart>
								</ResponsiveContainer>
							</Block>
          </div>
          <div className="col-5">
							<Block style={{height: '500px', padding: '4rem 3rem 6rem 3rem'}}>
              	<h2>Score moyen par itérations</h2>
								<div className="zone-switcher">
									{ZoneSwitcher(switchZoneQuizAverageScoreByIteration, setSwitchZoneQuizAverageScoreByIteration)}
								</div>
								<ResponsiveContainer width="100%" height="100%">
									<LineChart
									max={12}
										width={500}
										height={300}
										data={switchZoneQuizAverageScoreByIteration === 'metropole' ? quizAverageScoreByIterationMetropole : quizAverageScoreByIterationGuyane}
										margin={{
											top: 20,
											right: 30,
											left: 20,
											bottom: 40,
										}}
									>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="name" />
										<YAxis />
										<Line type="monotone" dataKey="score" stroke="#007eff" strokeWidth={2} activeDot={{ r: 8 }} />
										<Tooltip />
									</LineChart>
								</ResponsiveContainer>
							</Block>
          </div>
					<div className="col-4">
							<Block style={{height: '500px', padding: '4rem 3rem 6rem 3rem'}}>
              	<h2>Score moyen par age</h2>
								<div className="zone-switcher">
									{ZoneSwitcher(switchZoneQuizAverageScoreByAge, setSwitchZoneQuizAverageScoreByAge)}
								</div>
								<ResponsiveContainer width="100%" height="100%">
									<BarChart 
											max={10}
											width={150} 
											height={500}
											margin={{
												top: 30,
												right: 30,
												left: 20,
												bottom: 40,
											}}
											data={switchZoneQuizAverageScoreByAge === 'metropole' ? quizAverageScoreByAgeMetropole : quizAverageScoreByAgeGuyane}>
										<CartesianGrid strokeDasharray="3 3" />
										<Tooltip />
										<XAxis dataKey="age" />
										<YAxis domain={[0, 10]} />
										<Bar barSize={40} dataKey="score" fill="#007eff" />
									</BarChart>
								</ResponsiveContainer>
							</Block>
          </div>
					<div className="col-8">
							<Block style={{height: '500px', padding: '4rem 3rem 6rem 3rem'}}>
              	<h2>Score moyen par thèmes</h2>
								<div className="zone-switcher">
									{ZoneSwitcher(switchZoneQuizAverageScoreByThemes, setSwitchZoneQuizAverageScoreByThemes)}
								</div>
								<ResponsiveContainer width="100%" height="100%">
									<BarChart 
											max={10}
											width={150} 
											height={500}
											margin={{
												top: 30,
												right: 30,
												left: 20,
												bottom: 40,
											}}
											data={switchZoneQuizAverageScoreByThemes === 'metropole' ? quizAverageScoreByThemesMetropole : quizAverageScoreByThemesGuyane}>
										<CartesianGrid strokeDasharray="3 3" />
										<Tooltip />
										<XAxis dataKey="title" />
										<YAxis domain={[0, 10]} />
										<Bar barSize={40} dataKey="score" fill="#007eff" />
									</BarChart>
								</ResponsiveContainer>
							</Block>
          </div>
					<div className="col-6">
							<Block style={{height: '500px', padding: '4rem 3rem 6rem 3rem'}}>
              	<h2>Top 10 questions</h2>
								<div className="zone-switcher">
									{ZoneSwitcher(switchZoneTop10Questions, setSwitchZoneTop10Questions)}
								</div>
								<div className="simple-table">
									<div className="simple-table-row">
										<div className="simple-table-col question-text">
											<b>Question</b>
										</div>
										<div className="simple-table-col question-average">
											<b>%</b>
										</div>
									</div>
									{
										(switchZoneTop10Questions === 'metropole' ? top10QuestionsMetropole : top10QuestionsGuyane).map((q) => {
											return(
												<div key={q.question} className="simple-table-row">
													<div className="simple-table-col question-text">
														{q.question}
													</div>
													<div className="simple-table-col question-average">
														{q.percentageRightAnswers.toFixed(2)}
													</div>
												</div>
											)
										})
									}
								</div>
							</Block>
					</div>
					<div className="col-6">
							<Block style={{height: '500px', padding: '4rem 3rem 6rem 3rem'}}>
              	<h2>Flop 10 questions</h2>
								<div className="zone-switcher">
									{ZoneSwitcher(switchZoneFlop10Questions, setSwitchZoneFlop10Questions)}
								</div>
								<div className="simple-table">
									<div className="simple-table-row">
										<div className="simple-table-col question-text">
											<b>Question</b>
										</div>
										<div className="simple-table-col question-average">
											<b>%</b>
										</div>
									</div>
									{
										(switchZoneFlop10Questions === 'metropole' ? flop10QuestionsMetropole : flop10QuestionsGuyane).map((q) => {
											return(
												<div key={q.question} className="simple-table-row">
													<div className="simple-table-col question-text">
														{q.question}
													</div>
													<div className="simple-table-col question-average">
														{q.percentageRightAnswers.toFixed(2)}
													</div>
												</div>
											)
										})
									}
								</div>
							</Block>
					</div>
        </div>
      </Container>
    </>
  );
};

export default memo(HomePage);