import {Users} from '@app/entities/users.entities';
import firestore from '@react-native-firebase/firestore';

export const getAllUsers = async (): Promise<Array<Users>> => {
  const result: Array<Users> = [];
  await firestore()
    .collection('users')
    .orderBy('score', 'desc')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        const user = documentSnapshot.data();
        const item: Users = {
          id: documentSnapshot.id,
          username: user.username,
          fullName: user.full_name,
          score: user.score,
        };
        result.push(item);
      });
    });
  return result;
};
