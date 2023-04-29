import {
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import Space from "../../components/common/Space";
import color from "../../const/color";
import { useState } from "react";

const profileImg = require("../../../assets/images/profileImg1.jpg");

const EditProfileScreen = () => {
  const [name, setName] = useState("John Appleseed");
  const [image, setImage] = useState(null);

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

  return (
    <SafeAreaView style={styles.container}>
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
            onChangeText={(text) => setName(text)}
            value={name}
            placeholder="Enter Name"
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
