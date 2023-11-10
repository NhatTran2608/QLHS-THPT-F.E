<template>
    <div>
        <div>
            <div class="container">
                <div class="text-title">
                    <h2>
                        Sắp xếp thời khóa biểu lớp {{ Class.nameclass }}
                    </h2>
                </div>
                <table class="table">
                    <thead class="thead-light">
                        <tr>
                            <th scope="col">Tiết/Thứ</th>
                            <th scope="col">Thứ 2</th>
                            <th scope="col">Thứ 3</th>
                            <th scope="col">Thứ 4</th>
                            <th scope="col">Thứ 5</th>
                            <th scope="col">Thứ 6</th>
                            <th scope="col">Thứ 7</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(listDays, tiet) in this.tkb" :key="tiet">
                            <th scope="row">{{ tiet }}</th>
                            <td v-for="(info, thu) in listDays" :key="thu">
                                <span v-if="info.fullname && info.subject">
                                   <b>{{ info.subject }}</b> - {{ info.fullname.split(' ').slice(-1).join(' ') }}
                                    
                                </span>
                                <input @click="() => { copyID(info._id); handleClick(thu, tiet); }" type="radio"
                                    class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter"
                                    name="tkb">
                            </td>
                            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"
                                aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLongTitle">Giáo viên giảng dạy</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div v-if="showTeacher.length < 1">
                                                <h5>Chưa phân công giáo viên. <router-link data-dismiss="modal"
                                                        aria-label="Close" to="/admin/list/teacher">Phân
                                                        công</router-link></h5>
                                            </div>
                                            <ul>
                                                <div v-for="(item, index) in showTeacher" :key="index">
                                                    <li class="element_add"><span class="element-name">Họ và tên: {{item.fullname}}</span> <br>
                                                     <span class="element-subject">Môn GD: <b>{{item.subject }}</b></span>
                                                        <button class="btn btn-primary btn-add"
                                                            @click="() => { handleSetFullnameSubject(item.fullname, item.subject, item._id) }">
                                                            <i class="fas fa-plus"></i>
                                                        </button>
                                                    </li>
                                                </div>
                                            </ul>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary"
                                                data-dismiss="modal">Close</button>
                                            <button @click="DeleteElements()" class="btn btn-danger btn-add">Xóa</button>
                                            <button @click="saveChange" type="button" class="btn btn-primary">Save
                                                changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            Teacher: [],
            showTeacher: [],
            Class: [],
            tkb: {},
            infoCurrent: {
                classId: '',
                thu: '',
                tiet: '',
                fullname: '',
                subject: '',
                id: '',
                ID: '',
            },
            // TimeTable_day: [],
            // TimeTable_lesson: [],
        }
    },
    async created() {
        try {
            const id = JSON.parse(localStorage.getItem('IDCLASS'))
            let res = await axios.get(`http://localhost:3000/class/info/${id}`)
            let teacherlist = res.data.teacher
            for (let index = 0; index < teacherlist.length; index++) {

                let timeTableTeacher = await axios.get(`http://localhost:3000/class/showOneTableTime/${teacherlist[index]._id}`)
                // console.log(timeTableTeacher);
                teacherlist[index].listTimeTable = timeTableTeacher.data

            }
            this.Class = res.data
            //console.log(teacherlist);
            //console.log(this.Teacher);
            this.Teacher = teacherlist
        }
        catch (err) {
            console.log(err);
        }

    },
    mounted() {
        this.abc()
    },
    methods: {
        async abc() {
            const classId = JSON.parse(localStorage.getItem('IDCLASS'))
            let res = await axios.post(`http://localhost:3000/class/show/timetable`, { classId })
            let data = res.data
            let tkb = {
                tiet1: {
                    thu2: {},
                    thu3: {},
                    thu4: {},
                    thu5: {},
                    thu6: {},
                    thu7: {},
                },
                tiet2: {
                    thu2: {},
                    thu3: {},
                    thu4: {},
                    thu5: {},
                    thu6: {},
                    thu7: {},
                },
                tiet3: {
                    thu2: {},
                    thu3: {},
                    thu4: {},
                    thu5: {},
                    thu6: {},
                    thu7: {},
                },
                tiet4: {
                    thu2: {},
                    thu3: {},
                    thu4: {},
                    thu5: {},
                    thu6: {},
                    thu7: {},
                },
                tiet5: {
                    thu2: {},
                    thu3: {},
                    thu4: {},
                    thu5: {},
                    thu6: {},
                    thu7: {},
                },
                tiet6: {
                    thu2: {},
                    thu3: {},
                    thu4: {},
                    thu5: {},
                    thu6: {},
                    thu7: {},
                },
                tiet7: {
                    thu2: {},
                    thu3: {},
                    thu4: {},
                    thu5: {},
                    thu6: {},
                    thu7: {},
                },
                tiet8: {
                    thu2: {},
                    thu3: {},
                    thu4: {},
                    thu5: {},
                    thu6: {},
                    thu7: {},
                },
                tiet9: {
                    thu2: {},
                    thu3: {},
                    thu4: {},
                    thu5: {},
                    thu6: {},
                    thu7: {},
                }
            }
            // console.log(data);
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                let thu = element.day
                let tiet = element.lesson
                tkb[tiet][thu].fullname = element.TeacherId.fullname
                tkb[tiet][thu].subject = element.TeacherId.subject
                tkb[tiet][thu]._id = data[index]._id
            }

            this.tkb = tkb
            this.infoCurrent.classId = classId

        },
        handleClick(thu, tiet) {
            this.infoCurrent.thu = thu
            this.infoCurrent.tiet = tiet

            let newLists = this.Teacher.filter(teacher => {
                let listTimeTable = teacher.listTimeTable
                let check = false
                for (let index = 0; index < listTimeTable.length; index++) {
                    const element = listTimeTable[index];
                    if (element.lesson === tiet && element.day === thu) {
                        check = true
                    }
                }
                return !check
            })

            this.showTeacher = newLists



        },


        handleSetFullnameSubject(fullname, subject, id) {
            this.infoCurrent.fullname = fullname
            this.infoCurrent.subject = subject
            this.infoCurrent.id = id
            this.tkb[this.infoCurrent.tiet][this.infoCurrent.thu].fullname = fullname
            this.tkb[this.infoCurrent.tiet][this.infoCurrent.thu].subject = subject
        },
        saveChange() {
            axios.post(`http://localhost:3000/class/create/timetable`, this.infoCurrent)
            window.location.reload()
        },

        async copyID(item) {
            this.ID = await item
        },

        async DeleteElements() {
            axios.delete(`http://localhost:3000/class/delete/timetable/${this.ID}`)
                .then(() => {
                    window.location.reload()
                })
                .catch(err => {
                    console.log(err);
                })
        }
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

.element_add {
    display: inline-block;
}


.element_add {
    text-decoration: none;
}

.element-name {
    display: inline-block;
}

.element-subject {
    display: inline-block;
}

.btn-add:focus {
    background-color: red;

}

.table td,
.table th {
    padding: 0.25rem;
}
</style>