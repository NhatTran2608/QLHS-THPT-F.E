<template>
    <div>
        <HeaderTeacher></HeaderTeacher>
        <div class="d-flex flex-row">
            <div>
                <Menu></Menu>
            </div>
            <div class="form-infor mt-4 ml-4">
                <ul class="list-group">
                    <li class="list-group-item active text-center">Thông tin giáo viên</li>
                    <li class="list-group-item">Họ và tên: <span class="infor-student">{{ Teacher.fullname }}</span>
                    </li>
                    <li class="list-group-item">Ngày tháng năm sinh: <span class="infor-student"> {{
                        formatDate(Teacher.birth)
                    }}</span></li>
                    <li class="list-group-item">Giới tính: <span class="infor-student">{{ Teacher.sex }}</span></li>
                    <li class="list-group-item">SĐT: <span class="infor-student">{{ Teacher.phone }}</span></li>
                    <li class="list-group-item">CMND/CCCD: <span class="infor-student">{{ Teacher.cccd }} </span> </li>
                    <li class="list-group-item">Tỉnh/Thành: <span class="infor-student">{{ Teacher.tp }}</span> <br>
                        Huyện/Quận:
                        <span class="infor-student">{{ Teacher.huyen }}</span> <br> Xã/Phường: <span
                            class="infor-student">{{ Teacher.xa
                            }}</span>
                    </li>
                </ul>
            </div>

            <div class="item form-infor">
                <div>
                    <div class="d-flex flex-row-reverse">
                        <div class="p-4 item-flex"><router-link class="option-home" :to="`/teacher/timetable`">
                                <img class="img-home" src="../img/TKB.png" alt=""><br>Lịch giảng dạy</router-link>
                        </div>
                        <div class="p-4 item-flex"><router-link class="option-home" to="/teacher/upload-file"> <img
                                    class="img-home" src="../img/folders.png" alt=""><br>Tài liệu giảng dạy</router-link>
                        </div>
                        <div class="p-4 item-flex"><router-link class="option-home" to="/teacher/gradebook"> <img
                                    class="img-home" src="../img/exam.png" alt=""><br>Sổ điểm</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import HeaderTeacher from '../components/HeaderTeacher.vue'
import Menu from '../components/Menu.vue'
import moment from 'moment';
export default {
    components: {
        HeaderTeacher, Menu
    },
    data() {
        return {
            Teacher: {},
            GVCN: ''
        }
    },
    created() {
        const id = JSON.parse(localStorage.getItem('user'))._id
        this.GVCN = JSON.parse(localStorage.getItem('user')).form_teacherID
        localStorage.removeItem('g')
        localStorage.removeItem('k')
        localStorage.removeItem('tb')
        localStorage.removeItem('dtb')
        axios.get(`http://localhost:3000/teacher/show/${id}`)
            .then(res => {
                this.Teacher = res.data
            })
            .catch(err => console.log(err))
    },

    methods: {
        formatDate(date) {
            return moment(date).format('DD-MM-YYYY');
        },

        checkCN() {
            if (this.GVCN == undefined) {
                alert('Chức năng này dành cho GVCN')
                this.$router.replace({ path: `/teacher/home` })
            }
        }
    }
}
</script>
<style scoped>
.infor-student {
    text-transform: uppercase;
    font-weight: bold;

}

.img-home {
    width: 100px;
}

.option-home {
    text-decoration: none;
    color: #3f3f3f;
}

.infor-home .form-infor:nth-child(1) {
    display: inline-block;
    text-align: start;
    width: 40%;
}

.infor-home .form-infor:nth-child(2) {

    width: 40%;
}

.infor-home .form-infor:nth-child(3) {
    text-align: end;
    width: 40%;
}

.option-home:hover {
    color: #000;
    text-decoration: none;
}

.item-flex {
    text-align: center;
}

.infor-home {
    margin-left: 10%;
    margin-right: 10%;
}

.item {
    position: absolute;
    top: 160px;
    right: 26px;
}
</style>