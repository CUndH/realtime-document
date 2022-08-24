<template>
  <div class="Login">
    <el-card class="wrap">
      <template #header>登录</template>
      <el-form :model="form" label-width="60px">
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-button type="primary" @click="handleLogin">登录</el-button>
      </div>
    </el-card>
  </div>
</template>

<script >
import { reactive } from 'vue';
import LoginApi from '@/api/login';

export default {
  name: 'HomeView',
  setup() {
    const form = reactive({
      username: null,
      password: null,
    });

    const handleLogin = () => {
      LoginApi.login(form).then((res) => {
        if (res.success) {
          this.$router.push({ name: 'HomeView' });
        }
      });
    };

    return {
      form,
      handleLogin,
    };
  },
};

</script>

<style lang="scss" scoped>
.Login {
  .wrap {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 350px;
  }

  .footer {
    margin-top: 10px;
    text-align: center;
  }
}
</style>
