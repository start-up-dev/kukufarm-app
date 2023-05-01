import { Alert, SafeAreaView, StatusBar, Text, View } from "react-native";
import color from "../../const/color";
import Space from "../../components/common/Space";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import MyAlert from "../../components/common/Alert";
import { useState } from "react";

const AddPeopleSreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={{ backgroundColor: color.background, flex: 1 }}>
      <StatusBar />
      <MyAlert modalVisible={modalVisible} setModalVisible={setModalVisible} />
      <View style={{ paddingHorizontal: 20 }}>
        <Space height={24} />
        <Text
          style={{
            fontFamily: "Sora-Regular",
            fontSize: 14,
            lineHeight: 24,
            letterSpacing: 0.25,
            color: color.TextSecondary,
            textAlign: "center",
          }}
        >
          Total cost will be logged as an expense
        </Text>
        <Space height={16} />
        <Text
          style={{
            fontFamily: "Sora-Regular",
            fontSize: 12,
            lineHeight: 20,
            letterSpacing: 0.25,
            color: color.TextSecondary,
            textAlign: "center",
          }}
        >
          People you add will be able to view farm data and make new record
          entries.
        </Text>
        <Input label="Email" />
        <Text
          style={{
            fontFamily: "Sora-Regular",
            fontSize: 12,
            lineHeight: 20,
            letterSpacing: 0.4,
            color: color.TextSecondary,
            marginVertical: 3,
          }}
        >
          Enter email used with Kuku farm account
        </Text>
        <Space height={35} />

        <Button
          title="Add to farm"
          onPress={() => setModalVisible(true)}
          fill
        />
      </View>
    </SafeAreaView>
  );
};

export default AddPeopleSreen;
