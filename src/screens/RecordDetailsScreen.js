import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import TabBar from "../components/records/TabBar";
import RecordBox from "../components/records/RecordBox";
import RecordBoxHeader from "../components/records/RecordBoxHeader";
import Space from "../components/common/Space";

const { w, h } = Dimensions.get("window");

const RecordDetailsScreen = () => {
  return (
    <SafeAreaView>
      <TabBar />
      <ScrollView style={{ height: h }}>
        <RecordBoxHeader />
        <RecordBoxHeader />
        <Space height={100} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default RecordDetailsScreen;
