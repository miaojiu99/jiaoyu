<template>
  <div class="info">
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.go(-1)" />
    <main>
      <div class="avatar">
        <van-cell title="头像上传" is-link />
        <van-uploader :after-read="afterRead">
          <van-image round fit="conver" :src="avatarImage">
            <template v-slot:error>上传</template>
          </van-image>
        </van-uploader>
      </div>

      <van-cell title="昵称" :value="valueName" @click="dialogShow=true" is-link />
      <van-cell title="性别" :value="sex" @click="showPicker = true" is-link />
      <van-cell title="手机号" :value="userPhone" is-link />
      <van-cell title="银行卡" is-link to="/bankall" />
      <van-cell title="实名认证" is-link @click="$router.push({path: '/approve', query: {real: obj_data.real}})"/>
      <van-cell title="提交保证金" v-if="obj_data.state == 1" is-link to="/submit-money" />
    </main>

    <van-dialog v-model="dialogShow" show-cancel-button @confirm="onConfirmName">
      <van-panel title="昵称">
        <van-field v-model="valueInput" placeholder="请输入你的昵称" />
      </van-panel>
    </van-dialog>

    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirmSex"
      />
    </van-popup>
  </div>
</template>

<script>
import { phoneConceal } from "@/utils";
import { upUser, set, global, upFile, avatarPost } from "@/api";

export default {
  data() {
    return {
      valueName: "", //昵称
      valueInput: "", // 昵称输入框
      sex: "", //性别
      userPhone: "",
      dialogShow: false, //弹出框显隐
      showPicker: false, // 显示男女选择
      columns: ["男", "女"],
      obj_data: '',
      avatarImage: ""
    };
  },
  mounted() {
    // 获取个人信息
    const data = {
      userId: window.localStorage.getItem("userID")
    };
    set(data).then(res => {
      if (res.code == 1) {
        const data = res.data;
        data.avatar = global() + data.avatar;
        this.avatarImage = data.avatar;
        this.valueName = data.name;
        if (data.sex == 1) {
          this.sex = "男";
        } else {
          this.sex = "女";
        }
        this.obj_data = data;
        this.userPhone = data.phone;
      }
    });
  },

  methods: {
    // 修改男女性别
    onConfirmSex(value, index) {
      const data = {
        userId: window.localStorage.getItem("userID"),
        sex: index + 1
      };
      upUser(data).then(res => {
        if (res.code == 1) {
          this.sex = value;
        }
        this.$toast(res.msg);
      });
      this.showPicker = false;
    },

    // 点击修改昵称
    onConfirmName() {
      this.valueName = this.valueInput;
      const data = {
        userId: window.localStorage.getItem("userID"),
        name: "",
        name: this.valueName
      };
      upUser(data).then(res => {
        console.log(res);
        this.$toast(res.msg);
      });
      this.dialogShow = false;
    },

    // 上传头像
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      var fData = new FormData();
      fData.append("file", file.file);
      this.$toast.loading({
        mask: true,
        message: "加载中..."
      });

      upFile(fData).then(res => {
        this.$toast(res.msg);
        this.avatarImage = global() + res.data;

        const data = {
          userId: window.localStorage.getItem("userID"),
          avatar: res.data
        };

        // 头像上传
        avatarPost(data).then(res => {});
      });
    },
    // 修改个人信息
    setUpUser() {
      const data = {
        userId: window.localStorage.getItem("userID"),
        name: this.valueName,
        sex: this.sex
      };
      upUser(data).then(res => {
        console.log(res);
        this.$toast(res.msg);
      });
    }
  }
};
</script>

<style lang="scss">
.info {
  width: 100vw;
  min-height: 100vh;
  .avatar {
    position: relative;
  }

  .van-uploader {
    position: absolute;
    top: 2vw;
    right: 8vw;
    width: 60vw;
  }

  .van-uploader__input-wrapper {
    width: 100%;
    text-align: end;
  }

  .van-image {
    width: 12vw;
    height: 12vw;
    margin-right: 2vw;
  }

  .van-cell {
    padding: 0.5rem 0.4rem;
  }
}
</style>