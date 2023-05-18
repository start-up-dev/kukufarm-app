import {
  SafeAreaView,
  View,
  StatusBar,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import color from "../../const/color";
import Input from "../../components/common/Input";
import Space from "../../components/common/Space";
import BottomSheet from "../../components/common/BottomSheet";
import { useEffect, useState } from "react";
import Icon from "../../components/common/Icon";
import { useDispatch, useSelector } from "react-redux";
import { addBirds, getFlock } from "../../api/coop";
import Header from "../../components/common/Header";
import { clearRes } from "../../store/coopSlice";
import Loader from "../../components/common/Loader";

const dropdownIcon = require("../../../assets/images/dropdownMedium.png");

const { width, height } = Dimensions.get("window");

const AddBirdScreen = ({ route }) => {
  const navigation = useNavigation();

  navigation.setOptions({
    header: () => <Header title="Add birds" cancel save={onSave} />,
  });
  const [inputs, setInputs] = useState({
    numOfBirds: "0",
    cpd: "0.00",
  });
  const { data } = route.params;

  const res = useSelector((state) => state.coop.res);
  const status = useSelector((state) => state.coop.status);

  const dispatch = useDispatch();

  // Date Picker
  const [selectedDate, setSelectedDate] = useState(null);
  const [date, setDate] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isPastDate, setIsPastDate] = useState();

  const datePickerHandler = () => {
    showDatePicker();
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const currentDate = new Date();

    if (date.setHours(0, 0, 0, 0) > currentDate.setHours(0, 0, 0, 0)) {
      const options = { year: "numeric", month: "short", day: "numeric" };
      const formattedDate = currentDate.toLocaleDateString("en-GB", options);
      const day = String(currentDate.getDate()).padStart(2, "0");
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const year = currentDate.getFullYear();
      const serverFormat = `${day}-${month}-${year}`;

      setSelectedDate(formattedDate);
      setDate(serverFormat);
      setIsPastDate(true);
    } else {
      const options = { year: "numeric", month: "short", day: "numeric" };
      const formattedDate = date.toLocaleDateString("en-GB", options);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const serverFormat = `${day}-${month}-${year}`;

      setSelectedDate(formattedDate);
      setDate(serverFormat);
      setIsPastDate(false);
    }
    hideDatePicker();
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const onSave = () => {
    const body = {
      date: date,
      flock: data._id,
      quantity: inputs.numOfBirds,
      costPerBird: inputs.cpd,
    };

    if (inputs.numOfBirds > 0 && inputs.cpd > 0) {
      dispatch(addBirds(body));
    } else {
      Alert.alert(
        "Empty Input",
        "Date, Number of birds and Cost per bird must be filled.",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }
  };

  useEffect(() => {
    if (selectedDate === null) {
      const currentDate = new Date();
      const options = { year: "numeric", month: "short", day: "numeric" };
      const formattedDate = currentDate.toLocaleDateString("en-GB", options);
      const day = String(currentDate.getDate()).padStart(2, "0");
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const year = currentDate.getFullYear();
      const serverFormat = `${day}-${month}-${year}`;

      setSelectedDate(formattedDate);
      setDate(serverFormat);
    }
    if (res === "Bird added successfully") {
      dispatch(clearRes());
      dispatch(getFlock(data?.coop));
      navigation.goBack();
    }
  }, [res]);

  return (
    <SafeAreaView style={{ backgroundColor: color.background, flex: 1 }}>
      <StatusBar />
      <Loader visible={status === "loading" ? true : false} />
      <View style={{ paddingHorizontal: 20 }}>
        <Space height={10} />
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
            To
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
            // onPress={toggleDropdown}
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
              {data?.name}
            </Text>
            {/* <Icon icon={dropdownIcon} m /> */}
          </TouchableOpacity>
        </View>
        <Input
          label="Date"
          d
          selectedDate={selectedDate}
          dpCancel={hideDatePicker}
          dpHandler={datePickerHandler}
          dpConfirm={handleConfirm}
          dpVisible={isDatePickerVisible}
        />
        <Text style={styles.guideText}>
          Total cost will be logged as an expense
        </Text>
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
        <Text style={styles.guideText}>
          Total cost will be logged as an expense
        </Text>
      </View>

      <BottomSheet
        title1={`${inputs.numOfBirds} Birds • Expense (KSH) ${
          inputs.numOfBirds * inputs.cpd
        }`}
      />
      {/* {renderDropdown()} */}
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
  guideText: {
    fontFamily: "Sora-Regular",
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0.4,
    color: "#777A85",
    textAlign: "center",
    marginVertical: 10,
  },
});
export default AddBirdScreen;

// const [visible, setVisible] = useState(false);

// const toggleDropdown = () => {
//   setVisible(!visible);
// };

// const renderDropdown = () => {
//   if (visible) {
//     return (
//       <View style={styles.dropdownView}>
//         <TouchableOpacity
//           onPress={() => {
//             toggleDropdown(), handleOnchange("C1 Kenbro 2 - Broiler", "type");
//           }}
//         >
//           <Text style={styles.menuText}>C1 Kenbro 2 - Broiler</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => {
//             toggleDropdown(),
//               handleOnchange("C2 White sussex 2 Layers", "type");
//           }}
//         >
//           <Text style={styles.menuText}>C2 White sussex 2 Layers</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => {
//             toggleDropdown(), handleOnchange("C1 kenbro 1 layer", "type");
//           }}
//         >
//           <Text style={styles.menuText}>C1 kenbro 1 layer</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// };
