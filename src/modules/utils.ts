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
  const res = client.get(CONST.SEARCH_MV, {
    params: {
      api_key: CONST.API_KEY,
      language: CONST.LANG,
      query: title
    }
  })
  .then(response => {
    // console.log('ステータスコード:', response.data.results[0]);
    if(response != undefined){
      return response.data.results;
    }else{
      return [];
    }
  })
  .catch(err => {
    console.log('no hit:', err);
    return [];
  });
  return res;
  
};

export const searchTV = (title: string) => {
  const res = client.get(CONST.SEARCH_TV, {
    params: {
      api_key: CONST.API_KEY,
      language: CONST.LANG,
      query: title
    }
  })
  .then(response => {
    // console.log('ステータスコード:', response.data.results[0].poster_path);
    return response.data.results;
  })
  .catch(err => {
    console.log('no hit:', err);
    return [];
  });
  return res;
};

export const sortList = (viewingList: any[]) => {
  // タイトルとサブタイトルを分ける
  var editedVL = new Array();
  for(var i = 0; i < viewingList.length; i++){
    var splitTile =viewingList[i].title.split(':');
    console.log(typeof(viewingList[i].date));
    if(viewingList[i].date !== undefined){
      var numDate = viewingList[i].date.replace(/\//g, '');
    }
    editedVL.push({
      title: splitTile[0], 
      date: numDate,
      subtitle: splitTile.slice(1).join(':')
    });
  }
  console.log(editedVL)

  // タイトルごとにまとめる
  var sortedVL = new Array();
  for(var i = 0; i < editedVL.length; i++){
    const targetView = editedVL[i];
    if(!(sortedVL.some((movie) => movie.title == targetView.title))){
      sortedVL.push({
        title: targetView.title,
        info: [{
          subtitle: targetView.subtitle,
          date: targetView.date
        }],
        cnt: 1,
        poster: './1.png',
        release_date: '',
        first_air_date: '',
        some_hits: Boolean,
        type: 'movie'
      });
    }else{
      const index = sortedVL.findIndex((movie) => movie.title == targetView.title );
      var target = sortedVL[index];
      if(index !=-1 && target.subtitle != ""){
        target.info.push({
          subtitle: targetView.subtitle,
          date: targetView.date
        });
        target.cnt += 1;
        target.type = 'tv';
      }else{
        console.log('no hit.');
      }
    }
  }
  console.log(sortedVL);
  return sortedVL;
};

export const getPoster = async (viewingItem) => {
  if(viewingItem.type == 'movie'){
    var res = await searchMovie(viewingItem.title);
    if(res.length == 0 ){
      res = await searchTV(viewingItem.title);
      if(res.length > 0 ){
        viewingItem.poster = CONST.POSTER_URL + res[0].poster_path;
      }
    }else{
      viewingItem.poster = CONST.POSTER_URL + res[0].poster_path;
    }
  }else if(viewingItem.type == 'tv'){
    var res = await searchTV(viewingItem.title);
    if(res.length == 0 ){
      res = await searchMovie(viewingItem.title);
      if(res.length > 0 ){
        viewingItem.poster = CONST.POSTER_URL + res[0].poster_path;
      }
    }else{
      viewingItem.poster = CONST.POSTER_URL + res[0].poster_path;
    }
  }
  console.log('finished getPoster func.');
}




/**
 * ScreenLook
 */
 export const screenLock = () =>{
  var element = document.createElement('div');
  element.id = "screenLock";
 
  element.style.height = '100%';
  element.style.left = '0px';
  element.style.position = 'fixed';
  element.style.top = '0px';
  element.style.width = '100%';
  element.style.zIndex = '9999';
  element.style.opacity = '0';
 
  var objBody = document.getElementsByTagName("body").item(0);
  objBody.appendChild(element);

  /**
   * ScreenUnLook
   */
  const screenUnLock = () => {
    var screenLock = document.getElementById("screenLock");
    screenLock.parentNode.removeChild(screenLock);
  }
  
  setTimeout(screenUnLock, 3000);
}