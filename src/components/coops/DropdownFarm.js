import { useState } from "react";
import { Text, StyleSheet, TouchableOpacity, View, Image } from "react-native";
import color from "../../const/color";

const dropdown = require("../../../assets/images/dropdown.png");

const DropdownFarm = ({ myFarm }) => {
  const [visible, setVisible] = useState(false);
  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const renderDropdown = () => {
    if (visible) {
      return (
        <View
          style={{
            position: "absolute",
            backgroundColor: "#fff",
            top: 50,
            paddingHorizontal: 16,
            borderRadius: 7,
            shadowColor: "rgba(28, 39, 49, 0.08)",
            shadowOpacity: 1,
            shadowOffset: { width: 1, height: 1 },
          }}
        >
          <TouchableOpacity onPress={toggleDropdown}>
            <Text
              style={{
                fontFamily: "Sora-Regular",
                fontSize: 16,
                lineHeight: 24,
                letterSpacing: 0.5,
                color: color.foundation,
                marginVertical: 10,
              }}
            >
              John Appleseed’s farm
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleDropdown}>
            <Text
              style={{
                fontFamily: "Sora-Regular",
                fontSize: 16,
                lineHeight: 24,
                letterSpacing: 0.5,
                color: color.foundation,
                marginVertical: 10,
              }}
            >
              Mary Appleseed’s farm
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <>
      {myFarm ? (
        <TouchableOpacity
          style={{ flexDirection: "row", zIndex: 1 }}
          onPress={toggleDropdown}
        >
          <View>
            <Text
              style={{
                fontFamily: "Sora-Regular",
                fontSize: 16,
                lineHeight: 24,
                color: color.TextLink,
              }}
            >
              John's
            </Text>
            <Text
              style={{
                fontFamily: "Sora-SemiBold",
                fontSize: 10,
                lineHeight: 12,
                color: color.TextLink,
              }}
            >
              FARM
            </Text>
          </View>
          <Image
            source={dropdown}
            style={{ width: 12, resizeMode: "contain", marginLeft: 12 }}
          />
          {renderDropdown()}
        </TouchableOpacity>
      ) : (
        <View>
          <Text
            style={{
              fontFamily: "Sora-Regular",
              fontSize: 16,
              lineHeight: 24,
              letterSpacing: 0.5,
              color: color.TextPrimary,
            }}
          >
            John's
          </Text>
          <Text
            style={{
              fontFamily: "Sora-SemiBold",
              fontSize: 10,
              lineHeight: 12,
              letterSpacing: 1.5,
              color: color.TextPrimary,
            }}
          >
            FARM
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default DropdownFarm;
