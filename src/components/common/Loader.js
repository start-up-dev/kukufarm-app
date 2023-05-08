import React from "react";
import {
  useWindowDimensions,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import color from "../../const/color";

const Loader = ({ visible = false }) => {
  const { width, height } = useWindowDimensions();
  return (
    visible && (
      <View
        style={[
          style.container,
          { height, width },
          color ? { backgroundColor: "#323232" } : null,
        ]}
      >
        <ActivityIndicator size="large" color={color.TextLink} />
      </View>
    )
  );
};

const style = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
  },
});

export default Loader;
