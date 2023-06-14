import {Snackbar} from 'react-native-paper';
import {View, Text, StyleSheet} from 'react-native';
import {useState} from 'react';

const SnackBar = ({title, visible}) => {
  const [sbVisible, setsbVisible] = useState(visible);
  return (
    <Snackbar
      visible={sbVisible}
      onDismiss={() => setsbVisible(!sbVisible)}
      style={styles.sbView}>
      <View>
        <Text style={styles.sbText}>{title}</Text>
      </View>
    </Snackbar>
  );
};

const styles = StyleSheet.create({
  sbView: {
    marginHorizontal: 10,
    backgroundColor: '#1F1F1F',
    borderRadius: 7,
  },
  sbText: {
    fontFamily: 'Sora-Regular',
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0.4,
    color: '#FFFFFF',
  },
});

export default SnackBar;
