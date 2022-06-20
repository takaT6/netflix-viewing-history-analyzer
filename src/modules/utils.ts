import { CONST } from './common'
import axios from 'axios'

export const client = axios.create({
  baseURL: CONST.API_URL,
})


export const discoverMovies = () => {
  client.get(CONST.DISCOVER_MV, {
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
};

export const searchMovie = (title: string) => {
  client.get(CONST.SEARCH_MV, {
    params: {
      api_key: CONST.API_KEY,
      language: CONST.LANG,
      query: title
    }
  })
  .then(response => {
    console.log("ステータスコード:", response);
  })
  .catch(err => {
    console.log("no hit:", err);
  });
};

export const searchTV = (title: string) => {
  client.get(CONST.SEARCH_TV, {
    params: {
      api_key: CONST.API_KEY,
      language: CONST.LANG,
      query: title
    }
  })
  .then(response => {
    console.log("ステータスコード:", response);
  })
  .catch(err => {
    console.log("no hit:", err);
  });
};

export const sortList= (movieList: string[]) => {
  for(var i = 0; i < movieList.length; i++){
    
  }
};