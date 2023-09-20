import { SafeAreaView, View, Text } from "react-native";
import React, { useState } from "react";
import commonStyles from "../../../styles/commonStyles";
import RegisterHeader from "../../../components/register/RegisterHeader";
import registerStyles from "../../../styles/registerStyles";
import RegisterCreditView from "../../../components/register/RegisterCreditView";
import NextButton from "../../../components/NextButton";
import RegisterSelectView from "../../../components/register/RegisterSelectView";

const instruction = "아는 사람은\n빼고 추천할 수 있어";
const FriendScreen = ({ navigation }) => {
  const [withFriend, setWithFriend] = useState(false);
  //기본값 : 아는 사람 피하기
  const toNext = () => {
    navigation.navigate("PrefMbti");
  };
  return (
    <SafeAreaView style={commonStyles.safeAreaView}>
      <RegisterHeader navigation={navigation} back />
      <View style={registerStyles.instContainer}>
        <Text style={registerStyles.instText}>{instruction}</Text>
        <RegisterCreditView currentCredit={5} />
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        {/* 여기에 body내용 입력 */}
        <RegisterSelectView
          text={"그렇게 해줘!"}
          disabled={withFriend}
          onPress={() => setWithFriend(false)}
        />
        <RegisterSelectView
          text={"아는 사람도 괜찮아"}
          disabled={!withFriend}
          onPress={() => setWithFriend(true)}
        />
      </View>
      {/* 이부분 다시 생각 */}
      <NextButton
        text={"다음"}
        onPress={toNext}
        style={{
          alignSelf: "center",
          marginTop: 10,
          marginBottom: 20,
        }}
      />
    </SafeAreaView>
  );
};

export default FriendScreen;
