import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import SetPose from "./pages/SetPose";
import styled from "styled-components";
import top from "./assets/top.png";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Container>
          <img src={top} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="pose" element={<SetPose />} />
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
