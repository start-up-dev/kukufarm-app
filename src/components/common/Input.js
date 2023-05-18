import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import color from "../../const/color";
import { useState } from "react";
import Icon from "./Icon";

const dropdownIcon = require("../../../assets/images/dropdownMedium.png");

const Input = ({
  label,
  onChangeText,
  value,
  placeholder,
  type,
  d,
  dpVisible,
  dpConfirm,
  dpCancel,
  dpHandler,
  selectedDate,
}) => {
  return (
    <View style={[styles.container, d && { paddingVertical: 4 }]}>
      {label && (
        <Text
          style={{
            fontFamily: "Sora-Regular",
            fontSize: 14,
            lineHeight: 24,
            letterSpacing: 0.25,
            color: "#282A38",
          }}
        >
          {label}
        </Text>
      )}

      {d ? (
        <TouchableOpacity style={styles.dateBtn} onPress={dpHandler}>
          <Text style={styles.dateText}>
            {selectedDate ? selectedDate : "Select Date"}
          </Text>

          <DateTimePickerModal
            isVisible={dpVisible}
            mode="date"
            onConfirm={dpConfirm}
            onCancel={dpCancel}
          />
        </TouchableOpacity>
      ) : (
        <TextInput
          onChangeText={onChangeText}
          placeholder={placeholder}
          style={{
            fontFamily: "Sora-Regular",
            fontSize: 16,
            lineHeight: 24,
            letterSpacing: 0.5,
            color: "#282A38",
          }}
          keyboardType={type ? type : "default"}
          defaultValue={value}
        />
      )}
    </View>
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
    alignItems: "center",
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
    top: 50,
    right: 40,
    paddingHorizontal: 30,
    paddingVertical: 16,
    borderRadius: 7,
    shadowColor: "rgba(28, 39, 49, 0.08)",
    shadowOpacity: 1,
    shadowOffset: { width: 1, height: 1 },
  },
  dateBtn: {
    backgroundColor: "#F0F0F0",
    borderRadius: 7,
    padding: 8,
  },
  dateText: {
    fontFamily: "Sora-Regular",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
    color: color.foundation,
  },
});

export default Input;
