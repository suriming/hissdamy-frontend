import styles from "./Home.module.css";

function Home() {
  const { container, mainWrapper } = styles;
  return (
    <div className={container}>
      <div className={mainWrapper}>Hi</div>
    </div>
  );
}

export default Home;
