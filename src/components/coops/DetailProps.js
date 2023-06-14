import {Text} from 'react-native';
import {View} from 'react-native';
import color from 'constants/color';

const DetailProps = ({title, value}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 6,
      }}>
      <Text
        style={{
          fontFamily: 'Sora-Regular',
          fontSize: 16,
          lineHeight: 24,
          letterSpacing: 0.5,
          color: color.TextSecondary,
        }}>
        {title}
      </Text>
      <Text
        style={{
          fontFamily: 'Sora-Regular',
          fontSize: 16,
          lineHeight: 24,
          letterSpacing: 0.5,
          color: color.foundation,
        }}>
        {value}
      </Text>
    </View>
  );
};

export default DetailProps;
