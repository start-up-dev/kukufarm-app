import React, {useCallback, useMemo, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {theme} from 'styles/theme';

import Text from 'components/Text';

import {BottomSheetModal} from '@gorhom/bottom-sheet';

import CustomBackdrop from './CustomBackdrop';

import {image_uploader} from 'utils/imageUploader';
import {useCustomDispatch} from 'store';
import {toggleLoader} from 'store/reducers/global';

interface IProps {
  selectUploadRef?: any;
  setAvatar: (url: string) => void;
}

const SelectUploadTypeSheet: React.FC<IProps> = ({
  selectUploadRef,
  setAvatar,
}) => {
  // const [loading, setLoading] = useState(false);

  const dispatch = useCustomDispatch();

  const onPressItem = async (name: string) => {
    let config: any[] = [];

    if (name === 'camera') {
      config = ['C', true, true, 'photo'];
    }

    if (name === 'gallery') {
      config = ['F', true, true, 'photo'];
    }
    // setLoading(true);
    dispatch(toggleLoader());
    try {
      const image = await image_uploader(...config);
      // console.log(image);
      setAvatar(image);
      selectUploadRef.current.close();
      // setLoading(false);
      dispatch(toggleLoader());
    } catch (error) {
      // setLoading(false);
      dispatch(toggleLoader());

      console.log(error);
    }
  };

  const snapPoints = useMemo(() => [1, 170], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
    if (index === 0) {
      selectUploadRef.current.close();
    }
  }, []);

  return (
    <>
      <BottomSheetModal
        backdropComponent={CustomBackdrop}
        ref={selectUploadRef}
        index={1}
        snapPoints={snapPoints}
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,

          elevation: 4,
        }}
        onChange={handleSheetChanges}>
        <View style={styles.contentContainer}>
          <TouchableOpacity
            style={{marginBottom: 12}}
            onPress={() => onPressItem('camera')}>
            <Text size={18} bold>
              Camera
            </Text>
          </TouchableOpacity>
          <View
            style={{width: '100%', height: 1, backgroundColor: '#f1f1f1'}}
          />
          <TouchableOpacity
            style={{marginVertical: 12}}
            onPress={() => onPressItem('gallery')}>
            <Text size={18} bold>
              Gallery
            </Text>
          </TouchableOpacity>

          <View
            style={{width: '100%', height: 10, backgroundColor: '#f1f1f1'}}
          />
          <TouchableOpacity
            style={{marginVertical: 12}}
            onPress={() => {
              selectUploadRef.current.close();
            }}>
            <Text bold size={18} color="#888">
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetModal>
    </>
  );
};

export default SelectUploadTypeSheet;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
