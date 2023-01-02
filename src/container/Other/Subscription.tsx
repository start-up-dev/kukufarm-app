import React, {Component, FC, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  Image,
  StatusBar,
  View,
  NativeModules,
  Platform,
  Alert,
  Linking,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import imgSubscribeTop from 'assets/images/subscribe_new.jpg';
import imgLogoG from 'assets/images/logo_b.png';
import Layout from 'components/Layout';
import Flex from 'components/Flex';
import BackButton from 'components/Back';
import {screenSize} from 'container/Home/Profile/Profile';
import {classes, theme} from 'styles/theme';
import Button from 'components/Button';
import Text from 'components/Text';
import ActivityInd from 'components/ActivityIndicator';
import {navigationRef} from 'utils/navigation';
import {statusbarHeight} from 'utils/helper';

// import {
//   addSubscription,
//   clearState,
// } from "../../../redux/reducers/seller/subscription/addSubscription";

const isPlay = Platform.OS === 'android';

import {
  acknowledgePurchaseAndroid,
  getAvailablePurchases,
  isIosStorekit2,
  PurchaseError,
  requestSubscription,
  useIAP,
  withIAPContext,
} from 'react-native-iap';
import {indexOf, sortBy} from 'lodash';
import Space from 'components/Space';
import {PACKAGE_NAME} from 'config/config';
import {useCustomDispatch} from 'store';
import {user_subscribe} from 'api/user';
import {get_my_profile} from 'api/auth';
import {setAuthStore} from 'store/reducers/auth';
import {IScreenProps} from 'interfaces/INavigation';
import {OtherStackParamList} from '.';

const subscriptionSkus = Platform.select({
  ios: ['monthlySub', 'AnnualPremium'],
  android: ['monthly.sub', 'annual.sub'],
});

type SUB_TYPES = 'free' | 'monthlySub' | 'AnnualPremium';

const getDuration = {
  monthlySub: 'month',
  AnnualPremium: 'year',
  ['monthly.sub']: 'month',
  ['annual.sub']: 'year',
};

type IProps = IScreenProps<OtherStackParamList, 'Subscription'>;

const Subscription: FC<IProps> = ({route}) => {
  const {
    connected,
    subscriptions,
    getSubscriptions,
    currentPurchase,
    finishTransaction,
  } = useIAP();

  const dispatch = useCustomDispatch();

  const isTutorialStep = route?.params?.isTutorialStep;

  const [ownedSubscriptions, setOwnedSubscriptions] = useState([]);

  const [selectedSubs, setSelectedSubs] = useState<SUB_TYPES>();

  const handleGetSubscriptions = async () => {
    try {
      await getSubscriptions({skus: subscriptionSkus});
    } catch (error) {
      console.log({message: 'handleGetSubscriptions', error});
    }
  };

  const getMyProfile = async () => {
    try {
      const {data} = await get_my_profile();
      dispatch(
        setAuthStore({
          userData: data.user,
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const conditionalGoBack = () => {
    if (isTutorialStep) {
      navigationRef.reset({
        routes: [{name: 'HomeStack'}],
      });
    } else {
      navigationRef.goBack();
    }
  };

  const handleBuySubscription = async () => {
    if (selectedSubs === 'free') {
      conditionalGoBack();
      return;
    }

    const findSelectPlan = subscriptions.find(
      item => item?.productId === selectedSubs,
    );

    let offerToken = findSelectPlan?.subscriptionOfferDetails?.[0].offerToken;

    if (isPlay && !offerToken) {
      console.warn(
        `There are no subscription Offers for selected product (Only required for Google Play purchases): ${productId}`,
      );
    }
    try {
      await requestSubscription({
        sku: selectedSubs,
        ...(offerToken && {
          subscriptionOffers: [{sku: selectedSubs!, offerToken}],
        }),
      });
    } catch (error) {
      if (error instanceof PurchaseError) {
        console.log({message: `[${error.code}]: ${error.message}`, error});
      } else {
        console.log({message: 'handleBuySubscription', error});
      }
    }
  };

  useEffect(() => {
    const checkCurrentPurchase = async () => {
      try {
        if (currentPurchase?.productId) {
          await acknowledgePurchaseAndroid({
            token: currentPurchase.purchaseToken,
          });

          await finishTransaction({
            purchase: currentPurchase,
            isConsumable: false,
          });
          setOwnedSubscriptions(prev => [...prev, currentPurchase]);
          updateUserSubscription(currentPurchase);
        }
      } catch (error) {
        if (error instanceof PurchaseError) {
          console.log({message: `[${error.code}]: ${error.message}`, error});
        } else {
          console.log({message: 'handleBuyProduct', error});
        }
      }
    };

    checkCurrentPurchase();
  }, [currentPurchase, finishTransaction]);

  const updateUserSubscription = subscription => {
    user_subscribe(subscription);
    getMyProfile();
  };

  const init = async () => {
    const res = await getAvailablePurchases();
    setOwnedSubscriptions(res);
  };

  useEffect(() => {
    if (connected) {
      handleGetSubscriptions();
      init();
    }
  }, [connected]);

  const onSubscribeRestore = () => {};

  const onCancelSubscribe = () => {
    const purchasedPlan = subscriptions.find(
      item => item?.productId === ownedSubscriptions?.[0]?.productId,
    );

    if (!purchasedPlan) return;
    const productId = purchasedPlan?.productId;
    const cancelUrl = Platform.select({
      ios: 'https://apps.apple.com/account/subscriptions',
      android: `https://play.google.com/store/account/subscriptions?package=${PACKAGE_NAME}&sku=${productId}`,
    });
    Linking.openURL(cancelUrl!);
  };

  const sortedSubs = sortBy(subscriptions, function (obj) {
    return indexOf(subscriptionSkus, obj.productId);
  });

  // console.log(JSON.stringify(ownedSubscriptions));

  return (
    <Layout noSpace>
      {Platform.OS === 'ios' ? (
        <ImageBackground
          source={imgSubscribeTop}
          style={{
            ...styles.imgSubscribe,
            flex: 1,
          }}>
          <TouchableOpacity
            onPress={() => conditionalGoBack()}
            style={[
              {
                position: 'absolute',
                top: statusbarHeight,
                left: 20,
                zIndex: 100,
                backgroundColor: 'white',
                width: 35,
                height: 35,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
              },
              classes.shadow,
            ]}>
            <Ionicons
              color={'#666'}
              size={25}
              name="arrow-back"
              style={{
                fontWeight: 'bold',
              }}
            />
          </TouchableOpacity>

          <ScrollView
            style={{
              paddingTop: screenSize.width * 0.64,
              flex: 1,
            }}
            bounces={false}>
            <View
              style={{
                backgroundColor: 'white',
                marginBottom: screenSize.width * 0.64,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
              }}>
              <SubscribeComp
                subscriptions={sortedSubs}
                purchaseData={ownedSubscriptions}
                selectedSubs={selectedSubs}
                setSelectedSubs={setSelectedSubs}
                onSubscribe={handleBuySubscription}
                onSubscribeRestore={onSubscribeRestore}
                onCancelSubscribe={onCancelSubscribe}
              />
            </View>
          </ScrollView>
        </ImageBackground>
      ) : (
        <ScrollView>
          <Image source={imgSubscribeTop} style={styles.imgSubscribe} />
          <SubscribeComp
            subscriptions={sortedSubs}
            purchaseData={ownedSubscriptions}
            selectedSubs={selectedSubs}
            setSelectedSubs={setSelectedSubs}
            onSubscribe={handleBuySubscription}
            onSubscribeRestore={onSubscribeRestore}
            onCancelSubscribe={onCancelSubscribe}
          />
        </ScrollView>
      )}
    </Layout>
  );
};

export default withIAPContext(Subscription);

interface IPropsSubs {
  subscriptions: any;
  purchaseData: any;
  onSubscribe: () => void;
  onSubscribeRestore: () => void;
  selectedSubs: SUB_TYPES;
  setSelectedSubs: (sub: SUB_TYPES) => void;
  onCancelSubscribe: () => void;
}

const SubscribeComp: FC<IPropsSubs> = ({
  purchaseData,
  selectedSubs,
  onSubscribe,
  onSubscribeRestore,
  onCancelSubscribe,
  subscriptions,
  setSelectedSubs,
}) => {
  const purchasedPlan = subscriptions.find(
    item => item?.productId === purchaseData?.[0]?.productId,
  );

  console.log(purchasedPlan);

  return (
    <>
      <View
        style={{
          ...styles.imgSubscribeLogoContainer,
        }}>
        <Image source={imgLogoG} style={styles.imgSubscribeLogo} />
      </View>
      <View style={{marginHorizontal: 17}}>
        <Text
          style={{...styles.subscribeTitle, fontSize: 18, textAlign: 'center'}}>
          {purchasedPlan
            ? 'YOUR CURRENT SUBSCRIPTION PLAN'
            : 'SUBSCRIPTION PRICING AND TERMS'}
        </Text>

        {subscriptions?.length ? (
          <>
            {purchaseData?.length ? (
              <View style={{marginVertical: 25, marginHorizontal: 30}}>
                {purchasedPlan ? (
                  <Button rounded sm>
                    <Text color={theme.colors.white}>
                      {isPlay
                        ? purchasedPlan?.subscriptionOfferDetails?.[0]
                            .pricingPhases.pricingPhaseList[0].formattedPrice
                        : purchasedPlan?.localizedPrice}{' '}
                      /{' '}
                      {/* {purchaseData.productId == 'AnnualPremium'
                        ? 'Year'
                        : 'Month'} */}
                      {getDuration[purchasedPlan?.productId]}
                    </Text>
                  </Button>
                ) : null}
                <Space height={10} />
                <Button rounded sm onPress={onCancelSubscribe}>
                  <Text color={theme.colors.white}>Cancel Subscription</Text>
                </Button>
              </View>
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => setSelectedSubs('free')}
                  style={{
                    borderRadius: 10,
                    borderColor: theme.colors.blue,
                    borderWidth: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    // justifyContent: 'space-between',
                    paddingVertical: 13,
                    marginTop: 18,
                  }}>
                  <View
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 50,
                      borderColor: theme.colors.yellow,
                      borderWidth: 2.5,
                      marginHorizontal: 13,
                      backgroundColor:
                        selectedSubs === 'free'
                          ? theme.colors.brandYellow
                          : 'transparent',
                    }}
                  />
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        ...styles.subscribeTitle,
                        fontSize: 18,
                        fontWeight: '500',
                        marginBottom: 5,
                      }}>
                      Free App
                    </Text>
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: '400',
                      }}>
                      Includes in app notifications but no text alerts
                    </Text>
                  </View>
                </TouchableOpacity>

                {subscriptions.map((subscription: any, index: number) => (
                  <TouchableOpacity
                    onPress={() => setSelectedSubs(subscription?.productId)}
                    key={index.toString()}
                    style={{
                      borderRadius: 10,
                      borderColor: theme.colors.blue,
                      borderWidth: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '100%',
                      // justifyContent: 'space-between',

                      paddingVertical: 13,
                      marginTop: 15,
                      // marginBottom: 25,
                    }}>
                    <View
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 50,
                        borderColor: theme.colors.yellow,
                        borderWidth: 2.5,
                        marginHorizontal: 13,
                        backgroundColor:
                          selectedSubs === subscription?.productId
                            ? theme.colors.brandYellow
                            : 'transparent',
                      }}
                    />
                    <View style={{flex: 1}}>
                      <Text
                        style={{
                          ...styles.subscribeTitle,
                          fontSize: 18,
                          fontWeight: '500',
                          marginBottom: 5,
                        }}>
                        Premium
                      </Text>
                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight: '400',
                        }}>
                        Includes notifications, S.O.S & Text Alerts.
                      </Text>
                    </View>
                    <View style={{marginLeft: 'auto', marginRight: 8}}>
                      <Text
                        style={{
                          ...styles.subscribeTitle,
                          fontSize: isPlay ? 16 : 20,
                          fontWeight: '500',

                          color: theme.colors.brandWarning,
                        }}>
                        {isPlay
                          ? subscription?.subscriptionOfferDetails?.[0]
                              .pricingPhases.pricingPhaseList[0].formattedPrice
                          : subscription?.localizedPrice}
                      </Text>
                      <Text
                        style={{
                          ...styles.subscribeTitle,
                          fontSize: 12,
                          fontWeight: '500',
                        }}>
                        per {getDuration[subscription?.productId]}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}

                {selectedSubs ? (
                  <TouchableOpacity onPress={onSubscribe}>
                    <Text style={{marginVertical: 25}} center primary size={16}>
                      Continue
                    </Text>
                  </TouchableOpacity>
                ) : null}

                {Platform.OS === 'ios' ? (
                  <Text
                    onPress={onSubscribeRestore}
                    style={{marginVertical: 25}}
                    center
                    primary
                    size={16}>
                    Restore Purchase
                  </Text>
                ) : null}
              </>
            )}
          </>
        ) : (
          <ActivityInd />
        )}

        <Text center size={16} primary>
          Terms of Service and Privacy Policy
        </Text>

        <Text style={styles.txtSubscribeDetail}>
          All Access subscriptions are required to get access to Just Checking
          In Features. The subscription automatically renews with the price and
          duration given above unless it is canceled at least 24 hours before
          the end of the current period. Payment will be charged to your Apple
          ID account at the confirmation of purchase. Your account will be
          charged for renewal within 24 hours prior to the end of the current
          period. You can manage and cancel your subscriptions by going to your
          account settings on the App Store after purchase. Removing the app
          doesn't automatically cancel the subscription.
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imgSubscribe: {
    width: screenSize.width,
    height: screenSize.width * 0.64,
  },
  imgSubscribeLogoContainer: {
    marginTop: -screenSize.width * 0.125 - 20,
    alignSelf: 'center',
    padding: 20,
    backgroundColor: theme.colors.white,
    borderRadius: screenSize.width * 0.2,
  },
  imgSubscribeLogo: {
    width: screenSize.width * 0.25,
    height: screenSize.width * 0.25,
  },
  subscribeSubTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.black,
    marginBottom: 10,
  },
  subscribeTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  subscribeTitleDesc: {
    fontSize: 15,
    fontWeight: 'bold',
    color: theme.colors.grey100,
    marginVertical: 10,
  },
  checkSubscribe: {
    color: '#73b957',
  },
  txtSubscribeFeature: {
    alignContent: 'center',
    color: theme.colors.black,
    marginTop: 4,
    marginLeft: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },

  txtSubscribeDetail: {
    color: theme.colors.grey500,
    margin: 15,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
});

// import React, {Component, useEffect, useState} from 'react';
// import {connect} from 'react-redux';
// import {
//   Image,
//   StatusBar,
//   View,
//   NativeModules,
//   Platform,
//   Alert,
//   Linking,
//   ScrollView,
//   ImageBackground,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// import imgSubscribeTop from 'assets/images/subscribe_new.jpg';
// import imgLogoG from 'assets/images/logo_b.png';
// import Layout from 'components/Layout';
// import Flex from 'components/Flex';
// import BackButton from 'components/Back';
// import {screenSize} from 'container/Home/Profile/Profile';
// import {classes, theme} from 'styles/theme';
// import Button from 'components/Button';
// import Text from 'components/Text';
// import ActivityInd from 'components/ActivityIndicator';
// import {navigationRef} from 'utils/navigation';
// import {statusbarHeight} from 'utils/helper';
// // import AppsFlyer from '../../helpers/appsflyer';

// // import {
// //   addSubscription,
// //   clearState,
// // } from "../../../redux/reducers/seller/subscription/addSubscription";

// const isPlay = Platform.OS === 'android';

// import {
//   acknowledgePurchaseAndroid,
//   getAvailablePurchases,
//   isIosStorekit2,
//   PurchaseError,
//   requestSubscription,
//   useIAP,
//   withIAPContext,
// } from 'react-native-iap';
// import {indexOf, sortBy} from 'lodash';

// const subscriptionSkus = Platform.select({
//   ios: ['monthlySub', 'AnnualPremium'],
//   android: ['monthly', 'annual'],
// });

// const Subscription = () => {
//   const {
//     connected,
//     subscriptions,
//     getSubscriptions,
//     currentPurchase,
//     finishTransaction,
//   } = useIAP();

//   const [ownedSubscriptions, setOwnedSubscriptions] = useState([]);
//   const handleGetSubscriptions = async () => {
//     try {
//       await getSubscriptions({skus: subscriptionSkus});
//     } catch (error) {
//       console.log({message: 'handleGetSubscriptions', error});
//     }
//   };

//   const handleBuySubscription = async (productId, offerToken) => {
//     if (isPlay && !offerToken) {
//       console.warn(
//         `There are no subscription Offers for selected product (Only required for Google Play purchases): ${productId}`,
//       );
//     }
//     try {
//       await requestSubscription({
//         sku: productId,
//         ...(offerToken && {
//           subscriptionOffers: [{sku: productId, offerToken}],
//         }),
//       });
//     } catch (error) {
//       if (error instanceof PurchaseError) {
//         console.log({message: `[${error.code}]: ${error.message}`, error});
//       } else {
//         console.log({message: 'handleBuySubscription', error});
//       }
//     }
//   };

//   useEffect(() => {
//     const checkCurrentPurchase = async () => {
//       try {
//         if (currentPurchase?.productId) {
//           await acknowledgePurchaseAndroid({
//             token: currentPurchase.purchaseToken,
//           });

//           await finishTransaction({
//             purchase: currentPurchase,
//             isConsumable: false,
//           });
//           setOwnedSubscriptions(prev => [...prev, currentPurchase]);
//           updateUserSubscription(currentPurchase);
//         }
//       } catch (error) {
//         if (error instanceof PurchaseError) {
//           console.log({message: `[${error.code}]: ${error.message}`, error});
//         } else {
//           console.log({message: 'handleBuyProduct', error});
//         }
//       }
//     };

//     checkCurrentPurchase();
//   }, [currentPurchase, finishTransaction]);

//   const updateUserSubscription = subscription => {
//     // dispatch(addSubscription(subscription));
//     // dispatch(clearState());
//   };

//   const init = async () => {
//     const res = await getAvailablePurchases();
//     setOwnedSubscriptions(res);
//   };

//   useEffect(() => {
//     if (connected) {
//       handleGetSubscriptions();
//       init();
//     }
//   }, [connected]);

//   const sortedSubs = sortBy(subscriptions, function (obj) {
//     return indexOf(subscriptionSkus, obj.productId);
//   });

//   console.log(sortedSubs);

//   return (
//     <Layout noSpace>
//       {Platform.OS === 'ios' ? (
//         <ImageBackground
//           source={imgSubscribeTop}
//           style={{
//             ...styles.imgSubscribe,
//             flex: 1,
//           }}>
//           <TouchableOpacity
//             onPress={() => navigationRef.goBack()}
//             style={[
//               {
//                 position: 'absolute',
//                 top: statusbarHeight,
//                 left: 20,
//                 zIndex: 100,
//                 backgroundColor: 'white',
//                 width: 35,
//                 height: 35,
//                 borderRadius: 50,
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               },
//               classes.shadow,
//             ]}>
//             <Ionicons
//               color={'#666'}
//               size={25}
//               name="arrow-back"
//               style={{
//                 fontWeight: 'bold',
//               }}
//             />
//           </TouchableOpacity>

//           <ScrollView
//             style={{
//               paddingTop: screenSize.width * 0.64,
//               flex: 1,
//             }}
//             bounces={false}>
//             <View
//               style={{
//                 backgroundColor: 'white',
//                 marginBottom: screenSize.width * 0.64,
//                 borderTopLeftRadius: 15,
//                 borderTopRightRadius: 15,
//               }}>
//               <SubscribeComp
//               // subscriptions={subscriptions}
//               // isPurchase={isPurchased}
//               // purchaseData={purchaseData}
//               // subscriptionType={subscriptionType}
//               // onSubscribe={this.onSubscribe}
//               // onSubscribeRestore={this.onSubscribeRestore}
//               // onCancelSubscribe={this.onCancelSubscribe}
//               // checkSubscription={this.checkSubscription}
//               // onTermsPolicy={this.onTermsPolicy}
//               />
//             </View>
//           </ScrollView>
//         </ImageBackground>
//       ) : (
//         <ScrollView>
//           <Image source={imgSubscribeTop} style={styles.imgSubscribe} />
//           <SubscribeComp
//           // subscriptions={subscriptions}
//           // isPurchase={isPurchased}
//           // purchaseData={purchaseData}
//           // subscriptionType={subscriptionType}
//           // onSubscribe={this.onSubscribe}
//           // onSubscribeRestore={this.onSubscribeRestore}
//           // onCancelSubscribe={this.onCancelSubscribe}
//           // checkSubscription={this.checkSubscription}
//           // onTermsPolicy={this.onTermsPolicy}
//           />
//         </ScrollView>
//       )}
//     </Layout>
//   );
// };

// export default withIAPContext(Subscription);

// const SubscribeComp = ({
//   isPurchased,
//   purchaseData,
//   subscriptionType,
//   onSubscribe,
//   onSubscribeRestore,
//   onCancelSubscribe,
//   checkSubscription,
//   onTermsPolicy,
// }) => {
//   return (
//     <>
//       <View
//         style={{
//           ...styles.imgSubscribeLogoContainer,
//         }}>
//         <Image source={imgLogoG} style={styles.imgSubscribeLogo} />
//       </View>
//       <View style={{marginHorizontal: 17}}>
//         <Text
//           style={{...styles.subscribeTitle, fontSize: 18, textAlign: 'center'}}>
//           SUBSCRIPTION PRICING AND TERMS
//         </Text>

//         {Object.keys(subscriptions)?.length ? (
//           <>
//             {isPurchased && purchaseData ? (
//               <>
//                 {subscriptions[purchaseData.productKey] ? (
//                   <Button
//                     rounded
//                     block
//                     success
//                     active
//                     style={styles.btnSubscribe}>
//                     <Text uppercase={false}>
//                       {subscriptions[purchaseData.productKey].localizedPrice} /{' '}
//                       {purchaseData.productKey == 'monthly' ? 'Month' : 'Year'}
//                     </Text>
//                   </Button>
//                 ) : null}

//                 <Button
//                   rounded
//                   block
//                   primary
//                   transparent
//                   style={styles.btnSubscribe}
//                   onPress={onCancelSubscribe}>
//                   <Text uppercase={false}>Cancel Subscription</Text>
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <View
//                   style={{
//                     borderRadius: 10,
//                     borderColor: Material.facebookColor,
//                     borderWidth: 1,
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     width: '100%',
//                     // justifyContent: 'space-between',
//                     paddingVertical: 13,
//                     marginTop: 18,
//                   }}>
//                   {/* <CheckBox
//                     style={{
//                       borderRadius: 50,
//                       marginRight: 25,
//                     }}
//                     color={Material.brandWarning}
//                     checked={subscriptionType === 'free'}
//                     onPress={() => checkSubscription('free')}
//                   /> */}
//                   <View style={{flex: 1}}>
//                     <Text
//                       style={{
//                         ...styles.subscribeTitle,
//                         fontSize: 18,
//                         fontWeight: '500',
//                         marginBottom: 5,
//                       }}>
//                       Free App
//                     </Text>
//                     <Text
//                       style={{
//                         fontSize: 11,
//                         fontWeight: '400',
//                       }}>
//                       Includes in app notifications but no text alerts
//                     </Text>
//                   </View>
//                 </View>
//                 {subscriptions.monthly ? (
//                   // <Button
//                   //   rounded
//                   //   block
//                   //   primary
//                   //   style={styles.btnSubscribe}
//                   //   onPress={this.onSubscribe.bind(this, 'monthly')}>
//                   //   <Text uppercase={false}>
//                   //     {subscriptions.monthly.localizedPrice} / Month
//                   //   </Text>
//                   // </Button>
//                   <View
//                     style={{
//                       borderRadius: 10,
//                       borderColor: Material.facebookColor,
//                       borderWidth: 1,
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       width: '100%',
//                       // justifyContent: 'space-between',

//                       paddingVertical: 13,
//                       marginTop: 15,
//                       // marginBottom: 25,
//                     }}>
//                     {/* <CheckBox
//                       style={{
//                         borderRadius: 50,
//                         marginRight: 25,
//                       }}
//                       color={Material.brandWarning}
//                       checked={subscriptionType === 'monthly'}
//                       onPress={() => checkSubscription('monthly')}
//                     /> */}
//                     <View style={{flex: 1}}>
//                       <Text
//                         style={{
//                           ...styles.subscribeTitle,
//                           fontSize: 18,
//                           fontWeight: '500',
//                           marginBottom: 5,
//                         }}>
//                         Premium
//                       </Text>
//                       <Text
//                         style={{
//                           fontSize: 11,
//                           fontWeight: '400',
//                         }}>
//                         Includes notifications, S.O.S & Text Alerts.
//                       </Text>
//                     </View>
//                     <View style={{marginLeft: 'auto', marginRight: 8}}>
//                       <Text
//                         style={{
//                           ...styles.subscribeTitle,
//                           fontSize: 20,
//                           fontWeight: '500',

//                           color: Material.brandWarning,
//                         }}>
//                         {subscriptions.monthly.localizedPrice}
//                       </Text>
//                       <Text
//                         style={{
//                           ...styles.subscribeTitle,
//                           fontSize: 12,
//                           fontWeight: '500',
//                         }}>
//                         per month
//                       </Text>
//                     </View>
//                   </View>
//                 ) : null}

//                 {subscriptions.annual ? (
//                   // <Button
//                   //   rounded
//                   //   block
//                   //   primary
//                   //   style={styles.btnSubscribe}
//                   //   onPress={this.onSubscribe.bind(this, 'annual')}>
//                   //   <Text uppercase={false}>
//                   //     {subscriptions.annual.localizedPrice} / Year
//                   //   </Text>
//                   // </Button>
//                   <View
//                     style={{
//                       borderRadius: 10,
//                       borderColor: theme.colors.blue,
//                       borderWidth: 1,
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       width: '100%',
//                       // justifyContent: 'space-between',

//                       paddingVertical: 13,
//                       marginTop: 15,
//                       marginBottom: 25,
//                     }}>
//                     {/* <CheckBox
//                       style={{
//                         borderRadius: 50,
//                         marginRight: 25,
//                       }}
//                       color={Material.brandWarning}
//                       checked={subscriptionType === 'annual'}
//                       onPress={() => checkSubscription('annual')}
//                     /> */}
//                     <View style={{flex: 1}}>
//                       <Text
//                         style={{
//                           ...styles.subscribeTitle,
//                           fontSize: 18,
//                           fontWeight: '500',
//                           marginBottom: 5,
//                         }}>
//                         Premium
//                       </Text>
//                       <Text
//                         style={{
//                           fontSize: 11,
//                           fontWeight: '400',
//                         }}>
//                         Includes notifications, S.O.S & Text Alerts.
//                       </Text>
//                     </View>
//                     <View style={{marginLeft: 'auto', marginRight: 8}}>
//                       <Text
//                         style={{
//                           ...styles.subscribeTitle,
//                           fontSize: 20,
//                           fontWeight: '500',

//                           color: theme.colors.brandDanger,
//                         }}>
//                         {subscriptions.annual.localizedPrice}
//                       </Text>
//                       <Text
//                         style={{
//                           ...styles.subscribeTitle,
//                           fontSize: 12,
//                           fontWeight: '500',
//                         }}>
//                         per year
//                       </Text>
//                     </View>
//                   </View>
//                 ) : null}

//                 {subscriptionType ? (
//                   <Button
//                     rounded
//                     block
//                     primary
//                     style={styles.btnSubscribe}
//                     onPress={() => onSubscribe(subscriptionType)}>
//                     <Text uppercase={false}>Continue</Text>
//                   </Button>
//                 ) : null}

//                 {Platform.OS === 'ios' ? (
//                   <Button
//                     rounded
//                     block
//                     primary
//                     transparent
//                     style={styles.btnSubscribe}
//                     onPress={onSubscribeRestore}>
//                     <Text uppercase={false}>Restore Purchase</Text>
//                   </Button>
//                 ) : null}
//               </>
//             )}
//           </>
//         ) : (
//           <ActivityInd />
//         )}

//         <Text center size={16}>
//           Terms of Service and Privacy Policy
//         </Text>

//         <Text style={styles.txtSubscribeDetail}>
//           All Access subscriptions are required to get access to Just Checking
//           In Features. The subscription automatically renews with the price and
//           duration given above unless it is canceled at least 24 hours before
//           the end of the current period. Payment will be charged to your Apple
//           ID account at the confirmation of purchase. Your account will be
//           charged for renewal within 24 hours prior to the end of the current
//           period. You can manage and cancel your subscriptions by going to your
//           account settings on the App Store after purchase. Removing the app
//           doesn't automatically cancel the subscription.
//         </Text>
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   imgSubscribe: {
//     width: screenSize.width,
//     height: screenSize.width * 0.64,
//   },
//   imgSubscribeLogoContainer: {
//     marginTop: -screenSize.width * 0.125 - 20,
//     alignSelf: 'center',
//     padding: 20,
//     backgroundColor: theme.colors.white,
//     borderRadius: screenSize.width * 0.2,
//   },
//   imgSubscribeLogo: {
//     width: screenSize.width * 0.25,
//     height: screenSize.width * 0.25,
//   },
//   subscribeSubTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: theme.colors.black,
//     marginBottom: 10,
//   },
//   subscribeTitle: {
//     fontSize: 23,
//     fontWeight: 'bold',
//     color: theme.colors.primary,
//   },
//   subscribeTitleDesc: {
//     fontSize: 15,
//     fontWeight: 'bold',
//     color: theme.colors.grey100,
//     marginVertical: 10,
//   },
//   checkSubscribe: {
//     color: '#73b957',
//   },
//   txtSubscribeFeature: {
//     alignContent: 'center',
//     color: theme.colors.black,
//     marginTop: 4,
//     marginLeft: 5,
//   },
//   row: {
//     flexDirection: 'row',
//     marginBottom: 5,
//   },
//   btnSubscribe: {
//     marginBottom: 10,
//   },
//   txtSubscribeDetail: {
//     color: theme.colors.grey500,
//     margin: 15,
//     padding: 15,
//     borderRadius: 10,
//     backgroundColor: '#f0f0f0',
//   },
// });
