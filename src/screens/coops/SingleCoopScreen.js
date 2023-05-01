import { SafeAreaView, Text, ScrollView, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";

import color from "../../const/color";
import Button from "../../components/common/Button";
import Space from "../../components/common/Space";
import SingleItem from "../../components/coops/SingleItem";

const SingleCoopScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ backgroundColor: color.background }}>
      <StatusBar />
      <ScrollView style={{ paddingHorizontal: 20, height: "100%" }}>
        <Space height={20} />
        <Button
          title="New Flock"
          onPress={() => navigation.navigate("Add Flock")}
          icon
        />
        <Space height={20} />
        <SingleItem
          title="C1 Kienyeji 1 mixed"
          subtitle="500 Birds ·  3w"
          link="Flock Details"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SingleCoopScreen;
