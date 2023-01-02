import React, {useCallback, useMemo, useRef, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import RNBottomSheet from '@gorhom/bottom-sheet';
import {theme} from 'styles/theme';

interface IProps {
  children?: React.ReactNode;
  modalRef?: React.MutableRefObject<null>;
  onClose?: (n: number) => void;
  contentContainerStyle?: StyleProp<ViewStyle>;
  snapPoints?: number[];
  flat?: boolean;
}
const BottomSheet = ({
  children,
  modalRef,
  onClose = (n: number) => {},
  contentContainerStyle,
  snapPoints,
  flat,
  ...rest
}: IProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      onClose(index);
      setIsModalVisible(false);
    } else {
      setIsModalVisible(true);
    }
  }, []);

  const getSnapPoints = useMemo(() => snapPoints || [1, 280], []);
  return (
    <>
      {isModalVisible && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => modalRef?.current?.close()}
          style={styles.cover}
        />
      )}
      <RNBottomSheet
        {...rest}
        ref={modalRef}
        index={-1}
        snapPoints={getSnapPoints}
        onChange={handleSheetChanges}
        backgroundComponent={() => null}
        handleComponent={() => null}
        enablePanDownToClose={true}
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
        <View
          style={[
            styles.contentContainer,
            contentContainerStyle,
            !flat && styles.roundedTop,
          ]}>
          {children}
        </View>
      </RNBottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  cover: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  drop: {
    width: 60,
    height: 5,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.white,
  },
  roundedTop: {
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    overflow: 'hidden',
  },
});

export default BottomSheet;
