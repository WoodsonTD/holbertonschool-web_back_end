/* eslint-disable no-unused-vars */
import { uploadPhoto, createUser } from './utils';

export default function handleProfileSignup() {
  Promise.all([uploadPhoto(), createUser()])
    .then(([photoResponse, userResponse]) => {
      console.log(photoResponse.body);
      console.log(userResponse.firstName);
      console.log(userResponse.lastName);
    })
    .catch((error) => {
      console.error('Signup system offline');
    });
}
