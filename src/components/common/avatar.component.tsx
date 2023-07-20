import {View, Text, ViewStyle, TextStyle} from 'react-native';
import React from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '@app/utils/colors';

interface Props {
  username: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  bigAvatar?: boolean;
}

export default function AppAvatar({
  username,
  style,
  textStyle,
  bigAvatar,
}: Props): JSX.Element {
  if (bigAvatar) {
    return (
      <View style={[styles.bigContainer, style]}>
        <Text style={[styles.bigText, textStyle]}>
          {username[0].toUpperCase()}
        </Text>
      </View>
    );
  }
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.text, textStyle]}>{username[0].toUpperCase()}</Text>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    width: '30@ms',
    height: '30@ms',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    backgroundColor: Colors.profilePictureBackground,
  },
  bigContainer: {
    width: '75@ms',
    height: '75@ms',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    backgroundColor: Colors.profilePictureBackground,
  },
  text: {
    fontSize: '16@ms',
    color: Colors.text,
    fontWeight: 'bold',
  },
  bigText: {
    fontSize: '25@ms',
    color: Colors.text,
    fontWeight: 'bold',
  },
});

AppAvatar.defaultProps = {
  style: {},
  textStyle: {},
  bigAvatar: false,
};
