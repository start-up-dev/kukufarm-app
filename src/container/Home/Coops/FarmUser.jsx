import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
} from 'react-native';
import color from 'constants/color';
import SingleMenu from 'components/settings/SingleMenu';
import {useSelector} from 'react-redux';

const {width, height} = Dimensions.get('window');

const FarmUser = () => {
  const userData = useSelector(state => state.auth.userData);
  return (
    <SafeAreaView style={{backgroundColor: color.background}}>
      <StatusBar />
      <ScrollView style={{paddingHorizontal: 20, height: height}}>
        <SingleMenu
          title={`${userData?.firstName}'s Farm`}
          subTitle="Owner"
          profile={userData?.picture}
          right
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default FarmUser;
