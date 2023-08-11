<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light header-nav  mb-2 p-5">
            <!-- <a class="navbar-brand" href="#"><img class="logo" src="../img/logo.jpg" alt=""></a> -->
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto"> 
                    <div class="form-inline my-2 my-lg-0 ">
                        <div class="dropdown">
                            <a href="#" class="dropdown-toggle" id="dropdownMenuButton"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <vue-avatar class="mr-2" v-if="this.Student.avatar == undefined"
                                    :username="this.nameavatar" />
                                <img class="mr-2" v-if="this.Student.avatar != undefined" style="border-radius: 50%;  height: 4em;
                                width: 3.5em;" :src="this.Student.avatar" alt="">
                            </a>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <router-link class="dropdown-item" v-if="this.Student.role=='HS'" :to="`/student/info/${id}`">Xem thông tin</router-link>
                                <label class="dropdown-item" style="cursor: pointer;" for="avata">Cập nhật ảnh đại diện</label>
                                <input type="file" id="avata" style="display: none;" accept="image/jpeg"
                                    @change=uploadImage>
                                <router-link class="dropdown-item" :to="`/changepassword/${id}`"> Đổi mật khẩu</router-link>
                                <a class="dropdown-item"  @click="logout()" href="#">Đăng xuất</a>
                            </div>
                        </div>
                        <li>
                            <span class="form-control mr-sm-2" v-if="this.Student.role=='HS'">
                                <h6> Hi, <span class="name-student">{{ this.name }}</span></h6>
                            </span>
                            <span class="form-control mr-sm-2" v-if="this.Student.role=='AD'">
                                <h6> Admin, <span class="name-student">{{ this.name }}</span></h6>
                            </span>
                        </li>
                    </div>
                </ul>
            </div>
        </nav>
    </div>
</template>
<script>

export default {
    data() {
        return {
            name: '',
            nameavatar: '',
            gt:'',
            admin:'',
            id:'', 
            Student:{
                avatar:''
            }
        }
    },
    mounted() {
        this.id = JSON.parse(localStorage.getItem('user'))._id
        this.admin = JSON.parse(localStorage.getItem('user')).isAdmin
        this.gt = JSON.parse(localStorage.getItem('user')).gioitinh
        this.name = JSON.parse(localStorage.getItem('user')).fullname
        let a = this.removeAccents(this.name)
        const temp = a.split(' ');
        this.nameavatar = temp[temp.length - 1]
    },

    created() {
        this.id = JSON.parse(localStorage.getItem('user'))._id
        axios.get(`http://localhost:3000/student/infostudent/${this.id}`)
            .then(res => {
                this.Student = res.data
            })
            .catch(err => {
                console.log(err);
            })
    },
    methods: {
        logout() {
            localStorage.clear()
            this.$router.replace({ path: '/login' })
        },
        removeAccents(str) {
            return str.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/đ/g, 'd').replace(/Đ/g, 'D');
        },
        uploadImage(e) {
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e => {
                this.Student.avatar = e.target.result;
                //console.log(this.previewImage);
                axios.put(`http://localhost:3000/student/edit/${this.id}`, this.Student)
                .then(() => {
                    window.location.reload()
                },)
                .catch(err => {
                    console.log(err)
                });
            };
        }

    }
}
</script>

<style scoped>
.form-inline {
    position: absolute;
    right: 10px;
    top: 30px;
}

.header-nav {
    background: url(../bg-school.jpg);
}

.logo {
    width: 120px;
    border-radius: 100%;
}

.name-student {
    color: crimson;
}


.dropdown-toggle::after{
    content: none;
}

</style>