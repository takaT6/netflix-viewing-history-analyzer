import { CONST } from './common'
import axios from 'axios'

export const discoverMovies = () => {
  client.get(CONST.DISCOVER_M, {
    params: {
      api_key: CONST.API_KEY, 
      language: CONST.LANG,
      with_genres: 878,
      with_cast: 500,
      sort_by: "vote_average.des"
    }
  })
  .then(staus => {
    console.log("ステータスコード:", staus);
  })
  .catch(err => {
    console.log("err:", err);
  });
}

export const searchMovie = () => {
  client.get(CONST.SEARCH_TV, {
    params: {
      api_key: CONST.API_KEY,
      language: CONST.LANG,
      query: "ストレンジャー・シングス"
    }
  })
  .then(response => {
    console.log("ステータスコード:", response);
  })
}

export const client = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
})