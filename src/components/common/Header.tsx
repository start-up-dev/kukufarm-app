import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';

import color from 'constants/color';
import Icon from './Icon';
import PopUp from './PopUp';
import {navigationRef} from 'utils/navigation';

const left = require('assets/images/left.png');
const deleteIcon = require('assets/images/delete.png');
const threeDot = require('assets/images/3dot.png');

interface IProps {
  title: string;
  back?: boolean;
  record?: boolean;
  edit?: boolean;
  cancel?: boolean;
  save?: boolean;
  empty?: boolean;
  deleted?: boolean;
  dot?: boolean;
}

const Header: React.FC<IProps> = ({
  title,
  back,
  record,
  edit,
  cancel,
  save,
  empty,
  deleted,
  dot,
}) => {
  return (
    <SafeAreaView style={{backgroundColor: color.background}}>
      <View
        style={[
          {
            paddingHorizontal: 20,
            paddingVertical: 10,
          },
          !record && {
            borderBottomColor: '#F3F5F9',
            borderColor: 'transparent',
            borderWidth: 1,
          },
        ]}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          {back && (
            <TouchableOpacity onPress={() => navigationRef.goBack()}>
              <Icon icon={left} />
            </TouchableOpacity>
          )}

          {cancel && (
            <TouchableOpacity onPress={() => navigationRef.goBack()}>
              <Text
                style={{
                  fontFamily: 'Sora-Regular',
                  fontSize: 14,
                  lineHeight: 24,
                  color: color.TextLink,
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
          )}

          <Text
            style={{
              fontFamily: 'Sora-Regular',
              fontSize: 14,
              lineHeight: 24,
              textAlign: 'center',
              color: '#282A38',
            }}>
            {title}
          </Text>

          {edit && (
            <TouchableOpacity
              onPress={() =>
                navigationRef.navigate('OtherStack', {screen: 'EditProfile'})
              }>
              <Text
                style={{
                  fontFamily: 'Sora-Regular',
                  fontSize: 14,
                  lineHeight: 24,
                  color: color.TextLink,
                }}>
                Edit
              </Text>
            </TouchableOpacity>
          )}

          {save && (
            <TouchableOpacity onPress={save}>
              <Text
                style={{
                  fontFamily: 'Sora-Regular',
                  fontSize: 14,
                  lineHeight: 24,
                  color: color.TextLink,
                }}>
                Save
              </Text>
            </TouchableOpacity>
          )}

          {deleted && (
            <TouchableOpacity
            //onPress={() => navigationRef.navigate("Edit Profile")}
            >
              <Icon icon={deleteIcon} />
            </TouchableOpacity>
          )}

          {dot && <PopUp id={dot} />}

          {empty && <View style={back ? {width: 15} : {width: 45}}></View>}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;
