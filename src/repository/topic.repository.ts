import {Topic} from '@app/entities/topic.entities';
import firestore from '@react-native-firebase/firestore';

export const getAllTopics = async (): Promise<Array<Topic>> => {
  const result: Array<Topic> = [];
  await firestore()
    .collection('topic')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        const topic = documentSnapshot.data();
        const item: Topic = {
          id: documentSnapshot.id,
          name: topic.name,
          puzzles: topic.puzzles,
        };
        console.log('item result = ', item);
        result.push(item);
      });
    });
  return result;
};
