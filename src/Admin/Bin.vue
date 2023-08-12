<template>
    <div class="d-flex flex-row">
        <div>
            <Menu></Menu>
        </div>
        <div class="form-bin container">
            <ul class="list-group text-center">
                <li class="list-group-item active">Thùng rác</li>
            </ul>
            <div class="text-center text-empty" v-if="Student.length == 0">
                <h4>Thùng rác rỗng. <router-link to="/admin/home">Quay lại</router-link></h4>
            </div>
            <div v-if="Student.length > 0">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">TT</th>
                            <th scope="col">Họ và Tên</th>
                            <th scope="col">Ngày Tháng Năm Sinh</th>
                            <th scope="col">Giới Tính</th>
                            <th scope="col">SĐT</th>
                            <th scope="col">Khôi Phục</th>
                            <th scope="col">Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in Student" :key="index">
                            <td>
                                {{ index + 1 }}
                            </td>
                            <td>
                                {{ item.fullname }}
                            </td>
                            <td>
                                {{ formatDate(item.namsinh) }}
                            </td>
                            <td>
                                {{ item.gioitinh }}
                            </td>

                            <td>
                                {{ item.phone }}
                            </td>
                            <td style="cursor: pointer;" @click="() => { restore(item) }">
                                <img src="../img/restore.png" class="edit-img" alt="">
                            </td>

                            <td>
                                <button class="bottom-delete dl" data-toggle="modal" @click="e => { copyId(item) }"
                                    data-target="#exampleModal"><img class="edit-img " src="../img/bin.png" alt=""></button>
                            </td>
                        </tr>


                        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
                            aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Xóa người dùng</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        Bạn chắc chắn xóa vĩnh viễn học sinh này?
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-danger" @click="deletedStudent()">Xóa vĩnh
                                            viễn</button>
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import moment from 'moment'
import Menu from '../components/Menu.vue'
export default {
    components: {
        Menu
    },
    data() {
        return {
            Student: [{}],
            id: '',

        }
    },
    created() {
        axios.get(`https://htqlthpt.onrender.com/bin/student/show`)
            .then(res => {
                this.Student = res.data
            })
            .catch(err => {
                console.log(err);
            })
    },
    methods: {
        formatDate(date) {
            return moment(date).format('DD-MM-YYYY');
        },

        copyId(user) {
            this.id = user._id
        },

        restore(user) {
            axios.put(`https://htqlthpt.onrender.com/bin/restore/student/${user._id}`)
                .then(() => {
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err);
                })
        },
        deletedStudent() {
            axios.delete(`https://htqlthpt.onrender.com/bin/delete/student/${this.id}`)
                .then(() => {
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
}
</script>
<style scoped>

.form-bin{
    width: 100%;
}
.edit-img {
    width: 30px;
}

.list-group-item {

    font-weight: 700;
    font-size: larger;
    text-transform: uppercase;
}

.text-empty {
    margin-top: 20px;
}

.dl {
    border: none;
}
</style>