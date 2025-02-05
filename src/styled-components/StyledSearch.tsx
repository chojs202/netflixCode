import styled from "styled-components";
import { motion } from "framer-motion";

// ----- Variants
export const BoxHoverVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.2,
    y: -22,
    transition: {
      delay: 0.3,
      duration: 0.3,
      type: "tween",
    },
  },
};

export const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.3,
      type: "tween",
    },
  },
};

export const Wrapper = styled.div`
  margin-top: 80px;
  height: 40vh;
`;

export const Notingdiv = styled.div`
  padding-top: 250px;
  text-align: center;
  font-size: 30px;
  font-weight: 500;
  width: 100%;
`;

export const Title = styled.div`
  font-size: 20px;
  color: #808080;
  margin-bottom: 50px;
  span {
    color: ${props => props.theme.white.lighter};
  }
`;

export const Searching = styled.div`
  padding: 60px;
`;

export const Searching_Title = styled.div`
  font-size: 25px;
  margin-bottom: 20px;
  font-weight: 500;
  color: ${props => props.theme.white.darker};
  span {
    font-size: 25px;
    margin-right: 3px;
  }
`;

export const SearchRow_movie = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  width: 96%;
  margin-bottom: 60px;
`;

export const SearchRow_series = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  width: 96%;
  margin-bottom: 40px;
`;

export const RowBox = styled(motion.div)<{ bgphoto: string }>`
  height: 170px;
  border-radius: 3px;
  background-image: url(${props => props.bgphoto});
  background-color: ${props => props.theme.black.lighter}; 
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  cursor: pointer;
  overflow: hidden;
 
  font-size: 10px;
  text-align: center;
  color: white;
 
  
`;

export const RowBox_Info = styled(motion.div)`
  opacity: 0;
  padding: 10px;
  background-color: rgba(28, 28, 28, 0.6);
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 13px;
  }
`;

export const Modal_Poster = styled.div`
  width: 100%;
  height: 500px;
  background-color: ${props => props.theme.black.lighter}; 
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
`;

export const Search_infomation = styled.div`
  padding-left: 320px;
  position: relative;
  top: -40px;
  font-weight: 500;
  font-size: 20px;
  span:first-child {
    color: #46d369;
    border: 1px solid ${props => props.theme.white.darker};
    padding: 0.5px 4px;
    border-radius: 3px;
    margin-right: 10px;
  }
  
`;

export const Search_overview = styled.div`
  margin-left:30px;
  width: 90%;
  font-size: 20px;
  margin-top: 20px;
  line-height: 1.4;
  color: ${props => props.theme.white.lighter};
  background-color: ${props => props.theme.black.darker};

 
`;

export const Search_MiniPoster = styled.div<{ bgphoto: string }>`
  width: 220px;
  height: 280px;
  background-image: url(${props => props.bgphoto});
  background-size: cover;
  background-position: center center;
  position: absolute;
  top: 540px;
  left: 50px;
  
`;

export const Search_OriginTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  padding-left: 55px;
  position: relative;
  top: -90px;
  letter-spacing: 0.8px;
  color: #bababa;
  
  
`;