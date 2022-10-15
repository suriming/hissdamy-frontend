import styles from "./Home.module.css";
import top from "../assets/top.png";
import DetectPose from "../components/DetectPose";

function Home() {
  const { container, mainWrapper } = styles;
  return (
    <div className={container}>
      <div className={mainWrapper}>
        <img src={top} />
        <DetectPose />
      </div>
    </div>
  );
}

export default Home;
