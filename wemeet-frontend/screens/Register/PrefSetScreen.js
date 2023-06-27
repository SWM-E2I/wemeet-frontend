import {
  TextInput,
  Button,
  SafeAreaView,
  View,
  Text,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const PrefSetScreen = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      {/* multiple select 가능하게 */}
      <ScrollView>
        <Text>선호 상대에 대해 알려주세요</Text>
        <Text>술자리 여부*</Text>
        <Button title={"술자리 괜찮아요"} color={"pink"} />
        <Button title={"술 없이도 즐거워요"} color={"pink"} />
        <Button title={"상관없어요"} color={"pink"} />
        <Text>선호하는 만남 특징*</Text>
        <Button title={"모두가 활발한 인싸 분위기"} color={"pink"} />
        <Button title={"술게임 좋아요"} color={"pink"} />
        <Button title={"친구 만나고 싶어요"} color={"pink"} />
        <Button title={"설레고 싶어요"} color={"pink"} />
        <Button title={"상관없어요"} color={"pink"} />
        <Text>선호하는 학번*</Text>
        {/* 선호하는 학번 -> range로 구현!! */}
        <TextInput />
        <Button title={"상관없어요"} color={"pink"} />
        <Text>같은 학교 여부*</Text>
        <Button title={"같은 학교가 좋아요"} color={"pink"} />
        <Button title={"같은 학교는 싫어요"} color={"pink"} />
        <Button title={"상관없어요"} color={"pink"} />
        {/* MVP 이후 아는사람 피하기&연락처 연동 기능 추가 */}
        <Text>상대 팀 MBTI*</Text>
        <View style={{ flexDirection: "row" }}>
          <Button title={"E"} />
          <Button title={"I"} />
          <Text>가 많으면 좋아요</Text>
          <Button title={"상관없어요"} />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Button title={"S"} />
          <Button title={"N"} />
          <Text>가 많으면 좋아요</Text>
          <Button title={"상관없어요"} />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Button title={"T"} />
          <Button title={"F"} />
          <Text>가 많으면 좋아요</Text>
          <Button title={"상관없어요"} />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Button title={"P"} />
          <Button title={"J"} />
          <Text>가 많으면 좋아요</Text>
          <Button title={"상관없어요"} />
        </View>
        <Button
          title={"다음"}
          color={"pink"}
          onPress={() => {
            navigation.navigate("UnivSet");
          }}
        ></Button>
        {/* 술자리 여부 선호 만남 특징 선호 학번 같은 학교 여부 아는사람 피하기 상대팀MBTI */}
        {/* 선호학번은 range로 설정할수있게 구현 */}
        {/*아는 사람 피하기 (모달로 구현)*/}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrefSetScreen;
