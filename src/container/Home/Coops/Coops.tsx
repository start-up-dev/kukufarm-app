import {
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';

import color from 'constants/color';
import Space from 'components/common/Space';
import AppGuide from 'components/common/AppGuide';
import SingleItem from 'components/coops/SingleItem';
import {useDispatch, useSelector} from 'react-redux';
import {createCoop, getCoop} from 'api/coop';
import Loader from 'components/common/Loader';
import SnackBar from 'components/common/SnackBar';
import {checkIfOnline} from 'utils/checkIfOnline';
import {changeStatusToIdle, createOfflineCoops} from 'store/reducers/coops';
import {createNewOfflineCoops} from 'backgroundTask/coops';
import {getRandomID} from 'utils/getRandomId';

//Images
import archived from 'assets/images/archived.png';
import plus from 'assets/images/plus.png';
import {useCustomSelector} from 'store';

const {width, height} = Dimensions.get('window');

const CoopScreen = () => {
  const [appGuideHide, setAppguideHide] = useState(true);
  const navigation = useNavigation();

  const coop = useCustomSelector(state => state.coops.coop);
  const offlineCoops = useCustomSelector(state => state.coops.offlineCoops);
  // const offlineFlocks = useCustomSelector((state) => state.coop.offlineFlocks);
  const status = useCustomSelector(state => state.coops.status);
  const userData = useCustomSelector(state => state.auth.userData);
  const id = userData?._id;

  const dispatch = useDispatch();

  const onNewCoop = async () => {
    // if (!(coop?.length > 0)) {
    const onlineStatus = await checkIfOnline();

    if (onlineStatus) {
      dispatch(createCoop({id, offlineId: getRandomID()}));
    } else {
      dispatch(createOfflineCoops(id));
    }
    // } else {
    //   Alert.alert(
    //     "Upgrade",
    //     "Upgrade to Medium or Large farm plans to use this feature and more",
    //     [{ text: "OK", onPress: () => console.log("OK Pressed") }],
    //     { cancelable: false }
    //   );
    // }
  };

  useEffect(() => {
    createNewOfflineCoops();
  }, []);

  // useEffect(() => {
  //   if (id) {
  //     if (coop.length === 0) {
  //       dispatch(getCoop(id));
  //     }
  //   }
  // }, [coop, userData]);

  const allCoops = [...coop, ...offlineCoops];
  // console.log("====================================");
  // console.log(allCoops);
  // console.log("====================================");

  return (
    <SafeAreaView style={{backgroundColor: color.background, flex: 1}}>
      <StatusBar />
      <Loader visible={status === 'loading' ? true : false} />
      <ScrollView style={{paddingHorizontal: 20}}>
        <Space height={28} />
        <Text style={styles.title}>Coops</Text>
        <Space height={32} />
        <TouchableOpacity
          onPress={() => navigation.navigate('Archive')}
          style={styles.archivedView}>
          <Image source={archived} style={styles.archivedIcon} />
          <Text style={styles.archivedText}>Archived flocks</Text>
        </TouchableOpacity>
        <Space height={20} />
        <TouchableOpacity style={styles.newCoopView} onPress={onNewCoop}>
          <Image
            source={plus}
            style={{width: 10, height: 10, resizeMode: 'contain'}}
          />
          <Text style={styles.newCoopText}>New Coop</Text>
        </TouchableOpacity>
        <Space height={10} />

        {allCoops.map(item => (
          <SingleItem
            title={item?.name}
            subtitle={`${item?.flocks.length} Flocks`}
            key={item?._id}
            coopId={item?._id}
            link="SingleCoop"
            offlineId={item?.offlineId}
          />
        ))}

        {appGuideHide && <AppGuide onPress={() => setAppguideHide(false)} />}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Sora-SemiBold',
    fontSize: 20,
    lineHeight: 28,
  },
  archivedIcon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
  },
  archivedText: {
    fontFamily: 'Sora-Regular',
    fontSize: 14,
    lineHeight: 24,
    color: color.TextLink,
    marginLeft: 10,
  },
  archivedView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newCoopView: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: color.TextLink,
    borderRadius: 7,
    height: 104,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  newCoopText: {
    fontFamily: 'Sora-Regular',
    color: color.TextLink,
    fontSize: 14,
    marginLeft: 7,
  },
  coopView: {
    borderWidth: 1,
    height: 104,
    borderColor: color.border,
    borderRadius: 7,
    padding: 20,
    justifyContent: 'space-between',
  },
  coopTitle: {
    fontFamily: 'Sora-Regular',
    fontSize: 18,
    lineHeight: 24,
    color: color.foundation,
  },
  flockCount: {
    fontFamily: 'Sora-Regular',
    fontSize: 14,
    lineHeight: 24,
    color: color.TextSecondary,
  },
});
export default CoopScreen;

// import React, {useRef, useState} from 'react';
// import Layout from 'components/Layout';
// import {EmergencyStackParamList} from '.';
// import {IScreenProps} from 'interfaces/INavigation';
// import {StyleSheet, TouchableOpacity, View} from 'react-native';
// import {theme} from 'styles/theme';
// import Feather from 'react-native-vector-icons/Feather';
// import {navigationRef} from 'utils/navigation';
// import {useCustomDispatch, useCustomSelector} from 'store';
// import HeaderRadius from 'components/HeaderRadius';
// import PopoverComp from 'components/Popover';
// import FlatListPagination from 'components/FlatListPagination';
// import SingleEmergencyContact from 'components/emergency/SingleEmergencyContact';
// import {clearState, getEmergencies} from 'store/reducers/emergencies';
// import {toggleEditing} from 'store/reducers/global';

// import EmergencyContact from 'components/tutorial/EmergencyContact';
// // import BottomActionSheet from 'components/BottomSheet';

// type IProps = IScreenProps<EmergencyStackParamList, 'Emergency'>;

// const Emergency: React.FC<IProps> = ({navigation, route}) => {
//   // const {loading, users} = useCustomSelector(state => state.inbox.inboxUsers);
//   const dispatch = useCustomDispatch();

//   const isTutorial = route?.params?.isTutorial;

//   // const {userData} = useCustomSelector(state => state.auth);
//   const {isEditing} = useCustomSelector(state => state.global);
//   const {loading, emergencies} = useCustomSelector(state => state.emergencies);

//   const renderItem = ({item, index}: {item: any; index: number}) => {
//     return <SingleEmergencyContact contact={item} />;
//   };

//   return (
//     <Layout darkStatusbar noSpace={isTutorial}>
//       <HeaderRadius
//         title="Emergency Contacts"
//         // showBack
//         options={
//           <View
//             style={{
//               flexDirection: 'row',
//               marginLeft: 'auto',
//             }}>
//             <PopoverComp emergencies={emergencies} />

//             <TouchableOpacity
//               // onPress={this.onEditContact}
//               // disabled={isEditing}
//               style={{
//                 backgroundColor: !isEditing
//                   ? theme.colors.primary
//                   : theme.colors.secondary,
//                 marginLeft: 7,
//                 ...inlineStyles.circleBackground,
//               }}>
//               <Feather
//                 color={theme.colors.black}
//                 size={25}
//                 name="edit"
//                 style={{
//                   fontWeight: 'bold',
//                   ...inlineStyles.headerIcon,
//                   fontSize: 21,
//                 }}
//                 onPress={() => dispatch(toggleEditing())}
//               />
//             </TouchableOpacity>
//           </View>
//         }
//       />
//       <FlatListPagination
//         contentContainerStyle={{paddingHorizontal: theme.size.pageBorder}}
//         // additionalQuery={{
//         //   type: 'friends',
//         //   userId: userData?._id,
//         // }}
//         loading={loading}
//         // totalItem={totalItem}

//         data={emergencies}
//         getApiData={getEmergencies}
//         clearState={clearState}
//         item={renderItem}
//       />

//       {isTutorial && <EmergencyContact />}
//     </Layout>
//   );
// };

// export default Emergency;

// const inlineStyles = StyleSheet.create({
//   circleBackground: {
//     // backgroundColor: theme.colors.primary,
//     borderRadius: 100,
//     width: 38,
//     height: 38,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerIcon: {
//     color: 'white',
//     fontSize: 25,
//   },
// });
