import { SafeAreaView, ScrollView, StatusBar } from "react-native";
import Space from "../../components/common/Space";
import color from "../../const/color";
import DetailProps from "../../components/coops/DetailProps";
import InlineButton from "../../components/common/InlineButton";

const plusCircle = require("../../../assets/images/plus-circle.png");
const minusCircle = require("../../../assets/images/minus-circle.png");
const split = require("../../../assets/images/split.png");

const FlockDetailsScreen = () => {
  return (
    <SafeAreaView style={{ backgroundColor: color.background }}>
      <StatusBar />
      <ScrollView style={{ paddingHorizontal: 20, height: "100%" }}>
        <Space height={10} />
        <DetailProps title="Breed" value="Kienyeji" />
        <DetailProps title="Type" value="Mixed" />
        <DetailProps title="Age" value="3 Weeks" />
        <DetailProps title="Birds" value="500" />
        <Space height={10} />
        <InlineButton title="Add birds to flock" icon={plusCircle} />
        <InlineButton title="Remove birds from flock" icon={minusCircle} />
        <InlineButton title="Split flock by gender" icon={split} link="Split" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default FlockDetailsScreen;
