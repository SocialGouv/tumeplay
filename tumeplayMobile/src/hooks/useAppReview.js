import InAppReview from 'react-native-in-app-review';

export default function useAppReview() {
  const onReview = async () => {
    if (InAppReview.isAvailable()) {
      InAppReview.RequestInAppReview()
        .then(hasFlowFinishedSuccessfully => {
          console.log('InAppReview', hasFlowFinishedSuccessfully);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  return {
    onReview,
  };
}
