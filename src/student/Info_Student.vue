<template>
    <div class="container">
        <div class="text-center info-user mt-3">
            Thông tin học sinh
        </div>
        <div class="d-flex flex-row mt-3">
            <div>
                <img v-if="this.Student.gioitinh == 'Nam' && this.Student.avatar ==undefined" class="img-avatar" src="../img/img_avatar3.png" alt="AVATAR">
                <img v-if="this.Student.gioitinh == 'Nữ' && this.Student.avatar== undefined"  class="img-avatar" src="../img/img_avatar2.png" alt="AVATAR">
                <img class="img-avatar"  :src="this.Student.avatar" alt="">
                <div class="mt-4">
                    <ul class="list-group">
                        <li class="li-teacher title-cn">
                            Thông tin chủ nhiệm
                        </li>
                        <li class="li-teacher">
                            Họ & tên GV:  <i>{{ Teacher.fullname }}</i>
                        </li>
                        <li class="li-teacher">
                            SĐT: {{ Teacher.phone }}
                        </li>
                        <li class="li-teacher">
                            Email: {{ Teacher.email }}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="ml-3">
                <ul class="list-group list-form">
                    <li class="list-group-item active text-center">Thông tin cá nhân</li>
                    <li class="list-group-item">Họ & tên: <b class="name-student1">{{ Student.fullname }}</b> </li>
                    <li class="list-group-item">MSHS: {{ Student.username }} </li>
                    <li class="list-group-item">Giới tính: {{ Student.gioitinh }}</li>
                    <li class="list-group-item">Ngày tháng năm sinh: {{ formatDate(Student.namsinh) }}</li>
                    <li class="list-group-item">SĐT: {{ Student.phone }}</li>
                    <li class="list-group-item">Lớp: {{ Student.myclassID.nameclass }}</li>
                    <li class="list-group-item">Địa chỉ:<br> Tỉnh/TP: {{ Student.tp }} <br>
                        Quận/Huyện: {{ Student.huyen }} <br>
                        Phường/Xã: {{ Student.xa }}
                    </li>

                </ul>
            </div>

            <div class="ml-3">
                <ul class="list-group list-form">
                    <li class="list-group-item active text-center">Thông tin gia đình</li>
                    <li class="list-group-item">Họ & tên Cha: <b class="name-student1">{{ Student.father }}</b> </li>
                    <li class="list-group-item">SĐT cha: {{ Student.phoneFather }} </li>
                    <li class="list-group-item">Họ & tên Mẹ: <b class="name-student1">{{ Student.mother }}</b></li>
                    <li class="list-group-item">SĐT mẹ: {{ Student.phoneMother }}</li>
                    <li class="list-group-item">Địa chỉ:<br> Tỉnh/TP: {{ Student.tp }} <br>
                        Quận/Huyện: {{ Student.huyen }} <br>
                        Phường/Xã: {{ Student.xa }}
                    </li>

                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import moment from 'moment';
export default {
    data() {
        return {
            Teacher: {},
            Student: {
                myclassID: {
                    nameclass:''
                }
            },
        }
    },
    created() {
        this.id = JSON.parse(localStorage.getItem('user'))._id
        axios.get(`http://localhost:3000/student/infostudent/${this.id}`)
            .then(res => {
                this.Student = res.data
                axios.get(`http://localhost:3000/teacher/show/${this.Student.myclassID.organizer}`)
                    .then(res => {
                        this.Teacher = res.data
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
    width: 400px;
}

.name-student1 {
    text-transform: uppercase;
}

.li-teacher{
    padding: 10px;
    list-style: none;
    border:1px solid black;
}

.title-cn{
    font-size: medium;
    font-weight: 600;
    text-align: center;
}
</style>