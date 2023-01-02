import React, {useCallback, useMemo, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {theme} from 'styles/theme';

import Text from 'components/Text';

import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useCustomSelector} from 'store';
import CustomBackdrop from './CustomBackdrop';

interface IProps {
  selectUploadRef?: any;
}

const SelectContactSheet: React.FC<IProps> = ({selectUploadRef}) => {
  const snapPoints = useMemo(() => [1, 150], []);

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
            style={{marginBottom: 10}}
            onPress={() => onPressItem('camera')}>
            <Text>Camera</Text>
          </TouchableOpacity>
          <View
            style={{width: '100%', height: 1, backgroundColor: '#f1f1f1'}}
          />
          <TouchableOpacity
            style={{marginVertical: 10}}
            onPress={() => onPressItem('gallery')}>
            <Text>
              <Text>Gallery</Text>
            </Text>
          </TouchableOpacity>

          <View
            style={{width: '100%', height: 10, backgroundColor: '#f1f1f1'}}
          />
          <TouchableOpacity
            style={{marginVertical: 10}}
            onPress={() => {
              selectUploadRef.current.close();
            }}>
            <Text bold color="#888">
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetModal>
    </>
  );
};

export default SelectContactSheet;
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
