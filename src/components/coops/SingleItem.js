import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import color from "../../const/color";

const SingleItem = ({ title, subtitle, link }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(link)}
      style={styles.coopView}
    >
      <Text style={styles.coopTitle}>{title}</Text>
      <Text style={styles.flockCount}>{subtitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  coopView: {
    borderWidth: 1,
    height: 104,
    borderColor: color.border,
    borderRadius: 7,
    padding: 20,
    marginVertical: 5,
    justifyContent: "space-between",
  },
  coopTitle: {
    fontFamily: "Sora-Regular",
    fontSize: 18,
    lineHeight: 24,
    color: color.foundation,
  },
  flockCount: {
    fontFamily: "Sora-Regular",
    fontSize: 14,
    lineHeight: 24,
    color: color.TextSecondary,
  },
});

export default SingleItem;
