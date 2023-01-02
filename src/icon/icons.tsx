import React from 'react';
import FI from 'react-native-vector-icons/Feather';
import AD from 'react-native-vector-icons/AntDesign';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import FA from 'react-native-vector-icons/FontAwesome';
import FTO from 'react-native-vector-icons/Fontisto';
import MI from 'react-native-vector-icons/MaterialIcons';
import EN from 'react-native-vector-icons/Entypo';
import IO from 'react-native-vector-icons/Ionicons';
import OT from 'react-native-vector-icons/Octicons';
import SI from 'react-native-vector-icons/SimpleLineIcons';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import Image from 'components/Image';

import Edit from 'assets/icon/edit.svg';
import Setting from 'assets/icon/setting.svg';
import Settings from 'container/Other/UpdateName';
import {size} from 'lodash';

interface IPropsIconContainer {
  library: any;
  name: string;
  size?: number;
  flat?: boolean;
  color?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}
const Icon = ({
  library,
  name,
  size = 20,
  color,
  onPress,
  style,
}: IPropsIconContainer) => {
  const Library = library;
  return (
    <TouchableOpacity style={style} disabled={!onPress} onPress={onPress}>
      <Library name={name} color={color} size={size} />
    </TouchableOpacity>
  );
};

interface IPropsImageIconContainer {
  icon?: JSX.Element;
  size?: number;
  flat?: boolean;
  color?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}
const ImageIcon = ({
  icon,
  size = 20,
  onPress,
  style,
}: IPropsImageIconContainer) => {
  return (
    <TouchableOpacity style={style} disabled={!onPress} onPress={onPress}>
      <Image
        source={icon}
        style={{
          width: size,
          height: size,
        }}
        size={size}
      />
    </TouchableOpacity>
  );
};

export interface IIconProps {
  size?: number;
  flat?: boolean;
  color?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}
export const Icons = {
  Home: (props: IIconProps) => <Icon library={FI} name="home" {...props} />,
  Live: (props: IIconProps) => <Icon library={FI} name="cast" {...props} />,
  Camera: (props: IIconProps) => (
    <Icon library={OT} name="Octicons" {...props} />
  ),
  Video: (props: IIconProps) => (
    <Icon library={FA} name="video-camera" {...props} />
  ),
  Chat: (props: IIconProps) => <Icon library={FTO} name="hipchat" {...props} />,
  Account: (props: IIconProps) => (
    <Icon library={AD} name="setting" {...props} />
  ),
  Heart: (props: IIconProps) => <Icon library={AD} name="heart" {...props} />,
  Google: (props: IIconProps) => <Icon library={AD} name="google" {...props} />,
  Facebook: (props: IIconProps) => (
    <Icon library={FA} name="facebook" {...props} />
  ),
  Phone: (props: IIconProps) => <Icon library={FA} name="phone" {...props} />,
  Male: (props: IIconProps) => <Icon library={IO} name="male" {...props} />,
  Female: (props: IIconProps) => <Icon library={IO} name="female" {...props} />,
  Settings: (props: IIconProps) => (
    <Icon library={AD} name="setting" {...props} />
  ),
  Edit: (props: IIconProps) => <Icon library={FI} name="edit" {...props} />,
  Right: (props: IIconProps) => <Icon library={AD} name="right" {...props} />,
  Copy: (props: IIconProps) => <Icon library={AD} name="copy1" {...props} />,
  Close: (props: IIconProps) => <Icon library={AD} name="close" {...props} />,
  Plus: (props: IIconProps) => <Icon library={AD} name="plus" {...props} />,
  Headset: (props: IIconProps) => (
    <Icon library={IO} name="headset-sharp" {...props} />
  ),
  People: (props: IIconProps) => (
    <Icon library={IO} name="md-people" {...props} />
  ),
  SwitchCamera: (props: IIconProps) => (
    <Icon library={IO} name="ios-camera-reverse" {...props} />
  ),
  FaceEmoji: (props: IIconProps) => (
    <Icon library={EN} name="emoji-happy" {...props} />
  ),
  Speedometer: (props: IIconProps) => (
    <Icon library={MCI} name="speedometer" {...props} />
  ),
};

export interface IImageIconProps {
  size?: number;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}
export const ImageIcons = {
  Edit: (props: IImageIconProps) => (
    <Edit height={props.size} width={props.size} {...props} />
  ),
  Setting: (props: IImageIconProps) => (
    <Setting height={props.size} width={props.size} {...props} />
  ),
};
