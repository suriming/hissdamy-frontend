import { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import SetPose from './pages/SetPose';
import styled from 'styled-components';
import top from './assets/top.png';
import logo1 from './assets/logo1.png';
import extraText from './assets/extraText.png';
import Complete from './pages/Complete';
import SetPose1 from './pages/SetPose1';
import SetPose2 from './pages/SetPose2';
import ResultTest from './pages/ResultTest';

function App() {
    //const { logo } = styles;
    return (
        <Fragment>
            <BrowserRouter>
                <Container>
                    <img src={top} />
                    <img class="extraText" src={extraText} />
                    <img class="logo" src={logo1} />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="pose" element={<SetPose />} />
                        <Route path="pose1" element={<SetPose1 />} />
                        <Route path="pose2" element={<SetPose2 />} />
                        <Route path="complete" element={<Complete />} />
                        <Route path="test" element={<ResultTest />} />
                    </Routes>
                </Container>
            </BrowserRouter>
        </Fragment>
    );
}

const Container = styled.div`
    min-height: 100vh;
    width: 100vw;
    min-width: 35rem;
    margin: 0 auto;
    overflow: hidden;
    // 스크롤바 없앰
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera*/
    }

    @media screen and (min-width: 600px) {
        width: 35.2rem;
    }
`;

// const MainWrapper = styled.div`
//     // Navbar 높이 확보
//     padding-top: ${(props) => (props.navbar ? '4.4rem' : '')};
// `;

export default App;
