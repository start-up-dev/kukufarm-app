import React, {FC, useCallback, useEffect, useState} from 'react';
import Layout from 'components/Layout';
import {IScreenProps} from 'interfaces/INavigation';
import {
  FlatList,
  PermissionsAndroid,
  Platform,
  RefreshControl,
  TextInput,
  View,
} from 'react-native';
import {theme} from 'styles/theme';
import Text from 'components/Text';
import Space from 'components/Space';
import Container from 'components/Container';
import Flex from 'components/Flex';
import {OtherStackParamList} from '.';
import {statusbarHeight} from 'utils/helper';
import {isIos} from 'utils/conditions';
import BackButton from 'components/Back';
import Button from 'components/Button';
import {useCustomDispatch, useCustomSelector} from 'store';
import {updateProfile} from 'api/auth';
import {setAuthStore, updateAuthStore} from 'store/reducers/auth';
import RNContacts from 'react-native-contacts';
import {filterContacts} from 'utils/contacts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SingleContact from 'components/others/SingleContact';
import ContactConfirmDialog from 'components/dialogs/ContactConfirmDialog';
import {navigationRef} from 'utils/navigation';
import ContactSelectDialog from 'components/dialogs/ContactSelectDialog';
import {add_member_in_circle} from 'api/circle';
import {addMemberInCircle} from 'store/reducers/circles';
import {add_emergency_contact} from 'api/emergency';
import {addEmergencies} from 'store/reducers/emergencies';
import {showAlert} from 'utils/toast';
import {updateTutorialStep} from 'store/reducers/tutorial';
import {Tutorial} from 'interfaces/IConfig';

type IProps = IScreenProps<OtherStackParamList, 'Contacts'>;

const Contacts: FC<IProps> = ({route}) => {
  // const {userData} = useCustomSelector(state => state.auth);
  const circleId = route?.params?.circleId;
  const isTutorial = route?.params?.isTutorial;

  const [searchKey, setSearchKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [selectingContact, setSelectingContact] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleSelectContact, setIsVisibleSelectContact] = useState(false);

  const dispatch = useCustomDispatch();

  // const onUpdateName = async () => {
  //   if (!name) return;
  //   setLoading(true);
  //   try {
  //     const {data} = await updateProfile({name});

  //     dispatch(
  //       updateAuthStore({
  //         name,
  //       }),
  //     );
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };

  const getContacts = useCallback(async () => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Please accept bare mortal',
      }).then(async () => {
        let contacts = await RNContacts.getAll();
        contacts = filterContacts(contacts);
        // console.log({ contacts: contacts });
        setContacts(contacts);
      });
    } else {
      let contacts = await RNContacts.getAll();
      contacts = filterContacts(contacts);
      setContacts(contacts);
    }
  }, []);

  useEffect(() => {
    getContacts();
  }, []);

  const onSearch = () => {
    if (isRefreshing) return;
    setIsSearching(true);
  };
  const onRefresh = () => {
    getContacts();
  };

  const onChangeSearch = text => {
    text = text.toLowerCase();

    const filteredCon = contacts.filter(
      ({displayName}) => displayName.toLowerCase().indexOf(text) >= 0,
    );

    setSearchKey(text);
    setFilteredContacts(filteredCon);
  };

  const onCancelSearch = () => {
    setIsSearching(false);
    setSearchKey('');
  };

  const onSelect = useCallback((contact: any) => {
    const {displayName, phoneNumbers, emailAddresses, postalAddresses} =
      contact;
    const emails = [];
    const contacts = [];

    emailAddresses.forEach(({email}) => {
      // contacts.push({email});
      emails.push(email);
    });

    const email = emails.length ? emails[0] : '';
    let address = '';
    if (postalAddresses && postalAddresses.length)
      address = postalAddresses[0].formattedAddress;

    phoneNumbers.forEach(({number}) =>
      contacts.push({
        name: displayName,
        target: number,
        email: email,
        address,
      }),
    );

    setSelectingContact(contacts);
    setIsVisibleSelectContact(prev => !prev);
  }, []);

  const onConfirmAddContact = async (contact: any) => {
    const formData = {
      name: contact?.name,
      [circleId ? 'phone_number' : 'phoneNumber']: contact?.target,
      email: contact?.email,
      relationship: contact?.relation,
      address: contact?.address,
    };

    setLoading(true);

    try {
      if (circleId) {
        const {data} = await add_member_in_circle(circleId, formData);
        dispatch(addMemberInCircle(data?.newMember));
      } else {
        const {data} = await add_emergency_contact(formData);
        dispatch(addEmergencies(data?.newEmergencyContact));
      }
      setIsVisible(!isVisible);
      setLoading(false);
      if (isTutorial) {
        dispatch(updateTutorialStep(Tutorial.SET_CHECK_IN_TIME));
      } else {
        navigationRef.goBack();
      }
    } catch (error) {
      showAlert(error?.message || 'Failed to add contact', 'error');
      setLoading(false);
    }
  };

  // console.log(selectedContact);

  const displayedContacts =
    isSearching && searchKey ? filteredContacts : contacts;

  return (
    <Layout
      noSpace
      statusbarColor="black"
      darkStatusbar
      translucent={false}
      safeArea>
      <Container
        style={{
          justifyContent: 'center',
          backgroundColor: theme.colors.white,
          flex: 1,
          padding: theme.size.pageBorder + 5,
        }}>
        {/* {isIos && <Space height={statusbarHeight} />} */}
        {/* <Flex justify="flex-start" align="flex-end">
          <BackButton dark title="" />
        </Flex> */}

        {!isSearching ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons
                name="chevron-back"
                size={27}
                style={{fontWeight: 'bold'}}
                color={theme.colors.primary}
                onPress={() => navigationRef.goBack()}
              />
              <Space width={10} />
              <Text size={20} bold>
                Select Contacts
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Ionicons
                onPress={onSearch}
                name="search"
                size={25}
                style={{fontWeight: 'bold'}}
                color={theme.colors.primary}
              />

              {contacts?.length < 1 && (
                <>
                  <Space width={10} />
                  <Ionicons
                    onPress={onRefresh}
                    name="refresh"
                    size={25}
                    style={{fontWeight: 'bold'}}
                    color={theme.colors.primary}
                  />
                </>
              )}
            </View>
          </View>
        ) : (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons
              name="ios-people"
              size={25}
              style={{fontWeight: 'bold'}}
              color={theme.colors.primary}
            />
            <Space width={15} />
            <TextInput
              placeholder="Search"
              onChangeText={onChangeSearch}
              value={searchKey}
              style={{flex: 1, fontSize: 17}}
              placeholderTextColor="#888"
            />

            <Ionicons
              name="close-circle"
              size={25}
              style={{fontWeight: 'bold'}}
              color={theme.colors.primary}
              onPress={onCancelSearch}
            />

            {contacts?.length < 1 && (
              <>
                <Space width={10} />
                <Ionicons
                  onPress={onRefresh}
                  name="refresh"
                  size={25}
                  style={{fontWeight: 'bold'}}
                  color={theme.colors.primary}
                />
              </>
            )}
          </View>
        )}

        <View
          style={{
            flex: 1,
          }}>
          <FlatList
            data={displayedContacts}
            renderItem={({item, index}) => (
              <SingleContact contact={item} onSelect={onSelect} />
            )}
            keyExtractor={(item, index) => `${index.toString()}`}
            refreshing={isRefreshing}
            // contentContainerStyle={{backgroundColor: 'red'}}
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }
          />

          <ContactConfirmDialog
            isVisible={isVisible}
            onCloseDialog={() => setIsVisible(!isVisible)}
            onConfirm={onConfirmAddContact}
            contact={selectedContact}
            loading={loading}
          />

          <ContactSelectDialog
            isVisible={isVisibleSelectContact}
            onCloseDialog={() => setIsVisibleSelectContact(false)}
            contacts={selectingContact}
            onModalHide={() => {
              selectedContact && setIsVisible(true);
            }}
            onBackdropPress={() => {
              setSelectedContact(null);
              setIsVisibleSelectContact(false);
            }}
            onCancelPress={() => {
              setSelectedContact(null);
              setIsVisibleSelectContact(false);
            }}
            setSelectedContact={contact => {
              setSelectedContact(contact);
              setIsVisibleSelectContact(false);
            }}
          />
        </View>
      </Container>
    </Layout>
  );
};

export default Contacts;
