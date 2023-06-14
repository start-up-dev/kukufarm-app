import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import color from 'constants/color';
import RecordItem from 'components/records/RecordItem';

const {width, height} = Dimensions.get('window');

const ArchivedScreen = () => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#FCFCFC',
      }}>
      <StatusBar />
      <ScrollView style={styles.container}>
        <RecordItem
          title={'C1 Kienyeji 2 - Mixed'}
          subtitle={'637 birds 1 year, 5 months'}
          archive
        />
        <RecordItem
          title={'C1 Kienyeji 2 - Mixed'}
          subtitle={'637 birds 1 year, 5 months'}
          archive
        />
        <RecordItem
          title={'C1 Kienyeji 2 - Mixed'}
          subtitle={'637 birds 1 year, 5 months'}
          archive
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
    paddingHorizontal: 5,
  },
});

export default ArchivedScreen;
