import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { sendTrainData } from "../lib/data";
import styles from "./Home.module.css";

function Complete({ props }) {
  const location = useLocation();
  const data0 = location.state.data0;
  const data1 = location.state.data1;
  const data2 = location.state.data2;
  const [accuracy, setAccuracy] = useState("");

  console.log(data0);
  console.log("실험!!!");
  useEffect(() => {
    let ttt = {};
    ttt["frame"] = [];
    // data.forEach((items) => {
    //   items.forEach((item) => {
    //     ttt["frame"].push({ keypoints: item });
    //   });
    // });
    data0.forEach((items) => {
      ttt["frame"].push({ keypoints: items, label: 0 });
    });
    data1.forEach((items) => {
      ttt["frame"].push({ keypoints: items, label: 1 });
    });
    data2.forEach((items) => {
      ttt["frame"].push({ keypoints: items, label: 2 });
    });

    console.log(ttt);
    // console.log(ttt)
    (async () => {
      const res = await sendTrainData(ttt);
      console.log("결과!!!");
      console.log(res);
      setAccuracy(res);
    })();
  }, []);

  const naviate = useNavigate();
  const onClick = () => {
    naviate("/test");
  };
  const { button_container, introduction } = styles;
  return (
    <>
      <div className={introduction}>측정이 모두 끝났습니다!</div>
      <div className={button_container}>
        <button onClick={onClick}>
          테스트 <br></br>하러가기
        </button>
      </div>
    </>
  );
}

export default Complete;
