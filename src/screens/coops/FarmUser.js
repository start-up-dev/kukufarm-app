import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
} from "react-native";
import color from "../../const/color";
import SingleMenu from "../../components/settings/SingleMenu";

const { width, height } = Dimensions.get("window");

const FarmUser = () => {
  return (
    <SafeAreaView style={{ backgroundColor: color.background }}>
      <StatusBar />
      <ScrollView style={{ paddingHorizontal: 20, height: height }}>
        <SingleMenu title="John Appleseed" subTitle="Owner" profile right />
        <SingleMenu
          title="John Appleseed"
          subTitle="Can view and enter records"
          profile
          right
          leave
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default FarmUser;
