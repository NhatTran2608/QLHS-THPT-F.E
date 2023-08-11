<template>
    <div>
        <!-- <div class="text-center mt-5" v-if="Class.students.length === 0">
            <h3> DANH SÁCH TRỐNG. <router-link to="/create/class">Quay lại</router-link></h3>
        </div> -->

        <div class="container">
            <ul class="list-group text-center">
                <li class="list-group-item active  ">Danh sách học sinh lớp {{ Class.nameclass }}</li>

            </ul>
            <div>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">TT</th>
                            <th scope="col">Họ và Tên</th>
                            <th scope="col">Ngày Tháng Năm Sinh</th>
                            <th scope="col">Giới Tính</th>
                            <th scope="col">SĐT</th>
                            <th scope="col">Sửa</th>
                            <th scope="col">Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in Class.students" :key="index">
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
                            <td style="cursor: pointer;">
                                <router-link :to="'/admin/edit/student/'+ item._id"> <img src="../img/edit.png" class="edit-img"
                                        alt=""></router-link>

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
                                        Bạn chắc chắn xóa học sinh này?
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-danger" @click="deletedStudent()">Xóa</button>
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
import moment from 'moment';
export default {
   
    data() {
        return {
            Class: {},
            id: this.$route.params.id,
            cpid: '',
        }
    },
    created() {
        axios.get(`http://localhost:3000/class/info/${this.id}`)
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
        },

        copyId(user) {
            this.cpid = user._id
        },
        deletedStudent() {
            axios.delete(`http://localhost:3000/student/bin/deleted/${this.cpid}`)
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
.list-group {
    text-transform: uppercase;
    font-size: larger;
    font-weight: 900;
    border-radius: 0;
}

.edit-img {
    width: 30px;
}

.dl {
    border: none;
}
</style>