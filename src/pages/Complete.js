import { useEffect } from "react";
import { useLocation } from "react-router";
import { sendTrainData } from "../lib/data";

function Complete({ props }) {
  const location = useLocation();
  const data0 = location.state.data0;
  const data1 = location.state.data1;
  const data2 = location.state.data2;

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
    })();
  }, []);
  return (
    <>
      <div>complete page</div>
    </>
  );
}

export default Complete;
