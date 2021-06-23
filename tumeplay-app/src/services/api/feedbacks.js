const FeedbacksAPI = {
  sendFeedback: async feedback => {
    await fetch(process.env.REACT_APP_API_URL + '/feedbacks', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: feedback.title ? feedback.title : '∅',
        body: feedback.comment ? feedback.comment : '∅',
        appreciation: feedback.isLiked,
        question: feedback.questionContentId,
      }),
    });
  },
};

export default FeedbacksAPI;
