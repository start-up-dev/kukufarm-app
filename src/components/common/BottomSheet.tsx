import {Text} from 'react-native';
import {View} from 'react-native';
import color from 'constants/color';

const BottomSheet = ({title1, title2}) => {
  return (
    <View
      style={{
        backgroundColor: '#F5F5F5',
        position: 'absolute',
        top: '90%',
        width: '100%',
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        paddingBottom: 50,
      }}>
      <Text
        style={{
          fontFamily: 'Sora-Regular',
          fontSize: 12,
          lineHeight: 20,
          letterSpacing: 0.4,
          color: '#474747',
        }}>
        {title1}
      </Text>
      <Text
        style={{
          fontFamily: 'Sora-Regular',
          fontSize: 12,
          lineHeight: 20,
          letterSpacing: 0.4,
          color: '#474747',
        }}>
        {title2}
      </Text>
    </View>
  );
};

export default BottomSheet;
