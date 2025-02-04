import { useState, useEffect } from "react";
import StreamerList from "./components/StreamerList";

function App() {
  const apiStreamerUrl = "http://localhost:8091/api/StreamerInfo";

  const [streamerList, setStreamerList] = useState([]);

  //  페이지 로딩 상태 체크 state
  const [isLoading, setIsLoading] = useState(true);
  //  에러 메시지 출력을 위한 state
  const [error, setError] = useState(null);

  //  API에서 목록 받아오는 함수
  const fetchItems = async () => {
    try {
      const response = await fetch(apiStreamerUrl);
      if (!response.ok) {
        throw new Error("데이터를 받아오지 못했습니다.");
      }
      const data = await response.json();
      // console.log(data);
      setStreamerList(data);
      setIsLoading(false); //  로딩이 끝났음을 알림
    } catch (err) {
      // console.error(err);
      setError(err.message);
      setIsLoading(false); //  로딩이 끝남
    }
  };

  useEffect(() => {
    fetchItems();
  }, []); //  -> 컴포넌트가 처음 로딩되었을 때의 이펙트 발생

  //  새 스트리머 추가
  const addNewStreamer = async (newStreamer) => {
    //  -> REST 서버에 POST 호출 -> CREATE
    try {
      const response = await fetch(apiStreamerUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStreamer),
      });
      //  요청 결과 확인
      if (!response.ok) {
        throw new Error("새 아이템을 추가하지 못했습니다.");
      }
      //  리스트 갱신
      fetchItems();
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <>
      <StreamerList
        streamerList={streamerList}
        addNewStreamer={addNewStreamer}
        setError={setError}
      />
    </>
  );
}

export default App;
