<template>
 <div>
   <h1>視聴履歴のアップロード</h1>
    <div id="drop-zone">
      <p>ファイルをドラッグ＆ドロップもしくは</p>
      <input type="file" id="file-input">
    </div>
    <br>
    <div class="btn btn-analyze" @click="btnAnalyzerTap">
      <span>解析</span>
    </div>
    <h2>アップロードした視聴履歴のプレビュー</h2>
    <div id="preview">
      <table id="preview-tbl">
          <tr>
            <th class="preview-title">タイトル</th>
            <th class="preview-date">視聴日時</th>
          </tr>
          <transition-group name="tableani">
          <tr v-for="(movie, index) in movieList" :key="index">
            <td class="preview-title">{{movie.title}}</td>
            <td class="preview-date">{{movie.date}}</td>
          </tr>
          </transition-group>
      </table>
    </div>
 </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

var movieList = reactive(new Array());

const emit = defineEmits(['update:movieList']);

if(sessionStorage.movieList != undefined) {
      movieList = JSON.parse(sessionStorage.movieList)
      // console.log(sessionStorage.movieList)
      // console.log(movieList)
}

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
    this.style.background = '#ffffff'; 
    var files = e.dataTransfer.files;
    if (files.length > 1) return alert('アップロードできるファイルは1つだけです。');
    fileInput.files = files;
    previewFile(files[0]);
  }, false);
  console.log('Loader Vue >>>>>> On mounted.')
});

onUnmounted(() => {
  sessionStorage.setItem('movieList', JSON.stringify(movieList));
  console.log('Loader Vue >>>>>> On Unmounted.');
});

const previewFile = (file: File) => {
  if(file.type.match('text/csv')){movieList.splice(0);}
  else {alert('csvファイルを選択してください。');}
  var fr = new FileReader();
  fr.readAsText(file);
  fr.onload = () => {
    let lines = (fr.result as string).replace(/\"/g, '').split('\n');
    lines.shift();
    for(let i = 0; i < lines.length; i++){
      let info = lines[i].split(',');
      let viewingInf = {title:info[0], date: info[1]};
      movieList.push(viewingInf);
    }
  }
};

const btnAnalyzerTap = () =>{
  emit('update:movieList', movieList);
  router.push({hash:'#result'})
};

</script>

<style>
#drop-zone {
  border: 1px solid red; 
  margin: 0 auto;
  padding: 30px;
  width: 80vw;
  max-height: 300px;
}

#preview {
  width: 80vw;
  margin: 0 auto;
  max-height: 30vh;
  min-height: 100px;           
  border: 1px solid red;
  overflow: hidden;   
  overflow-y: scroll; 
}

#preview-tbl {
  display: block;
  position: relative;
  table-layout: fixed;
  font-size: 1em;
}
#preview-tbl th {
  background-color: blanchedalmond;
  position: sticky;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 10px;
}
#preview-tbl tr{
  height: 10px;
}
/* .preview-title {
  max-width: 75%;
}
.preview-date {
  max-width: 25%;
} */

#file-input {
  border: 6px outset red;
  background-color: white;
  color: #000000;
  width: 80vw;
}

.btn {
  font-weight: 700;
  font-size: 120%;
  line-height: 1.5;
  position: relative;
  display: inline-block;
  padding: 1rem 4rem;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  text-align: center;
  vertical-align: middle;
  text-decoration: none;
  letter-spacing: 0.1em;
  color: #212529;
  border-radius: 0.5rem;
}

.btn-analyze {
  width: 30vw;
  overflow: hidden;
  /* padding: 1.5rem 6rem; */
  color: #fff;
  border-radius: 5;
  background: #000;
}

.btn-analyze span {
  position: relative;
}

.btn-analyze:before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  content: '';
  -webkit-transition: all .5s ease-in-out;
  transition: all .5s ease-in-out;
  -webkit-transform: translateX(-96%);
  transform: translateX(-96%);
  background: #eb0d27;
}

.btn-analyze:hover:before {
  -webkit-transform: translateX(0%);
  transform: translateX(0%);
}
</style>