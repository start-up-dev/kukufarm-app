import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import color from "../../const/color";

const left = require("../../../assets/images/left.png");
const deleteIcon = require("../../../assets/images/delete.png");
const threeDot = require("../../../assets/images/3dot.png");

const Header = ({
  title,
  back,
  record,
  edit,
  cancel,
  save,
  empty,
  deleted,
  dot,
}) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ backgroundColor: color.background }}>
      <View
        style={[
          {
            paddingHorizontal: 20,
            paddingVertical: 10,
          },
          !record && {
            borderBottomColor: "#F3F5F9",
            borderColor: "transparent",
            borderWidth: 1,
          },
        ]}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          {back && (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={left}
                style={{ width: 7.5, height: 15, resizeMode: "contain" }}
              />
            </TouchableOpacity>
          )}

          {cancel && (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text
                style={{
                  fontFamily: "Sora-Regular",
                  fontSize: 14,
                  lineHeight: 24,
                  color: color.TextLink,
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          )}

          <Text
            style={{
              fontFamily: "Sora-Regular",
              fontSize: 14,
              lineHeight: 24,
              textAlign: "center",
              color: "#282A38",
            }}
          >
            {title}
          </Text>

          {edit && (
            <TouchableOpacity
              onPress={() => navigation.navigate("Edit Profile")}
            >
              <Text
                style={{
                  fontFamily: "Sora-Regular",
                  fontSize: 14,
                  lineHeight: 24,
                  color: color.TextLink,
                }}
              >
                Edit
              </Text>
            </TouchableOpacity>
          )}

          {save && (
            <TouchableOpacity
              onPress={() => navigation.navigate("Edit Profile")}
            >
              <Text
                style={{
                  fontFamily: "Sora-Regular",
                  fontSize: 14,
                  lineHeight: 24,
                  color: color.TextLink,
                }}
              >
                Save
              </Text>
            </TouchableOpacity>
          )}

          {deleted && (
            <TouchableOpacity
            //onPress={() => navigation.navigate("Edit Profile")}
            >
              <Image
                source={deleteIcon}
                style={{ width: 14, height: 18, resizeMode: "contain" }}
              />
            </TouchableOpacity>
          )}

          {dot && (
            <TouchableOpacity
            //onPress={() => navigation.navigate("Edit Profile")}
            >
              <Image
                source={threeDot}
                style={{ width: 16, height: 4, resizeMode: "contain" }}
              />
            </TouchableOpacity>
          )}

          {empty && <View></View>}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;
