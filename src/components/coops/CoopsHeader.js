import { Image, SafeAreaView, TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import color from "../../const/color";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import DropdownFarm from "./DropdownFarm";

const dropdown = require("../../../assets/images/dropdown.png");
const profileImg1 = require("../../../assets/images/profileImg1.jpg");

const CoopsHeader = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{
        backgroundColor: color.background,
      }}
    >
      <View
        style={{
          paddingHorizontal: 20,
          borderBottomColor: "#F3F5F9",
          borderColor: "transparent",
          borderWidth: 1,
          paddingVertical: 15,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <DropdownFarm />
        <TouchableOpacity
          onPress={() => navigation.navigate("Farm User")}
          style={{ flexDirection: "row" }}
        >
          <Image
            source={profileImg1}
            style={{
              borderRadius: 100,
              width: 32,
              height: 32,
              borderWidth: 2,
              borderColor: "#FCFCFC",
            }}
          />
          <Image
            source={profileImg1}
            style={{
              borderRadius: 100,
              width: 32,
              height: 32,
              borderWidth: 2,
              borderColor: "#FCFCFC",
              position: "relative",
              right: 4,
            }}
          />
          <View
            style={{
              backgroundColor: "#F5F5F5",
              borderRadius: 100,
              width: 32,
              height: 32,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 2,
              borderColor: "#F5F5F5",
              position: "relative",
              right: 8,
            }}
          >
            <Text
              style={{
                fontFamily: "Sora-SemiBold",
                fontSize: 12,
                lineHeight: 16,
                color: color.TextSecondary,
              }}
            >
              +2
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CoopsHeader;
