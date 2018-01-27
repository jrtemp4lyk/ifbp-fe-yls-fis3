<template>
  <el-tabs id='equip-main' v-model='activeName' @tab-click='handleClick'>
    <el-tab-pane label=' 型 号 ' name='first'>
      <modelList ref='tab1' v-if='modelType' @change-model-list='changeModelList'></modelList>
      <modelDetail v-if='!modelType' :model-msg='modelMsg' @change-model-detail='changeModelDetail'></modelDetail>
    </el-tab-pane>

    <el-tab-pane label=' 系 列 ' name='second'>
      <seriesList ref='tab2' v-if='seriesType' @change-series-list='changeSeriesList'></seriesList>
      <seriesDetail v-if='!seriesType' :series-msg='seriesMsg' @change-series-detail='changeSeriesDetail'></seriesDetail>
    </el-tab-pane>

    <el-tab-pane label=' 厂 牌 ' name='third'>
      <brandList ref='tab3' v-if='brandType' @change-brand-list='changeBrandList'></brandList>
      <brandDetail v-if='!brandType' :brand-msg='brandMsg' @change-brand-detail='changeBrandDetail'></brandDetail>
    </el-tab-pane>
  </el-tabs>  
</template>

<script>
import modelList from './model-list.vue';
import modelDetail from './model-detail.vue';
import seriesList from './series-list.vue';
import seriesDetail from './series-detail.vue';
import brandList from './brand-list.vue';
import brandDetail from './brand-detail.vue';
export default {
  components: {
    modelList,
    modelDetail,
    seriesList,
    seriesDetail,
    brandList,
    brandDetail
  },
  data() {
    return {
      activeName: 'first',
      modelType: true,
      modelMsg: '',
      seriesType: true,
      seriesMsg: '',
      brandType: true,
      brandMsg: ''
    };
  },
  methods: {
    handleClick(tab, event) {
      // 选中页面时刷新页面数据
      if (tab.$options.propsData.name == 'first') {
        this.$refs.tab1.request(this.$refs.tab1.currentPage - 1, this.$refs.tab1.size);
      } else if (tab.$options.propsData.name == 'second') {
        this.$refs.tab2.request(this.$refs.tab2.currentPage - 1, this.$refs.tab2.size);
      } else {
        this.$refs.tab3.request(this.$refs.tab3.currentPage - 1, this.$refs.tab3.size);
      }
    },
    changeModelList(val) {
      if (val) {
        this.modelMsg = val;
        this.modelType = false;
      }
    },
    changeModelDetail(val) {
      if (val) {
        this.modelType = true;
      }
    },
    changeSeriesList(val) {
      if (val) {
        this.seriesMsg = val;
        this.seriesType = false;
      }
    },
    changeSeriesDetail(val) {
      if (val) {
        this.seriesType = true;
      }
    },
    changeBrandList(val) {
      if (val) {
        this.brandMsg = val;
        this.brandType = false;
      }
    },
    changeBrandDetail(val) {
      if (val) {
        this.brandType = true;
      }
    }

  }
};

</script>

<style>
.el-tabs__item {
  padding-top: 0px;
  padding-right: 70px;
  padding-bottom: 0px;
  padding-left: 20px;
}

#equip-main .el-tabs__content {
  overflow: auto;
}
</style>