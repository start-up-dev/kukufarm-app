import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import color from 'constants/color';
import {useState} from 'react';
import Icon from '../common/Icon';

const dropdown = require('assets/images/dropdownMini.png');

const TitleCollumn = ({tabNum, filterNum, setFilterNum}) => {
  const [visible, setVisible] = useState(false);

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const filter1 = () => {
    setVisible(!visible);
    setFilterNum(1);
  };

  const filter2 = () => {
    setVisible(!visible);
    setFilterNum(2);
  };

  const filter3 = () => {
    setVisible(!visible);
    setFilterNum(3);
  };

  const filter4 = () => {
    setVisible(!visible);
    setFilterNum(4);
  };

  const filterText = () => {
    switch (filterNum) {
      case 1:
        return 'Day';
        break;
      case 2:
        return 'Week';
        break;
      case 3:
        return 'Month';
        break;
      case 4:
        return 'To date';
        break;
    }
  };

  const tabUnitText = () => {
    switch (tabNum) {
      case 1:
        return 'Mortality rate (%)';
        break;
      case 2:
        return 'KSH';
        break;
      case 3:
        return 'Production rate (%)';
        break;
    }
  };

  const tabTypeText = () => {
    switch (tabNum) {
      case 1:
        return 'Live Stock';
        break;
      case 3:
        return 'Total';
        break;
    }
  };

  const renderDropdown = () => {
    if (visible) {
      return (
        <View
          style={{
            backgroundColor: '#fff',
            position: 'absolute',
            top: 80,
            left: 20,
            paddingHorizontal: 30,
            paddingVertical: 16,
            borderRadius: 7,
            shadowColor: 'rgba(28, 39, 49, 0.08)',
            shadowOpacity: 1,
            shadowOffset: {width: 1, height: 1},
            zIndex: 10,
          }}>
          <TouchableOpacity onPress={filter1}>
            <Text
              style={[
                styles.menuText,
                filterNum === 1 && {color: color.TextLink},
              ]}>
              Day
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={filter2}>
            <Text
              style={[
                styles.menuText,
                filterNum === 2 && {color: color.TextLink},
              ]}>
              Week
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={filter3}>
            <Text
              style={[
                styles.menuText,
                filterNum === 3 && {color: color.TextLink},
              ]}>
              Month
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={filter4}>
            <Text
              style={[
                styles.menuText,
                filterNum === 4 && {color: color.TextLink},
              ]}>
              To date
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  };
  return (
    <>
      <View
        style={{
          paddingVertical: 10,
          justifyContent: 'space-evenly',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: color.background,
          borderBottomColor: '#F3F5F9',
          borderColor: 'transparent',
          borderWidth: 1,
        }}>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderRadius: 7,
            borderColor: color.TextLink,
            padding: 5,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={toggleDropdown}>
          <Text
            style={{
              fontFamily: 'Sora-Regular',
              fontSize: 12,
              lineHeight: 20,
              letterSpacing: 0.4,
              color: color.TextLink,
            }}>
            {filterText()}
          </Text>
          <Icon icon={dropdown} sm />
        </TouchableOpacity>

        {tabNum !== 2 ? (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                width: 16,
                height: 12,
                backgroundColor: color.foundation,
                borderRadius: 7,
                marginRight: 4,
              }}></View>
            <Text style={styles.title2}>{tabTypeText()}</Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: 16,
                  height: 12,
                  backgroundColor: color.foundation,
                  borderRadius: 7,
                  marginRight: 4,
                }}></View>
              <Text style={styles.title2}>Sales</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 15,
              }}>
              <View
                style={{
                  width: 16,
                  height: 12,
                  backgroundColor: '#8C8C8C',
                  borderRadius: 7,
                  marginRight: 4,
                }}></View>
              <Text style={styles.title2}>Expenses</Text>
            </View>
          </View>
        )}

        <Text style={styles.title2}>{tabUnitText()}</Text>
      </View>
      {renderDropdown()}
    </>
  );
};

const styles = StyleSheet.create({
  title2: {
    fontFamily: 'Sora-Regular',
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0.4,
    color: color.foundation,
  },
  menuText: {
    fontFamily: 'Sora-Regular',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
    color: color.foundation,
    marginVertical: 10,
  },
});

export default TitleCollumn;
