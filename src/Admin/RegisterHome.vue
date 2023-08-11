<template>
    <div class="d-flex flex-row">

        <div>
            <Menu></Menu>
        </div>
        <div class="Userdk">
            <label class="dktk" title="Đăng ký tài khoản Giáo Viên" for="teacher">Đăng Ký Tài Khoản Giáo Viên</label><br>
            <input type="radio" name="register" class="registerUser" id="teacher" value="1" v-model="registeruser">
            <label class="dktk" title="Đăng ký tài khoản Học Sinh" for="student">Đăng Ký Tài Khoản Học Sinh</label>
            <input type="radio" name="register" class="registerUser" id="student" value="0" v-model="registeruser">
        </div>
        <div v-if="registeruser === '1'">
            {{ RegisterTecher() }}
        </div>
        <div v-if="registeruser === '0'">
            {{ RegisterStudent() }}
        </div>
    </div>
</template>
<script>
import Menu from '../components/Menu.vue'
export default {
    components:{
        Menu
    },
    data() {
        return {
            registeruser: ''
        }
    },
    methods: {
        RegisterTecher() {
            this.$router.push({ path: '/register/teacher' })
        },
        RegisterStudent() {
            this.$router.push({ path: '/register' })
        }

    }

}
</script>
<style scoped>
.registerUser {
    display: none;
}
.Userdk{
    
    margin: auto;
    text-align: center;
    margin-top: 20px;
}
.dktk{
    padding: 20px;
    background-color: green;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0px 5px 5px 0px #939191;
    margin-top: 20px;
    font-weight: 500;
}

.dktk:hover{
    color: red;
   
}
</style>