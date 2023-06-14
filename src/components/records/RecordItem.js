import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import color from 'constants/color';
import {navigationRef} from 'utils/navigation';

const right = require('assets/images/right.png');

const RecordItem = ({title, subtitle, archive}) => {
  const navigation = useNavigation();
  return (
    <View
      style={[
        {
          backgroundColor: '#fff',
          //margin: 4,
          borderRadius: 7,
        },
        archive && {paddingHorizontal: 10, margin: 4},
      ]}>
      <View
        style={{
          paddingVertical: 16,
          borderBottomColor: '#F3F5F9',
          borderColor: 'transparent',
          borderWidth: 1,
        }}>
        <TouchableOpacity
          onPress={() => navigationRef.navigate('RecordDetails')}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Text
              style={{
                fontFamily: 'Sora-Regular',
                fontSize: 16,
                lineHeight: 24,
                letterSpacing: 0.5,
                color: color.foundation,
              }}>
              {title}
            </Text>
            <Text
              style={{
                fontFamily: 'Sora-Regular',
                fontSize: 12,
                lineHeight: 20,
                letterSpacing: 0.4,
                color: '#5B5E67',
              }}>
              {subtitle}
            </Text>
          </View>
          {!archive && (
            <Image
              source={right}
              style={{width: 5, height: 8, resizeMode: 'contain'}}
            />
          )}
        </TouchableOpacity>
      </View>
      {archive && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 8,
            marginRight: 10,
          }}>
          <TouchableOpacity>
            <Text
              style={{
                fontFamily: 'Sora-Regular',
                fontSize: 14,
                lineHeight: 24,
                letterSpacing: 0.25,
                color: color.TextLink,
              }}>
              Restore to coop
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={{
                fontFamily: 'Sora-Regular',
                fontSize: 14,
                lineHeight: 24,
                letterSpacing: 0.25,
                color: color.TextLink,
              }}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default RecordItem;
