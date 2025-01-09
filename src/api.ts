const API_KEY = "ad85fd59f58b11558b491a3fa7320fc1";
const BASE_PATH ="https://api.themoviedb.org/3";

interface IMovie {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview: string;
}

interface Itv {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview: string;
    name: string;
}


export interface IGetMoviesResult {
    dates: {
        maximum:string;
        minimum: string;
    },
    page: number,
    results: IMovie[],
    total_pages: number,
    total_results: number,

}

export interface IGetTvResult {
    
    page: number,
    results: Itv[],
    total_pages: number,
    total_results: number,

}

export interface ISearchResult {
    id: number;
    name?: string;
    title?: string;
    backdrop_path: string;
    poster_path: string;
    vote_average: number;
    overview: string;
    original_title: string;
    release_date?: string; 
    first_air_date?: string; 
  }
  
  export interface IGetSearch {
    page: number;
    results: ISearchResult[];
    total_pages: number;
    total_results: number;
    dates: string;
  }



export function getMovies(){
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`)
    .then(Response => Response.json());
}


export function getTvShow(){
    return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`)
    .then(Response => Response.json());
}

export function getSearchMovie(keyword: string) {
    return fetch(
      `${BASE_PATH}/search/movie?api_key=${API_KEY}&language=en-US&query=${keyword}&page=1`
    ).then(response => {
      return response.json();
    });
  }

  export function getSearchTv(keyword: string) {
    return fetch(
      `${BASE_PATH}/search/tv?api_key=${API_KEY}&language=en-US&query=${keyword}&page=1&include_adult=false`
    ).then(response => {
      return response.json();
    });
  }