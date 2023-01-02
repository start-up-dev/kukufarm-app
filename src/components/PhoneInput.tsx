import React, {useEffect, useRef, useState} from 'react';

import PhoneInput from 'react-native-phone-number-input';
import {View} from 'react-native';
import * as RNLocalize from 'react-native-localize';
import Text from './Text';

export const RnLabelPhoneNumberInput = React.forwardRef(
  (
    {
      error,
      wrapperStyle,
      textContainerStyle,
      defaultCode,
      containerStyle,
      setCountryCode,
      ...rest
    },
    ref,
  ) => {
    useEffect(() => {
      return () => {
        if (setCountryCode) {
          setCountryCode('');
        }
      };
    }, []);

    return (
      <>
        <View style={{marginVertical: 15}}>
          <Text style={{marginLeft: 30, color: 'gray'}}>Phone</Text>
          <View
            style={{
              flexDirection: 'row',
              borderBottomColor: '#e1e1e1',
              borderBottomWidth: 1,
              paddingBottom: 7,
              ...wrapperStyle,
            }}>
            {/* <Icon active name={icon} style={{color: Material.brandWarning}} /> */}
            {/* <TextInput
            style={{
              flex: 1,
              marginLeft: 5,
              fontSize: 18,
              color: Material.brandPrimary,
            }}
            placeholder={placeholder || 'Enter contact name'}
            onChangeText={onChangeText}
            value={value}
          /> */}

            <PhoneInput
              ref={ref}
              // defaultValue={value}
              // defaultValue={value}
              layout="first"
              // onChangeText={(text) => {
              //   // props.handleChange("phone");
              //   console.log(text);
              // }}
              // onChangeFormattedText={(text) => {
              //   console.log(text);
              // }}
              // withDarkTheme
              // withShadow
              // autoFocus
              keyboardType="phone-pad"
              containerStyle={{
                marginLeft: -12,
                backgroundColor: 'transparent',
                // borderRadius: 5,
                marginBottom: -6,
                ...containerStyle,
                // backgroundColor: "#181829",
                //   ...CommonStyles.shadow,
              }}
              // textInputStyle={{ color: "#ffffff" }}
              // codeTextStyle={{ color: "#ffffff" }}
              // flagButtonStyle={{ color: "#ffffff" }}
              textContainerStyle={{
                borderRadius: 5,
                color: '#ffffff',
                paddingVertical: 10,
                marginLeft: -10,
                backgroundColor: 'transparent',
                ...textContainerStyle,
              }}
              placeholder="4041112222"
              phoneInputContainer={true}
              textInputProps={{placeholderTextColor: '#999999'}}
              {...rest}
              // defaultCode={defaultCode}
              defaultCode={'US'}
            />
          </View>
          {/* {!!error ? null : (
            <Text style={{marginLeft: 0, color: 'gray'}}>
              <Text style={{fontWeight: 'bold'}}>Hint:</Text> Without
              parenthesis and country code
            </Text>
          )} */}
        </View>

        {!!error ? (
          <Text
            style={{
              alignSelf: 'flex-start',
              marginBottom: error ? 10 : 0,
              color: 'error',
              marginTop: -10,
              color: 'red',
            }}>
            {error}
          </Text>
        ) : null}
      </>
    );
  },
);

export const RnPhoneNumberInput = React.forwardRef(
  ({value, defaultCode, textContainerStyle, ...rest}, ref) => {
    return (
      <PhoneInput
        ref={ref}
        // defaultValue={value}
        defaultValue={value}
        // defaultCode="US"
        defaultCode={defaultCode || RNLocalize.getCountry()}
        layout="first"
        // onChangeText={(text) => {
        //   // props.handleChange("phone");
        //   console.log(text);
        // }}
        // onChangeFormattedText={(text) => {
        //   console.log(text);
        // }}
        // withDarkTheme
        // withShadow
        // autoFocus
        keyboardType="phone-pad"
        containerStyle={{
          marginLeft: -12,
          // borderRadius: 5,
          // marginBottom: 10,
          backgroundColor: 'transparent',
          //   ...CommonStyles.shadow,
        }}
        // textInputStyle={{ color: "#ffffff" }}
        // codeTextStyle={{ color: "#ffffff" }}
        // flagButtonStyle={{ color: "#ffffff" }}
        textContainerStyle={{
          backgroundColor: 'transparent',
          borderRadius: 5,
          color: '#ffffff',
          paddingVertical: 10,
          marginLeft: -10,
          ...textContainerStyle,
        }}
        placeholder="Phone Number"
        phoneInputContainer={true}
        textInputProps={{placeholderTextColor: '#999999'}}
        {...rest}
      />
    );
  },
);

export default RnPhoneNumberInput;
