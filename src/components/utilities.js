import * as poseDetection from "@tensorflow-models/pose-detection";

export const drawKeypoints = (predictions, ctx) => {
  //   console.log(predictions);
  console.log(ctx);
  if (predictions.length > 0) {
    predictions.forEach((prediction) => {
      const keypoints = prediction.keypoints;
      const id = prediction.id;
      //   console.log(keypoints);
      drawSkeleton(keypoints, id, ctx);
      for (let i = 0; i < keypoints.length; i++) {
        ctx.fillStyle = "red";
        ctx.strokeStyle = "red";
        drawKeypoint(keypoints[i], ctx);
        // const x = keypoints[i][0];
        // const y = keypoints[i][1];
        // ctx.beginPath();
        // ctx.arc(x, y, 1, 0, 3 * Math.PI);
        // ctx.fillStyle = "aqua";
        // ctx.fill();
      }
    });
  }
};

const drawKeypoint = (keypoint, ctx) => {
  // If score is null, just show the keypoint.
  const score = keypoint.score != null ? keypoint.score : 1;

  if (score >= 0.7) {
    const circle = new Path2D();
    circle.arc(keypoint.x, keypoint.y, 4, 0, 4 * Math.PI);
    ctx.fill(circle);
    ctx.stroke(circle);
    // ctx.fill();
  }
};

const drawSkeleton = (keypoints, poseId, ctx) => {
  // Each poseId is mapped to a color in the color palette.
  const color = "red";
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;

  poseDetection.util
    .getAdjacentPairs(poseDetection.SupportedModels.BlazePose)
    .forEach(([i, j]) => {
      const kp1 = keypoints[i];
      const kp2 = keypoints[j];

      // If score is null, just show the keypoint.
      const score1 = kp1.score != null ? kp1.score : 1;
      const score2 = kp2.score != null ? kp2.score : 1;
      const scoreThreshold = 0.4;

      if (score1 >= scoreThreshold && score2 >= scoreThreshold) {
        ctx.beginPath();
        ctx.moveTo(kp1.x, kp1.y);
        ctx.lineTo(kp2.x, kp2.y);
        ctx.stroke();
      }
    });
};
