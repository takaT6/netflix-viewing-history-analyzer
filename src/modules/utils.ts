import { CONST } from './common'
import axios from 'axios'

export const client = axios.create({
  baseURL: CONST.API_URL,
})

export const searchMovie = (title: string): Promise<any> => {
  const res = client.get(CONST.SEARCH_MV, {
    params: {
      api_key: CONST.API_KEY,
      language: CONST.LANG,
      query: title
    }
  })
  .then(response => {
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

export const searchTV = (title: string): Promise<any> => {
  const res = client.get(CONST.SEARCH_TV, {
    params: {
      api_key: CONST.API_KEY,
      language: CONST.LANG,
      query: title
    }
  })
  .then(response => {
    return response.data.results;
  })
  .catch(err => {
    console.log('no hit:', err);
    return [];
  });
  return res;
};

export const sortList = (viewingList: any[]): any[] => {
  // タイトルとサブタイトルを分ける
  var editedVL = new Array();
  for(var i = 0, len = viewingList.length; i < len; i++){
    var splitTile =viewingList[i].title.split(':');
    // if(viewingList[i].date !== undefined){
    //   var numDate = viewingList[i].date.replace(/\//g, '');
    // }
    editedVL.push({
      title: splitTile[0], 
      date: viewingList[i].date,
      subtitle: splitTile.slice(1).join(':')
    });
  }
  console.log(editedVL);

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
        backdrop: './1.png',
        release_date: '',
        first_air_date: '',
        some_hits: Boolean,
        type: 'movie',
        show_info:false
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

export const getPoster = async (viewingItem): Promise<any> => {
  if(viewingItem.type == 'movie'){
    var res = await searchMovie(viewingItem.title);
    if(res.length > 0 ){
      viewingItem.poster = CONST.PICTURE_URL + res[0].poster_path;
      viewingItem.backdrop = CONST.PICTURE_URL + res[0].backdrop_path;
      viewingItem.release_date = res[0].release_date;
    }else{
      res = await searchTV(viewingItem.title);
      if(res.length > 0 ){
        viewingItem.poster = CONST.PICTURE_URL + res[0].poster_path;
        viewingItem.backdrop = CONST.PICTURE_URL + res[0].backdrop_path;
        viewingItem.first_air_date = res[0].first_air_date;
      }
    }
  }else if(viewingItem.type == 'tv'){
    var res = await searchTV(viewingItem.title);
    if(res.length > 0 ){
      viewingItem.poster = CONST.PICTURE_URL + res[0].poster_path;
      viewingItem.backdrop = CONST.PICTURE_URL + res[0].backdrop_path;
      viewingItem.first_air_date = res[0].first_air_date;
    }else{
      res = await searchMovie(viewingItem.title);
      if(res.length > 0 ){
        viewingItem.poster = CONST.PICTURE_URL + res[0].poster_path;
        viewingItem.backdrop = CONST.PICTURE_URL + res[0].backdrop_path;
        viewingItem.release_date = res[0].release_date;
      }
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
  
  setTimeout(screenUnLock, 5000);
}