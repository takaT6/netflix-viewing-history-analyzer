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
      sort_by: 'vote_average.des'
    }
  })
  .then(staus => {
    console.log('ステータスコード:', staus);
  })
  .catch(err => {
    console.log('err:', err);
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
    console.log('ステータスコード:', response);
  })
  .catch(err => {
    console.log('no hit:', err);
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
    console.log('ステータスコード:', response);
  })
  .catch(err => {
    console.log('no hit:', err);
  });
};

export const sortList = (movieList: any[]) => {
  var editedML = new Array();
  for(var i = 0; i < movieList.length; i++){
    var splitTile =movieList[i].title.split(':');
    console.log(typeof(movieList[i].date))
    if(movieList[i].date !== undefined){
      var numDate = movieList[i].date.replace(/\//g, '');
    }
    editedML.push({
      title: splitTile[0], 
      date: numDate,
      subtitle: splitTile.slice(1).join(':')
    })
  }
  console.log(editedML)

  var sortedML = new Array();
  for(var i = 0; i < editedML.length; i++){
    if(!(sortedML.some((movie) => movie.title == editedML[i].title))){
      sortedML.push({
        title: editedML[i].title,
        info: [{
          subtitle:editedML[i].subtitle,
          date: editedML[i].date
        }],
        cnt: 1,
        poster: '',
        release_date: '',
        first_air_date: '',
        

      });
    }else{
      const index = sortedML.findIndex((movie) => movie.title == editedML[i].title );
      console.log(index)
      if(index !=-1 && sortedML[index].subtitle != ""){
        sortedML[index].info.push({
          subtitle:editedML[i].subtitle,
          date: editedML[i].date
        });
        sortedML[index].cnt += 1;
      }
    }
  }

  console.log(sortedML)

  return sortedML
};