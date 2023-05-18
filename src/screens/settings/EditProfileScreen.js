import {
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  StatusBar,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

import Space from "../../components/common/Space";
import color from "../../const/color";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/common/Header";
import { updateMe } from "../../api/auth";
import Loader from "../../components/common/Loader";
import { clearRes } from "../../store/authSlice";
import { getMe } from "../../api/auth";

const profileImg = require("../../../assets/images/profileImg1.jpg");

const EditProfileScreen = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [image, setImage] = useState(null);

  const navigation = useNavigation();

  const userData = useSelector((state) => state.auth.userData);
  const res = useSelector((state) => state.auth.res);
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

  // Create a new FormData object
  const formData = new FormData();
  // Add the file to the form data
  formData.append("imageUpload", {
    uri: image ? image : null,
    name: "image.jpg",
    type: "image/jpeg",
  });
  firstName ? formData.append("firstName", firstName) : null;
  lastName ? formData.append("lastName", lastName) : null;

  const onSave = () => {
    const body = image
      ? formData
      : {
          email: userData?.email,
          firstName: firstName ? firstName : userData.firstName,
          lastName: lastName ? lastName : userData?.lastName,
        };

    dispatch(updateMe(body));

    // if (body.firstName && body.lastName) {
    //   dispatch(updateMe(body));
    // } else {
    //   Alert.alert(
    //     "Empty Input",
    //     "First Name or Last Name is missing",
    //     [{ text: "OK" }],
    //     {
    //       cancelable: false,
    //     }
    //   );
    // }
  };

  useEffect(() => {
    if (res === "User updated successfully") {
      dispatch(clearRes());
      dispatch(getMe());
      navigation.navigate("Bottom Tab");
    }
  });

  console.log(image);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
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
            defaultValue={userData?.firstName}
            placeholder={userData?.firstName ? "" : "First Name"}
            style={styles.nameInput}
          />
        </View>
        <View style={styles.nameInputView}>
          <TextInput
            onChangeText={(text) => setLastName(text)}
            defaultValue={userData?.lastName}
            placeholder={userData?.lastName ? "" : "Last Name"}
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
