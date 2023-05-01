import { SafeAreaView, View, StatusBar, Text, Dimensions } from "react-native";
import color from "../../const/color";
import Input from "../../components/common/Input";
import Space from "../../components/common/Space";
import BottomSheet from "../../components/common/BottomSheet";

const { width, height } = Dimensions.get("window");

const AddFlockScreen = () => {
  return (
    <SafeAreaView style={{ backgroundColor: color.background, flex: 1 }}>
      <StatusBar />
      <View style={{ paddingHorizontal: 20 }}>
        <Space height={10} />
        <Input placeholder="Breed Name" />
        <Input label="Type" value={"0"} />
        <Input label="Harched" />
        <Input label="Number of birds" value={"0"} />
        <Input label="Cost per bird (KSH)" value={"0.00"} />
        <Space height={10} />
        <Text
          style={{
            fontFamily: "Sora-Regular",
            fontSize: 12,
            lineHeight: 20,
            letterSpacing: 0.4,
            color: "#777A85",
            textAlign: "center",
          }}
        >
          Total cost will be logged as an expense
        </Text>
      </View>

      <BottomSheet title1="New Flock" title2="Expense KSH 0.00" />
    </SafeAreaView>
  );
};

export default AddFlockScreen;
