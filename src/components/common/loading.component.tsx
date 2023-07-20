import {View, Text, Modal, ActivityIndicator} from 'react-native';
import React from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import AppColors from '@app/utils/colors';

interface Props {
  isLoading: boolean;
  text: string;
}

const AppLoading: React.FC<Props> = ({isLoading, text}: Props) => {
  if (!isLoading) {
    return <></>;
  }
  return (
    <Modal style={styles.modal} transparent={true}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <ActivityIndicator style={styles.loadingIcon} size={'large'} />
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = ScaledSheet.create({
  modal: {
    zIndex: 1100,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backgroundColor: AppColors.modalBackground,
    // backgroundColor: 'red'
  },
  contentContainer: {
    paddingVertical: '20@vs',
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.background,
    borderRadius: '15@ms',
  },
  loadingIcon: {
    paddingHorizontal: '20@ms',
  },
  text: {
    fontSize: '14@ms',
  },
});

export default AppLoading;
