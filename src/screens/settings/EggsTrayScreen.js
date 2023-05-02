import { View, ScrollView, Text, StatusBar } from "react-native";
import Input from "../../components/common/Input";
import color from "../../const/color";
import Space from "../../components/common/Space";
import { useState } from "react";

const EggsTrayScreen = () => {
  const [num, setNum] = useState(30);
  return (
    <View
      style={{
        paddingHorizontal: 16,
        flex: 1,
        backgroundColor: color.background,
      }}
    >
      <StatusBar />
      <Space height={40} />
      <Input
        label="Number of eggs in a tray"
        handleOnChange={(text) => setNum(text)}
        value={num}
        type="number-pad"
      />
    </View>
  );
};

export default EggsTrayScreen;
