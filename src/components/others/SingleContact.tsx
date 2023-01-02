import Avatar from 'components/Avatar';
import Space from 'components/Space';
import Text from 'components/Text';
import React, {memo} from 'react';
import {TouchableOpacity, View, Image} from 'react-native';
import {theme} from 'styles/theme';

const Contact = (props: any) => {
  const {contact} = props;
  let {displayName, phoneNumbers, emailAddresses, hasThumbnail, thumbnailPath} =
    contact;

  return (
    <TouchableOpacity
      style={{
        marginTop: 18,
        flexDirection: 'row',
        alignItems: 'center',
      }}
      onPress={() => props.onSelect(contact)}>
      {hasThumbnail ? (
        <Image source={{uri: thumbnailPath}} />
      ) : (
        <View
          style={{
            backgroundColor: theme.colors.primary,
            width: 55,
            height: 55,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text color={theme.colors.white} size={30}>
            {displayName[0]}
          </Text>
        </View>
      )}
      <Space width={18} />
      <View>
        <Text size={20}>{displayName}</Text>
        {phoneNumbers.map(({number}, index) => (
          <Text size={16} color={'#888'}>
            {number}
          </Text>
        ))}
        {emailAddresses.map(({email}, index) => (
          <Text size={16} color={'#888'}>
            {email}
          </Text>
        ))}
      </View>
    </TouchableOpacity>
  );
};

export default memo(Contact);
