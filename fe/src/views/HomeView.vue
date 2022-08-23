<template>
  <div class="home">
    第一行第二列的格子是可以点击输入的，体验一下效果
    <div class="canvas-wrap">
      <canvas id="tutorial"
        width="800"
        height="500"
        @click="handleClick"
        @keypress="aaa"></canvas>
      <el-input v-show="isShow"
        v-model="value"
        :style="{
          top: `${top}px`,
          left: `${left}px`,
        }"
        @blur="handleBlur"
      />
    </div>
  </div>
</template>

<script>
// import TestApi from '@/api/test';

export default {
  name: 'HomeView',
  data() {
    return {
      curCanvas: null,
      curCtx: null,
      ratio: 0,
      isShow: false,
      top: 0,
      left: 0,
      value: null,
    };
  },
  mounted() {
    this.initCanvas();
  },
  methods: {
    getPixelRatio(ctx) {
      const backingStore = ctx.backingStorePixelRatio
        || ctx.webkitBackingStorePixelRatio
        || ctx.mozBackingStorePixelRatio
        || ctx.msBackingStorePixelRatio
        || ctx.oBackingStorePixelRatio
        || ctx.backingStorePixelRatio || 1;
      return (window.devicePixelRatio || 1) / backingStore;
    },
    scaleCanvas() {
      this.curCanvas.style.width = `${this.curCanvas.width}px`;
      this.curCanvas.style.height = `${this.curCanvas.height}px`;
      this.curCanvas.width *= this.ratio;
      this.curCanvas.height *= this.ratio;
    },
    initCanvas() {
      const canvas = document.getElementById('tutorial');
      this.curCanvas = canvas;
      // 获得 2d 上下文对象
      const ctx = canvas.getContext('2d');
      this.curCtx = ctx;
      const ratio = this.getPixelRatio(ctx);
      this.ratio = ratio;
      // 缩放 canvas 比例
      this.scaleCanvas();
      // 缩放画布，如果不缩放画布就要缩放画上去的东西
      ctx.scale(ratio, ratio);

      // 画边框
      ctx.strokeRect(0, 0, 800, 500);

      // 画网格线
      ctx.beginPath();
      ctx.moveTo(0, 30);
      ctx.lineTo(800, 30);
      ctx.moveTo(0, 60);
      ctx.lineTo(800, 60);
      ctx.moveTo(100, 0);
      ctx.lineTo(100, 500);
      ctx.moveTo(200, 0);
      ctx.lineTo(200, 500);
      ctx.stroke();

      // 写字
      ctx.font = '18px sans-serif';
      ctx.fillText('牛逼牛逼', 14, 21);
    },
    handleClick(e) {
      console.log(e);
      if (e.clientY < 100 && e.clientX < 200 && e.clientX > 100) {
        this.top = 1;
        this.left = 101;
        this.isShow = true;
      }
    },
    handleBlur() {
      this.isShow = false;
      this.curCtx.font = '18px sans-serif';
      this.curCtx.fillText('磊哥口我', 114, 21);
    },
  },
};
</script>

<style lang="scss" scoped>
  .canvas-wrap {
    position: relative;

    .el-input {
      position: absolute;
      z-index: 5;
      width: 98px;
      height: 28px;
    }
  }
</style>
