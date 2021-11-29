import React, { memo, useEffect, useState } from 'react';
import './index.css';
import { Block, Container, Wave } from './components';
import { get, orderBy } from 'lodash';
import { auth } from 'strapi-helper-plugin';
import _ from 'lodash';
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { request } from 'strapi-helper-plugin';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { subDays } from 'date-fns';
import { DateRange } from 'react-date-range';

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

	const [showRangeModal, setShowRangeModal] = useState(false);

	const default_range_date = {
		startDate: new Date(),
		endDate: subDays(new Date(), 7),
		key: 'selection'
	}
	const null_range_date = {
		startDate: undefined,
		endDate: undefined,
		key: 'selection'
	}

	const [dateRanges, setDateRanges] = useState([null_range_date]);
	const [tmpDateRanges, setTmpDateRanges] = useState([default_range_date]);

	const default_params = {
		created_at_gte: dateRanges[0].startDate && dateRanges[0].startDate.getTime(),
		created_at_lte: dateRanges[0].endDate && dateRanges[0].endDate.getTime()
	};
	

	const fetchOrders = async () => {
		const data = await request('/commandes/count', {
			method: 'GET',
			params: default_params.created_at_gte ? default_params : {}
		})

		setNbOrders7days(data);
	}

  const fetchStocks = async () => {
		const data = await request('/boxes', {
			method: 'GET'
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
			params: {'display_quiz': true}
		});

		const count = await request('/reponses/count', {
			method: 'GET',
			params: default_params.created_at_gte ? default_params : {}
		});

		setNbResponses(count);

		const data = await request('/reponses', {
			method: 'GET',
			params: default_params.created_at_gte ? Object.assign({'_limit': 10000}, default_params) : {'_limit': 10000}
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
				occurences: value.length,
				percentageRightAnswers: countRightAnswers / (countRightAnswers + countBadAnswers) * 100
			}
		});

		setTop10QuestionsMetropole(orderedQuestionsMetropole
			.orderBy(['percentageRightAnswers', 'occurences', 'question'], ['desc', 'desc', 'asc'])
			.splice(0, 9)
			.value()
		)

		setFlop10QuestionsMetropole(orderedQuestionsMetropole
			.orderBy(['percentageRightAnswers', 'occurences', 'question'], ['asc', 'desc', 'asc'])
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
				occurences: value.length,
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
			params: default_params.created_at_gte ? default_params : {}
		});
		const countLowerThan30s = await request('/quiz-times/count', {
			method: 'GET',
			params: default_params.created_at_gte ? Object.assign({'nb_seconds_lte': 30}, default_params) : {'nb_seconds_lte': 30}
		});

		setPercentUserLowQuizTime(countLowerThan30s / count * 100);

		const data = await request('/quiz-times', {
			method: 'GET',
			params: default_params.created_at_gte ? Object.assign({'_limit': 10000}, default_params) : {'_limit': 10000}
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

	const fetchAll = () => {
    fetchStocks();
		fetchResponses();
		fetchQuizTimes();
		fetchOrders();
	}

  useEffect(() => {
		fetchAll();
  }, [])


  useEffect(() => {
		if (dateRanges[0].startDate && dateRanges[0].endDate) {
			fetchAll();
		}
  }, [dateRanges])

	useEffect(() => {
		if (showRangeModal) 
			setTmpDateRanges(dateRanges[0].startDate ? dateRanges : [default_range_date])
	}, [showRangeModal])
  
	const userRole = get(auth.getUserInfo(), 'roles[0].code', null);
  const username = get(auth.getUserInfo(), 'firstname', '');

	const formatDate = (date) => {
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();

		return (day.toString().length < 2 ? '0' + day : day) + '/' + (month.toString().length < 2 ? '0' + month : month) + '/' + year;
	}
 
	const ZoneSwitcher = (variable, setter) => {
		return(
			<>
				<button className={`switcher-button ${variable === 'metropole' ? 'active' : ''}`} onClick={() => setter('metropole')}>Métropole</button>
				<button className={`switcher-button ${variable === 'guyane' ? 'active' : ''}`} onClick={() => setter('guyane')}>Guyane</button>
			</>
		)
	}

	const exportData = async (type) => {
		let route = ''
		let csvData = []

		switch (type) {
			case 'contents':
				route = 'contents'
				csvData.push(
					'"Titre";"Contenu";"Thématique"'
				)
				break;
			case 'questions':
				route = 'questions'
				csvData.push(
					'"Question";"Réponse A";"Réponse B";"Réponse C";"Bonne réponse";"Précision";"Nom audio question";"Nom audio réponse";"Thématique"'
				)
				break;
			case 'contacts':
				route = 'contacts'
				csvData.push(
					'"Nom";"Email";"Code postal";"Box";"Zone";"Type"'
				)
				break;
			case 'commandes':
				route = 'commandes'
				csvData.push(
					'"ID";"Date";"Box";"Type";"Zone";"Lieu de rencontre";"Délivrée";"Code postal";"Nom POI";"Envoyée"'
				)
				break;
		}

		let exportParams = {
			_limit: 100000
		}

		if (userRole.includes('pilote-guyane')) {
			switch (type) {
				case 'contents':
				case 'questions':
					exportParams['theme.environnement.slug'] = 'guyane'
					break;
				case 'contacts':
				case 'commandes':
					exportParams['environnement.slug'] = 'guyane'
					break;
			}
		}

		const data = await request('/' + route, {
			method: 'GET',
			params: exportParams
		})
		
		data.forEach((item) => {
			switch (type) {
				case 'contents':
					csvData.push(
						'"' + item.title.replaceAll('"', '\'') + '";"' + item.text.replaceAll('"', '\'') + '";"' + item.theme.title.replaceAll('"', '\'') + '"'
					)
					break;
				case 'questions':
					csvData.push(
						'"' + item.text_question.replaceAll('"', '\'') 
						+ '";"' + item.responses.response_A.replaceAll('"', '\'')
						+ '";"' + item.responses.response_B.replaceAll('"', '\'')
						+ '";"' + item.responses.response_C.replaceAll('"', '\'')
						+ '";"' + item.responses.right_answer.replaceAll('"', '\'')
						+ '";"' + item.text_answer.replaceAll('"', '\'')
						+ '";"' + (item.sound_queston ? item.sound_queston.hash.replaceAll('"', '\'') : '')
						+ '";"' + (item.sound_answer ? item.sound_answer.hash.replaceAll('"', '\'') : '')
						+ '";"' + item.theme.title.replaceAll('"', '\'')
						+ '"'
					)
					break;
				case 'contacts':
					csvData.push(
						'"' + item.name.replaceAll('"', '\'') 
						+ '";"' + item.email.replaceAll('"', '\'')
						+ '";"' + (item.zipcode ? item.zipcode : '')
						+ '";"' + (item.box ? item.box.title.replaceAll('"', '\'') : '')
						+ '";"' + (item.zone ? item.zone.name.replaceAll('"', '\'') : '')
						+ '";"' + (item.type ? item.type.replaceAll('"', '\'') : '')
						+ '"'						
					)
					break;
				case 'commandes':
					let boxName = ''

					if (item.content && item.content[0].__component === 'commandes.box-sur-mesure') {
						boxName = 'Box sur mesure'
					} else if (item.content && item.content[0].__component === 'commandes.box') {
						boxName = item.content[0].box.title
					}

					csvData.push(
						'"' + item.id 
						+ '";"' + new Date(item.created_at)
						+ '";"' + boxName.replaceAll('"', '\'')
						+ '";"' + (item.delivery ? item.delivery.replaceAll('"', '\'') : '')
						+ '";"' + (item.environnement ? item.environnement.name : '')
						+ '";"' + (item.referent ? item.referent.name : '')
						+ '";"' + (item.received ? 'Oui' : 'Non')
						+ '";"' + (item.address_zipcode ? item.address_zipcode : '')
						+ '";"' + (item.poi_name ? item.poi_name : '')
						+ '";"' + (item.sent ? 'Oui' : 'Non')
						+ '"'						
					)
					break;

			}
		})

		var element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csvData.join('\n')));
		element.setAttribute('download', type + '_' + new Date().getTime() + '.csv');

		element.style.display = 'none';
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);
	}

  return (
    <>
      <Container className="container-fluid">
        <div className="row">
          <div className="col-12">
            <h1><Wave /> Bonjour {username}!</h1>
          </div>
					<div className="col-12 mb-5 mt-2">
						<h2>🏋 Exporter vos données</h2>
						<div className="flex justify-between">
							<button className="button button-primary" onClick={() => exportData('contents')}>
								Exporter les contenus
							</button>
							<button className="button button-primary ml-4" onClick={() => exportData('questions')}>
								Exporter les questions
							</button>
							<button className="button button-primary ml-4" onClick={() => exportData('contacts')}>
								Exporter les contacts
							</button>
							<button className="button button-primary ml-4" onClick={() => exportData('commandes')}>
								Exporter les commandes
							</button>
						</div>
					</div>
					<div className="col-12 mb-5 mt-5">
						<h2>🧘 Analyser vos données</h2>
						{
							!dateRanges[0].startDate && (
								<button className="button button-primary" onClick={() => setShowRangeModal(true)}>
									Sélectionner une période
								</button>
							)
						}
						{
							dateRanges[0].startDate && dateRanges[0].endDate && (
								<>
									<div className="selected-date-preview">Du {formatDate(dateRanges[0].startDate)} au {formatDate(dateRanges[0].endDate)}</div>
									<button className="button button-default" onClick={() => setDateRanges([null_range_date])}>
										Annuler la période
									</button>
								</>
							)
						}
						{
							showRangeModal && (
								<div className="tm-modal-backdrop" onClick={() => setShowRangeModal(false)}>
									<div className="tm-modal" onClick={(e) => e.stopPropagation()}>
										<DateRange
											editableDateInputs={false}
											onChange={item => setTmpDateRanges([item.selection])}
											moveRangeOnFirstSelection={false}
											months={1}
											ranges={tmpDateRanges}
										/>
										<div className="tm-modal-footer">
											<button className="button button-default" onClick={() => {
												setDateRanges([null_range_date]);
												setShowRangeModal(false);
											}}>
												Fermer
											</button>
											<button className="button button-primary" onClick={() => {
												setDateRanges(tmpDateRanges)
												setShowRangeModal(false);
											}}>
												Valider
											</button>
										</div>
									</div>
								</div>
							)
						}
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
							<p>Commandes passées</p>
						</Block>
					</div>
          <div className="col-3 text-center">
						<Block>
							<h2 className="mt-4">
								{percentUserLowQuizTime ? percentUserLowQuizTime.toFixed(2) : 0} %
							</h2>
							<p>Quiz complétés sans serieux (&lt;30sec)</p>
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
							<Block style={{height: '500px', padding: '4rem 3rem 6rem 3rem'}}>
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
										<div className="simple-table-col question-occurences">
											<b>Nb</b>
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
													<div className="simple-table-col question-occurences">
														{q.occurences}
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
										<div className="simple-table-col question-occurences">
											<b>Nb</b>
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
													<div className="simple-table-col question-occurences">
														{q.occurences}
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