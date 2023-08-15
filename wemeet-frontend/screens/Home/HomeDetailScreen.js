import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import commonStyles from "../../styles/commonStyles";
import RegisterHeader from "../../components/register/RegisterHeader";
import { mainColor } from "../../styles/commonStyles";
import { Ionicons } from "@expo/vector-icons";
const HomeDetailScreen = ({ navigation }) => {
  const ads = [
    "광고 1",
    "광고 2",
    "광고 3",
    // ... 추가 광고 내용
  ];

  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  const slideAnimation = new Animated.Value(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // 다음 광고로 인덱스 갱신
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);

      // 왼쪽으로 슬라이딩 애니메이션 실행
      Animated.timing(slideAnimation, {
        toValue: -1,
        duration: 500, // 애니메이션 지속 시간
        useNativeDriver: true,
      }).start(() => {
        // 애니메이션이 완료되면 원래 위치로 복원
        slideAnimation.setValue(0);
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  const translateX = slideAnimation.interpolate({
    inputRange: [-1, 1],
    outputRange: [-100, 1000], // 원하는 슬라이딩 거리
  });
  return (
    // <SafeAreaView
    //   style={[commonStyles.safeAreaView, { backgroundColor: mainColor }]}
    // >
    //   <View style={{ flex: 1 }}>
    //     <TouchableOpacity onPress={navigation.goBack}>
    //       <Ionicons name="chevron-back" size={24} color="white" />
    //     </TouchableOpacity>
    //     <Text style={{ color: "white" }}>DetailScreen</Text>
    //   </View>
    // </SafeAreaView>
    <View style={styles.banner}>
      <Animated.View style={{ transform: [{ translateX }] }}>
        <Text style={styles.adText}>{ads[currentAdIndex]}</Text>
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  banner: {
    backgroundColor: "lightgray",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden", // 슬라이딩된 내용이 컨테이너 영역 밖으로 나가지 않도록
  },
  adText: {
    fontSize: 16,
  },
});
export default HomeDetailScreen;
