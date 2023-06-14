import {Image, SafeAreaView, TouchableOpacity} from 'react-native';
import {View, Text} from 'react-native';
import color from 'constants/color';
import {useNavigation} from '@react-navigation/native';

import DropdownFarm from './DropdownFarm';
import Icon from '../common/Icon';
import {useSelector} from 'react-redux';
import {navigationRef} from 'utils/navigation';

const dropdown = require('assets/images/dropdown.png');
const profileImg1 = require('assets/images/profileImg1.jpg');
const addPeople = require('assets/images/addPeople.png');

const CoopsHeader = () => {
  const navigation = useNavigation();

  const userData = useSelector(state => state.auth.userData);

  return (
    <SafeAreaView
      style={{
        backgroundColor: color.background,
      }}>
      <View
        style={{
          paddingHorizontal: 20,
          borderBottomColor: '#F3F5F9',
          borderColor: 'transparent',
          borderWidth: 1,
          paddingVertical: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <DropdownFarm data={userData} />

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {userData?.coWorkers?.length > 0 ? (
            <TouchableOpacity
              onPress={() => navigationRef.navigate('FarmUser')}
              style={{flexDirection: 'row'}}>
              <Image
                source={profileImg1}
                style={{
                  borderRadius: 100,
                  width: 32,
                  height: 32,
                  borderWidth: 2,
                  borderColor: '#FCFCFC',
                }}
              />
              <Image
                source={profileImg1}
                style={{
                  borderRadius: 100,
                  width: 32,
                  height: 32,
                  borderWidth: 2,
                  borderColor: '#FCFCFC',
                  position: 'relative',
                  right: 4,
                }}
              />
              <View
                style={{
                  backgroundColor: '#F5F5F5',
                  borderRadius: 100,
                  width: 32,
                  height: 32,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 2,
                  borderColor: '#F5F5F5',
                  position: 'relative',
                  right: 8,
                }}>
                <Text
                  style={{
                    fontFamily: 'Sora-SemiBold',
                    fontSize: 12,
                    lineHeight: 16,
                    color: color.TextSecondary,
                  }}>
                  +2
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => navigation.navigate('FarmUser')}
              style={{flexDirection: 'row'}}>
              <Image
                source={
                  userData?.picture ? {uri: userData?.picture} : profileImg1
                }
                style={{
                  borderRadius: 100,
                  width: 32,
                  height: 32,
                  borderWidth: 2,
                  borderColor: '#FCFCFC',
                }}
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={{marginLeft: 15}}
            onPress={() =>
              navigationRef.navigate('OtherStack', {screen: 'AddPeople'})
            }>
            <Icon icon={addPeople} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CoopsHeader;
