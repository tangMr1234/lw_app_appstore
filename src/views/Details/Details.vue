<template>
  <div style="background: #fff;margin-bottom:30px;">
    <!-- 顶部图文标题 -->
    <div v-for="(item, index) in app_data" :key="index">
      <flexbox v-for="(data, index) in item.app" :key="index">
        <flexbox-item :span="2/5"><img :src="data.icon" alt="" style="width:100%;"></flexbox-item>

        <flexbox-item>
          <h2 style="font-size:22px;">实时温湿度</h2>
          <div style="margin-top:10px;height:40px;">
            <!-- 安装按钮 -->
            <x-button mini plain @click.native="install(data)" v-show="!data.cirle"
                      style="width:85px;">移除
            </x-button>
            <!-- 安装进度 -->
            <div style="width:85px;" v-show="data.cirle">
              <div style='width:40px;height:40px;margin:0 auto;'>
                <x-circle :percent="data.percent" :stroke-width="6" :trail-width="6" stroke-color="#409eff"
                          trail-color="#ececec">
                  <span :style="{color: strokeColor2}">{{data.percent}}%</span>
                </x-circle>
              </div>
            </div>
          </div>

          <div>服务到期时间：2018-09-10</div>

        </flexbox-item>
      </flexbox>
    </div>
    <!-- 头部平均评分 -->
    <group title="15个评分">
      <cell value="冷链监测">
        <div slot="title">
          <b>3.3分</b>
          <rater v-model="data3" active-color="#409eff" disabled></rater>
        </div>
      </cell>
    </group>
    <!-- 轮播软件截图 -->
    <div style="margin-top:10px;">
      <swiper :options="swiperOptionBanner" ref="mySwiper">
        <!-- slides -->
        <swiper-slide v-for="(data, index) in list"><img
          :src="data.src"
          width="100%" style="display:block;" @click="show(index)" class="previewer-demo-img"></swiper-slide>
      </swiper>
    </div>
    <div v-transfer-dom>
      <previewer :list="list" ref="previewer" :options="options" @on-index-change="logIndexChange"></previewer>
    </div>
    <!-- 应用介绍 -->
    <card>
      <div slot="content" class="card-padding">
        <p>
          可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度</p>
      </div>
    </card>
    <!-- 评分评论栏目 -->
    <group :gutter="10">
      <cell>
        <div slot="title">
          <b>3.3分</b>
          <rater v-model="data3" active-color="#409eff" disabled></rater>
        </div>
        <div slot="default">
          <router-link to="allrater" style="color:#409eff;display: block;">查看全部</router-link>
          <br>
          <router-link to="erater" style="color:#409eff;display: block;">我要评分</router-link>
        </div>
        <div slot="inline-desc" style="margin-top:10px;">满分5分&nbsp&nbsp&nbsp&nbsp&nbsp 15个评分</div>
      </cell>
    </group>
    <!-- 评价信息 -->
    <card style="background: #eee;margin:10px;border-radius:5px;">
      <div slot="header">
        <cell>
          <b slot="title" style="font-size:20px;">小冷冷 </b>
          <div slot="default">
            2018年03月1日
          </div>
          <div slot="inline-desc"><b>3.3分</b>
            <rater v-model="data3" active-color="#409eff" disabled></rater>
          </div>
        </cell>
      </div>
      <div slot="content" style="padding:0 15px 15px;">
        可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度可以查看温度
      </div>
    </card>
    <!-- 开发信息 -->
    <card>
      <div slot="header" style="font-size:24px;margin:0 20px;">
        信息
      </div>
      <div slot="content" class="card-padding" style="background: #eee;margin:0 15px;border-radius:5px;">
        <p>开发商：上海冷王</p>
        <p>分组：冷链监测</p>
        <p>类别：APP</p>
        <p>版本：3.0.1（2018-04-17）</p>
      </div>
    </card>
  </div>
</template>

<script type="es6">
  import {Flexbox, FlexboxItem, XButton, XCircle, Rater, Group, Cell, Card, Previewer, TransferDom} from 'vux'
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import {getMessage} from '@/api/api';

  export default {
    directives: {
      TransferDom
    },
    components: {
      Flexbox, FlexboxItem, XButton, XCircle, Rater, Group, Cell, swiper, swiperSlide, Card, Previewer
    },
    data() {
      return {
        list: [{
          msrc: 'http://pic.qiantucdn.com/58pic/27/16/37/59s58PICYW6_1024.jpg!qt324',
          src: 'http://pic.qiantucdn.com/58pic/27/16/37/59s58PICYW6_1024.jpg!qt324'
        },
          {
            msrc: 'http://pic.qiantucdn.com/58pic/28/18/74/41r58PICHT3_1024.jpg!qt324',
            src: 'http://pic.qiantucdn.com/58pic/28/18/74/41r58PICHT3_1024.jpg!qt324'
          }, {
            msrc: 'http://pic.qiantucdn.com/58pic/28/39/97/31y58PIC8iu_1024.jpg!qt324',
            src: 'http://pic.qiantucdn.com/58pic/28/39/97/31y58PIC8iu_1024.jpg!qt324'
          }, {
            msrc: 'http://pic.qiantucdn.com/58pic/26/57/30/98F58PICXt6_1024.jpg!qt324',
            src: 'http://pic.qiantucdn.com/58pic/26/57/30/98F58PICXt6_1024.jpg!qt324'
          }, {
            msrc: 'http://pic.qiantucdn.com/58pic/27/60/07/12458PICKTJ_1024.jpg!qt324',
            src: 'http://pic.qiantucdn.com/58pic/27/60/07/12458PICKTJ_1024.jpg!qt324'
          }],
        options: {
          getThumbBoundsFn(index) {
            // find thumbnail element
            let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
            // get window scroll Y
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            // optionally get horizontal scroll
            // get position of element relative to viewport
            let rect = thumbnail.getBoundingClientRect()
            // w = width
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
            // Good guide on how to get element coordinates:
            // http://javascript.info/tutorial/coordinates
          }
        },
        strokeColor2: '#409eff', //安装进度条颜色
        data3: '3', //评分栏目
        //轮播初始化,使用swiper4插件,具体Api可查看手册
        swiperOptionBanner: {
          autoplay: false,
          spaceBetween: 20,
          slidesPerView: 1.2,
          slidesOffsetBefore: 20,
          slidesOffsetAfter: 20,
        },
        app_data: [
          {
            label: "冷链监测",
            link: "detail",
            app: [
              {
                id: 1,
                icon: "https://dev4.coldyun.com/static/images/icon/icon_ll_cljc.png",
                title: "管理评估表",
                content: "到期时间：2018年11月30日",
                disabled: true,
                cirle: false,
                percent: 1
              }
            ]
          }
        ]
      }
    },
    methods: {
      install(item) {
        item.percent = 1;
        item.cirle = true;
        let _this = this;
        let timer = setInterval(function () {
          if (item.percent < 100) {
            if (item.percent + 10 <= 100) {
              item.percent = item.percent + 10
            } else {
              item.percent2 = 100;
              item.cirle = false;
              window.clearInterval(timer);
            }
          }
          console.log(item.percent);
        }, 300);
      },
      show(index) {
        this.$refs.previewer.show(index)
      },
      logIndexChange(arg) {
        console.log(arg)
      },
    },
    mounted() {
      this.loadingRemove(); //  使用main中的全局方法关闭loading
    }
  }
</script>

<style scoped rel="stylesheet/less" lang="less">
  .card-padding {
    padding: 15px;
  }
</style>
