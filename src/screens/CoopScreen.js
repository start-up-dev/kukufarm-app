import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import color from "../const/color";
import Space from "../components/common/Space";
import AppGuide from "../components/common/AppGuide";
import Header from "../components/coops/Header";

//Images
const archived = require("../../assets/images/archived.png");
const plus = require("../../assets/images/plus.png");

const { width, height } = Dimensions.get("window");

const CoopScreen = () => {
  const navigation = useNavigation();

  navigation.setOptions({ header: () => <Header /> });

  return (
    <SafeAreaView style={{ backgroundColor: color.background }}>
      <StatusBar />
      <ScrollView style={{ paddingHorizontal: 20, height: "100%" }}>
        <Space height={28} />
        <Text style={styles.title}>Coops</Text>
        <Space height={32} />
        <View style={styles.archivedView}>
          <Image source={archived} style={styles.archivedIcon} />
          <Text style={styles.archivedText}>Archived flocks</Text>
        </View>
        <Space height={20} />
        <View style={styles.newCoopView}>
          <Image
            source={plus}
            style={{ width: 10, height: 10, resizeMode: "contain" }}
          />
          <Text style={styles.newCoopText}>New Coop</Text>
        </View>
        <Space height={10} />
        <View style={styles.coopView}>
          <Text style={styles.coopTitle}>Coop 1</Text>
          <Text style={styles.flockCount}>0 Flocks</Text>
        </View>
        <Space height={200} />
        <AppGuide />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "Sora-SemiBold",
    fontSize: 20,
    lineHeight: 28,
  },
  archivedIcon: {
    width: 12,
    height: 12,
    resizeMode: "contain",
  },
  archivedText: {
    fontFamily: "Sora-Regular",
    fontSize: 14,
    lineHeight: 24,
    color: color.TextLink,
    marginLeft: 10,
  },
  archivedView: {
    flexDirection: "row",
    alignItems: "center",
  },
  newCoopView: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: color.TextLink,
    borderRadius: 7,
    height: 104,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  newCoopText: {
    fontFamily: "Sora-Regular",
    color: color.TextLink,
    fontSize: 14,
    marginLeft: 7,
  },
  coopView: {
    borderWidth: 1,
    height: 104,
    borderColor: color.border,
    borderRadius: 7,
    padding: 20,
    justifyContent: "space-between",
  },
  coopTitle: {
    fontFamily: "Sora-Regular",
    fontSize: 18,
    lineHeight: 24,
    color: color.foundation,
  },
  flockCount: {
    fontFamily: "Sora-Regular",
    fontSize: 14,
    lineHeight: 24,
    color: color.TextSecondary,
  },
});
export default CoopScreen;
