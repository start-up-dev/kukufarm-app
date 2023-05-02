import { Image } from "react-native";

const Icon = ({ icon, sm, m }) => {
  return (
    <Image
      source={icon}
      style={[
        { width: 24, height: 24, resizeMode: "contain" },
        sm && { width: 12, height: 12 },
        m && { width: 16, height: 16 },
      ]}
    />
  );
};

export default Icon;
