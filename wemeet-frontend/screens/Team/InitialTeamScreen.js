import { SafeAreaView, View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import NoTeamScreen from "./NoTeamScreen";
import { teamInquiryApi } from "../../api/team";
import MyTeamScreen from "./MyTeamScreen";

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
  const [hasTeam, setHasTeam] = useState(false);
  const [team, setTeam] = useState(defaultTeam);
  const controller = new AbortController();
  const onMount = async () => {
    let result = await teamInquiryApi(navigation, controller);
    setHasTeam(result.hasTeam);
    setTeam(result.team);
  };
  useEffect(() => {
    //inquiryApi 미완
    onMount();
    return () => {
      controller.abort();
    };
  }, []);
  return hasTeam ? (
    <MyTeamScreen navigation={navigation} team={team} />
  ) : (
    <NoTeamScreen navigation={navigation} />
  );
};

export default InitialTeamScreen;
