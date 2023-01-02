import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import Avatar from 'components/Avatar';
import Button from 'components/Button';
import Row from 'components/Row';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {theme} from 'styles/theme';
import Text from 'components/Text';
import Space from 'components/Space';
import {useCustomSelector} from 'store';

interface IProps {
  icon: React.ReactNode;
  content: string;
  setShowEditVisible: (showEditVisible: boolean) => void;
}

const SingleRow: FC<IProps> = ({icon, content, setShowEditVisible}) => {
  const {isEditing} = useCustomSelector(state => state.global);

  return (
    <Row style={{marginVertical: 10, marginLeft: 8}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {icon}
        <Space width={10} />
        <Text color={'#666'} size={17}>
          {content}
        </Text>
      </View>

      {isEditing ? (
        <View style={{justifyContent: 'flex-end'}}>
          <Entypo
            color={theme.colors.primary}
            size={25}
            name="edit"
            style={{
              fontWeight: 'bold',

              fontSize: 21,
            }}
            onPress={() => setShowEditVisible(true)}
          />
        </View>
      ) : null}
    </Row>
  );
};

export default SingleRow;

const styles = StyleSheet.create({});
