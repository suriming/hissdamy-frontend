import axios from "axios";

const sendTrainData = async (data) => {
  let failed;
  const res = await axios
    .post("http://127.0.0.1:8000/train/", data)
    .catch((error) => {
      console.log(error);
      failed = error.response.data;
    });
  if (failed) {
    return failed;
  }
  return res.data;
};

export { sendTrainData };
