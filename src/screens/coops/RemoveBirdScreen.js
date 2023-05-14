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
import { getFlock, removeBirds } from "../../api/coop";
import { clearRes } from "../../store/coopSlice";
import Header from "../../components/common/Header";

const dropdownIcon = require("../../../assets/images/dropdownMedium.png");

const { width, height } = Dimensions.get("window");

const RemoveBirdScreen = ({ route }) => {
  const navigation = useNavigation();

  navigation.setOptions({
    header: () => <Header title="Remove birds" cancel save={onSave} />,
  });
  const [inputs, setInputs] = useState({
    breed_name: "",
    type: "Consumption",
    numOfBirds: "0",
  });
  const [visible, setVisible] = useState(false);

  const { data } = route.params;

  const res = useSelector((state) => state.coop.res);
  const status = useSelector((state) => state.coop.status);

  const dispatch = useDispatch();

  // Date Picker
  const [selectedDate, setSelectedDate] = useState();
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

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const onSave = () => {
    const body = {
      date: date,
      flock: data._id,
      quantity: inputs.numOfBirds,
      type: inputs.type,
    };

    if (date && inputs.numOfBirds > 0) {
      dispatch(removeBirds(body));
      dispatch(getFlock(data?.coop));
    } else {
      Alert.alert(
        "Empty Input",
        "Date and Number of birds must be filled.",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }
  };

  useEffect(() => {
    if (res === "Bird added successfully") {
      dispatch(clearRes());
      navigation.goBack();
    }
  }, [res]);

  const renderDropdown = () => {
    if (visible) {
      return (
        <View style={styles.dropdownView}>
          <TouchableOpacity
            onPress={() => {
              toggleDropdown(), handleOnchange("Consumption", "type");
            }}
          >
            <Text style={styles.menuText}>Consumption</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              toggleDropdown(), handleOnchange("Death", "type");
            }}
          >
            <Text style={styles.menuText}>Death</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              toggleDropdown(), handleOnchange("Disease", "type");
            }}
          >
            <Text style={styles.menuText}>Disease</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              toggleDropdown(), handleOnchange("Other", "type");
            }}
          >
            <Text style={styles.menuText}>Other</Text>
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
            From
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
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
              C1 Kienyeji 1 Mixed
            </Text>
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
            Reason
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
        <Input
          label="Number of birds consumed"
          value={inputs.numOfBirds}
          onChangeText={(text) => handleOnchange(text, "numOfBirds")}
        />
        <Text style={styles.guideText}>
          If this is a mature flock, consider splitting it so that it easier to
          manage and track egg production rate
        </Text>
      </View>

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
    top: 180,
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
export default RemoveBirdScreen;
