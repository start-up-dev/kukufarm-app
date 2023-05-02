import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  StatusBar,
} from "react-native";
import color from "../../const/color";
import Icon from "../../components/common/Icon";
import Space from "../../components/common/Space";
import Button from "../../components/common/Button";

const checkIcon = require("../../../assets/images/check.png");

const UpgradeScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView style={{ paddingHorizontal: 16 }}>
        <StatusBar />
        <View style={styles.view}>
          <Text style={styles.currentPlan}>Current Plan</Text>
          <Space height={12} />
          <Text style={styles.title}>Small farm</Text>

          <Space height={12} />

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon icon={checkIcon} sm />
            <Text style={styles.checkText}>1 Coop, 1 Flock</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon icon={checkIcon} sm />
            <Text style={styles.checkText}>Records view: To date</Text>
          </View>
        </View>

        <View style={styles.view}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <View style={styles.bestSellar}>
              <Text style={styles.currentPlan}>Best Sellar</Text>
            </View>
          </View>

          <Space height={12} />
          <Text style={styles.title}>Medium farm</Text>

          <Space height={12} />

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon icon={checkIcon} sm />
            <Text style={styles.checkText}>2 Coops, Unlimited Flocks</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon icon={checkIcon} sm />
            <Text style={styles.checkText}>
              Records view: Day, Week, Month, To date
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon icon={checkIcon} sm />
            <Text style={styles.checkText}>Add co-owners and workers</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon icon={checkIcon} sm />
            <Text style={styles.checkText}>Flock archiving</Text>
          </View>

          <Space height={18} />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.priceText}>KSH</Text>
            <Text style={styles.price}>3,999</Text>
            <Text style={styles.priceText}>/Year</Text>
          </View>

          <Space height={18} />
          <Button title={"Start 1 month free trial"} fill />
          <Space height={8} />
          <Text style={styles.renew}>Renewed yearly, cancel anytime</Text>
        </View>

        <View style={styles.view}>
          <Text style={styles.title}>Large farm</Text>

          <Space height={12} />

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon icon={checkIcon} sm />
            <Text style={styles.checkText}>5 Coops, Unlimited Flocks</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon icon={checkIcon} sm />
            <Text style={styles.checkText}>
              Records view: Day, Week, Month, To date
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon icon={checkIcon} sm />
            <Text style={styles.checkText}>Add co-owners and workers</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon icon={checkIcon} sm />
            <Text style={styles.checkText}>Flock archiving</Text>
          </View>
          <Space height={18} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.priceText}>KSH</Text>
            <Text style={styles.price}>3,999</Text>
            <Text style={styles.priceText}>/Year</Text>
          </View>

          <Space height={18} />
          <Button title={"Start 1 month free trial"} fill />
          <Space height={8} />
          <Text style={styles.renew}>Renewed yearly, cancel anytime</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: color.background,
    borderRadius: 7,
    padding: 20,
    marginTop: 8,
  },
  title: {
    fontFamily: "Sora-Regular",
    fontSize: 20,
    lineHeight: 32,
    color: "#282A38",
    letterSpacing: 0.15,
  },
  checkText: {
    fontFamily: "Sora-Regular",
    fontSize: 14,
    lineHeight: 24,
    color: "#282A38",
    letterSpacing: 0.25,
    marginLeft: 8,
  },
  currentPlan: {
    fontFamily: "Sora-SemiBold",
    fontSize: 10,
    lineHeight: 12,
    color: "#5B5E67",
    letterSpacing: 1.5,
    marginLeft: 8,
    textTransform: "uppercase",
    textAlign: "center",
  },
  bestSellar: {
    backgroundColor: "#D9D9D9",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  renew: {
    fontFamily: "Sora-Regular",
    fontSize: 12,
    lineHeight: 20,
    color: "#5B5E67",
    letterSpacing: 0.4,
    textAlign: "center",
  },
  priceText: {
    fontFamily: "Sora-Regular",
    fontSize: 12,
    lineHeight: 20,
    color: "#5B5E67",
    letterSpacing: 0.4,
    textAlign: "center",
  },
  price: {
    fontFamily: "Sora-Regular",
    fontSize: 20,
    lineHeight: 32,
    color: "#282A38",
    letterSpacing: 0.15,
    textAlign: "center",
  },
});

export default UpgradeScreen;
