import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import color from "../../const/color";
import RecordBox from "./RecordBox";
import Space from "../common/Space";
import { useEffect, useState } from "react";

const dropdown = require("../../../assets/images/dropdown.png");

const RecordBoxHeader = ({ tabNum }) => {
  const [details, setDetails] = useState(false);
  return (
    <View
      style={{
        margin: 4,
        marginBottom: 0,
        backgroundColor: color.background,
        borderRadius: 3,
        zIndex: 1,
      }}
    >
      <TouchableOpacity
        onPress={() => setDetails(!details)}
        style={{
          paddingHorizontal: 12,
          paddingVertical: 22,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomColor: "#F3F5F9",
          borderColor: "transparent",
          borderWidth: 1,
        }}
      >
        <View style={{ alignItems: "center ", justifyContent: "center" }}>
          <Text
            style={{
              fontFamily: "Sora-SemiBold",
              fontSize: 12,
              lineHeight: 12,
              letterSpacing: 1.2,
              color: "#454545",
            }}
          >
            2023
          </Text>
          <Text
            style={{
              fontFamily: "Sora-Regular",
              fontSize: 14,
              lineHeight: 24,
              letterSpacing: 0.25,
              color: color.TextPrimary,
            }}
          >
            Jun
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              width: 180,
              height: 12,
              backgroundColor: color.foundation,
              borderRadius: 7,
              marginRight: 4,
            }}
          ></View>
          <View
            style={{
              width: tabNum === 2 ? 50 : 0,
              height: 12,
              backgroundColor: "#8C8C8C",
              borderRadius: 7,
              marginRight: 4,
            }}
          ></View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ alignItems: "flex-end", marginRight: 10 }}>
            <Text
              style={{
                fontFamily: "Sora-SemiBold",
                fontSize: 14,
                lineHeight: 24,
                letterSpacing: 0.25,
                color: "#454545",
              }}
            >
              3,417
            </Text>
            <Text
              style={{
                fontFamily: "Sora-Regular",
                fontSize: 12,
                lineHeight: 20,
                letterSpacing: 0.4,
                color: "#454545",
              }}
            >
              9%
            </Text>
          </View>
          <Image
            source={dropdown}
            style={{ width: 10, height: 5.5, resizeMode: "contain" }}
          />
        </View>
      </TouchableOpacity>
      {details && (
        <>
          <Space height={5} />
          <RecordBox />
          <Space height={5} />
        </>
      )}
    </View>
  );
};

export default RecordBoxHeader;
