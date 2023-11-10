<template>
    <div class="d-flex flex-row">
        <div>
            <Menu></Menu>
        </div>
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary upload-file" title="Tải tài liệu lên" data-toggle="modal"
            data-target="#exampleModalCenter">
            <i class="fas fa-upload"></i>
        </button>
        <!-- Modal -->
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div v-if="this.check == true" class="kinetic"></div>
                <form v-if="this.check == false" @submit.prevent="submitUpload()">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Tải tài liệu</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="text-center">
                                <div>
                                    <h4>
                                        Tải tài liệu học tập
                                    </h4>
                                </div>
                                <div class="container text-center">

                                    <input type="file" @change="upLoad" required="true"><br>
                                    <label for="nameDCM" class="mr-2">Tên tài liệu: </label>
                                    <input class="mt-3" id="nameDCM" type="text" placeholder="Nhập tên file tài liệu..."
                                        required="true" v-model="this.nameDocument"><br>
                                    <div><span><b>📌Chú ý: </b></span><span><i>Cần chuyển về file <b>.PDF</b> trước khi
                                                upload</i></span></div>
                                    <!-- <button class="mt-4 btn btn-upload"><i class="fa-solid fa-upload"></i></button> -->
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button class="btn btn-primary">Tải lên</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="form-document">
            <div class="text-center  mt-3">
                <h3>Danh sách tài liệu</h3>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">TT</th>
                        <th scope="col">Tên tài liệu</th>
                        <th class="text-center" scope="col">Link tài liệu</th>
                        <th scope="col">Chế độ xem</th>
                        <th class="text-center" scope="col">Xóa</th>
                    </tr>
                </thead>
                <tbody v-if="this.Teacher.lesson == 0">
                    <tr>
                        <td class="text-center" colspan="5">
                            <h5 class="mt-5">
                                Danh sách trống
                            </h5>
                        </td>
                    </tr>
                </tbody>
                <tbody v-for="(item, index) in this.Teacher.lesson" :key="index">
                    <tr>
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.nameDocument }}</td>
                        <td><i>{{ item.linkDoc[0] }}</i></td>
                        <td @click="openDoc(item._id)" class="text-center"><i title="Mở" type="button" data-toggle="modal"
                                data-target="#exampleModalLong" class="fas fa-folder-open"></i></td>
                        <td @click="removeDoc(item._id)">
                            <i class="fas fa-minus-circle"></i>
                        </td>
                    </tr>

                    <!-- Modal -->
                    <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog"
                        aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                        <div class="modal-dialog modal-showpdf" role="document">
                            <div class="modal-content show-modal">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLongTitle">{{ this.document.nameDocument }}</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <iframe width="1200" height="700" :src="this.document.linkDoc" frameborder="0"></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import Menu from '../components/Menu.vue'
import axios from 'axios';
export default {
    components: {
        Menu
    },
    data() {
        return {
            file: null,
            nameDocument: '',
            check: false,
            Teacher: {},
            id: '',
            document: {}
        };
    },

    created() {
        const id = JSON.parse(localStorage.getItem('user'))._id
        axios.get(`http://localhost:3000/teacher/show/${id}`)
            .then(res => {
                this.Teacher = res.data
            })
            .catch(err => {
                console.log(err);
            })
    },

    methods: {
        upLoad(e) {
            this.file = e.target.files[0]
        },
        async submitUpload() {
            const id = JSON.parse(localStorage.getItem('user'))._id
            let formData = new FormData()
            let blobFile = new Blob([this.file], { type: this.file.type })
            if (blobFile) {
                formData.append('file', blobFile, this.file.name)
                formData.append('valueName', this.nameDocument)
                console.log(formData);
                this.check = true
                let res = await axios.post(`http://localhost:3000/teacher/uploadFile/${id}`, formData)
                alert('Tải file thành công')
                this.check = false
                window.location.reload()
            }
        },

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
        removeDoc(e) {
            axios.delete(`http://localhost:3000/teacher/delete-Doc/${e}`)
                .then(() => {
                    window.location.reload()
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
};
</script>

<style scoped>
.fa-minus-circle {
    cursor: pointer;
    color: red;
}

.modal-showpdf {
    margin: 0;
}

.show-modal {
    width: 1024px;
    height: 800px;
}

.upload-file {
    position: absolute;
    top: 0;
    right: 0;
}

.form-document {
    width: 100%;
}

.modal-content {
    width: 170%;
}

.show-modal {
    width: 245%;
}

:root {
    --primary-color: #181625;
    --accent-pink: #a876aa;
    --accent-white: #e2e7ee;
}

* {
    box-sizing: border-box;
}

body {
    background-color: var(--primary-color);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    overflow: hidden;
    margin: 0;
}

.kinetic {
    margin: auto;
    position: relative;
    height: 80px;
    width: 80px;
}

.fa-folder-open {
    color: blue;
    cursor: pointer;
}

.kinetic::before,
.kinetic::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    border: 50px solid transparent;
    border-bottom-color: var(--accent-pink);
    animation: rotateA 2s ease-in-out infinite 0.5s,
        color-change 2s ease-in-out infinite 1s;
}

.kinetic::before {
    animation: rotateB 2s ease-in-out infinite,
        color-change 2s ease-in-out infinite;
}

@keyframes rotateA {

    0%,
    25% {
        transform: rotate(0deg);
    }

    50%,
    75% {
        transform: rotate(180deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes rotateB {

    0%,
    25% {
        transform: rotate(90deg);
    }

    50%,
    75% {
        transform: rotate(270deg);
    }

    100% {
        transform: rotate(450deg);
    }
}

@keyframes color-change {
    75% {
        border-bottom-color: var(--accent-white);
    }
}
</style>