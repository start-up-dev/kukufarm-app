import React, {FC, useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import Popover from 'react-native-popover-view';
import {MAX_EMERGENCY_CONTACT} from 'config/constants';
import {Icons} from 'icon/icons';
import {theme} from 'styles/theme';
import UpgradePremiumDialog from './dialogs/UpgradePremiumDialog';
import Feather from 'react-native-vector-icons/Feather';
import {navigationRef} from 'utils/navigation';
import {useCustomSelector} from 'store';
import {IEmergency} from 'interfaces/IEmergency';

interface IProps {
  emergencies: IEmergency[];
}

const PopoverComp: FC<IProps> = ({emergencies}) => {
  const [showPopover, setShowPopover] = useState(false);
  const [isVisiblePremium, setIsVisiblePremium] = useState(false);
  const {userData} = useCustomSelector(state => state.auth);

  const checkIfPremium = () => {
    if (userData?.isPurchased) {
      setShowPopover(true);
    } else if (emergencies?.length < MAX_EMERGENCY_CONTACT) {
      setShowPopover(true);
    } else {
      setIsVisiblePremium(true);
    }
  };

  return (
    <>
      <Popover
        from={
          <TouchableOpacity
            onPress={checkIfPremium}
            style={[inlineStyles.circleBackground]}>
            <Feather
              color={theme.colors.black}
              size={25}
              name="plus"
              style={{
                fontWeight: 'bold',
                ...inlineStyles.headerIcon,
              }}
            />
          </TouchableOpacity>
        }
        popoverStyle={{
          backgroundColor: theme.colors.primary,
          borderRadius: 5,
        }}
        isVisible={showPopover}
        onRequestClose={() => setShowPopover(false)}>
        <>
          <TouchableOpacity
            onPress={() => {
              navigationRef.navigate('OtherStack', {
                screen: 'ManuallyAddContact',
              });
              setShowPopover(false);
            }}
            style={inlineStyles.button}>
            <Text style={inlineStyles.text}>Add Manually</Text>
          </TouchableOpacity>
          <View
            style={{
              borderBottomColor: 'gray',
              borderBottomWidth: 1,
              width: '100%',
            }}
          />
          <TouchableOpacity
            onPress={() => {
              navigationRef.navigate('OtherStack', {
                screen: 'Contacts',
              });
              setShowPopover(false);
            }}
            style={inlineStyles.button}>
            <Text style={inlineStyles.text}>Add existing</Text>
          </TouchableOpacity>
        </>
      </Popover>

      <UpgradePremiumDialog
        isVisible={isVisiblePremium}
        onCloseDialog={() => setIsVisiblePremium(false)}
        // onPressUpgrade={onPressUpgrade}
        title={'Emergency Contact'}
      />
    </>
  );
};

export default PopoverComp;

const inlineStyles = StyleSheet.create({
  circleBackground: {
    backgroundColor: theme.colors.primary,
    borderRadius: 100,
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: {
    color: 'white',
    fontSize: 25,
  },
  button: {
    paddingHorizontal: 18,
    paddingVertical: 13,
  },
  text: {
    fontSize: 17,
    color: '#efefef',
  },
});
