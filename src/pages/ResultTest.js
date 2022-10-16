import { useRef } from "react";
import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import Webcam from "react-webcam";
import { sendTestData } from "../lib/data";

function ResultTest() {
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
    }
  };

  const onClick = () => {
    runPoseDetection();
  };

  return (
    <>
      <div>테스트 페이지</div>
      <div>
        <Webcam ref={webcamRef} />
      </div>
      <button onClick={onClick}>내가 지금 보고 있는 기기는?</button>
    </>
  );
}

export default ResultTest;
