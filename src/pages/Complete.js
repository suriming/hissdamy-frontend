import { useEffect } from "react";
import { useLocation } from "react-router";
import { sendTrainData } from "../lib/data";

function Complete({ props }) {
  const location = useLocation();
  const data = location.state.data;
  const frame = location.state.frame;
  console.log(data);
  console.log(frame);
  console.log("실험!!!");
  useEffect(() => {
    let ttt = {};
    ttt["frame"] = [];
    // data.forEach((items) => {
    //   items.forEach((item) => {
    //     ttt["frame"].push({ keypoints: item });
    //   });
    // });
    data.forEach((items) => {
      ttt["frame"].push({ keypoints: items });
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
