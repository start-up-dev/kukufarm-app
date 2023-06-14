import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// import emergency_b from 'assets/images/tabs/emergency_b.png';
// import emergency_w from 'assets/images/tabs/emergency_w.png';
// import status_b from 'assets/images/tabs/status_b.png';
// import status_w from 'assets/images/tabs/status_w.png';
// import check_b from 'assets/images/tabs/check_b.png';
// import check_w from 'assets/images/tabs/check_w.png';
// import calender_b from 'assets/images/tabs/calender_b.png';
// import calender_w from 'assets/images/tabs/calender_w.png';
// import profile_b from 'assets/images/tabs/profile_b.png';
// import profile_w from 'assets/images/tabs/profile_w.png';

import coops from 'assets/images/coops.png';
import coopsActive from 'assets/images/coopsActive.png';
import records from 'assets/images/records.png';
import recordsActive from 'assets/images/recordsActive.png';
import settings from 'assets/images/settings.png';
import settingsActive from 'assets/images/settingsActive.png';

import {theme} from 'styles/theme';
import Coops from './Coops';
import Records from './Records';
import Settings from './Settings';
import Image from 'components/Image';
import color from 'constants/color';

// import AccountStack from './Account';

const ICON_SIZE = 30;

const PAGE_ICON_MAP = {
  Coops: (focused: boolean) => (
    <Image style={{width: ICON_SIZE}} source={focused ? coops : coopsActive} />
  ),
  Records: (focused: boolean) => (
    <Image
      style={{width: ICON_SIZE}}
      source={focused ? records : recordsActive}
    />
  ),

  Settings: (focused: boolean) => (
    <Image
      style={{width: ICON_SIZE}}
      source={focused ? settings : settingsActive}
    />
  ),
};

export type HomeStackParamList = {
  Coops: undefined;
  Records: undefined;

  Settings: undefined;
};

const Tab = createBottomTabNavigator<HomeStackParamList>();

function MainStack() {
  return (
    <Tab.Navigator
      initialRouteName={'Coops'}
      screenOptions={({route, navigation}) => ({
        tabBarIcon: ({focused, color, size}) => {
          return PAGE_ICON_MAP[route.name](focused);
        },

        tabBarActiveTintColor: color.TextLink,
        tabBarInactiveTintColor: '#6F6F78',
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: 'Sora-SemiBold',
        },
        // tabBarLabelStyle: {
        //   fontSize: 13,
        //   fontWeight: '600',
        //   paddingBottom: 5,
        // },

        // tabBarActiveBackgroundColor: theme.colors.primary,
        // headerShown: false,
        // tabBarActiveTintColor: theme.colors.white,
        // tabBarStyle: {
        //   position: 'absolute',
        //   elevation: 10,
        //   borderTopLeftRadius: 20,
        //   borderTopRightRadius: 20,
        //   height: theme.size.tabBarHeight,
        // },
        headerShown: false,
      })}>
      <Tab.Screen
        options={{tabBarLabel: 'Coops'}}
        name={'Coops'}
        component={Coops}
      />
      <Tab.Screen
        options={{tabBarLabel: 'Records'}}
        name={'Records'}
        component={Records}
      />

      <Tab.Screen
        options={{tabBarLabel: 'Settings'}}
        name={'Settings'}
        component={Settings}
      />
    </Tab.Navigator>
  );
}

export default MainStack;

// import React from 'react';
// import {StyleSheet, TouchableOpacity, View} from 'react-native';
// import {CurvedBottomBar} from 'react-native-curved-bottom-bar';
// import {isIos} from 'utils/conditions';
// import {navigationRef} from 'utils/navigation';
// import AccountStack from './Account';
// import Feed from './Feed';
// import {theme} from 'styles/theme';
// import HomeStack from './HomeStack';

// import ChatStack from './InboxStack';
// import Home from 'assets/nav/home.svg';
// import Chat from 'assets/nav/chat.svg';
// import FeedIcon from 'assets/nav/feed.svg';
// import Account from 'assets/nav/account.svg';
// import Camera from 'assets/nav/camera.svg';

// import HomeOn from 'assets/nav/active/home.svg';
// import ChatOn from 'assets/nav/active/chat.svg';
// import FeedIconOn from 'assets/nav/active/feed.svg';
// import AccountOn from 'assets/nav/active/account.svg';

// export type HomeStackParamList = {
//   Home: undefined;
//   Feed: undefined;
//   Inbox: undefined;
//   Account: undefined;
// };

// const renderTabBar = (arg: {
//   routeName: keyof HomeStackParamList;
//   selectedTab: string;
//   navigate: (selectedTab: string) => void;
// }) => {
//   const NAV_ICON = {
//     Home: arg.selectedTab === arg.routeName ? HomeOn : Home,
//     Feed: arg.selectedTab === arg.routeName ? FeedIconOn : FeedIcon,
//     Inbox: arg.selectedTab === arg.routeName ? ChatOn : Chat,
//     Account: arg.selectedTab === arg.routeName ? AccountOn : Account,
//   };
//   const Icon = NAV_ICON[arg.routeName];
//   return (
//     <TouchableOpacity
//       onPress={() => {
//         navigationRef.navigate(arg.routeName as any);
//       }}
//       style={{
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}>
//       <Icon width={35} height={35} />
//     </TouchableOpacity>
//   );
// };

// const TabBar = () => {
//   return (
//     <CurvedBottomBar.Navigator
//       style={styles.bottomBar}
//       height={isIos ? 90 : 70}
//       circleWidth={60}
//       strokeWidth={2}
//       bgColor="white"
//       screenOptions={() => ({
//         headerShown: false,
//       })}
//       initialRouteName="title1"
//       renderCircle={({selectedTab, navigate}) => (
//         <TouchableOpacity
//           style={styles.circleBorder1}
//           onPress={() =>
//             navigationRef.navigate('OtherStack', {
//               screen: 'Stream',
//               params: {},
//             })
//           }>
//           <View style={styles.circleBorder2}>
//             <View style={styles.circleBorder3}>
//               <Camera width={35} height={35} />
//             </View>
//           </View>
//         </TouchableOpacity>
//       )}
//       tabBar={prop => renderTabBar(prop)}>
//       <CurvedBottomBar.Screen
//         name={'Home'}
//         position="LEFT"
//         component={HomeStack}
//       />
//       <CurvedBottomBar.Screen name={'Feed'} position="LEFT" component={Feed} />
//       <CurvedBottomBar.Screen
//         name={'Inbox'}
//         position="RIGHT"
//         component={ChatStack}
//       />
//       <CurvedBottomBar.Screen
//         name={'Account'}
//         component={AccountStack}
//         position="RIGHT"
//       />
//     </CurvedBottomBar.Navigator>
//   );
// };

// export const styles = StyleSheet.create({
//   bottomBar: {
//     borderRadius: 0,
//   },
//   circleBorder1: {
//     width: 60,
//     height: 60,
//     borderRadius: 40,
//     alignItems: 'center',
//     justifyContent: 'center',
//     elevation: 1,
//     bottom: isIos ? 10 : 25,
//     backgroundColor: theme.colors.primary,
//   },
//   circleBorder2: {
//     width: 55,
//     height: 55,
//     borderRadius: 40,
//     alignItems: 'center',
//     justifyContent: 'center',
//     elevation: 1,
//     backgroundColor: theme.colors.secondary,
//   },
//   circleBorder3: {
//     width: 50,
//     height: 50,
//     borderRadius: 40,
//     alignItems: 'center',
//     justifyContent: 'center',
//     elevation: 1,
//     backgroundColor: theme.colors.primary,
//   },
// });

// export default TabBar;
