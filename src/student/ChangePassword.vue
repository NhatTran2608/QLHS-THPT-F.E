<template>
    <div class="d-flex flex-row">
        <div>
            <Menu></Menu>
        </div>

        <div class="container text-center">
            <div><Header></Header></div>
            <div class="mt-5">
                <h3>
                    ĐỔI MẬT KHẨU
                </h3>
            </div>
            <form method="PUT" @submit.prevent="ChangePasswoed()">
                <div class="password">
                    <input type="password" name="" id="pass" required="true" placeholder="Nhập mật khẩu hiện tại" :minlength="6"
                        v-model="this.Student.temp">
                </div>
                <div class="password">
                    <input type="password" name="" id="changepass" placeholder="Nhập mật khẩu mới"
                        v-model="this.Student.password" required="true" :minlength="6">
                    <div v-if="this.ChangePassword.pw == '' && this.Student.password == ''
                        || this.ChangePassword.pw == '' && this.Student.password != ''">
                    </div>
                    <span class="checkF" v-else-if="this.Student.password != this.ChangePassword.pw"><i
                            class="fas fa-times"></i></span>
                    <span class="checkS" v-else-if="this.Student.password == this.ChangePassword.pw"><i
                            class="fas fa-check"></i></span>

                </div>
                <div class="password">
                    <input type="password" name="" id="respass" placeholder="Nhập lại mật khẩu mới"
                        v-model="this.ChangePassword.pw" required="true" :minlength="6">
                    <div v-if="this.ChangePassword.pw == '' && this.Student.password == ''
                        || this.ChangePassword.pw == '' && this.Student.password != ''">
                    </div>
                    <span class="checkF" v-else-if="this.Student.password != this.ChangePassword.pw"><i
                            class="fas fa-times"></i></span>
                    <span class="checkS" v-else-if="this.Student.password == this.ChangePassword.pw"><i
                            class="fas fa-check"></i></span>
                </div>
                <button class="mt-3 btn btn-primary">Cập nhật</button>
            </form>
        </div>

    </div>
</template>
<script>
import axios from 'axios';
import Menu from '../components/Menu.vue'
import Header from '../components/Header.vue'
export default {
    components: {
        Menu, 
        Header
    },
    data() {
        return {
            PassWord: '',
            Student: {
                password: '',
                temp: '',
                changepass: ''
            },
            ChangePassword: {
                pw: '',
                MK: ''
            },

        }
    },

    created() {
        this.id = JSON.parse(localStorage.getItem('user'))._id
        axios.get(`http://localhost:3000/student/infostudent/${this.id}`)
            .then(res => {
                this.Student = res.data
                this.Student.changepass = this.Student.password
                this.Student.password = ''

            })
            .catch(err => {
                console.log(err);
            })
    },
    methods: {

        ChangePasswoed() {
            if (this.Student.password == this.ChangePassword.pw) {
                axios.patch(`http://localhost:3000/auth/changePassword/${this.id}`, this.Student)
                    .then(() => {
                        window.location.reload()
                        alert("Success!!!")
                    })
                    .catch(err => {
                        console.log(err);
                        window.location.reload()
                        alert(err.response.data.mes)
                    })

            }

        },

    }
}
</script>
<style scoped>
.password {
    margin-top: 5px;

}

.checkS {
    color: blue;
    position: absolute;
    margin-top: 18px;
    margin-left: 10px;
}
.checkF {
    color: red;
    position: absolute;
    margin-top: 18px;
    margin-left: 10px;

}

.password input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid;
}

.password input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid;
}
</style>