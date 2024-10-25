import { SafeAreaView, ScrollView, StatusBar } from "react-native";
import Space from "../../components/common/Space";
import color from "../../const/color";
import DetailProps from "../../components/coops/DetailProps";
import InlineButton from "../../components/common/InlineButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/common/Header";
import { useEffect } from "react";
import { getFlock } from "../../api/coop";
import Loader from "../../components/common/Loader";

const plusCircle = require("../../../assets/images/plus-circle.png");
const minusCircle = require("../../../assets/images/minus-circle.png");
const split = require("../../../assets/images/split.png");

const FlockDetailsScreen = ({ route }) => {
  const flock = useSelector((state) => state.coop.flock);
  const res = useSelector((state) => state.coop.res);
  const status = useSelector((state) => state.coop.status);

  const { coopId } = route.params;

  const navigation = useNavigation();

  const dispatch = useDispatch();

  navigation.setOptions({
    header: () => (
      <Header title={currentFlock.name} back dot={currentFlock._id} />
    ),
  });

  const filterFlock = flock.filter((obj) => obj._id === coopId);
  const currentFlock = filterFlock[0];

  const getWeeks = (date) => {
    const inputDateParts = date.split("-");
    const day = parseInt(inputDateParts[0]);
    const month = parseInt(inputDateParts[1]) - 1; // Month is zero-based in Date object
    const year = parseInt(inputDateParts[2]);
    const inputDate = new Date(year, month, day);

    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - inputDate.getTime();
    const weeksDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7));

    return weeksDiff;
  };
  console.log(coopId);
  useEffect(() => {
    if (res === "Flock deleted successfully") {
      dispatch(getFlock(coopId));
      navigation.navigate("Coop");
    }
  }, [res]);

  return (
    <SafeAreaView style={{ backgroundColor: color.background }}>
      <StatusBar />
      <Loader visible={status === "loading" ? true : false} />
      <ScrollView style={{ paddingHorizontal: 20, height: "100%" }}>
        <Space height={10} />
        <DetailProps title="Breed" value={currentFlock?.breed} />
        <DetailProps title="Type" value={currentFlock?.type} />
        <DetailProps
          title="Age"
          value={`${getWeeks(currentFlock?.dateStarted)} Weeks`}
        />
        <DetailProps title="Birds" value={currentFlock?.quantity} />
        <Space height={10} />
        <InlineButton
          title="Add birds to flock"
          icon={plusCircle}
          link="Add Bird"
          flockData={currentFlock}
        />
        <InlineButton
          title="Remove birds from flock"
          icon={minusCircle}
          link="Remove Bird"
          flockData={currentFlock}
        />

        {currentFlock?.type === "Mixed" && (
          <InlineButton
            title="Split flock by gender"
            icon={split}
            link="Split"
            flockData={currentFlock}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FlockDetailsScreen;
