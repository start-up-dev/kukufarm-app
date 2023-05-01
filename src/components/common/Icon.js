import { Image } from "react-native";

const Icon = ({ icon }) => {
  return (
    <Image
      source={icon}
      style={{ width: 24, height: 24, resizeMode: "contain" }}
    />
  );
};

export default Icon;
