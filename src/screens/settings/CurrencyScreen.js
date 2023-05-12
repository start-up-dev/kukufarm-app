import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import allCountry from "../../const/allCountry";
import color from "../../const/color";
import { useState } from "react";
import Icon from "../../components/common/Icon";
import { useSelector } from "react-redux";

const checkIcon = require("../../../assets/images/check.png");

const CurrencyScreen = () => {
  const userData = useSelector((state) => state.auth.userData);
  const [selected, setSelected] = useState(userData?.currency);

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <StatusBar />
        {allCountry.map((i) => (
          <TouchableOpacity
            key={Math.random(100000000000)}
            style={{
              marginVertical: 12,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onPress={() => setSelected(i.currency)}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontFamily: "Sora-Regular",
                  fontSize: 14,
                  lineHeight: 24,
                  letterSpacing: 0.25,
                  color: color.TextPrimary,
                }}
              >
                {i.currency}
              </Text>
              <Text
                style={{
                  fontFamily: "Sora-Regular",
                  fontSize: 14,
                  lineHeight: 24,
                  letterSpacing: 0.25,
                  color: color.TextPrimary,
                  marginLeft: 20,
                }}
              >
                {i.countryName}
              </Text>
            </View>
            {selected === i.currency ? (
              <Icon icon={checkIcon} m />
            ) : (
              <View></View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CurrencyScreen;
