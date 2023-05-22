import RBSheet from "react-native-raw-bottom-sheet";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Icon from "../common/Icon";
import Space from "../common/Space";
import { useNavigation } from "@react-navigation/native";
import color from "../../const/color";

const closeIcon = require("../../../assets/images/close.png");

const BottomSheet = ({ sheetRef }) => {
  const navigation = useNavigation();

  const expenseHandle = () => {
    sheetRef?.current?.close();
    navigation.navigate("Add Expense");
  };
  return (
    <View
      style={{
        paddingHorizontal: 30,
        paddingVertical: 16,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View></View>
        <Text style={styles.log}>Log</Text>
        <TouchableOpacity
          style={{
            width: 32,
            height: 32,
            borderRadius: 100,
            backgroundColor: "#F2F1FA",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => sheetRef?.current?.close()}
        >
          <Icon icon={closeIcon} m />
        </TouchableOpacity>
      </View>
      <Space height={30} />
      <View>
        <TouchableOpacity onPress={expenseHandle}>
          <Text style={styles.menuText}>Expense</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={expenseHandle}>
          <Text style={styles.menuText}>Sale</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={expenseHandle}>
          <Text style={styles.menuText}>Eggs collected</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={expenseHandle}>
          <Text style={styles.menuText}>Birds removed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuText: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
    marginVertical: 15,
  },
  log: {
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: 0.4,
    color: "#595959",
    marginVertical: 10,
  },
});

export default BottomSheet;
