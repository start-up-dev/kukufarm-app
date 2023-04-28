import { Text, View } from "react-native";
import color from "../../const/color";

const CoopsTitle = ({ title }) => {
  return (
    <View style={{ paddingTop: 16 }}>
      <Text
        style={{
          fontFamily: "Sora-Regular",
          fontSize: 12,
          lineHeight: 20,
          letterSpacing: 0.4,
          color: "#595959",
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default CoopsTitle;
