import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import TabBar from "../../components/records/TabBar";
import RecordBox from "../../components/records/RecordBox";
import RecordBoxHeader from "../../components/records/RecordBoxHeader";
import Space from "../../components/common/Space";
import { View } from "react-native";
import Icon from "../../components/common/Icon";
import color from "../../const/color";

const plusWhite = require("../../../assets/images/plusWhite.png");

const { width, height } = Dimensions.get("window");

const RecordDetailsScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TabBar />
      <View style={styles.addView}>
        <Icon icon={plusWhite} />
      </View>
      <ScrollView style={{ flex: 1 }}>
        <RecordBoxHeader />
        <RecordBoxHeader />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  addView: {
    zIndex: 1,
    position: "absolute",
    top: height - 260,
    left: width - 75,
    right: 0,
    width: 56,
    height: 56,
    borderRadius: 100,
    backgroundColor: color.TextLink,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RecordDetailsScreen;
