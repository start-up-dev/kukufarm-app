import {
  SafeAreaView,
  View,
  StatusBar,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import BottomSheet from 'components/common/BottomSheet';
import color from 'constants/color';
import Space from 'components/common/Space';
import Input from 'components/common/Input';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Header from 'components/common/Header';
import {getFlock, splitFlock} from 'api/coop';
import Loader from 'components/common/Loader';
import {clearRes} from 'store/reducers/coops';
import {navigationRef} from 'utils/navigation';
import {useCustomDispatch, useCustomSelector} from 'store';

const SplitScreen = ({route}) => {
  const {data} = route.params;

  const navigation = useNavigation();

  navigationRef.setOptions({
    header: () => <Header title="Split flock" cancel save={onSave} />,
  });

  const status = useCustomSelector(state => state.coops.status);
  const res = useCustomSelector(state => state.coops.res);

  const dispatch = useCustomDispatch();

  const [inputs, setInputs] = useState({
    layers: '0',
    broiler: '0',
  });

  const totalBirds = parseInt(inputs.layers) + parseInt(inputs.broiler);

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  function removeLastWord(string) {
    var words = string.trim().split(' ');
    if (words.length > 1) {
      words.pop();
      return words.join(' ');
    } else {
      return '';
    }
  }

  const onSave = () => {
    const body = {
      id: data?._id,
      data: {
        layers: inputs.layers,
        broilers: inputs.broiler,
      },
    };
    if (totalBirds == data?.quantity) {
      dispatch(splitFlock(body));
    } else {
      Alert.alert(
        'Notice',
        'Total birds must be equal to total birds',
        [{text: 'OK'}],
        {cancelable: false},
      );
    }
  };

  useEffect(() => {
    if (res === 'Flock splitted successfully') {
      dispatch(clearRes());
      dispatch(getFlock(data?._id));
      navigation.navigate('Coop');
    }
  });

  return (
    <SafeAreaView style={{backgroundColor: color.background, flex: 1}}>
      <StatusBar />
      <Loader visible={status === 'loading' ? true : false} />
      <View style={{paddingHorizontal: 16}}>
        <Space height={20} />

        <Text style={styles.title}>C1 Kienyeji 1 Layers</Text>
        <Space height={12} />
        <Text style={styles.totalBirds}>{data?.quantity} birds</Text>
        <Space height={20} />
        <Text style={styles.birdTitle}>Layers</Text>
        <Space height={12} />
        <Input
          label={'Number of birds'}
          onChangeText={text => handleOnchange(text, 'layers')}
          placeholder={`${data?.quantity / 2}`}
          type="number-pad"
        />
        <Space height={20} />
        <Text style={styles.birdTitle}>Broilers</Text>
        <Space height={12} />
        <Input
          label={'Number of birds'}
          onChangeText={text => handleOnchange(text, 'broiler')}
          placeholder={`${data?.quantity / 2}`}
          type="number-pad"
        />
        <Space height={12} />
        <Text style={styles.note}>
          Existing financial data, and removed birds will be split between the
          two new flocks, by the ratio of birds in the new flocks.
        </Text>
      </View>
      <BottomSheet
        title1={`${removeLastWord(data?.name)} Layers • ${inputs.layers}`}
        title2={`${removeLastWord(data?.name)} Broilers • ${inputs.broiler}`}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  //   container: {
  //   marginVertical: 5,
  //   padding: 12,
  //   borderRadius: 7,
  //   borderColor: color.border,
  //   borderWidth: 1,
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  // },
  title: {
    fontFamily: 'Sora-Regular',
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 0.25,
    color: '#282A38',
    textAlign: 'center',
  },
  totalBirds: {
    fontFamily: 'Sora-Regular',
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0.4,
    color: '#5B5E67',
    textAlign: 'center',
  },
  birdTitle: {
    fontFamily: 'Sora-Regular',
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0.4,
    color: color.TextPrimary,
    textAlign: 'center',
  },
  note: {
    fontFamily: 'Sora-Regular',
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0.4,
    color: '#777A85',
    textAlign: 'center',
  },
});

export default SplitScreen;
