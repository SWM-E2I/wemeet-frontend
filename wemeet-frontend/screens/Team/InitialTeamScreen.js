import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import NoTeamScreen from "./NoTeamScreen";
import { teamInquiryApi } from "../../api/team";
import MyTeamScreen from "./MyTeamScreen";
import { useDispatch, useSelector } from "react-redux";
import { setHasTeam } from "../../redux/persistSlice";
import Logo from "../../assets/vectors/Logo";
import commonStyles, { mainColor } from "../../styles/commonStyles";

const defaultTeam = {
  memberNum: "-",
  region: "-",
  drinkRate: "-",
  drinkWithGame: "-",
  additionalActivity: "-",
  introduction: "-",
  chatLink: "https://open.kakao.com/o/asdj12nd",
  profileImageURL:
    "https://wemeet-profile-image.s3.ap-northeast-2.amazonaws.com/v1/1/low/43f2ad5a-86d1-4f4f-8e6f-28b206868772.jpg",
  images: [
    {
      url: "https://wemeet-team-image.s3.ap-northeast-2.amazonaws.com/v1/1/1/c20b0432-3d67-4cb3-a3b9-39a2c6e1edcc.jpg",
    },
  ],
  members: [
    {
      college: "-",
      collegeType: "-",
      admissionYear: "-",
      mbti: "-",
    },
  ],
  leader: {
    nickname: "-",
    mbti: "-",
    college: "-",
  },
};
const InitialTeamScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [myTeam, setMyTeam] = useState(false); //임시, hasTeam
  const [team, setTeam] = useState(defaultTeam);
  const controller = new AbortController();
  const [loading, setLoading] = useState(false);
  const onRefresh = async () => {
    await onMount();
  };
  const onMount = async () => {
    setLoading(true);
    let result = await teamInquiryApi(navigation, controller);
    if (result) {
      dispatch(setHasTeam(result.hasTeam));
      setTeam(result.team);
      setMyTeam(true);
    } else setMyTeam(false);
    setLoading(false);
    console.log("내 팀 조회, hasTeam :", myTeam);
  };
  useEffect(() => {
    //inquiryApi 미완
    onMount();
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <SafeAreaView
      style={[commonStyles.safeAreaView, { backgroundColor: mainColor }]}
    >
      <View style={styles.logoContainer}>
        <Logo width={90} height={20} />
      </View>
      {!loading && myTeam ? (
        <MyTeamScreen
          navigation={navigation}
          team={team}
          onRefresh={onRefresh}
        />
      ) : (
        <NoTeamScreen navigation={navigation} onRefresh={onRefresh} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    paddingHorizontal: "6%",
    paddingVertical: 10,
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default InitialTeamScreen;
