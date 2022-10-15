import styles from "./Home.module.css";
import top from "../assets/top.png";
import DetectPose from "../components/DetectPose";
import { useNavigate } from "react-router";

function Home() {
  const { container, mainWrapper } = styles;
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/pose");
  };
  return (
    <>
      {/* <div className={container}>
        <div className={mainWrapper}> */}
      {/* <img src={top} /> */}
      {/* </div>
      </div> */}
      <button onClick={onClick}>측정 시작</button>
    </>
  );
}

export default Home;
