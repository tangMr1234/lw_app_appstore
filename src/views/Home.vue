<template>
  <div style="height:100%;">
    <x-header :title="this.$route.meta.name" @on-click-back="goback" :left-options="{preventGoBack: true}"
              style="background-color:#409eff;width:100%;position:absolute;left:0;top:0;z-index:100;">
      <a slot="left" class="backLeft" @click="backIndex" v-show="closeShow">关闭</a>
    </x-header>
    <view-box ref="viewBox" body-padding-top="46px">
      <router-view style="height:100%;"></router-view>
      <!-- 底栏菜单 -->
      <tabbar slot="bottom"
              v-for="(data,index) in $router.options.routes" v-if="!data.hidden&&$route.meta.tabbar!=false"
              :key="index">
        <tabbar-item v-if="!item.hidden" v-for="(item,index) in data.children" :key="index"
                     :link="item.path"
                     :badge="item.badge"
                     :show-dot="item.showDot"
                     :selected="active() === item.path">
          <i class="iconfont" :class="item.icon" slot="icon"></i>
          <span slot="label">{{item.name}}</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script type="es6">
  import {XHeader, ViewBox, Tabbar, TabbarItem} from 'vux'

  export default {
    components: {
      XHeader, ViewBox, Tabbar, TabbarItem
    },
    data() {
      return {
        closeShow: false, //头部关闭按钮显示隐藏
      }
    },
    methods: {
      //设置底栏高亮项
      active() {
        return '/' + this.$route.path.split("/")[1];
      },
      //  点击返回的事件
      goback() {
        sessionStorage.setItem('showClose', sessionStorage.getItem('showClose') * 1 + 1);
        if (sessionStorage.getItem('showClose') >= 1) {
          this.closeShow = true;
        }
        this.$router.go(-1);
      },
      //  关闭事件回到主框架的首页
      backIndex() {
        sessionStorage.removeItem('showClose');
        this.closeShow = false;
        parent.window.location.href = '/#/index';
      }
    },
    mounted() {

    }
  }
</script>
