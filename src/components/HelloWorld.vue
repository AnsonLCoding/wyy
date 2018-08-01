<template>
  <div class="hello">
    <!-- 搜索框 -->
    <mu-container>
      <mu-text-field v-model="inputValue" placeholder="搜索音乐"></mu-text-field>
    </mu-container>
    <mu-container class="button-wrapper">
      <mu-button full-width color="warning" @click="searchClick()">SEARCH</mu-button>
    </mu-container>
    <!-- 错误弹窗 -->
    <!-- <mu-alert color="error" delete v-if="getMusicListErr" @delete="closeAlert()">
      <mu-icon left value="warning"></mu-icon> {{getMusicListErr}}
    </mu-alert> -->
    <!-- 音乐播放 -->
    <audio id="music_play" :src="musicUrl" style="display:none;"></audio>
    <!-- 音乐展示列表 -->
    <mu-paper :z-depth="1" class="list-wrap">
      <mu-list textline="two-line">
        <mu-list-item avatar button :ripple="false" v-for="(musicItem,index) in musicList" :key="index" class="border_bottom">
          <mu-list-item-action>
            <mu-avatar color="yellow600">
              <mu-icon value="music_note"></mu-icon>
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content @click="muscicItmeClick(musicItem.id)">
            <mu-list-item-title>{{musicItem.name}}</mu-list-item-title>
            <mu-list-item-sub-title>{{musicItem.artists[0].name}}</mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-button icon>
              <mu-icon value="info"></mu-icon>
            </mu-button>
          </mu-list-item-action>
        </mu-list-item>
      </mu-list>
    </mu-paper>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      musicList: [],
      inputValue: "",
      getMusicListErr: "",
      musicUrl: "",
      searchData: ""
    };
  },
  created() {
    console.log("app is created!");
  },
  methods: {
    muscicItmeClick(id) {
      this.$http
        .get(`https://api.imjad.cn/cloudmusic/?type=song&id=${id}&br=128000`)
        .then(data => {
          console.log(data.data.data[0].url);
          this.musicUrl = data.data.data[0].url;
          let musicPlay = document.querySelector("#music_play");
          setTimeout(() => {
            musicPlay.play();
          }, 200);
        })
        .catch(err => (this.getMusicListErr = "获取错误"));
    },
    searchClick() {
      this.$http
        .get(`https://enigmatic-shore-63070.herokuapp.com/search?keywords=${this.searchData}`)
        .then(data => {
          this.musicList = data.data.result.songs;
          console.log(data)
        })
        .catch(err => (this.getMusicListErr = "获取错误"));
    }
  },
  watch: {
    inputValue(val, oldVal) {
      this.searchData = val;
      if (val === "") this.musicList = [];
      if (val) {
      this.$http
        .get(`https://enigmatic-shore-63070.herokuapp.com/search?keywords=${this.searchData}`)
        .then(data => {
          this.musicList = data.data.result.songs;
          console.log(data)
        })
        .catch(err => (this.getMusicListErr = "获取错误"));
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
a {
  color: #42b983;
}
.mu-list {
  width: 100%;
  text-align: center;
}
.border_bottom {
  border-bottom: 1px solid rgb(224, 224, 224);
}
.mu-list-item-title {
  font-size: 12px;
}
.mu-alert {
  position: fixed;
  top: 50%;
}
</style>
