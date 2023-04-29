import { TextInput, View, Text } from "react-native";
import color from "../../const/color";

const Input = ({ label, handleOnChange, value, placeholder }) => {
  return (
    <View
      style={{
        marginVertical: 5,
        padding: 12,
        borderRadius: 7,
        borderColor: color.border,
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
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
      <TextInput
        onChangeText={handleOnChange}
        value={value}
        placeholder={placeholder}
        style={{
          fontFamily: "Sora-Regular",
          fontSize: 16,
          lineHeight: 24,
          letterSpacing: 0.5,
          color: "#282A38",
        }}
      />
    </View>
  );
};

export default Input;
