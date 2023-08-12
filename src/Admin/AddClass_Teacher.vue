<template>
    <div>
        <div class="container">
            <form method="post" @submit.prevent="addClass()">
                <div class="d-flex flex-row mt-5">
                    <div class="form-info">
                        <ul class="list-group">
                            <li class="list-group-item active"><b>THÔNG TIN GIÁO VIÊN GIẢNG DẠY</b></li>
                            <li class="list-group-item">Họ & Tên: <b> <i>{{ Teacher.fullname }}</i></b></li>
                            <li class="list-group-item">Ngày tháng năm sinh: <b>{{ formatDate(Teacher.birth) }}</b></li>
                            <li class="list-group-item">Môn học giảng dạy: <b>{{ Teacher.subject }}</b></li>
                            <li class="list-group-item">Lớp học chủ nhiệm:
                                <b v-if="Teacher.form_teacherID == undefined">Không phụ trách CN</b>
                                <b v-if="Teacher.form_teacherID != undefined">{{ Teacher.form_teacherID.nameclass }}</b>
                                <button v-if="Teacher.form_teacherID != undefined"
                                    @click="removeTeacher(Teacher.form_teacherID._id)"
                                    class="buttom-remove ml-2">Xóa</button>
                            </li>
                            <li class="list-group-item">Lớp phụ trách giảng dạy: <ul class="list-group mt-1"
                                    v-for="(item, index) in Teacher.classID" :key="index">
                                    <li class="list-group-item" v-if="item.nameclass != null">
                                        Lớp <b>{{ item.nameclass }}</b>
                                        <button title="Xóa lớp" type="button" class="buttom-remove"
                                            @click="removeClass(item)">Xóa</button>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                    <div class="form-edit">
                        <ul class="list-group">
                            <li class="list-group-item active text-title-pcgd">
                                <b>Phân công giảng dạy</b>
                            </li>
                            <li class="list-group-item" v-for="(i, index) in Class" :key="index">
                                <label :for="i._id">Lớp {{ i.nameclass }}</label>
                                <input class="cbclassid" type="checkbox" :id="i._id" :value="i._id"
                                    v-model="Teacher.classID">

                            </li>
                        </ul>
                    </div>

                    <div class="form-edit">
                        <ul class="list-group">
                            <li class="list-group-item active text-title-pcgd">
                                <b>Phân công chủ nhiệm</b>
                            </li>
                            <li class="list-group-item" v-for="(it, index) in ClassCN" :key="index">
                                <label :for="it._id + index">Lớp {{ it.nameclass }}</label>
                                <input class="cbclassid" type="radio" :id="it._id + index" :value="it._id"
                                    v-model="Teacher.form_teacherID">
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="text-center">
                    <button @click="addClassCN(Teacher.form_teacherID)" class="btn btn-primary p-2 btn-push"
                        title="Thêm lớp" data-toggle="modal" data-target="#exampleModal">Cập nhật</button>
                </div>
            </form>
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
            Class: [],
            id: '',
            newArr: [],
            subject: '',
            results: '',
            classElement: '',
            classID: [],
            tempID: '',
            ClassCN: '',
            idcls: '',
            nameclass: '',
            idRMT: '',
            GVCN: ''

        }
    },

    created() {
        this.id = JSON.parse(localStorage.getItem('editclassid'))._id
        this.subject = JSON.parse(localStorage.getItem('editclassid')).subject
        axios.get(`https://htqlthpt.onrender.com/teacher/show/${this.id}`)
            .then(res => {
                this.Teacher = res.data
            })
            .catch(err => {
                console.log(err, 'err');
            })
        

        axios.get('https://htqlthpt.onrender.com/class/show')
            .then(res => {
                this.results = [];
                for (let index = 0; index < res.data.length; index++) {
                    this.classElement = res.data[index];
                    var flagSubject = false;
                    for (let i = 0; i < this.classElement.teacher.length; i++) {
                        const teach = this.classElement.teacher[i];
                        if (teach.subject == this.subject) {
                            flagSubject = true;
                            break;
                        }
                    }
                    if (!flagSubject) {
                        this.results.push(this.classElement);
                    }
                }
                this.Class = this.results;
            })
            .catch(err => {
                console.log(err, 'err');
            })

        axios.get('https://htqlthpt.onrender.com/class/show')
            .then(res => {
                for (let index = 0; index < res.data.length; index++) {
                    if (res.data[index].organizer == undefined) {
                        this.newArr.push(res.data[index])
                    }
                    this.ClassCN = this.newArr
                }



            })
            .catch(err => {
                console.log(err, 'err');
            })


    },

    methods: {

        formatDate(date) {
            return moment(date).format('DD-MM-YYYY');
        },

        addClass() {
            axios.patch(`https://htqlthpt.onrender.com/teacher/update/${this.id}`, this.Teacher)
                .then(() => {
                    window.location.reload()
                })
                .catch(err => {
                    console.log(err);
                })
        },

        removeClass(user) {
            this.tempID = user._id
            axios.put(`https://htqlthpt.onrender.com/teacher/remove/class-teacher/${this.tempID}`, this.Teacher)
                .then(() => {
                    window.location.reload()
                })
                .catch(err => {
                    console.log(err, 'err');
                })
        },

        addClassCN(idx) {
            this.idcls = idx
            console.log(this.idcls);
            axios.patch(`https://htqlthpt.onrender.com/teacher/add/class-teacher/${this.idcls}`, this.Teacher)
                .then(() => {

                })
                .catch(err => {
                    console.log(err, 'err');
                })
        },

        removeTeacher(idr) {
            this.idRMT = idr
            console.log(this.idRMT);
            axios.patch(`https://htqlthpt.onrender.com/teacher/remove/teacher/${this.idRMT}`, this.Teacher)
                .then(() => {

                })
                .catch(err => {
                    console.log(err);
                })
        }

    }


}
</script>
<style scoped>
.container {
    margin: auto;
}

.cbclassid {
    margin-left: 10px;
}

.text-title-pcgd {
    text-transform: uppercase;
}

.bt-push {
    text-align: end;

}

.btn-push {
    margin: 0;
    padding-top: 5px;
    padding-bottom: 5px;
}

.buttom-remove {
    width: 40px;
    margin-left: 100px;
    border: none;
    background-color: rgb(250, 70, 70);
    border-radius: 5px;
}

.form-info {
    margin-left: 50px;
    display: inline-block;
}

.form-edit {

    margin-left: 50px;
    display: inline-block;

}

.fa-plus {
    padding-top: 5px;
    padding-bottom: 5px;
}
</style>