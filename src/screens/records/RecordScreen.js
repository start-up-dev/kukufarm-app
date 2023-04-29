import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import color from "../../const/color";
import CoopsTitle from "../../components/records/CoopsTitle";
import RecordItem from "../../components/records/RecordItem";

const { width, height } = Dimensions.get("window");

const RecordScreen = () => {
  return (
    <SafeAreaView style={{ backgroundColor: color.background }}>
      <ScrollView style={styles.container}>
        <Text style={styles.synced}>Synced just now</Text>
        <CoopsTitle title={"All Coops"} />
        <RecordItem
          title={"All coops - All flocks"}
          subtitle={"5 flocks - 2,637 birds"}
        />
        <CoopsTitle title={"Coop 1"} />
        <RecordItem
          title={"C1 - All flocks"}
          subtitle={"3 flocks - 637 birds"}
        />
        <RecordItem
          title={"C1 Kienyeji 2 - Mixed"}
          subtitle={"637 birds 1 year, 5 months"}
        />
        <RecordItem
          title={"C1 Kienyeji 3 - Mixed"}
          subtitle={"637 birds 1 year, 5 months"}
        />
        <CoopsTitle title={"Coop 2"} />
        <RecordItem
          title={"C1 Kienyeji 3 - Mixed"}
          subtitle={"637 birds 1 year, 5 months"}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
    paddingHorizontal: 20,
  },
  synced: {
    fontFamily: "Sora-Regular",
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0.4,
    color: color.TextSecondary,
    paddingVertical: 12,
  },
});

export default RecordScreen;
