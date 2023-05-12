/* eslint-disable no-unused-vars */
export default function handleResponseFromApi(promise) {
  return new Promise((resolve, reject) => {
    promise
      .then((response) => {
        resolve({ status: 200, body: 'success' });
        console.log('got a response from the API');
      })
      .catch((error) => reject(error));
  });
}
