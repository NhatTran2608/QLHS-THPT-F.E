<template>
    <div class="d-flex flex-row">
        <div>
            <Menu></Menu>
        </div>
        <div class="container mt-2">
            <table class="table table-striped" v-for="(item, index) in this.TeacherAll" :key="index">
                <thead class="thead-dark">
                    <tr class="table-primary">
                        <td class="text-center" colspan="5">
                            <h5>Môn: {{ item.subject }}</h5>
                        </td>
                    </tr>
                    <tr>
                        <th scope="col">TT</th>
                        <th scope="col">Tên tài liệu</th>
                        <th scope="col">GV giảng dạy</th>
                        <th scope="col">Thời gian đăng tải</th>
                        <th scope="col">Mở</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="item.lesson.length < 1">
                        <td class="text-center" colspan="5">Chưa có tài liệu</td>
                    </tr>
                    <tr v-for="(i, indexz) in item.lesson.length" :key="indexz">
                        <th scope="row">{{ indexz + 1 }}</th>
                        <td><b><i>{{ item.lesson[indexz].nameDocument }}</i></b></td>
                        <td>{{ item.fullname }}</td>
                        <td><i>{{ timeCreact(item.lesson[indexz].createdAt) }}</i></td>
                        <td @click="openDoc(item.lesson[indexz]._id)"><i title="Mở" type="button" data-toggle="modal"
                                data-target="#exampleModalLong1" class="fas fa-folder-open"></i>
                        </td>
                    </tr>

                    <!-- Modal -->
                    <div class="modal fade" id="exampleModalLong1" tabindex="-1" role="dialog"
                        aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                        <div class="modal-dialog modal-showpdf" role="document">
                            <div class="modal-content show-modal">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLongTitle">{{ this.document.nameDocument
                                    }}
                                    </h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <iframe width="1150" height="700" :src="this.document.linkDoc" frameborder="0"></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </tbody>
            </table>
            <hr>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Menu from "../components/Menu.vue"
export default {
    components: {
        Menu
    },
    data() {
        return {
            Class: {},
            Teacher: {},
            document: {},
            TeacherAll: [
                // {
                //     lesson: [
                //         {
                //             nameDocument: '',
                //         }
                //     ]
                // }
            ]
        }
    },
    created() {
        this.idclass = JSON.parse(localStorage.getItem('user')).myclassID
        axios.get(`http://localhost:3000/class/info/${this.idclass}`)
            .then(res => {
                this.Class = res.data
                for (let index = 0; index < this.Class.teacher.length; index++) {
                    axios.get(`http://localhost:3000/teacher/show/${this.Class.teacher[index]._id}`)
                        .then(res => {
                            this.Teacher = res.data
                            this.TeacherAll.push(this.Teacher)
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }
            })
            .catch(err => {
                console.log(err);
            })
    },

    methods: {
        openDoc(e) {
            this.id = e
            axios.get(`http://localhost:3000/teacher/show-Document/${e}`)
                .then(res => {
                    this.document = res.data
                })
                .catch(err => {
                    console.log(err);
                })
        },
        timeCreact(time) {
            var dateTimeString = time;
            var dateTimeObject = new Date(dateTimeString);

            var options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
            var vietnameseDate = dateTimeObject.toLocaleDateString('vi-VN', options);
            return vietnameseDate
        }


    }
}
</script>
<style scoped>
.fa-folder-open {
    color: blue;
}

.modal-showpdf {
    margin: 0;
}

.show-modal {
    width: 1024px;
    height: 800px;
}


.modal-content {
    width: 240%;
}
</style>