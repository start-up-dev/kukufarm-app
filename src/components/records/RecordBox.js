import { View, Text, StyleSheet, Image } from "react-native";
import color from "../../const/color";

const dropdown = require("../../../assets/images/dropdown.png");

const RecordBox = () => {
  return (
    <View style={{ paddingHorizontal: 12 }}>
      <View>
        <View style={styles.singleDetailsView}>
          <Text style={styles.detailsTitle}>Current stock</Text>
          <View style={styles.separetor}></View>
          <Text style={styles.detailsTitle}>2,712</Text>
        </View>
        <View style={styles.singleDetailsView}>
          <Text style={styles.detailsTitle}>Added birds</Text>
          <View style={styles.separetor}></View>
          <Text style={styles.detailsTitle}>12</Text>
        </View>
        <View style={{ marginBottom: 5 }}>
          <View style={styles.singleDetailsView}>
            <Text style={styles.detailsTitle}>Removed birds</Text>
            <View style={styles.separetor}></View>
            <Text style={styles.detailsTitle}>2,712</Text>
          </View>
          <View style={styles.removedView}>
            <Text style={styles.removedText}>Sale</Text>
            <Text style={styles.removedText}>100</Text>
          </View>
          <View style={styles.removedView}>
            <Text style={styles.removedText}>Death</Text>
            <Text style={styles.removedText}>37</Text>
          </View>
          <View style={styles.removedView}>
            <Text style={styles.removedText}>Consumed</Text>
            <Text style={styles.removedText}>5</Text>
          </View>
        </View>
        <View style={styles.singleDetailsView}>
          <Text style={styles.detailsTitle}>Starting stock</Text>
          <View style={styles.separetor}></View>
          <Text style={styles.detailsTitle}>5,000</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  singleDetailsView: {
    flexDirection: "row",
    marginVertical: 12,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  detailsTitle: {
    fontFamily: "Sora-SemiBold",
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: 0.4,
    color: "#1F1F1F",
  },
  separetor: {
    width: 200,
    height: 2,
    backgroundColor: "#F3F5F9",
    marginRight: 4,
  },
  removedView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  removedText: {
    fontFamily: "Sora-Regular",
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: 0.4,
    color: "#141414",
  },
});

export default RecordBox;
