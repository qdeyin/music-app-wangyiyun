<template>
    <div class="LoginPage">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
            <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <div class="Login">
            <div class="LoginTop">
                欢迎登录
            </div>
            <div class="LoginContent">
                <input type="text" name="email" class="phone" v-model="email" placeholder="请输入邮箱" />
                <input type="password" name="password" class="password" v-model="password" placeholder="请输入密码">
                <button class="btn" @click="Login">登录</button>
            </div>
        </div>
    </div>

</template>
<script>
export default {
    data() {
        return {
            email: '', //邮箱
            password: '', //输入密码
        }
    },
    methods: {
        Login: async function () {
            let res = await this.$store.dispatch('getLogin', { email: this.email, password: this.password })
            console.log(res);
            // if (reFs.data.code === 200) {//如果返回的code等于200，说明登录成功，就跳转个人中心页面
            //     this.$store.commit('updateIsLogin', true)
            //     this.$store.commit('updateToken', res.data.token)
            //     let result = await getLoginUser(res.data.account.id)
            //     console.log(result);
            //     this.$store.commit('updateUser', result)
            //     this.$router.push('/infoUser')
            // } else {
            //     alert("手机号码或者密码错误")
            //     this.password = ''
            // }
        }
    }
}
</script>
<style lang="less" scoped>
.LoginPage {
    width: 100%;
    height: 13.34rem;
    padding: .2rem;
    background-color: pink;

    .Login {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-items: center;

        .LoginTop {
            width: 100%;
            margin-top: 2rem;
            font-size: .6rem;
            font-weight: 700;
            text-align: center;
        }

        .LoginContent {
            width: 100%;
            height: 2rem;
            margin-top: 1rem;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;

            .phone,
            .password {
                width: 80%;
                height: 0.6rem;
                border: 0.02rem solid #999;
            }

            .btn {
                width: 1.2rem;
                height: .6rem;
            }
        }

    }
}
</style>