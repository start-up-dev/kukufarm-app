import { Alert, SafeAreaView, StatusBar, Text, View } from "react-native";
import color from "../../const/color";
import Space from "../../components/common/Space";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import MyAlert from "../../components/common/Alert";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCoWorker } from "../../api/auth";
import Loader from "../../components/common/Loader";
import { clearError, clearRes } from "../../store/authSlice";

const AddPeopleSreen = () => {
  const [email, setEmail] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const userData = useSelector((state) => state.auth.userData);
  const status = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);

  const dispatch = useDispatch();

  function validateEmail(email) {
    // Regular expression pattern for email validation
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);
  }

  const onAdd = () => {
    const body = {
      id: userData?._id,
      email: email,
    };
    if (validateEmail(email)) {
      dispatch(addCoWorker(body));
    } else {
      Alert.alert(
        "Email Invalid",
        "Please insert a valid email address",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }
  };

  useEffect(() => {
    if (error?.message === "Email not found") {
      dispatch(clearError());
      setModalVisible(true);
    }
  }, [error]);

  // useEffect(() => {
  //   if (res === "CoWorker Successfully Added") {
  //     dispatch(clearRes());
  //     navigat
  //   }
  // }, [error]);

  return (
    <SafeAreaView style={{ backgroundColor: color.background, flex: 1 }}>
      <StatusBar />
      <MyAlert modalVisible={modalVisible} setModalVisible={setModalVisible} />
      <View style={{ paddingHorizontal: 20 }}>
        <Space height={24} />
        <Text
          style={{
            fontFamily: "Sora-Regular",
            fontSize: 14,
            lineHeight: 24,
            letterSpacing: 0.25,
            color: color.TextSecondary,
            textAlign: "center",
          }}
        >
          Total cost will be logged as an expense
        </Text>
        <Space height={16} />
        <Text
          style={{
            fontFamily: "Sora-Regular",
            fontSize: 12,
            lineHeight: 20,
            letterSpacing: 0.25,
            color: color.TextSecondary,
            textAlign: "center",
          }}
        >
          People you add will be able to view farm data and make new record
          entries.
        </Text>
        <Space height={40} />
        <Input placeholder={"Email"} onChangeText={(text) => setEmail(text)} />
        <Text
          style={{
            fontFamily: "Sora-Regular",
            fontSize: 12,
            lineHeight: 20,
            letterSpacing: 0.4,
            color: color.TextSecondary,
            marginVertical: 3,
          }}
        >
          Enter email used with Kuku farm account
        </Text>
        <Space height={35} />

        <Button status={status} title="Add to farm" onPress={onAdd} fill />
      </View>
    </SafeAreaView>
  );
};

export default AddPeopleSreen;
