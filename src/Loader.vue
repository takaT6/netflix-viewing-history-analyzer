<template>
  <div id="field">
    <h1>視聴履歴のアップロード</h1>
      <div id="drop-zone">
        <i class="fa-solid fa-circle-arrow-down fa-2x fa-beat-fade"></i>
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
            <transition-group name="tableani" @after-enter="afterEnter" appear>
              <tr v-for="(movie, index) in viewingList" :key="index">
                <td class="preview-title">{{movie.title}}</td>
                <td class="preview-date">{{movie.date}}</td>
              </tr>
            </transition-group>
        </table>
      </div>
      <div id="spacer"></div>
  </div>
  <Loading v-if="show_loading"></Loading>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Loading from './Loading.vue';
/*===============================================================*/
const router = useRouter();

var show_loading = ref(false);

var viewingList = ref([]);

const emit = defineEmits(['update:viewingList']);

var afterenterCnt = 0;

const props = defineProps({viewingList: Array});
/*===============================================================*/
if(sessionStorage.viewingList != undefined) {
  show_loading.value = true;
  viewingList.value = JSON.parse(sessionStorage.viewingList);
  if(viewingList.value.length==0)show_loading.value = false;
}

const previewFile = (file: File): void => {
  afterenterCnt = 0;
  show_loading.value = true;
  if(file.type.match('text/csv'))viewingList.value.splice(0);
  else alert('csvファイルを選択してください。');
  var fr = new FileReader();
  fr.readAsText(file);
  fr.onload = () => {
    let lines = (fr.result as string).replace(/\"/g, '').split('\n');
    lines.shift();
    const list = [];
    for(let i = 0, len = lines.length; i < len; i++){
      let info = lines[i].split(',');
      let viewingInf = {title:info[0], date: info[1]};
      if(info[0] != "")list.push(viewingInf);
      console.log("hoge")
    }
    viewingList.value = list;
  }
};

const btnAnalyzerTap = (): void =>{
  emit('update:viewingList', viewingList.value);
  if(viewingList.value.length != 0){
    router.push({hash:'#result'});
  }else{
    alert('ファイルを選択してください。');
  }
};

const afterEnter = (): void => {
  afterenterCnt++;
  if(viewingList.value.length == afterenterCnt){
    show_loading.value = false;
  }
}
/*===============================================================*/
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
  console.log('Loader Vue >>>>>> On mounted.');
});
/*===============================================================*/
onUnmounted(() => {
  sessionStorage.setItem('viewingList', JSON.stringify(viewingList.value));
  console.log('Loader Vue >>>>>> On Unmounted.');
});
/*===============================================================*/


</script>

<style scoped>

@media screen and (max-width: 400px) {
  .card {
    --card-width: 100px !important;
  }

  #field {
    font-size: 0.5rem !important;
  }

  #spacer {
    height: 10px !important;
  }
}
h1 {
  padding: 10px 0 10px 0;
  margin: 0;
}
#field {
  background-color: white;
}

#spacer {
  height: 50px;
}
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

table tr:nth-child(even) td{
  background-color:#f0f0f0;
}

.tableani-item {
  display: inline-block;
}

.tableani-enter-active,
.tableani-leave-active {
  transition: all 1s ease;
}
.tableani-enter-from,
.tableani-leave-to {
  opacity: 0;
  transform: translateY(100px);
}
</style>