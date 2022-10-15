import { useEffect, useRef } from "react";
import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import Webcam from "react-webcam";
import styles from "./DetectPose.module.css";
import { drawKeypoints } from "./utilities";

function DetectPose() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
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
    setInterval(() => {
      detect(detector);
    }, 500);
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
      console.log(pose);
      const ctx = canvasRef.current.getContext("2d");
      drawKeypoints(pose, ctx);
      //   console.log("??");
    }
  };

  runPoseDetection();
  const { cam, webcamContainer, canvas } = styles;
  return (
    <>
      <div className={webcamContainer}>
        <Webcam className={cam} ref={webcamRef} />
        <canvas className={canvas} ref={canvasRef}></canvas>
      </div>
    </>
  );
}

export default DetectPose;
