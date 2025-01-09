import { useQuery } from "react-query";
import { getMovies, IGetMoviesResult } from "../api";
import styled from "styled-components";
import { makeImagePath } from "./utils";
import { motion, AnimatePresence, useScroll } from "framer-motion"
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";


const Wrapper = styled.div`
    background:black;
    overflow-x: hidden;

`;

const Loader = styled.div`
    height:20vh;
    text-align:center;
    display:flex;
    justify-content:center;
    font-size:50px;
    color: white;
`;

const Banner = styled.div<{$bgPhoto: string }>`
    height:100vh;
    display:flex;
    flex-direction:column;
    justify-content:center;
    padding:60px;
    background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1)) , url(${(props) => props.$bgPhoto});
    background-size:cover;

    
`;
const Title = styled.h2`
    font-size:68px;
    margin-bottom:15px;
`;

const Overview = styled.p`
    font-size:20px;
    width:50%;
`;

const Slider = styled.div`
    position:relative;
    top: -250px;
`;

const Row = styled(motion.div)`
    display: grid;
    gap:10px;
    grid-template-columns:repeat(6, 1fr);
    margin-bottom:5px;
    position:absolute;
    width:100%;
    svg {
        opacity:0.4;
        position:absolute;
        cursor: pointer;
    }
`;

const Box = styled(motion.div)<{$bgPhoto: string }>`
    background-color:white;
    background-image:url(${(props) => props.$bgPhoto});
    height:200px;
    background-size:cover;
    background-position:center;
    cursor: pointer;
   &:first-child {
    transform-origin: center left;
   }
   &:last-child {
    transform-origin: center right;
   }
`;

const Info = styled(motion.div)`
    padding: 10px;
    background-color: ${props => props.theme.black.darker};
    opacity: 0;
    position: absolute;
    width: 100%;
    bottom: 0;
    h4 {
        text-align:center;
        font-size:18px;
        
    }
`;

const infoVariants = {
    hover: {
        opacity: 1,
        transition: {
            delay: 0.5,
            duration:0.3,
            type:"tween",
        }
    }
}

const rowVariants = {
    hidden : {
        x: window.outerWidth - 10 ,
    },
    visible: {
        x:0,
    },
    exit : {
        x: -window.outerWidth + 10 ,
    },
}
const boxVariants = {
    normal: {
        scale: 1,
    },
    hover: {
        scale: 1.3,
        y: -50,
        transition: {
            delay: 0.5,
            duration:0.3,
            type:"tween",
        }
    },
}

const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    opacity: 0;
`;

const BigMovie = styled(motion.div)`
    position: fixed;
    width: 50vw;
    height: 80vh; 
    right: 0;
    left: 0;
    margin: 0 auto;
    border-radius:15px;
    overflow:hidden;
    background-color:${props => props.theme.black.lighter};
`;

const BigCover = styled.div`
    width:100%;
    background-size:cover;
    background-position: center center;
    height:400px;

`;

const BigTitle = styled.h2`
    color: ${props => props.theme.white.darker};
    padding:15px;
    font-size:30px;
    position:relative;
    top:-60px;
`;

const BigOverview = styled.p`
    color: ${props => props.theme.white.darker};
    position:relative;
    top: -50px;
    padding:15px;
`;

const Title1 = styled.div`
    font-size:30px;
    margin:20px;
    font-weight:500;
   
`;



const RightIcon = styled.div`
    position:  absolute ;
    right: 0px;
    background-color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    height: 100%;
    width: 40px;
    border: none;
    z-index: 2;
    color: rgb(229, 229, 229);
    svg {
        
    }
`;




function Home() {
    const offset = 6;
    const navigate = useNavigate();
    const bigMovieMatch = useMatch("/movies/:movieId");
    const { scrollY } = useScroll();
    const {data, isLoading} = useQuery<IGetMoviesResult>(
        {
            queryKey:["movies", "nowPlaying"], 
            queryFn: getMovies,
        })
   
    
    console.log(data);
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const increaseIndex = () => {
        if(data){
            if(leaving) return;
            toggleLeaving();
            const totalMovies = data.results.length - 1;
            const maxIndex = Math.floor(totalMovies / offset) - 1 ;
            setIndex((prev) => prev === maxIndex ? 0 : prev + 1);
        }
    }
   
    
    const toggleLeaving = () => setLeaving(prev => !prev);
    const onBoxClicked = (movieId:number) => {
        navigate(`/movies/${movieId}`);
    } 
    const onOverlayClick = () => navigate(-1);
    const clickedMovie = bigMovieMatch?.params.movieId && data?.results.find(movie => String(movie.id) === bigMovieMatch.params.movieId)
    return <Wrapper>{isLoading ? 
    <Loader>Loading...</Loader> : 
        <>
            <Banner 
            // onClick={increaseIndex} 
            $bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
                <Title>{data?.results[0].title}</Title>
                <Overview>{data?.results[0].overview}</Overview>
            </Banner> 
            <Slider>

                <AnimatePresence initial={false} onExitComplete={(toggleLeaving)}>
                    <Title1>Popularity</Title1>
                    <Row 
                    variants={rowVariants} 
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{type: "tween", duration: 1}}
                    key={index}>
                        
                        {data?.results
                        .slice(1)
                        .slice(offset*index, offset*index+offset).map((movie) => 
                        (
                        <Box
                        layoutId={movie.id + ""}
                        key={movie.id}
                        whileHover="hover"
                        initial="normal"
                        variants={boxVariants}
                        onClick={() => onBoxClicked(movie.id)}
                        transition={{ type: "tween"}}
                        $bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                        >
                            <Info variants={infoVariants}>
                                <h4>{movie.title}</h4>
                            </Info>
                        </Box>
                        ))}
                        <RightIcon>
                        <svg 
                        onClick={increaseIndex}
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 256 512" 
                        fill="currentColor"
                        
                        ><path d="M118.6 105.4l128 127.1C252.9 239.6 256 247.8 256 255.1s-3.125 16.38-9.375 22.63l-128 127.1c-9.156 9.156-22.91 11.9-34.88 6.943S64 396.9 64 383.1V128c0-12.94 7.781-24.62 19.75-29.58S109.5 96.23 118.6 105.4z"></path></svg>
                        </RightIcon>
                    </Row>
                </AnimatePresence>
            </Slider>
           
            
           
           
            <AnimatePresence>
                {bigMovieMatch ?
                   <>
                    <Overlay 
                    onClick={onOverlayClick}
                    exit={{opacity:0}}
                    animate={{opacity:1}}
                    />
                    <BigMovie
                    style={{top: scrollY.get() + 100}}
                    layoutId={bigMovieMatch.params.movieId}
                    >{clickedMovie && <>
                        <BigCover style={{backgroundImage:`linear-gradient(to top, black, transparent),url(
                            ${makeImagePath(clickedMovie.backdrop_path,"w500")}
                            )`}} />
                        <BigTitle>{clickedMovie.title}</BigTitle>
                        <BigOverview>{clickedMovie.overview}</BigOverview>
                    </>}</BigMovie>
                   </>
                    : null}
            </AnimatePresence>
            
            </>}
            
            
            </Wrapper>;
}


export default Home;