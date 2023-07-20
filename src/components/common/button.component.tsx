import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ScaledSheet, verticalScale} from 'react-native-size-matters';
import AppColors from '@app/utils/colors';
import Colors from '@app/utils/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  onPress: (param: any) => void;
  text: string;
  style?: Object;
  textStyle?: Object;
  loading?: boolean;
}

const AppButton: React.FC<Props> = ({
  text,
  onPress,
  style,
  textStyle,
  loading,
}) => {
  const insets = useSafeAreaInsets();
  if (loading === true) {
    return (
      <View
        style={[
          styles.container,
          {marginBottom: insets.bottom + verticalScale(5)},
          style,
        ]}>
        <ActivityIndicator size={'small'} color={Colors.buttonText} />
      </View>
    );
  }
  return (
    <TouchableOpacity
      hitSlop={{
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      }}
      style={[
        styles.container,
        {marginBottom: insets.bottom + verticalScale(5)},
        style,
      ]}
      onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  container: {
    minWidth: '93%',
    paddingHorizontal: '20@ms',
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: '11@vs',
    marginTop: '5@vs',
    justifyContent: 'center',
    backgroundColor: AppColors.primary,
    borderRadius: '5@ms',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: '14@ms',
    color: AppColors.buttonText,
  },
});

export default AppButton;
