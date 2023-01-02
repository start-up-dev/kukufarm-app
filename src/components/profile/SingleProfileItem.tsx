import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import Row from 'components/Row';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {theme} from 'styles/theme';
import Text from 'components/Text';
import Space from 'components/Space';

interface IProps {
  icon: React.ReactNode;
  text: string;
  subTitle?: string;
  isVerified?: boolean;
  onPress?: () => void;
}

const SingleProfileItem: FC<IProps> = ({
  icon,
  text,
  subTitle,
  isVerified,
  onPress,
}) => {
  const isEditing = true;

  return (
    <Row style={{marginLeft: 8}}>
      {icon}
      <Space width={20} />
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flex: 1,
          borderBottomColor: theme.colors.grey100,
          borderBottomWidth: 0.3,
          paddingVertical: 11,
        }}>
        <Text color={'#666'} size={18}>
          {text}
        </Text>
        <View
          style={{
            justifyContent: 'flex-end',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {isVerified && (
            <Ionicons
              color={theme.colors.primary}
              size={22}
              name="checkmark-circle"
              style={{
                fontWeight: 'bold',
              }}
              // onPress={() => navigationRef.goBack()}
            />
          )}

          {subTitle && (
            <Text color={'#aaa'} size={18}>
              {subTitle}
            </Text>
          )}
          <Space width={8} />
          <Entypo
            color={theme.colors.grey100}
            size={25}
            name="chevron-right"
            style={{
              fontWeight: 'bold',
            }}
            // onPress={() => navigationRef.goBack()}
          />
        </View>
      </TouchableOpacity>
    </Row>
  );
};

export default SingleProfileItem;

const styles = StyleSheet.create({});
