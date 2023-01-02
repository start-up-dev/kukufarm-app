import React, {FC, useEffect, useRef, useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import Popover from 'react-native-popover-view';
import {MAX_EMERGENCY_CONTACT} from 'config/constants';
import {Icons} from 'icon/icons';
import {theme} from 'styles/theme';
import UpgradePremiumDialog from 'components/dialogs/UpgradePremiumDialog';
import Feather from 'react-native-vector-icons/Feather';
import {navigationRef} from 'utils/navigation';
import {useCustomDispatch, useCustomSelector} from 'store';
import {ICircle} from 'interfaces/ICircle';
import CommonDialog from 'components/dialogs/CommonDialog';
import {showAlert} from 'utils/toast';
import {delete_circle, update_circle} from 'api/circle';
import {removeCircle, updateCircleName} from 'store/reducers/circles';
import Text from 'components/Text';

interface IProps {
  circleStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  circleId: string;
  circleNE: string;
}

const countTotalCircle = (circles: any[]) => {
  let total = 0;
  circles.forEach(element => {
    total += element.data.length;
  });

  return total;
};

const PopoverComp: FC<IProps> = ({
  circleStyle,
  children,
  circleId,
  circleNE,
}) => {
  const [showPopover, setShowPopover] = useState(false);
  const [isVisiblePremium, setIsVisiblePremium] = useState(false);
  // const {userData} = useCustomSelector(state => state.auth);
  const updateCircleRef = useRef(null);
  const deleteCircleRef = useRef(null);
  const [showUpdateCircle, setShowUpdateCircle] = useState(false);
  const {userData} = useCustomSelector(state => state.auth);

  const [showDeleteCircle, setShowDeleteCircle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [circleName, setCircleName] = useState(circleNE);
  const dispatch = useCustomDispatch();

  const {circles} = useCustomSelector(state => state.circles);

  // const checkIfPremium = () => {
  //   const {shares = [], emergencies = []} = contacts;
  //   const checkContactLength = share ? shares.length : emergencies.length;
  //   if (auth?.userData?.isPurchased) {
  //     return true;
  //   } else {
  //     if (checkContactLength < MAX_EMERGENCY_CONTACT) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }
  // };

  const onDeleteCircle = async () => {
    setLoading(true);
    try {
      await delete_circle(circleId);
      dispatch(removeCircle({circleId}));
      setShowDeleteCircle(false);
      setLoading(false);
    } catch (error) {
      showAlert(error?.message || 'Delete Circle failed!');
      console.log(error?.message);
      setLoading(false);
    }
  };

  const checkIfPremium = () => {
    if (userData?.isPurchased) {
      setShowPopover(true);
    } else if (countTotalCircle(circles) < MAX_EMERGENCY_CONTACT) {
      setShowPopover(true);
    } else {
      setIsVisiblePremium(true);
    }
  };

  const onPressUpdateCircle = async () => {
    if (!circleName) return;
    let trimText = circleName.trim();
    setLoading(true);
    try {
      const payload = {
        name: trimText,
      };
      if (circleId) {
        const {data} = await update_circle(circleId, payload);
        dispatch(updateCircleName({circleId, circleName}));
        showAlert('Circle updated successfully', 'success');
      }

      setCircleName('');
      setLoading(false);
      setShowUpdateCircle(false);
    } catch (error) {
      showAlert('Failed to create circle', 'error');
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      clearInterval(updateCircleRef.current);
      clearInterval(deleteCircleRef.current);
    };
  }, []);

  return (
    <>
      <Popover
        from={
          <TouchableWithoutFeedback
            onPress={checkIfPremium}
            style={[circleStyle]}>
            {children || (
              <Feather
                color={theme.colors.black}
                size={25}
                name="more-vertical"
                style={{
                  fontWeight: 'bold',
                  ...inlineStyles.headerIcon,
                }}
              />
            )}
          </TouchableWithoutFeedback>
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
                params: {
                  circleId: circleId,
                },
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
              // onAddContact();
              navigationRef.navigate('OtherStack', {
                screen: 'Contacts',
                params: {circleId: circleId},
              });
              setShowPopover(false);
            }}
            style={inlineStyles.button}>
            <Text style={inlineStyles.text}>Add existing</Text>
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
              // onAddContact();
              // setUpdate(true);
              setShowPopover(false);
              updateCircleRef.current = setTimeout(() => {
                setShowUpdateCircle(true);
              }, 500);
            }}
            style={inlineStyles.button}>
            <Text style={inlineStyles.text}>Rename Circle</Text>
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
              // onAddContact();
              // setIsDeleteCircle(true);
              setShowPopover(false);
              deleteCircleRef.current = setTimeout(() => {
                setShowDeleteCircle(true);
              }, 500);
            }}
            style={inlineStyles.button}>
            <Text style={inlineStyles.text}>Delete Circle</Text>
          </TouchableOpacity>
        </>
      </Popover>

      <CommonDialog
        isVisible={showDeleteCircle}
        onCloseDialog={() => setShowDeleteCircle(!showDeleteCircle)}
        onPressCancel={() => setShowDeleteCircle(!showDeleteCircle)}
        onPressConfirm={onDeleteCircle}
        confirmButtonStyle={{
          backgroundColor: theme.colors.primary,
        }}
        title="Alert!"
        confirmText={'Yes'}
        cancelText="No"
        loading={loading}>
        <Text size={17} style={{alignSelf: 'center'}} color={'#444'}>
          Are you sure want to delete this circle?
        </Text>
      </CommonDialog>

      <CommonDialog
        isVisible={showUpdateCircle}
        onCloseDialog={() => setShowUpdateCircle(!showUpdateCircle)}
        onPressCancel={() => setShowUpdateCircle(!showUpdateCircle)}
        onPressConfirm={onPressUpdateCircle}
        confirmButtonStyle={{
          backgroundColor: theme.colors.primary,
        }}
        title={'Update Your Circle Name'}
        confirmText={'Update'}
        cancelText="Cancel"
        loading={loading}>
        {/* <Text size={17} style={{alignSelf: 'center'}} color={'#444'}>
          Please take the time to subscribe. Your Check In matters.
        </Text> */}
        <TextInput
          style={{
            fontSize: 18,
            color: theme.colors.primary,
            borderBottomColor: theme.colors.primary,
            borderBottomWidth: 1.4,
            paddingVertical: 5,
            marginVertical: 15,
            width: '90%',
            alignSelf: 'center',
            textAlign: 'center',
          }}
          placeholder="Circle name"
          onChangeText={setCircleName}
          value={circleName}
        />
      </CommonDialog>

      <UpgradePremiumDialog
        isVisible={isVisiblePremium}
        onCloseDialog={() => setIsVisiblePremium(false)}
        title={'Create Your Circle Member'}
      />
    </>
  );
};

export default PopoverComp;

const inlineStyles = StyleSheet.create({
  circleBackground: {
    backgroundColor: theme.colors.primary,
    borderRadius: 100,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: {
    // color: 'white',
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
