import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StreamerList = (fetchItems, setError, streamerList) => {
  const apiStreamerUrl = "http://localhost:8091/gameList/";

  const [visibleDetails, setVisibleDetails] = useState(null);
  const [showAddStreamer, setShowAddStreamer] = useState(false); // 드롭박스 표시 여부
  const [newStreamer, setNewStreamer] = useState({
    // 새로운 스트리머 정보
    name: "",
    followers: "",
    avgViews: "",
    dailyHours: "",
    thumbnail: "",
    followerTrends: "",
  });

  const [streamers, setStreamers] = useState(streamerList);

  // const [streamers, setStreamers] = useState([
  //   {
  //     id: 1,
  //     name: "풍월량",
  //     followers: "10,500",
  //     avgViews: "500",
  //     dailyHours: "5시간",
  //     thumbnail:
  //       "https://i.namu.wiki/i/reWaH90R_V41UWRvHWYUaiNm5MDenoKl2S67owYfwntvumKrbk164wNwiEMkoccX3q6zf0eDZbxSE-bFjTSBTiPMnnYkNsau-PBHf9ZKa7F0mCZVU9g5f0-t0xoKAdEX__K6S-2F9HmuUgEtxXCjDw.webp",
  //     followerTrends: [
  //       8000, 8500, 9000, 9500, 10000, 8000, 8500, 9000, 9500, 10000, 10500,
  //       11000,
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: "한동숙",
  //     followers: "22,000",
  //     avgViews: "1,000",
  //     dailyHours: "6시간",
  //     thumbnail:
  //       "https://i.namu.wiki/i/ojoOoFhmXWG8kny2YGRRVl-MA6jbtp_Kle65HZ7mSPXjOzN4du82XGr4Rk9cCZdESo_tPOLRSDDcHoiZzLvSOiI3JVFB3F7S7H2H0ayRmm7GwBd6SIACth-7uHJxZ0pre07GVRdW9OsrYQNaG6i5dA.webp",
  //     followerTrends: [
  //       15000, 16000, 17000, 19000, 20000, 15000, 16000, 17000, 19000, 20000,
  //       21000, 22000,
  //     ],
  //   },
  //   {
  //     id: 3,
  //     name: "서새봄",
  //     followers: "32,000",
  //     avgViews: "1,500",
  //     dailyHours: "4시간",
  //     thumbnail:
  //       "https://i.namu.wiki/i/PgOSOWPXELGbB6OMYjmlzzyIxeLwgNdmgf_-YNtf25-AT_tIzBnpWO3pCtIxfwkASJSZG1oaezy8x2fX9gTnxelq6Itbjocch137qPY2AXCTEoyoS7atOXw0fA98NXE2QHupabVIJPE3T2GRh1qIVQ.webp",
  //     followerTrends: [
  //       25000, 26000, 27000, 29000, 30000, 25000, 26000, 27000, 29000, 30000,
  //       31000, 32000,
  //     ],
  //   },
  //   {
  //     id: 4,
  //     name: "침착맨",
  //     followers: "32,000",
  //     avgViews: "1,500",
  //     dailyHours: "4시간",
  //     thumbnail:
  //       "https://i.namu.wiki/i/4wEEZ-dc7eSAuUxCKf0-u2x14OX8MQ6pP4AKSOTrRIPBYC-TKVns3NMt6X1ZOd1ACJj4doHvHypJc7w7-ZJD3I5q-UmsSjzbM09F_9cxNMV_rWxt2Sg3u7SRip26hWzBb11YVw4FgKFAJ2G-USC0Fw.webp",
  //     followerTrends: [
  //       25000, 26000, 27000, 29000, 30000, 25000, 26000, 27000, 29000, 30000,
  //       31000, 32000,
  //     ],
  //   },
  //   {
  //     id: 5,
  //     name: "옥냥이",
  //     followers: "30,000",
  //     avgViews: "1,500",
  //     dailyHours: "4시간",
  //     thumbnail:
  //       "https://i.namu.wiki/i/DzM6g_-XE6EM3vsVH8IJLcjjtYeA_gRbqsXgEJy5U4ZsuQLgYd64IiHF0FswvDt7MguSbRLpnBliwXD02a7whxHjJIUobs8vZWSVQh6GA4rRLjgle55CcJ-ux0_OxGMGO9DT34PHVWAQR-HGWKW5hw.webp",
  //     followerTrends: [
  //       25000, 26000, 27000, 29000, 30000, 25000, 26000, 27000, 29000, 30000,
  //       31000, 32000,
  //     ],
  //   },
  //   {
  //     id: 6,
  //     name: "소니쇼",
  //     followers: "30,000",
  //     avgViews: "1,500",
  //     dailyHours: "4시간",
  //     thumbnail:
  //       "https://i.namu.wiki/i/KXilZhorv_ejhA4cFA9_MbRO7q_70WpWVLs-IGI3yqxV214ds0Zn1cZpoFgZ_vn8D4WdzMNfdmvWKoKlqGRfbEWdOhprV1lOKlInyMErVypI0At_RuBsCWnzM8zU36ULWah3NMw32xUmcGsDT6xdRw.webp",
  //     followerTrends: [
  //       25000, 26000, 27000, 29000, 30000, 25000, 26000, 27000, 29000, 30000,
  //       31000, 32000,
  //     ],
  //   },
  //   {
  //     id: 7,
  //     name: "울프",
  //     followers: "30,000",
  //     avgViews: "1,500",
  //     dailyHours: "4시간",
  //     thumbnail:
  //       "https://i.namu.wiki/i/U5iH7Wi-Q1Pe0y7ijrPNLgWE1iIcY_nC1sTvbTuZJUxCmVN0eR1yfhFx3FCDRq7axxwrtd2LoJe2fyWkyHUk2afNyxsNzYZsYwWc-kwfobw-69tFCbHRiIi2lIgTNTLgzxtBrbD6w8nmg622GlYeLg.webp",
  //     followerTrends: [
  //       25000, 26000, 27000, 29000, 30000, 25000, 26000, 27000, 29000, 30000,
  //       31000, 32000,
  //     ],
  //   },
  //   {
  //     id: 8,
  //     name: "강퀴",
  //     followers: "30,000",
  //     avgViews: "1,500",
  //     dailyHours: "4시간",
  //     thumbnail:
  //       "https://i.namu.wiki/i/LIT5rVY2EyUY747nmkAgTpCUt_KVj_G0xnUM9RtThZXwBhGdCYYeTD6kJojPH8vxO1gQgvOSU2KFGLjknWUq2ljVsMrZhaY9bAiYCQLDoaELXXkr1eWePvikOCEtMi6ThzcUENubKOC8bj8ATtSjlA.webp",
  //     followerTrends: [
  //       25000, 26000, 27000, 29000, 30000, 25000, 26000, 27000, 29000, 30000,
  //       31000, 32000,
  //     ],
  //   },
  //   {
  //     id: 9,
  //     name: "쉐리",
  //     followers: "30,000",
  //     avgViews: "1,500",
  //     dailyHours: "4시간",
  //     thumbnail:
  //       "https://i.namu.wiki/i/5Khyi9Jmfr9qv5xF1ApNq12S6w_7m7Nxab-j0feGp2kU6oCeVy2gqIKxuV-KT6y9Re3vwlnQDl1wqM3HMAgnZsggi9v-fLRjkeTZYqDWHCIiOuUmA5578xzMxCjlrYuqJiXfpzMO6Mq1dYSwYCV_rQ.webp",
  //     followerTrends: [
  //       25000, 26000, 27000, 29000, 30000, 25000, 26000, 27000, 29000, 30000,
  //       31000, 32000,
  //     ],
  //   },
  //   {
  //     id: 10,
  //     name: "철면수심",
  //     followers: "30,000",
  //     avgViews: "1,500",
  //     dailyHours: "4시간",
  //     thumbnail:
  //       "https://i.namu.wiki/i/rnsIB5rs67FEHkOhf23h7OvN6MN_AnOY7bAWwmDUEqorFfkHkGMU9UrQ9uwn7wYBBr3NSb7AHpNJUlbDCGO1OGMnLWg8980Dj_Fv5QOgBDpqRvxfiTKDHS8uo7Dso4ImuKcaL-Qehvhnri0dOWCuaQ.webp",
  //     followerTrends: [
  //       25000, 26000, 27000, 29000, 30000, 25000, 26000, 27000, 29000, 30000,
  //       31000, 32000,
  //     ],
  //   },
  // ]);

  const toggleDetails = (id) => {
    setVisibleDetails(visibleDetails === id ? null : id);
  };

  const handleInputChange = (e) => {
    setNewStreamer({ ...newStreamer, [e.target.name]: e.target.value });
  };

  // //  새 스트리머 추가
  // const addNewStreamer = async (
  //   name,
  //   followers,
  //   avgViews,
  //   dailyHours,
  //   thumbnail,
  //   followerTrends
  // ) => {
  //   //  객체 생성
  //   //  속성이 key이름과 값 이름이 같을 때 -> 줄여쓸 수 있다.
  //   //  name: name => name
  //   const newStreamer = {
  //     name,
  //     followers,
  //     avgViews,
  //     dailyHours,
  //     thumbnail,
  //     followerTrends,
  //   };
  //   //  itemList에 새 아이템 추가
  //   // const newItemList = [...itemL

  //   //  -> REST 서버에 POST 호출 -> CREATE
  //   try {
  //     const response = await fetch(apiStreamerUrl, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(newStreamer),
  //     });
  //     //  요청 결과 확인
  //     if (!response.ok) {
  //       throw new Error("새 아이템을 추가하지 못했습니다.");
  //     }
  //     //  리스트 갱신
  //     fetchItems();
  //   } catch (err) {
  //     setError(err.message);
  //   }
  //   setShowAddStreamer(false);
  //   setNewStreamer({
  //     // ... (other properties)
  //     followerTrends: "", // 입력 초기화
  //   });
  // };

  const handleUpdateStreamer = (id) => {
    // 업데이트 기능 구현 (현재는 alert만 표시)
    alert(`${id}번 스트리머를 업데이트합니다.`);
  };

  // const handleRemoveStreamer = (id) => {
  //   setStreamers(streamers.filter((streamer) => streamer.id !== id));
  // };

  //  id => item 삭제
  const handleRemoveStreamer = async (id) => {
    // const newItemList = itemList.filter((item) => item.id !== id);
    // setItemList(newItemList);
    //  DELETE method로 요청
    try {
      const response = await fetch(`${apiStreamerUrl}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("아이템을 삭제하지 못했습니다.");
      }
      //  목록 갱신
      fetchItems();
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "100vh",
          width: "100vw",
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>스트리머 소개</h2>
        <ul
          style={{
            listStyleType: "none",
            padding: 0,
            width: "80%",
            maxWidth: "600px",
            margin: "0 auto",
            marginTop: "0",
          }}
        >
          {streamers.map((streamer) => (
            <li
              key={streamer.id}
              onClick={() => toggleDetails(streamer.id)}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                margin: "10px 0",
                cursor: "pointer",
                backgroundColor: "#f9f9f9",
                display: "flex", // flexbox 사용
                flexDirection: "column", // 새로 방향으로 배치
                alignItems: "flex-start", // 위쪽 정렬
                width: "100%",
              }}
            >
              <div // 썸네일 영역
                style={{
                  display: "flex",
                  flexDirection: "row", // 가로 방향 배치
                  alignItems: "flex-start", // 위쪽 정렬
                  width: "100%",
                }}
              >
                <img
                  src={streamer.thumbnail}
                  alt={streamer.name}
                  style={{
                    width: "30%",
                    height: "30%",
                    marginRight: "10px",
                  }}
                />
                <span>
                  {streamer.name} (팔로워: {streamer.followers}, 평균 뷰:{" "}
                  {streamer.avgViews}, 일일 방송: {streamer.dailyHours})
                </span>
              </div>
              {visibleDetails === streamer.id && (
                <div // 상세 정보 영역
                  style={{
                    padding: "10px",
                    backgroundColor: "#eef",
                    marginTop: "10px",
                    overflow: "auto",
                    width: "100%", // 썸네일과 이름 아래에 오도록 width 설정
                  }}
                >
                  <div // 그래프 영역
                    style={{
                      width: "100%",
                      maxHeight: "300px",
                    }}
                  >
                    <Line
                      data={{
                        labels: [
                          "1월",
                          "2월",
                          "3월",
                          "4월",
                          "5월",
                          "6월",
                          "7월",
                          "8월",
                          "9월",
                          "10월",
                          "11월",
                          "12월",
                        ],
                        datasets: [
                          {
                            label: "팔로워 변화",
                            data: streamer.followerTrends,
                            borderColor: "#007bff",
                            backgroundColor: "rgba(0, 123, 255, 0.5)",
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                          x: {
                            type: "category",
                            title: {
                              display: true,
                              text: "월",
                            },
                          },
                          y: {
                            title: {
                              display: true,
                              text: "팔로워 수",
                            },
                          },
                        },
                      }}
                    />
                  </div>
                  <div // 버튼 영역
                    style={{
                      display: "flex",
                      flexDirection: "column", // 세로 방향 배치
                      alignItems: "flex-end", // 오른쪽 정렬
                      marginLeft: "10px",
                    }}
                  >
                    <button // 업데이트 버튼
                      onClick={() => handleUpdateStreamer(streamer.id)}
                      style={{
                        backgroundColor: "lightgreen",
                        cursor: "pointer",
                        marginBottom: "5px",
                      }}
                    >
                      업데이트
                    </button>
                    <button // 삭제 버튼
                      onClick={() => handleRemoveStreamer(streamer.id)}
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
          <li // 추가 버튼을 li 요소로 감싸서 동일한 형식으로 표시
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              margin: "10px 0",
              cursor: "pointer",
              backgroundColor: "#f9f9f9",
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => setShowAddStreamer(true)} // 버튼 클릭 시 드롭박스 표시
          >
            <span>새로운 스트리머 추가</span> {/* 버튼 텍스트 */}
          </li>
        </ul>

        {showAddStreamer && ( // 드롭박스 표시 조건부 렌더링
          <div
            style={{
              position: "fixed",
              top: "50%", // 화면 중앙에 위치
              left: "50%", // 화면 중앙에 위치
              transform: "translate(-50%, -50%)", // 화면 중앙에 위치
              backgroundColor: "#fff",
              padding: "20px",
              border: "1px solid #ddd",
              zIndex: 2000, // 다른 요소 위에 표시
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h2>새로운 스트리머 정보 입력</h2>
            <input
              type="text"
              name="name"
              placeholder="스트리머 이름"
              value={newStreamer.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="followers"
              placeholder="팔로워 수"
              value={newStreamer.followers}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="avgViews"
              placeholder="평균 시청 수"
              value={newStreamer.avgViews}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="dailyHours"
              placeholder="평균 방송 시간"
              value={newStreamer.dailyHours}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="thumbnail"
              placeholder="썸네일 링크 주소"
              value={newStreamer.thumbnail}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="followerTrends"
              placeholder="쉼표로 구분된 팔로워 변동 (예: 10000, 11000, 12000)"
              value={newStreamer.followerTrends}
              onChange={handleInputChange}
            />
            <button
              onClick={() => {
                setShowAddStreamer(false);
                setNewStreamer({
                  // ... (other properties)
                  followerTrends: "", // 입력 초기화
                });
                addNewStreamer(newStreamer);
              }}
            >
              확인
            </button>
            <button onClick={() => setShowAddStreamer(false)}>취소</button>
          </div>
        )}
      </div>
    </>
  );
};

export default StreamerList;
