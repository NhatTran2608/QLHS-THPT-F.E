<template>
    <div>
        <Header></Header>
        <div class="d-flex flex-row">
            <div>
                <Menu></Menu>
            </div>

            <div class="form-infor mt-4 ml-4">
                <ul class="list-group">
                    <li class="list-group-item active text-center">Thông tin học sinh</li>
                    <li class="list-group-item">Họ và tên: <span class="infor-student">{{ Student.fullname }}</span>
                    </li>
                    <li class="list-group-item">Ngày tháng năm sinh: <span class="infor-student"> {{
                        formatDate(Student.namsinh)
                    }}</span></li>
                    <li class="list-group-item">Lớp: <span class="infor-student">{{ Class.nameclass }}</span></li>
                    <li class="list-group-item">SĐT: <span class="infor-student">{{ Student.phone }}</span></li>
                    <li class="list-group-item">CMND/CCCD: <span class="infor-student">{{ Student.cccd }} </span> </li>
                    <li class="list-group-item">Tỉnh/Thành: <span class="infor-student">{{ Student.tp }}</span> <br>
                        Huyện/Quận:
                        <span class="infor-student">{{ Student.huyen }}</span> <br> Xã/Phường: <span
                            class="infor-student">{{ Student.xa
                            }}</span>
                    </li>
                </ul>
            </div>

            <div class="item form-infor">
                <div>
                    <div class="d-flex flex-row-reverse">
                        <div class="p-4 item-flex"><router-link class="option-home" to="#"> <img class="img-home"
                                    src="../img/TKB.png" alt=""><br>Thời khóa biểu</router-link></div>
                        <div class="p-4 item-flex"><router-link class="option-home" to="#"> <img class="img-home"
                                    src="../img/law-book.png" alt=""><br>Đánh giá của GV</router-link></div>
                        <div class="p-4 item-flex"><router-link class="option-home" :to="`/student/result/${this.id}`">
                                <img class="img-home" src="../img/score.png" alt=""><br>Kết quả học tập</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Header from '@/components/Header.vue'
import Menu from "../components/Menu.vue"
import moment from 'moment';
export default {
    components: {
        Header, Menu
    },
    data() {
        return {
            Student: {},
            id: '',
            Class: ''
        }
    },
    created() {
        this.id = JSON.parse(localStorage.getItem('user'))._id
        // console.log(id)
        axios.get(`https://htqlthpt.onrender.com/student/infostudent/${this.id}`)
            .then(res => {
                this.Student = res.data
            })
            .catch(err => console.log(err))
        this.idclass = JSON.parse(localStorage.getItem('user')).myclassID
        axios.get(`https://htqlthpt.onrender.com/class/info/${this.idclass}`)
            .then(res => {
                this.Class = res.data
            })
            .catch(err => {
                console.log(err);
            })
    },

    methods: {
        formatDate(date) {
            return moment(date).format('DD-MM-YYYY');
        }
    }
}
</script>
<style scoped>
.infor-student {
    text-transform: uppercase;
    font-weight: bold;

}



/* .form-infor {

    position: absolute;
    left: 1;
    top: 1;
    width: 35%;
    height: 60%;
} */

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