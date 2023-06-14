import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Icon from './Icon';
import color from 'constants/color';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {deleteFlock, getFlock} from 'api/coop';

const threeDot = require('assets/images/3dot.png');

const PopUp = ({id}) => {
  const [visible, setVisible] = useState(false);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const onDelete = () => {
    toggleDropdown();
    dispatch(deleteFlock(id));
  };

  const renderDropdown = () => {
    if (visible) {
      return (
        <View style={styles.dropdownView}>
          <TouchableOpacity
            onPress={() => {
              toggleDropdown(), navigation.navigate('Archive');
            }}>
            <Text style={styles.menuText}>Archive flock</Text>
            <Text style={styles.desText}>
              Move flock and flock data to Archive. You can view an archived
              flock and its data in the Archived flocks
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete}>
            <Text style={styles.menuText}>Delete flock</Text>
            <Text style={styles.desText}>Delete flock and all flock data</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };
  return (
    <>
      <TouchableOpacity onPress={toggleDropdown}>
        <Icon icon={threeDot} />
      </TouchableOpacity>
      {renderDropdown()}
    </>
  );
};

export default PopUp;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    padding: 12,
    borderRadius: 7,
    borderColor: color.border,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuText: {
    fontFamily: 'Sora-Regular',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
    color: color.foundation,
    marginTop: 10,
    marginBottom: 4,
  },
  desText: {
    fontFamily: 'Sora-Regular',
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0.4,
    color: '#282A38',
    marginBottom: 20,
  },
  dropdownView: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 50,
    right: 0,
    width: 330,
    paddingHorizontal: 30,
    paddingVertical: 16,
    borderRadius: 7,
    shadowColor: 'rgba(28, 39, 49, 0.08)',
    shadowOpacity: 1,
    shadowOffset: {width: 1, height: 1},
  },
});
