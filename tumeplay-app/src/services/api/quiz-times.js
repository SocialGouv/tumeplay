const QuizTimesAPI = {
  publishQuizTime: async (user_id, nb_seconds, score, age, iteration, thematique_id) => {
    const res = await fetch(process.env.REACT_APP_API_URL + '/quiz-times', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
				user_id: user_id,
        nb_seconds: nb_seconds,
				score: score,
				age: age,
        quizz_iteration: iteration,
        thematique: thematique_id
      }),
    });
    return res.ok;
  },
};

export default QuizTimesAPI;