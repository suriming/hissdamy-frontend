import { useRef, useState } from "react";
import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import Webcam from "react-webcam";
import { sendTestData } from "../lib/data";
import styles from "./ResultTest.module.css";

function ResultTest() {
  const [testResult, setTestResult] = useState("");
  const webcamRef = useRef(null);

  const runPoseDetection = async () => {
    const model = poseDetection.SupportedModels.BlazePose;
    const detectorConfig = {
      runtime: "tfjs",
      enableSmoothing: true,
      modelType: "full",
    };
    const detector = await poseDetection.createDetector(model, detectorConfig);
    detect(detector);
  };
  const detect = async (detector) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      const pose = await detector.estimatePoses(video);
      console.log(pose);
      const res = await sendTestData({ keypoints: pose[0].keypoints });
      console.log(res);
      setTestResult(res);
    }
  };

  const onClick = () => {
    runPoseDetection();
  };
  const {
    webcamContainer_container,
    webcamContainer,
    cam,
    button_container,
    resultText,
    resultTextTwo,
    test_button,
  } = styles;
  return (
    <>
      <div className={resultText}>
        시선이 정확하게 측정되었는지 테스트해봅시다!<br></br>
        사물을 바라봐주세요
      </div>

      <div className={webcamContainer_container}>
        <div className={webcamContainer}>
          <Webcam className={cam} ref={webcamRef} />
        </div>
      </div>
      <div className={button_container}>
        <button className={test_button} onClick={onClick}>
          내가 지금 보고 있는 기기는?
        </button>
      </div>
      <div className={resultTextTwo}>
        {testResult}번 기기를 바라보고 있습니다.
      </div>
    </>
  );
}

export default ResultTest;
