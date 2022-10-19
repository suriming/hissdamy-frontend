import axios from "axios";

const sendTrainData = async (data) => {
  let failed;
  const res = await axios
    .post("https://ssdam.herokuapp.com/train/", data)
    .catch((error) => {
      console.log(error);
      failed = error.response.data;
    });
  if (failed) {
    return failed;
  }
  return res.data;
};

const sendTestData = async (data) => {
  let failed;
  const res = await axios
    .post("https://ssdam.herokuapp.com/test/", data)
    .catch((error) => {
      console.log(error);
      failed = error.response.data;
    });
  if (failed) {
    return failed;
  }
  return res.data;
};

export { sendTrainData, sendTestData };
