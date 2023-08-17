<template>
    <div class="d-flex flex-row">
        <div>
            <Menu></Menu>
        </div>
        <div class="container">
            <div class="text-center info-user mt-3">
                Thông tin giáo viên
            </div>
            <div class="d-flex flex-row mt-3">
                <div>
                    <img v-if="this.Teacher.sex == 'Nam' && this.Teacher.avatar ==undefined" class="img-avatar" src="../img/img_avatar3.png" alt="AVATAR">
                    <img v-if="this.Teacher.sex == 'Nữ' && this.Teacher.avatar == undefined" class="img-avatar" src="../img/img_avatar2.png" alt="AVATAR">
                    <img class="img-avatar"  :src="this.Teacher.avatar" alt="">
                </div>
                <div class="ml-3">
                    <ul class="list-group list-form">
                        <li class="list-group-item active text-center">Thông tin cá nhân</li>
                        <li class="list-group-item">Họ & tên: <b class="name-Teacher1">{{ Teacher.fullname }}</b> </li>
                        <li class="list-group-item">MSGV: {{ Teacher.username }} </li>
                        <li class="list-group-item">Giới tính: {{ Teacher.sex }}</li>
                        <li class="list-group-item">Ngày tháng năm sinh: {{ formatDate(Teacher.birth) }}</li>
                        <li class="list-group-item">SĐT: {{ Teacher.phone }}</li>
                        <li class="list-group-item">Địa chỉ:<br> Tỉnh/TP: {{ Teacher.tp }} <br>
                            Quận/Huyện: {{ Teacher.huyen }} <br>
                            Phường/Xã: {{ Teacher.xa }}
                        </li>

                    </ul>
                </div>
                <div class="ml-3">
                    <ul class="list-group list-form">
                        <li class="list-group-item active text-center">Thông tin chuyên môn</li>
                        <li class="list-group-item"> Môn giảng dạy: {{ Teacher.subject }}</li>
                        <li class="list-group-item">Phụ trách giảng dạy:
                            <div v-for="(item, index) in Teacher.classID" :key="index">
                                Lớp {{ item.nameclass }}
                            </div>
                        </li>
                        <li class="list-group-item" v-if="CN.nameclass != undefined">Phụ trách chủ nhiệm: {{ CN.nameclass }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import moment from 'moment';
import Menu from '../components/Menu.vue'
export default {
    components: {
        Menu
    },
    data() {
        return {
            Teacher: {},
            CN: {},

        }
    },
    created() {
        this.id = JSON.parse(localStorage.getItem('user'))._id
        axios.get(`https://htqlthpt.onrender.com/teacher/show/${this.id}`)
            .then(res => {
                this.Teacher = res.data
                axios.get(`https://htqlthpt.onrender.com/class/info/${this.Teacher.form_teacherID._id}`)
                    .then(res => {
                        this.CN = res.data
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                console.log(err, 'err');
            })
    },

    methods: {
        formatDate(date) {
            return moment(date).format('DD-MM-YYYY');
        },
    },

}
</script>
<style scoped>
.img-avatar {
    width: 250px;
    border-radius: 5px;
}

.info-user {
    text-align: center;
    text-transform: uppercase;
    font-family: Arial, Helvetica, sans-serif;
    font-size: x-large;
    font-weight: 600;
}

.list-form {
    width: 300px;
}

.name-Teacher1 {
    text-transform: uppercase;
}

.li-teacher {
    padding: 10px;
    list-style: none;
    border: 1px solid black;
}

.title-cn {
    font-size: medium;
    font-weight: 600;
    text-align: center;
}
</style>