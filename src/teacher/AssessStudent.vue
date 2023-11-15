<template>
    <div class="d-flex flex-row">
        <div>
            <Menu></Menu>
        </div>
        <div v-if="Teacher.form_teacherID != undefined" class="form-DGHK container">
            <div class="text-title">
                <h2>ĐÁNH GIÁ HẠNH KIỂM HỌC SINH</h2>
            </div>
            <form method="PUT">
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
                            <td><textarea name="" title="Nội dung đánh giá" id="" cols="20" placeholder="Chưa có đánh giá"
                                    rows="2" style="color: red; cursor: no-drop;"
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
                                                <textarea placeholder="Nội dung..." style="color: red;" name="" id="" cols="30" rows="3"
                                                    v-model="this.resultID.conduct"></textarea>
                                            </div>
                                            <div class="danhgia mt-4 mr-3" >
                                                Chọn loại đánh giá:
                                            </div>
                                            <select class="danhgia mt-2 danhgia_select" v-model="this.resultID.rank_conduct" required="true">
                                                <option selected value="">--Chọn đánh giá--</option>
                                                <option value="Tốt">Loại Tốt</option>
                                                <option value="Khá">Loại Khá</option>
                                                <option value="Trung Bình">Loại Trung Bình</option>
                                                <option value="Yếu">Loại Yếu</option>
                                            </select>
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
    components: {
        Menu
    },
    data() {
        return {
            Teacher: {},
            Temp: [],
            Student: [],
            ID: '',
            resultID: {
                rank_conduct:''
            },
        }
    },

    created() {
        this.id = JSON.parse(localStorage.getItem('user'))._id
        axios.get(`http://localhost:3000/teacher/class-student/${this.id}`)
            .then(res => {
                this.Teacher = res.data
                this.Temp = this.Teacher.form_teacherID.students
                if (this.Teacher.form_teacherID != undefined) {
                    for (let index = 0; index < this.Temp.length; index++) {
                        axios.get(`http://localhost:3000/student/infostudent/${this.Temp[index]}`)
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
            console.log(this.ID);
            axios.get(`http://localhost:3000/scores/show/summary/${this.ID}`)
                .then(res => {
                    this.resultID = res.data
                })
                .catch(err => {
                    console.log(err);
                })
        },
        submitID() {
            axios.put(`http://localhost:3000/scores/update/summary/${this.ID}`, this.resultID)
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
.form-DGHK {
    width: 100%;
}

.text-title h2 {
    color: #fff;
    background-color: #042954;
    padding: 10px 10px;
    text-align: center;
    margin-bottom: 10px;
    text-transform: uppercase;
}

.danhgia_select{
    margin-left: 39px;
}

.danhgia{
    display: inline-block;
}
</style>