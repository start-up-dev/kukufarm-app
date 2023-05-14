import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  View,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as AppleAuthentication from "expo-apple-authentication";

WebBrowser.maybeCompleteAuthSession();

import Space from "../components/common/Space";
import color from "../const/color";
import { useDispatch, useSelector } from "react-redux";
import { appleAuth, googleAuth } from "../api/auth";
import { logIn } from "../store/authSlice";

//Images
const google = require("../../assets/images/google.png");
const apple = require("../../assets/images/apple.png");

const LogInScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);

  const [token, setToken] = useState("");
  const [appleToken, setAppleToken] = useState("");

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "693246696932-s8tgtc2bqb60k8tm4ihs3vrs9cod4mqh.apps.googleusercontent.com",
    iosClientId:
      "693246696932-q9c3lcph74l2jgi9hj3frp38hb9ji7os.apps.googleusercontent.com",
    expoClientId:
      "693246696932-giabagvkjh0o9tv9eq9eelomr6o52ge2.apps.googleusercontent.com",
  });

  const appleLogin = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      // signed in
      setAppleToken(credential.identityToken);
    } catch (e) {
      if (e.code === "ERR_REQUEST_CANCELED") {
        // handle that the user canceled the sign-in flow
      } else {
        // handle other errors
      }
    }
  };

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
      getUserInfo();
    }
    if (!!token) {
      const body = { bearerToken: token };
      dispatch(googleAuth(body));
    }
  }, [response, token]);

  useEffect(() => {
    if (!!appleToken) {
      const body = { identityToken: appleToken };
      dispatch(appleAuth(body));
      console.log(body);
    }
  }, [appleToken]);

  useEffect(() => {
    if (userData !== null) {
      dispatch(logIn());
    }
  }, [userData]);

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      // Add your own error handler here
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <ScrollView style={{ paddingHorizontal: 16 }}>
        <Space height={100} />
        <Text style={styles.title}>Kuku farm</Text>
        <Text style={styles.subTitle}>Flock management and record keeping</Text>
        <Space height={150} />
        <TouchableOpacity style={styles.logInBox} onPress={() => appleLogin()}>
          <Image source={apple} style={styles.appleIcon} />
          <Text style={styles.logInText}>Continue with Apple</Text>
        </TouchableOpacity>
        <Space height={20} />
        <TouchableOpacity
          style={styles.logInBox}
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
        >
          <Image source={google} style={styles.googleIcon} />
          <Text style={styles.logInText}>Continue with Google</Text>
        </TouchableOpacity>
        <Space height={250} />
        <Text style={styles.bottomText}>
          By continuing, you agree to Kuku farm’s{" "}
          <Text style={styles.bottomLink}>Terms of service</Text> and{" "}
          <Text style={styles.bottomLink}>Privacy policy</Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: color.background,
    flex: 1,
  },
  title: {
    fontFamily: "Sora-Bold",
    fontSize: 28,
    lineHeight: 40,
    textAlign: "center",
  },
  subTitle: {
    fontFamily: "Sora-Regular",
    fontSize: 14,
    lineHeight: 24,
    textAlign: "center",
  },
  logInBox: {
    borderWidth: 1,
    borderRadius: 7,
    padding: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: color.TextPrimary,
  },
  logInText: {
    fontFamily: "Sora-Regular",
    fontSize: 16,
    lineHeight: 24,
    color: color.TextPrimary,
  },
  appleIcon: {
    width: 12.64,
    height: 15,
    marginRight: 12,
  },
  googleIcon: {
    width: 16.22,
    height: 16.67,
    marginRight: 12,
  },
  bottomText: {
    fontFamily: "Sora-Regular",
    textAlign: "center",
    fontSize: 12,
    lineHeight: 24,
    paddingHorizontal: 50,
    color: color.TextSecondary,
  },
  bottomLink: {
    fontFamily: "Sora-SemiBold",
    color: color.TextLink,
  },
});

export default LogInScreen;

// <View style={styles.container}>
//       {userInfo === null ? (
//         <Button
//           title="Sign in with Google"

//         />
//       ) : (
//         <Text style={styles.text}>{userInfo.name}</Text>
//       )}
//     </View>
