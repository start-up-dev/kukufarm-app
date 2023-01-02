import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {Purchase, requestPurchase, useIAP} from 'react-native-iap';
import {STORAGE_KEYS, storeBooleanData, getBooleanData} from './asyncstorage';

const {IS_FULL_APP_PURCHASED} = STORAGE_KEYS;

// Play store item Ids
const itemSKUs = Platform.select({
  android: ['full_app', 'test_4'],
});

const useInAppPurchase = () => {
  const [isFullAppPurchased, setIsFullAppPurchased] = useState(false);
  const [connectionErrorMsg, setConnectionErrorMsg] = useState('');

  const {
    connected,
    products,
    getProducts,
    finishTransaction,
    currentPurchase,
    currentPurchaseError,
  } = useIAP();

  // Get data after initial render
  useEffect(() => {
    getBooleanData(IS_FULL_APP_PURCHASED).then(data => {
      setIsFullAppPurchased(data || false);
    });
  }, []);

  // Get products from play store.
  useEffect(() => {
    if (connected) {
      getProducts({skus: itemSKUs || []});
    }
  }, [connected, getProducts]);

  // currentPurchase will change when the requestPurchase function is called. The purchase then needs to be checked and the purchase acknowledged so Google knows we have awared the user the in-app product.
  useEffect(() => {
    const checkCurrentPurchase = async (purchase: Purchase | undefined) => {
      if (purchase) {
        const receipt = purchase.transactionReceipt;

        if (receipt) {
          // Give full app access
          setAndStoreFullAppPurchase(true);
          try {
            const ackResult = await finishTransaction({purchase});
            console.log('ackResult: ', ackResult);
          } catch (ackErr) {
            // We would need a backend to validate receipts for purhcases that pended for a while and were then declined. So I'll assume most purchase attempts go through successfully (OK ackResult) & take the hit for the ones that don't (user will still have full app access).
            console.log('ackError: ', ackErr);
          }
        }
      }
    };
    checkCurrentPurchase(currentPurchase);
  }, [currentPurchase, finishTransaction]);

  // If user reinstalls app, then they can press purchase btn (SettingsScreen)  to getfull app without paying again.
  useEffect(() => {
    if (currentPurchaseError) {
      if (
        currentPurchaseError.code === 'E_ALREADY_OWNED' &&
        !isFullAppPurchased
      ) {
        setAndStoreFullAppPurchase(true);
      }
    }
  }, [currentPurchaseError]);

  const purchaseFullApp = async () => {
    // Reset error msg
    if (connectionErrorMsg !== '') setConnectionErrorMsg('');
    if (!connected) {
      setConnectionErrorMsg('Please check your internet connection');
    }
    // If we are connected & have products, purchase the item. Gohas no inteogle will handle if user rnet here.
    else if (products?.length > 0) {
      if (itemSKUs) {
        requestPurchase({sku: itemSKUs[1]});
        console.log('Purchasing products...');
      }
    }
    // If we are connected but have no products returned, try to get products and purchase.
    else {
      console.log('No products. Now trying to get some...');
      if (itemSKUs) {
        try {
          await getProducts({skus: itemSKUs});
          await requestPurchase({sku: itemSKUs[1]});
          console.log('Got products, now purchasing...');
        } catch (error) {
          setConnectionErrorMsg('Please check your internet connection');
          console.log('Everything failed. Error: ', error);
        }
      }
    }
  };

  const setAndStoreFullAppPurchase = (boolean: string) => {
    setIsFullAppPurchased(boolean ? true : false);
    storeBooleanData(IS_FULL_APP_PURCHASED, boolean);
  };

  return {
    isFullAppPurchased,
    connectionErrorMsg,
    purchaseFullApp,
  };
};

export default useInAppPurchase;
