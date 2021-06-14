const FeedbacksAPI = {
  sendFeedback: async feedback => {
    await fetch('http://localhost:1337/feedbacks', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: feedback.title,
        body: feedback.comment,
        appreciation: feedback.isLiked,
        question: feedback.questionContentId,
      }),
    });
  },
};

export default FeedbacksAPI;
