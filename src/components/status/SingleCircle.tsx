import Avatar from 'components/Avatar';
import SingleEmoji from 'components/SingleEmoji';
import Space from 'components/Space';
import Text from 'components/Text';
import React, {Component, FC, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {theme} from 'styles/theme';
import {ICircleMember, IMyCircle} from 'interfaces/ICircle';
import {remove_member_in_circle} from 'api/circle';
import {removeEmergenciesContact} from 'store/reducers/emergencies';
import {useCustomDispatch} from 'store';
import {showAlert} from 'utils/toast';
import ActivityInd from 'components/ActivityIndicator';
import CommonDialog from 'components/dialogs/CommonDialog';
import {removeCirclesContact} from 'store/reducers/circles';
import {navigationRef} from 'utils/navigation';
import {removeMyCircle} from 'store/reducers/myCircles';

interface IProps {
  member: ICircleMember | IMyCircle;
  circleId: string;
  isMyCircle?: boolean;
}

const SingleCircle: FC<IProps> = ({member, circleId, isMyCircle}) => {
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useCustomDispatch();

  const removeMember = async () => {
    setLoading(true);
    try {
      const {data} = await remove_member_in_circle(circleId, {
        phone_number: member?.phoneNumber,
      });
      if (isMyCircle) {
        dispatch(removeMyCircle(member?._id));
      } else {
        dispatch(removeCirclesContact({circleId, ...member}));
      }
      setLoading(false);
      setIsVisible(!isVisible);
    } catch (error) {
      showAlert(error?.message || 'Failed to add contact', 'error');
      setLoading(false);
    }
  };

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 17,

          marginHorizontal: theme.size.pageBorder,
        }}>
        <TouchableOpacity
          onPress={() =>
            member?._id &&
            navigationRef.navigate('OtherStack', {
              screen: 'TrackList',
              params: {
                trackId: isMyCircle ? member?.circleOwner : member?._id,
              },
            })
          }
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Avatar size={50} />
          <Space width={15} />
          <View>
            <Text size={18} primary style={{fontWeight: '500'}}>
              {member?.circle?.owner?.name || member?.name}
            </Text>
            <Space height={4} />
            <Text color={'#777'}>
              {member?.circle?.owner?.phoneNumber || member?.phoneNumber}
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          {member?.lastCheckInStatus && (
            <SingleEmoji value={member?.lastCheckInStatus} />
          )}
          {member?.circle?.owner?.lastStatus && (
            <SingleEmoji value={member?.circle?.owner?.lastStatus} />
          )}

          <Ionicons
            color={theme.colors.danger}
            onPress={() => setIsVisible(!isVisible)}
            size={25}
            name="close-sharp"
            style={{
              fontWeight: 'bold',
            }}
          />
        </View>
      </View>
      <CommonDialog
        isVisible={isVisible}
        onCloseDialog={() => setIsVisible(!isVisible)}
        onPressCancel={() => setIsVisible(!isVisible)}
        onPressConfirm={removeMember}
        confirmButtonStyle={{
          backgroundColor: theme.colors.primary,
        }}
        title="Alert!"
        confirmText={'Yes'}
        cancelText="No"
        loading={loading}>
        <Text size={17} style={{alignSelf: 'center'}} color={'#444'}>
          Are you sure want to remove this contact?
        </Text>
      </CommonDialog>
    </>
  );
};
export default SingleCircle;
