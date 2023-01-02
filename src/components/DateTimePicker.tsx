import {set_checkIn_time} from 'api/checkIn';
import {Tutorial} from 'interfaces/IConfig';
import React, {FC, useState} from 'react';
import {Button, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useCustomDispatch} from 'store';
import {updateAuthStore} from 'store/reducers/auth';
import {updateTutorialStep} from 'store/reducers/tutorial';
import {showAlert} from 'utils/toast';

interface IProps {
  isDatePickerVisible: boolean;
  setDatePickerVisibility: (isDatePickerVisible: boolean) => void;
  setCheckInTime: boolean;
}
const DateTimePicker: FC<IProps> = ({
  isDatePickerVisible,
  setDatePickerVisibility,
  setCheckInTime,
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useCustomDispatch();
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = async (date: any) => {
    setLoading(true);
    try {
      const payload = {
        timestamp: date.getTime(),
      };
      const {data} = await set_checkIn_time(payload);
      dispatch(
        updateAuthStore({
          checkInTime: data?.user?.checkInTime,
        }),
      );
      setLoading(false);
      hideDatePicker();
      showAlert('Check in time updated successfully', 'success');
      if (setCheckInTime) {
        dispatch(updateTutorialStep(Tutorial.DO_CHECK_IN));
      }
    } catch (error) {
      showAlert('Failed to set check in time', 'error');
      setLoading(false);
    }
  };

  return (
    <DateTimePickerModal
      isVisible={isDatePickerVisible}
      mode="time"
      onConfirm={handleConfirm}
      onCancel={hideDatePicker}
    />
  );
};

export default DateTimePicker;
