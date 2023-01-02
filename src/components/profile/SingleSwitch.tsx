import {StyleSheet, Switch, View} from 'react-native';
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
  isEnabled: boolean;
  toggleSwitch: (isEnabled: boolean) => void;
}

const SingleProfileSwitch: FC<IProps> = ({
  icon,
  text,
  toggleSwitch,
  isEnabled = true,
}) => {
  return (
    <Row style={{marginLeft: 8}}>
      {icon}
      <Space width={20} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flex: 1,
          borderBottomColor: theme.colors.grey100,
          borderBottomWidth: 0.3,
          paddingVertical: 11,
          alignItems: 'center',
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
          <Switch
            trackColor={{false: '#767577', true: `${theme.colors.secondary}dd`}}
            thumbColor={isEnabled ? theme.colors.primary : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
    </Row>
  );
};

export default SingleProfileSwitch;

const styles = StyleSheet.create({});
