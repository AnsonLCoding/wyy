<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <div id="nav_hide"></div>
    <router-view/>
    <!-- 音乐播放 -->
    <div id="audio_bar">
      <audio :src="getMusicDate.url" style="display:none;" id="music_play"></audio>
      <div id="music_info">
        <p><span v-show="JSON.stringify(getMusicDate) =='{}'">暂无音乐</span>{{getMusicDate.name}} {{getMusicDate.artName}}</p>
      </div>
      <div id="music_ctr">
        <div id="music_play">
          <img class="play_img" src="./assets/aa8.png" alt="" v-show="isPlaying"  @click="playMusic()">
          <img class="play_img" src="./assets/aab.png" alt="" v-show="!isPlaying" @click="playMusic()">
          <img class="play_list_btn" src="./assets/a4h.png" alt="">
        </div>
      </div>
    </div>
    <!-- 音乐播放 占位 -->
    <div id="audio_bar_hide"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      isPlaying: false,
      audio: null
    };
  },
  computed: {
    ...mapGetters(["getMusicDate"])
  },
  created() {},
  watch: {
    getMusicDate(val, oldVal) {
      this.audio = document.querySelector("#music_play");
      console.log(val);
      setTimeout(() => {
        this.isPlaying = true;
        this.audio.play();
      }, 200);
    }
  },
  methods: {
    playMusic() {
      if (this.audio !== null) {
        if (this.isPlaying) {
          this.audio.pause();
          this.isPlaying = false;
        } else {
          this.audio.play();
          this.isPlaying = true;
        }
      }
    }
  }
};
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  /* padding: 30px; */
  background: #fdd835;
  width: 100%;
  height: 0.68rem;
  position: fixed;
  top: 0;
  z-index: 1000;
}

#nav_hide {
  width: 100%;
  height: 0.68rem;
}

#nav a {
  font-weight: bold;
  color: #ffffff;
  font-size: 0.3rem;
  line-height: 0.68rem;
  margin: 0 0.1rem;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#audio_bar {
  position: fixed;
  bottom: -1px;
  width: 100%;
  height: 0.7rem;
  background: #fff;
  box-shadow: 0px 1px 5px #888888;
}

#audio_bar_hide {
  width: 100%;
  height: 0.7rem;
}

#music_info {
  width: 75%;
  height: 100%;
  line-height: 90%;
  font-size: 0.26rem;
  float: left;
  text-align: left;
  box-sizing: border-box;
  padding: 0 0.3rem 0;
}

#music_ctr {
  width: 25%;
  height: 100%;
  float: right;
}

#music_play {
  position: relative;
  left: 0;
  width: 0.7rem;
  height: 0.7rem;
}

.play_img {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
}

.play_list_btn {
  position: absolute;
  left: 1rem;
  top: 0.08rem;
  width: 55%;
  height: 80%;
}
</style>
