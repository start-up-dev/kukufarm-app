import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

import color from "../../const/color";
import Space from "../../components/common/Space";
import AppGuide from "../../components/common/AppGuide";
import SingleItem from "../../components/coops/SingleItem";
import { useDispatch, useSelector } from "react-redux";
import { createCoop, getCoop } from "../../api/coop";
import Loader from "../../components/common/Loader";
import SnackBar from "../../components/common/SnackBar";

//Images
const archived = require("../../../assets/images/archived.png");
const plus = require("../../../assets/images/plus.png");

const { width, height } = Dimensions.get("window");

const CoopScreen = () => {
  const [appGuideHide, setAppguideHide] = useState(true);
  const navigation = useNavigation();

  const coop = useSelector((state) => state.coop.coop);
  const status = useSelector((state) => state.coop.status);
  const userData = useSelector((state) => state.auth.userData);
  const id = userData?._id;

  const dispatch = useDispatch();

  const onNewCoop = () => {
    if (!(coop?.length > 0)) {
      dispatch(createCoop(id));
    } else {
      Alert.alert(
        "Upgrade",
        "Upgrade to Medium or Large farm plans to use this feature and more",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  };

  useEffect(() => {
    if (id) {
      if (coop === null) {
        dispatch(getCoop(id));
      }
    }
  }, [coop, userData]);

  return (
    <SafeAreaView style={{ backgroundColor: color.background, flex: 1 }}>
      <StatusBar />
      <Loader visible={status === "loading" ? true : false} />
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <Space height={28} />
        <Text style={styles.title}>Coops</Text>
        <Space height={32} />
        <TouchableOpacity
          onPress={() => navigation.navigate("Archive")}
          style={styles.archivedView}
        >
          <Image source={archived} style={styles.archivedIcon} />
          <Text style={styles.archivedText}>Archived flocks</Text>
        </TouchableOpacity>
        <Space height={20} />
        <TouchableOpacity style={styles.newCoopView} onPress={onNewCoop}>
          <Image
            source={plus}
            style={{ width: 10, height: 10, resizeMode: "contain" }}
          />
          <Text style={styles.newCoopText}>New Coop</Text>
        </TouchableOpacity>
        <Space height={10} />

        {coop?.length > 0 &&
          coop.map((item) => (
            <SingleItem
              title={item?.name}
              subtitle={`${item?.flocks.length} Flocks`}
              key={item?._id}
              coopId={item?._id}
              link="Single Coop"
            />
          ))}

        {appGuideHide && <AppGuide onPress={() => setAppguideHide(false)} />}
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
