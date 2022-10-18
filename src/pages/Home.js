import styles from './Home.module.css';
import top from '../assets/top.png';
import DetectPose from '../components/DetectPose';
import { useNavigate } from 'react-router';
import { div } from '@tensorflow/tfjs';

function Home() {
    const { container, mainWrapper, button_container, introduction } = styles;
    const navigate = useNavigate();
    const onClick = () => {
        navigate('/pose');
    };
    return (
        <>
            {/* <div className={container}>
        <div className={mainWrapper}> */}
            {/* <img src={top} /> */}
            {/* </div>
      </div> */}
            <div className={introduction}>
                하이쓰담이 설정 페이지입니다<br></br>시선 측정을 위해 아래의{' '}
                <span>측정시작</span>을 클릭해주세요
            </div>
            <div className={button_container}>
                <button onClick={onClick}>측정 시작</button>
            </div>
        </>
    );
}

export default Home;
