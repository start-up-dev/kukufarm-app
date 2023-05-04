import { SafeAreaView, View, StatusBar, Text, StyleSheet } from "react-native";
import BottomSheet from "../../components/common/BottomSheet";
import color from "../../const/color";
import Space from "../../components/common/Space";
import Input from "../../components/common/Input";
import { useState } from "react";

const SplitScreen = () => {
  const [inputs, setInputs] = useState({
    layers: 250,
    broiler: 250,
  });

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  return (
    <SafeAreaView style={{ backgroundColor: color.background, flex: 1 }}>
      <StatusBar />
      <View style={{ paddingHorizontal: 16 }}>
        <Space height={20} />

        <Text style={styles.title}>C1 Kienyeji 1 Layers</Text>
        <Space height={12} />
        <Text style={styles.totalBirds}>500 birds</Text>
        <Space height={20} />
        <Text style={styles.birdTitle}>Layers</Text>
        <Space height={12} />
        <Input
          label={"Number of birds"}
          onChangeText={(text) => handleOnchange(text, "layers")}
          value={inputs.layers}
          type="number-pad"
        />
        <Space height={20} />
        <Text style={styles.birdTitle}>Broilers</Text>
        <Space height={12} />
        <Input
          label={"Number of birds"}
          onChangeText={(text) => handleOnchange(text, "broiler")}
          value={inputs.broiler}
          type="number-pad"
        />
        <Space height={12} />
        <Text style={styles.note}>
          Existing financial data, and removed birds will be split between the
          two new flocks, by the ratio of birds in the new flocks.
        </Text>
      </View>
      <BottomSheet
        title1={"C1 Kienyeji 1 Layers • 250"}
        title2={"C1 Kienyeji 1 Broilers • 250"}
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
    fontFamily: "Sora-Regular",
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 0.25,
    color: "#282A38",
    textAlign: "center",
  },
  totalBirds: {
    fontFamily: "Sora-Regular",
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0.4,
    color: "#5B5E67",
    textAlign: "center",
  },
  birdTitle: {
    fontFamily: "Sora-Regular",
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0.4,
    color: color.TextPrimary,
    textAlign: "center",
  },
  note: {
    fontFamily: "Sora-Regular",
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0.4,
    color: "#777A85",
    textAlign: "center",
  },
});

export default SplitScreen;
