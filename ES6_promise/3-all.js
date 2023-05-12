/* eslint-disable no-unused-vars */
import { uploadPhoto, createUser } from './utils';

export default function handleProfileSignup() {
  uploadPhoto().then((response) => {
    console.log(response.body);
  }).catch((error) => {
    console.error(error);
  });

  createUser().then((response) => {
    console.log(response.firstName);
    console.log(response.lastName);
  }).catch((error) => {
    console.error(('Signup system offline'));
  });
}
