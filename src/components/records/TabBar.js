import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import color from 'constants/color';
import Space from '../common/Space';

const TabBar = ({tabNum, setTabNum}) => {
  return (
    <View
      style={{
        backgroundColor: color.background,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          borderBottomColor: '#F3F5F9',
          borderColor: 'transparent',
          borderWidth: 1,
        }}>
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={() => setTabNum(1)}>
          <Text style={[styles.title, tabNum === 1 && {color: color.TextLink}]}>
            Birds
          </Text>
          {tabNum === 1 && (
            <View
              style={{
                backgroundColor: color.TextLink,
                borderRadius: 3,
                width: 32,
                height: 5,
                marginTop: 4,
              }}></View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={() => setTabNum(2)}>
          <Text style={[styles.title, tabNum === 2 && {color: color.TextLink}]}>
            Finances
          </Text>
          {tabNum === 2 && (
            <View
              style={{
                backgroundColor: color.TextLink,
                borderRadius: 3,
                width: 32,
                height: 5,
                marginTop: 4,
              }}></View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={() => setTabNum(3)}>
          <Text style={[styles.title, tabNum === 3 && {color: color.TextLink}]}>
            Eggs
          </Text>
          {tabNum === 3 && (
            <View
              style={{
                backgroundColor: color.TextLink,
                borderRadius: 3,
                width: 32,
                height: 5,
                marginTop: 4,
              }}></View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Sora-Regular',
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 0.25,
    color: color.foundation,
  },
  title2: {
    fontFamily: 'Sora-Regular',
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0.4,
    color: color.foundation,
  },
});

export default TabBar;
