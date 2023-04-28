import { View, Text, StyleSheet } from "react-native";
import color from "../../const/color";
import Space from "../common/Space";

const TabBar = () => {
  return (
    <View
      style={{
        backgroundColor: color.background,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          borderBottomColor: "#F3F5F9",
          borderColor: "transparent",
          borderWidth: 1,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text style={[styles.title, { color: color.TextLink }]}>Birds</Text>
          <View
            style={{
              backgroundColor: color.TextLink,
              borderRadius: 3,
              width: 32,
              height: 5,
              marginTop: 4,
            }}
          ></View>
        </View>
        <Text style={styles.title}>Finances</Text>
        <Text style={styles.title}>Eggs</Text>
      </View>
      <View
        style={{
          paddingVertical: 10,
          justifyContent: "space-evenly",
          flexDirection: "row",
        }}
      >
        <View>
          <Text style={styles.title2}>To Date</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 16,
              height: 12,
              backgroundColor: color.foundation,
              borderRadius: 7,
              marginRight: 4,
            }}
          ></View>
          <Text style={styles.title2}>Live Stock</Text>
        </View>
        <Text style={styles.title2}>Mortality rate (%)</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "Sora-Regular",
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 0.25,
    color: color.foundation,
  },
  title2: {
    fontFamily: "Sora-Regular",
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0.4,
    color: color.foundation,
  },
});

export default TabBar;
