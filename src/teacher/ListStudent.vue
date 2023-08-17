<template>
    <div v-if="Teacher.form_teacherID != undefined" class="d-flex flex-row">
        <div>
            <Menu></Menu>
        </div>
        <div class="table-hs container">
            <div class="text-title">
                <h2>Danh sách học sinh</h2>
            </div>
            <div>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>TT</th>
                            <th>Họ & Tên</th>
                            <th>Mã số</th>
                            <th>Giới tính</th>
                            <th>Ngày sinh</th>
                            <th>Ghi chú</th>
                        </tr>
                    </thead>
                    <tbody v-for="(item, index) in Student" :key="index">
                        <tr>
                            <td>{{ index + 1 }}</td>
                            <td><b>{{ item.fullname }}</b></td>
                            <td>{{ item.username }}</td>
                            <td>{{ item.gioitinh }}</td>
                            <td>{{ formatDate(item.namsinh) }}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Menu from '../components/Menu.vue'
import moment from 'moment'
export default {
    components: {
        Menu
    },
    data() {
        return {
            Teacher: {},
            Temp: [],
            Student: [],
            ID: '',
            resultID: {},
        }
    },

    created() {
        this.id = JSON.parse(localStorage.getItem('user'))._id
        axios.get(`https://htqlthpt.onrender.com/teacher/class-student/${this.id}`)
            .then(res => {
                this.Teacher = res.data
                this.Temp = this.Teacher.form_teacherID.students
                if (this.Teacher.form_teacherID != undefined) {
                    for (let index = 0; index < this.Temp.length; index++) {
                        axios.get(`https://htqlthpt.onrender.com/student/infostudent/${this.Temp[index]}`)
                            .then(res => {
                                this.Student.push(res.data)
                            })
                            .catch(err => {
                                console.log(err, "err");
                            })
                    }
                }
            })
            .catch(err => {
                console.log(err);
            })
    },
    methods: {
        formatDate(date) {
            return moment(date).format('DD-MM-YYYY');
        },
    }

}
</script>
<style scoped>
.text-title h2 {
    color: #fff;
    background-color: #042954;
    padding: 10px 10px;
    text-align: center;
    margin-bottom: 10px;
    text-transform: uppercase;
}

.table-hs {
    width: 100%;
}
</style>