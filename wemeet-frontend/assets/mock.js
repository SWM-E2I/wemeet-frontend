export const roughCardData = [
  //API형식에 맞춰서 수정되어야함!!!, Members의 [0] index를 대표 정보로 해서 보내ㅜㅈㄹ지?
  {
    region: "홍대", //대표 지역
    //대표자의 프로필 사진 url
    profileImageURL:
      "https://img3.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202304/28/newsen/20230428124427010wmwd.jpg",
    leader: {
      //대표자 정보
      college: "고려대학교",
      nickName: "유닝",
      mbti: "ESTJ",
    },
    mainImageURL: "https://pbs.twimg.com/media/E9P1sh3VIAcFKCg.jpg", //팀의 첫번째 이미지
    memberNum: 3, //팀의 총 인원수
  },
  {
    region: "건대입구",
    //대표 이미지 (?) 대표자 사진(?) - api따라 결정
    profileImageURL:
      "data:image/jpeg;base64,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", //임시
    leader: {
      college: "인천가톨릭대학교 (강화캠)",
      nickName: "이명박",
      mbti: "ISTJ",
    },
    mainImageURL:
      "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/200802/htm_2008022509254720002010-001.JPG", //임시
    memberNum: 2,
    //members의 경우 실제로는 모든 멤버의 정보를 보내줄것... 일단 mockData
  },
  {
    region: "신촌",
    //대표 이미지 (?) 대표자 사진(?) - api따라 결정
    profileImageURL:
      "https://storage.googleapis.com/pai-images/474c3e495d7e41cb8b1f02dc79250542.jpeg", //임시
    profileNickName: "안산삼대장", //대표자 닉네임
    mainImageURL:
      "https://image.ytn.co.kr/general/jpg/2023/0614/202306140700017206_h.jpg",
    memberNum: 4,
    leader: {
      college: "고려대학교",
      nickName: "박근혜",
      mbti: "ISTJ",
    },
  },
];
