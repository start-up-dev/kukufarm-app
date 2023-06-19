import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

import TabBar from 'components/records/TabBar';
import RecordBoxHeader from 'components/records/RecordBoxHeader';
import Space from 'components/common/Space';
import Icon from 'components/common/Icon';
import color from 'constants/color';
import {useRef, useState} from 'react';
import TitleCollumn from 'components/records/TitleCollumn';
import {navigationRef} from 'utils/navigation';

const plusWhite = require('assets/images/plusWhite.png');
const closeIcon = require('assets/images/close.png');

const {width, height} = Dimensions.get('window');

const RecordDetailsScreen = () => {
  const [tab, setTab] = useState(1);
  const [filter, setFilter] = useState(1);

  const refServiceBS = useRef();

  const expenseHandle = () => {
    refServiceBS.current.close();
    navigationRef.navigate('OtherStack', {screen: 'AddFlock'});
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <TabBar tabNum={tab} setTabNum={setTab} />
      <TouchableOpacity
        style={styles.addView}
        onPress={() => refServiceBS.current.open()}>
        <Icon icon={plusWhite} />
      </TouchableOpacity>

      <TitleCollumn tabNum={tab} filterNum={filter} setFilterNum={setFilter} />

      <ScrollView>
        {/* <DateDropdown /> */}

        {tab === 1 && (
          <>
            <RecordBoxHeader filterNum={filter} />
            <RecordBoxHeader filterNum={filter} />
          </>
        )}
        {tab === 2 && (
          <>
            <RecordBoxHeader tabNum={tab} />
            <RecordBoxHeader tabNum={tab} />
          </>
        )}
        {tab === 3 && (
          <>
            <RecordBoxHeader />
            <RecordBoxHeader />
            <RecordBoxHeader />
          </>
        )}

        <Space height={150} />
      </ScrollView>

      <RBSheet
        ref={refServiceBS}
        closeOnDragDown={false}
        closeOnPressMask={false}
        height={354}
        customStyles={{
          container: {
            borderRadius: 7,
          },
        }}>
        <View
          style={{
            paddingHorizontal: 30,
            paddingVertical: 16,
            flex: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View></View>
            <Text style={styles.log}>Log</Text>
            <TouchableOpacity
              style={{
                width: 32,
                height: 32,
                borderRadius: 100,
                backgroundColor: '#F2F1FA',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => refServiceBS.current.close()}>
              <Icon icon={closeIcon} m />
            </TouchableOpacity>
          </View>
          <Space height={30} />
          <View>
            <TouchableOpacity onPress={expenseHandle}>
              <Text style={styles.menuText}>Expense</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={expenseHandle}>
              <Text style={styles.menuText}>Sale</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={expenseHandle}>
              <Text style={styles.menuText}>Eggs collected</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={expenseHandle}>
              <Text style={styles.menuText}>Birds removed</Text>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  addView: {
    zIndex: 1,
    position: 'absolute',
    top: Platform.OS === 'android' ? height - 180 : height - 260,
    left: width - 75,
    right: 0,
    width: 56,
    height: 56,
    borderRadius: 100,
    backgroundColor: color.TextLink,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    fontFamily: 'Sora-Regular',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
    color: color.foundation,
    marginVertical: 15,
  },
  log: {
    fontFamily: 'Sora-Regular',
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: 0.4,
    color: '#595959',
    marginVertical: 10,
  },
});

export default RecordDetailsScreen;
