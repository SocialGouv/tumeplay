const ResponsesAPI = {
  publishResponses: async (id, iteration, answer) => {
    const res = await fetch(process.env.REACT_APP_API_URL + '/reponses', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: id,
        question: answer.questionId,
        quizz_iteration: iteration,
        response: answer.givenAnswer
      }),
    });
    return res.ok;
  },
};

export default ResponsesAPI;