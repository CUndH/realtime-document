<template>
  <div class="home">
    <el-row class="mb-4">
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
    </el-row>
  </div>
</template>

<script>
import TestApi from '@/api/test';

export default {
  name: 'HomeView',
  components: {
  },
  mounted() {
    TestApi.getTest({
      a: 1,
      b: 23,
    }).then((res) => {
      console.log(res);
    });
  },
};
</script>
