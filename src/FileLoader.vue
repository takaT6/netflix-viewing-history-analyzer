<template>
 <div>
   <h1>視聴履歴のアップロード</h1>
    <div id="drop-zone">
      <p>ファイルをドラッグ＆ドロップもしくは</p>
      <input type="file" id="file-input">
    </div>
    <router-link to="/result">解析する</router-link>
    <h2>アップロードした視聴履歴のプレビュー</h2>
    <div id="preview">
      <table>
        <tr v-for="(movie, index) in movieList" :key="index">
          <td class="preview-title">{{movie.title}}</td>
          <td class="preview-date">{{movie.date}}</td>
        </tr>
      </table>
    </div>
 </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';

var movieList = reactive([]);

onMounted(() => {
  const dropZone = document.getElementById('drop-zone') as HTMLInputElement;
  const fileInput = document.getElementById('file-input') as HTMLInputElement;

  dropZone.addEventListener('dragover', function(e) {
    e.stopPropagation();
    e.preventDefault();
    this.style.background = '#e1e7f0';
  }, false);

  dropZone.addEventListener('dragleave', function(e) {
    e.stopPropagation();
    e.preventDefault();
    this.style.background = '#ffffff';
  }, false);

  fileInput.addEventListener('change', function () {
        previewFile(this.files[0]);
  });

  dropZone.addEventListener('drop', function(e) {
    e.stopPropagation();
    e.preventDefault();
    this.style.background = '#ffffff'; //背景色を白に戻す
    var files = e.dataTransfer.files; //ドロップしたファイルを取得
    if (files.length > 1) return alert('アップロードできるファイルは1つだけです。');
    fileInput.files = files; //inputのvalueをドラッグしたファイルに置き換える。
    previewFile(files[0]);
  }, false);
});

const previewFile = (file: File) => {
  if(file.type.match("text/csv")){
    console.log("hoge")
  }
  var fr = new FileReader();
  fr.readAsText(file);
  fr.onload = () => {
    let lines = (fr.result as string).replace(/\"/g,"").split("\n");
    lines.shift();
    for(let i = 0; i < lines.length; i++){
      let info = lines[i].split(",");
      let viewingInf = {title:info[0], date: info[1]};
      movieList.push(viewingInf);
      if(i==30){
        console.log(movieList);
        return
      }
    }
    console.log(movieList);
  }
}
</script>

<style>
#preview {
  width: 20vw;                
  height: 300px;               
  border: 1px solid #000;      
  overflow-y: scroll;          
}

#drop-zone {
  border: 1px solid; 
  padding: 30px;
  width: 20vw;
}

</style>