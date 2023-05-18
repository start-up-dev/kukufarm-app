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
import color from "../../const/color";
import Input from "../../components/common/Input";
import Space from "../../components/common/Space";
import BottomSheet from "../../components/common/BottomSheet";
import { useEffect, useState } from "react";
import Icon from "../../components/common/Icon";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/common/Header";
import { useDispatch, useSelector } from "react-redux";
import { createFlock, getFlock } from "../../api/coop";
import { clearError, clearRes } from "../../store/coopSlice";
import Loader from "../../components/common/Loader";

const dropdownIcon = require("../../../assets/images/dropdownMedium.png");

const { width, height } = Dimensions.get("window");

const AddFlockScreen = ({ route }) => {
  const [inputs, setInputs] = useState({
    breed_name: "",
    type: "Layers",
    numOfBirds: "0",
    cpd: "0.00",
  });
  const [visible, setVisible] = useState(false);

  const { coopId } = route.params;

  const res = useSelector((state) => state.coop.res);
  const status = useSelector((state) => state.coop.status);
  const error = useSelector((state) => state.coop.error);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  navigation.setOptions({
    header: () => <Header title="New Flock" cancel save={onSave} />,
  });

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

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const onSave = () => {
    const body = {
      apiBody: {
        breed: inputs.breed_name,
        quantity: inputs.numOfBirds,
        dateStarted: date,
        costPerBird: inputs.cpd,
        type: inputs.type,
      },
      coopId: coopId,
    };

    if (!!inputs.breed_name && !!date) {
      dispatch(createFlock(body));
    } else {
      Alert.alert(
        "Empty Input",
        "Breed Name and Hatched Date is missing",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }
  };

  useEffect(() => {
    if (res === "Flock added successfully") {
      dispatch(clearRes());
      navigation.goBack();
      dispatch(getFlock(coopId));
    }
  }, [res]);

  useEffect(() => {
    if (error === "Please upgrade the plan") {
      dispatch(clearError());
      Alert.alert(
        "Upgrade",
        "Upgrade to Medium or Large farm plans to use this feature and more",
        [{ text: "OK", onPress: () => navigation.navigate("Upgrade") }],
        { cancelable: false }
      );
    }
  }, [error]);

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
  }, [selectedDate]);

  const renderDropdown = () => {
    if (visible) {
      return (
        <View style={styles.dropdownView}>
          <TouchableOpacity
            onPress={() => {
              toggleDropdown(), handleOnchange("Layers", "type");
            }}
          >
            <Text style={styles.menuText}>Layers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              toggleDropdown(), handleOnchange("Broilers", "type");
            }}
          >
            <Text style={styles.menuText}>Broilers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              toggleDropdown(), handleOnchange("Mixed", "type");
            }}
          >
            <Text style={styles.menuText}>Mixed</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };
  return (
    <SafeAreaView style={{ backgroundColor: color.background, flex: 1 }}>
      <StatusBar />
      <Loader visible={status === "loading" ? true : false} />
      <View style={{ paddingHorizontal: 20 }}>
        <Space height={10} />
        <Input
          placeholder="Breed Name"
          onChangeText={(text) => handleOnchange(text, "breed_name")}
          value={inputs.breed_name}
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
            Type
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
          label="Hatched"
          d
          selectedDate={selectedDate}
          dpCancel={hideDatePicker}
          dpHandler={datePickerHandler}
          dpConfirm={handleConfirm}
          dpVisible={isDatePickerVisible}
        />
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
        <Space height={10} />
        <Text
          style={{
            fontFamily: "Sora-Regular",
            fontSize: 12,
            lineHeight: 20,
            letterSpacing: 0.4,
            color: "#777A85",
            textAlign: "center",
          }}
        >
          Total cost will be logged as an expense
        </Text>
      </View>

      <BottomSheet
        title1={`${inputs.breed_name} ${inputs.type}`}
        title2={`Expense KSH ${inputs.cpd * inputs.numOfBirds}`}
      />
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
    top: 130,
    right: 40,
    paddingHorizontal: 30,
    paddingVertical: 16,
    borderRadius: 7,
    shadowColor: "rgba(28, 39, 49, 0.08)",
    shadowOpacity: 1,
    shadowOffset: { width: 1, height: 1 },
  },
});
export default AddFlockScreen;
