import {
  SafeAreaView,
  View,
  StatusBar,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import color from "../../const/color";
import Input from "../../components/common/Input";
import Space from "../../components/common/Space";
import BottomSheet from "../../components/common/BottomSheet";
import { useState } from "react";
import Icon from "../../components/common/Icon";

const dropdownIcon = require("../../../assets/images/dropdownMedium.png");

const { width, height } = Dimensions.get("window");

const AddFlockScreen = () => {
  const [inputs, setInputs] = useState({
    breed_name: "",
    type: "Layers",
    hatched: "",
    numOfBirds: 3,
    cpd: 3.54,
  });
  const [visible, setVisible] = useState(false);

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const renderDropdown = () => {
    if (visible) {
      return (
        <View style={styles.dropdownView}>
          <TouchableOpacity
            onPress={() => {
              toggleDropdown(), handleOnchange("Layers", "type");
            }}
          >
            <Text style={styles.menuText}>Layers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              toggleDropdown(), handleOnchange("Broilers", "type");
            }}
          >
            <Text style={styles.menuText}>Broilers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              toggleDropdown(), handleOnchange("Mixed", "type");
            }}
          >
            <Text style={styles.menuText}>Mixed</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };
  return (
    <SafeAreaView style={{ backgroundColor: color.background, flex: 1 }}>
      <StatusBar />
      <View style={{ paddingHorizontal: 20 }}>
        <Space height={10} />
        <Input
          placeholder="Breed Name"
          onChangeText={(text) => handleOnchange(text, "breed_name")}
          value={inputs.breed_name}
        />
        <View style={styles.container}>
          <Text
            style={{
              fontFamily: "Sora-Regular",
              fontSize: 14,
              lineHeight: 24,
              letterSpacing: 0.25,
              color: "#282A38",
            }}
          >
            Type
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={toggleDropdown}
          >
            <Text
              style={{
                fontFamily: "Sora-Regular",
                fontSize: 16,
                lineHeight: 20,
                letterSpacing: 0.4,
                color: color.TextPrimary,
              }}
            >
              {inputs.type}
            </Text>
            <Icon icon={dropdownIcon} m />
          </TouchableOpacity>
        </View>
        <Input label="Harched" d />
        <Input
          label="Number of birds"
          value={inputs.numOfBirds}
          onChangeText={(text) => handleOnchange(text, "numOfBirds")}
        />
        <Input
          label="Cost per bird (KSH)"
          value={inputs.cpd}
          onChangeText={(text) => handleOnchange(text, "cpd")}
        />
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
      {renderDropdown()}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    padding: 12,
    borderRadius: 7,
    borderColor: color.border,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  menuText: {
    fontFamily: "Sora-Regular",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
    color: color.foundation,
    marginVertical: 10,
  },
  dropdownView: {
    backgroundColor: "#fff",
    position: "absolute",
    top: 130,
    right: 40,
    paddingHorizontal: 30,
    paddingVertical: 16,
    borderRadius: 7,
    shadowColor: "rgba(28, 39, 49, 0.08)",
    shadowOpacity: 1,
    shadowOffset: { width: 1, height: 1 },
  },
});
export default AddFlockScreen;
