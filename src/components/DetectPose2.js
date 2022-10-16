import { useEffect, useRef, useState } from "react";
import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import Webcam from "react-webcam";
import styles from "./DetectPose.module.css";
import { drawKeypoints } from "./utilities";
import { sendTrainData } from "../lib/data";
import { useLocation, useNavigate } from "react-router";

function DetectPose2() {
  const location = useLocation();
  const data0 = location.state.data0;
  const data1 = location.state.data1;
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [data, setData] = useState({
    frame: [
      {
        keypoints: [
          {
            x: 411.45135163753713,
            y: 318.15642699590796,
            z: -749132.9745735924,
            score: 0.9965886034213473,
            name: "nose",
          },
          {
            x: 425.2965535515365,
            y: 282.6921802918696,
            z: -701307.29921355,
            score: 0.996479159923112,
            name: "left_eye_inner",
          },
          {
            x: 437.5093503550255,
            y: 283.34526184161695,
            z: -701463.7909137711,
            score: 0.994811093366227,
            name: "left_eye",
          },
          {
            x: 449.72203408693565,
            y: 283.9435713403501,
            z: -701664.7584488563,
            score: 0.9944819941044069,
            name: "left_eye_outer",
          },
          {
            x: 383.1633918749342,
            y: 280.9920513338244,
            z: -712382.6565321295,
            score: 0.9977735254239578,
            name: "right_eye_inner",
          },
          {
            x: 364.0545913912275,
            y: 281.1486219601579,
            z: -712354.5018776122,
            score: 0.9977913161911913,
            name: "right_eye",
          },
          {
            x: 346.9042975202169,
            y: 281.8498578732714,
            z: -712781.3697347342,
            score: 0.9984513055945259,
            name: "right_eye_outer",
          },
          {
            x: 461.54144559371025,
            y: 301.52791607508067,
            z: -390486.44860498747,
            score: 0.9950797750961502,
            name: "left_ear",
          },
          {
            x: 306.4643716685208,
            y: 301.24507293096354,
            z: -431406.37958791456,
            score: 0.9990014803252102,
            name: "right_ear",
          },
          {
            x: 430.8273816064263,
            y: 364.02879958753437,
            z: -630199.2698933622,
            score: 0.9937118702042425,
            name: "mouth_left",
          },
          {
            x: 378.2895336525811,
            y: 364.53494709910086,
            z: -642640.0463704853,
            score: 0.9968010180269896,
            name: "mouth_right",
          },
          {
            x: 564.9936935610988,
            y: 523.121177236058,
            z: -200955.7870633963,
            score: 0.8432057868124057,
            name: "left_shoulder",
          },
          {
            x: 181.07028996124205,
            y: 504.8177738905905,
            z: -269052.3458980074,
            score: 0.9614489739042006,
            name: "right_shoulder",
          },
        ],
      },
      {
        keypoints: [
          {
            x: 411.45135163753713,
            y: 318.15642699590796,
            z: -749132.9745735924,
            score: 0.9965886034213473,
            name: "nose",
          },
          {
            x: 425.2965535515365,
            y: 282.6921802918696,
            z: -701307.29921355,
            score: 0.996479159923112,
            name: "left_eye_inner",
          },
          {
            x: 437.5093503550255,
            y: 283.34526184161695,
            z: -701463.7909137711,
            score: 0.994811093366227,
            name: "left_eye",
          },
          {
            x: 449.72203408693565,
            y: 283.9435713403501,
            z: -701664.7584488563,
            score: 0.9944819941044069,
            name: "left_eye_outer",
          },
          {
            x: 383.1633918749342,
            y: 280.9920513338244,
            z: -712382.6565321295,
            score: 0.9977735254239578,
            name: "right_eye_inner",
          },
          {
            x: 364.0545913912275,
            y: 281.1486219601579,
            z: -712354.5018776122,
            score: 0.9977913161911913,
            name: "right_eye",
          },
          {
            x: 346.9042975202169,
            y: 281.8498578732714,
            z: -712781.3697347342,
            score: 0.9984513055945259,
            name: "right_eye_outer",
          },
          {
            x: 461.54144559371025,
            y: 301.52791607508067,
            z: -390486.44860498747,
            score: 0.9950797750961502,
            name: "left_ear",
          },
          {
            x: 306.4643716685208,
            y: 301.24507293096354,
            z: -431406.37958791456,
            score: 0.9990014803252102,
            name: "right_ear",
          },
          {
            x: 430.8273816064263,
            y: 364.02879958753437,
            z: -630199.2698933622,
            score: 0.9937118702042425,
            name: "mouth_left",
          },
          {
            x: 378.2895336525811,
            y: 364.53494709910086,
            z: -642640.0463704853,
            score: 0.9968010180269896,
            name: "mouth_right",
          },
          {
            x: 564.9936935610988,
            y: 523.121177236058,
            z: -200955.7870633963,
            score: 0.8432057868124057,
            name: "left_shoulder",
          },
          {
            x: 181.07028996124205,
            y: 504.8177738905905,
            z: -269052.3458980074,
            score: 0.9614489739042006,
            name: "right_shoulder",
          },
        ],
      },
    ],
  });

  let arr = [];

  const [final, setFinal] = useState([]);
  const [device, setDevice] = useState(0);
  useEffect(() => {
    runPoseDetection();

    // const model = poseDetection.SupportedModels.BlazePose;
    // const detector = await poseDetection.createDetector(model)
  }, []);

  const runPoseDetection = async () => {
    const model = poseDetection.SupportedModels.BlazePose;
    const detectorConfig = {
      runtime: "tfjs",
      enableSmoothing: true,
      modelType: "full",
    };
    const detector = await poseDetection.createDetector(model, detectorConfig);
    console.log("detector 다음");
    let adtct = setInterval(() => {
      detect(detector);
    }, 100);
    setTimeout(() => {
      clearInterval(adtct);
      console.log("datA!!!!!!!!!");
      console.log(data);
      console.log(arr);
      setFinal(arr);
    }, 5000);
  };

  const detect = async (detector) => {
    // console.log("detect");
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const estimationCongif = { flipHorizontal: true };
      const timestamp = performance.now();
      const pose = await detector.estimatePoses(video, estimationCongif);
      // console.log(pose[0].keypoints);

      const ttt = pose[0].keypoints;
      // console.log(ttt);
      let fff = {};
      fff["keypoints"] = ttt;
      // const keypoints = { ttt };
      // setData({ ...data, frame: [...data.frame, pose[0].keypoints] });
      // console.log(fff);
      // console.log(data.frame);

      console.log(data.frame.values());
      let neww = Object.assign(data.frame.values(), {
        keypoints: pose[0].keypoints,
      });
      console.log(neww);
      // console.log(neww);
      // setData({ frame: neww });

      // setData({ ...data, frame: data.frame.concat(keypoints) });

      // setData({ frame: [...data["frame"], fff] });

      // setData({ ...data, });
      // setData({ ...data, frame });

      // setData({ frame: Array(neww) });

      setData({
        frame: [...data.frame.values(), { keypoints: pose[0].keypoints }],
      });

      console.log(data);
      arr.push(ttt);
      // data.concat(tttt));
      const ctx = canvasRef.current.getContext("2d");
      drawKeypoints(pose, ctx);
      //   console.log("??");
    }
  };

  const navigate = useNavigate();

  const onClick = () => {
    console.log("onclick");
    console.log(arr);
    navigate("/complete", {
      state: { data0: data0, data1: data1, data2: final },
    });
  };

  const { cam, webcamContainer, canvas, nextButton } = styles;
  return (
    <>
      <div>
        <div className={webcamContainer}>
          <Webcam className={cam} ref={webcamRef} />
          <canvas className={canvas} ref={canvasRef}></canvas>
        </div>
      </div>
      <button className={nextButton} onClick={onClick}>
        다음 단계
      </button>
    </>
  );
}

export default DetectPose2;
