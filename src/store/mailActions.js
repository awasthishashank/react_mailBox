import axios from 'axios';
import { sendMailSuccess, sendMailError } from './mailReducer';

export const sendMail = (mail) => async (dispatch, getState) => {
  const { auth } = getState();

  try {
    const response = await axios.post(
      `https://mailbox-a09b4-default-rtdb.firebaseio.com/users/${auth.userId}/mails.json?auth=${auth.token}`,
      mail
    );
    dispatch(sendMailSuccess({ ...mail, id: response.data.name }));
  } catch (error) {
    dispatch(sendMailError(error.message));
  }
};
