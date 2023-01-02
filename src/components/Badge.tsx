import {View, StyleSheet, ColorValue} from 'react-native';
import React from 'react';
import {IIconProps} from 'icon/icons';
import Text from './Text';
import Space from './Space';

const Badge = (props: {
  icon?: (props: IIconProps) => JSX.Element;
  iconProps?: IIconProps;
  value: string;
  backgroundColor?: ColorValue | undefined;
}) => {
  const Icon = props.icon;
  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: props.backgroundColor,
        },
      ]}>
      {!!Icon && (
        <>
          <Icon style={{marginBottom: -1}} color="white" size={10} {...props.iconProps}/>
          <Space width={5} />
        </>
      )}
      <Text bold size={10} dark>
        {props.value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 7,
  },
});

export default Badge;
