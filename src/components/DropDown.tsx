import {get_my_circles} from 'api/circle';
import {ICircle} from 'interfaces/ICircle';
import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {theme} from 'styles/theme';
import {showAlert} from 'utils/toast';

interface IProps {
  value: string;
  setValue: (value: string) => void;
}

const DropdownComponent: FC<IProps> = ({value, setValue}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ICircle[]>([]);

  const init = async () => {
    try {
      const {data} = await get_my_circles();
      setData(data?.circles);
      setLoading(false);
    } catch (error) {
      showAlert('Failed to get circles', 'error');
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && {color: theme.colors.primary}]}>
          Select Circle
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && {borderColor: theme.colors.primary},
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="name"
        valueField="_id"
        placeholder={!isFocus ? 'Select Circle' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item._id);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <Ionicons
            style={styles.icon}
            color={isFocus ? theme.colors.primary : 'black'}
            name="sync-circle-outline"
            size={20}
          />
        )}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    // marginTop: 10,
    paddingHorizontal: 0,
  },
  dropdown: {
    height: 50,
    borderColor: '#ddd',
    borderBottomWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

// import {get_my_circles} from 'api/circle';
// import {ICircle} from 'interfaces/ICircle';
// import React, {useEffect, useState} from 'react';
// import {StyleSheet, Text, View} from 'react-native';
// import {Dropdown} from 'react-native-element-dropdown';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import {showAlert} from 'utils/toast';

// // const data = [
// //   {label: '1', value: '1'},
// //   {label: '9', value: '9'},
// //   {label: '99', value: '99'},
// //   {label: '143', value: '143'},
// //   {label: '999', value: '999'},
// //   {label: '9999', value: '9999'},
// // ];

// const BACKGROUND_COLOR = '#3338';

// interface IProps {
//   onSelect: (value: string) => void;
//   selected: string;
// }

// const DropdownComponent: React.FC<IProps> = ({onSelect, selected}) => {
//   const [isFocus, setIsFocus] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState<ICircle[]>([]);

//   const init = async () => {
//     try {
//       const {data} = await get_my_circles();
//       setData(data?.circles);
//       setLoading(false);
//     } catch (error) {
//       showAlert('Failed to get circles', 'error');
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     init();
//   }, []);

//   return (
//     <Dropdown
//       style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
//       placeholderStyle={styles.placeholderStyle}
//       selectedTextStyle={styles.selectedTextStyle}
//       //   inputSearchStyle={styles.inputSearchStyle}

//       iconStyle={styles.iconStyle}
//       containerStyle={{
//         backgroundColor: BACKGROUND_COLOR,
//         // borderWidth: 1,
//         // borderRadius: 10,
//         // borderColor: '#333',
//       }}
//       itemTextStyle={{color: 'white', fontSize: 10}}
//       itemContainerStyle={{
//         paddingVertical: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         // backgroundColor: 'red',
//       }}
//       data={data}
//       // search
//       maxHeight={200}
//       labelField="name"
//       valueField="_id"
//       placeholder={!isFocus ? 'Select circle' : 'Select circle'}
//       //   searchPlaceholder="Search..."
//       value={selected}
//       onFocus={() => setIsFocus(true)}
//       onBlur={() => setIsFocus(false)}
//       activeColor={BACKGROUND_COLOR}
//       onChange={item => {
//         onSelect(item.value);
//         setIsFocus(false);
//       }}
//       //   renderLeftIcon={() => (
//       //     <AntDesign
//       //       style={styles.icon}
//       //       color={isFocus ? 'blue' : 'black'}
//       //       name="Safety"
//       //       size={20}
//       //     />
//       //   )}
//     />
//   );
// };

// export default DropdownComponent;

// const styles = StyleSheet.create({
//   container: {
//     // backgroundColor: 'white',
//     // padding: 16,
//     // backgroundColor: 'white',
//     width: '100%',
//   },
//   dropdown: {
//     // backgroundColor: 'red',
//     width: '100%',
//     borderBottomWidth: 1,
//     borderRadius: 10,
//     borderColor: '#ddd',
//   },
//   icon: {
//     marginRight: 5,
//   },
//   label: {
//     position: 'absolute',
//     // backgroundColor: 'red',
//     left: 22,
//     top: 8,
//     zIndex: 999,
//     paddingHorizontal: 8,
//     fontSize: 16,
//     color: 'white',
//   },
//   placeholderStyle: {
//     fontSize: 16,
//     // color: 'white',
//   },
//   selectedTextStyle: {
//     fontSize: 16,
//     color: 'white',
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
//   inputSearchStyle: {
//     height: 40,
//     fontSize: 16,
//   },
// });
