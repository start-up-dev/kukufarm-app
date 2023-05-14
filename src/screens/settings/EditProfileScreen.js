import {
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

import Space from "../../components/common/Space";
import color from "../../const/color";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/common/Header";
import { updateMe } from "../../api/auth";
import Loader from "../../components/common/Loader";

const profileImg = require("../../../assets/images/profileImg1.jpg");

const EditProfileScreen = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [image, setImage] = useState(null);

  const navigation = useNavigation();

  const userData = useSelector((state) => state.auth.userData);
  const status = useSelector((state) => state.auth.status);

  const dispatch = useDispatch();

  navigation.setOptions({
    header: () => <Header title="Edit Profile" cancel save={onSave} />,
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSave = () => {
    const body = {
      email: userData?.email,
      firstName: firstName,
      lastName: lastName,
    };

    if (firstName && lastName) {
      dispatch(updateMe(body));
    } else {
      Alert.alert(
        "Empty Input",
        "First Name or Last Name is missing",
        [{ text: "OK" }],
        {
          cancelable: false,
        }
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={status === "loading" ? true : false} />
      <View style={{ paddingHorizontal: 20 }}>
        <Space height={30} />
        <Image
          source={image ? { uri: image } : profileImg}
          style={styles.profileImg}
        />
        <Space height={8} />
        <TouchableOpacity onPress={pickImage}>
          <Text style={styles.setPhoto}>Set Photo</Text>
        </TouchableOpacity>
        <Space height={40} />
        <View style={styles.nameInputView}>
          <TextInput
            onChangeText={(text) => setFirstName(text)}
            value={firstName}
            placeholder="First Name"
            style={styles.nameInput}
          />
        </View>
        <View style={styles.nameInputView}>
          <TextInput
            onChangeText={(text) => setLastName(text)}
            value={lastName}
            placeholder="Last Name"
            style={styles.nameInput}
          />
        </View>
        <Space height={800} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.background,
  },
  profileImg: {
    width: 80,
    height: 80,
    borderRadius: 100,
    alignSelf: "center",
  },
  setPhoto: {
    fontFamily: "Sora-Regular",
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 0.25,
    color: color.TextLink,
    textAlign: "center",
  },
  nameInputView: {
    padding: 12,
    borderRadius: 7,
    borderColor: color.border,
    borderWidth: 1,
    marginVertical: 10,
  },
  nameInput: {
    fontFamily: "Sora-Regular",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
    color: "#282A38",
  },
});

export default EditProfileScreen;
