<template>
    <div class="d-flex flex-row">
        <div>
            <Menu></Menu>
        </div>
        <div v-if="Teacher.form_teacherID != undefined" class="form-DGHK container">
            <form method="PUT" @submit.prevent="">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>TT</th>
                            <th>Họ & Tên</th>
                            <th>Mã số</th>
                            <th>Nội dung đánh giá</th>
                            <th>Đánh giá</th>
                        </tr>
                    </thead>
                    <tbody v-for="(item, index) in Student" :key="index">
                        <tr>
                            <td>{{ index + 1 }}</td>
                            <td><b>{{ item.fullname }}</b></td>
                            <td>{{ item.username }}</td>
                            <td><textarea name="" title="Xem nội dung đánh giá" id="" cols="20"
                                    placeholder="Chưa có đánh giá" rows="2" style="color: red; cursor: no-drop;"
                                    disabled>{{ item.resultID.conduct }}</textarea></td>
                            <td>
                                <button type="button" @click="copyID(item)" title="Nhập vào đánh giá"
                                    class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                                    Đánh giá
                                </button>
                            </td>
                            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
                                aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Đánh giá hạnh kiểm học sinh</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="d-flex flex-row">
                                                <div class="mr-3">Nhập nội dung đánh giá: </div>
                                                <textarea style="color: red;" name="" id="" cols="30" rows="3"
                                                    v-model="this.resultID.conduct"></textarea>
                                            </div>

                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary"
                                                data-dismiss="modal">Close</button>
                                            <button type="button" @click="submitID()" class="btn btn-primary">Save
                                                changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Menu from '../components/Menu.vue'
export default {
    components:{
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
        copyID(userID) {
            this.ID = userID.resultID._id
            axios.get(`https://htqlthpt.onrender.com/scores/show/summary/${this.ID}`)
                .then(res => {
                    this.resultID = res.data
                })
                .catch(err => {
                    console.log(err);
                })
        },
        submitID() {

            axios.put(`https://htqlthpt.onrender.com/scores/update/summary/${this.ID}`, this.resultID)
                .then(() => {
                    window.location.reload()
                })
                .catch(err => {
                    console.log(err);
                })
        }
    },

}
</script>
<style scoped>

.form-DGHK{
    width: 100%;
}

</style>