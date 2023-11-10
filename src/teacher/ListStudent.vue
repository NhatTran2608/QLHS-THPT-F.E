<template>
    <div class="min-loader" v-if="this.checkload == true"></div>
    <div v-if="Teacher.form_teacherID != undefined" class="d-flex flex-row">
        <div>
            <Menu></Menu>
        </div>
        <div class="table-hs container">
            <div class="text-title">
                <h2>Danh sách học sinh lớp {{ this.Class }}</h2>
            </div>
            <div class="speech text-center" id="labnol">
                <input class="form-control mb-2"
                    style="width: 500px; margin: auto; border-radius: 40px 40px 40px 40px; display: inline-block;"
                    type="search"  name="q" id="transcript" placeholder="Search..." v-model="this.search" />

                <div style="cursor: pointer; display: inline-block; width: 10px; color: blue;">
                    <i title="Tìm kiếm bằng giọng nói" class="fa-solid fa-microphone ml-3" @click="startDictation()"></i>
                </div>

                <i title="Download Excel" @click="exportToExcel" class="fas fa-file-excel down__excel"></i>



            </div>
            <div>
                <table ref="excelTable" class="table table-striped">
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
                    <tbody v-for="(item, index) in this.ListStudents" :key="index">
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
import * as XLSX from 'xlsx';
import moment from 'moment'
export default {
    components: {
        Menu
    },
    data() {
        return {
            Class: '',
            Teacher: {},
            Temp: [],
            Student: [],
            ID: '',
            resultID: {},
            search: '',
            ListStudents: [],
            checkload: false,
        }
    },

    created() {
        this.id = JSON.parse(localStorage.getItem('user'))._id
        axios.get(`http://localhost:3000/teacher/class-student/${this.id}`)
            .then(res => {
                this.Teacher = res.data
                this.Temp = this.Teacher.form_teacherID.students
                this.Class = this.Teacher.form_teacherID.nameclass
                if (this.Teacher.form_teacherID != undefined) {
                    for (let index = 0; index < this.Temp.length; index++) {
                        axios.get(`http://localhost:3000/student/infostudent/${this.Temp[index]}`)
                            .then(res => {
                                this.Student.push(res.data)

                                this.ListStudents.push(res.data)
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
    watch: {
        search(newQuestion, oldQuestion) {
            this.SearchStudent(newQuestion)
        }
    },
    methods: {
        SearchStudent(value) {
            this.ListStudents = this.Student.filter(user => {
                return (
                    user.fullname.toLowerCase().includes(value.toLowerCase())
                );
            });
        },
        formatDate(date) {
            return moment(date).format('DD-MM-YYYY');
        },
        startDictation() {
            let abc = (e, recognition) => {
                document.getElementById('transcript').value = e.results[0][0].transcript;
                let ab = document.getElementById('transcript').value
                this.search = ab;
                this.SearchStudent(ab)
                this.checkload = false
                recognition.stop()
            };
            if (window.hasOwnProperty('webkitSpeechRecognition')) {
                var recognition = new webkitSpeechRecognition();
                recognition.continuous = false;
                recognition.interimResults = false;
                recognition.lang = 'vi-VN';
                this.checkload = true
                recognition.start();
                recognition.onresult = (e) => {
                    abc(e, recognition)
                    this.checkload = false
                    recognition.stop();
                }

                recognition.onerror = function (e) {
                    this.checkload = false
                    recognition.stop();
                };

                //console.log(this.search);
            }
        },
        exportToExcel() {
            // Sử dụng ref để lấy tham chiếu đến bảng
            const table = this.$refs.excelTable;

            // Tạo một mảng dữ liệu từ bảng
            const data = [
                ["TT", "Họ và tên", "Mã Số", "Giới tính", "Ngày sinh"]
            ];
            const rows = table.querySelectorAll('tr');
            rows.forEach((row, rowIndex) => {
                const rowData = [];
                const cells = row.querySelectorAll('td');
                cells.forEach((cell, cellIndex) => {
                    rowData.push(cell.innerText);
                });
                data.push(rowData);
            });

            // Tạo workbook và worksheet từ dữ liệu
            const ws = XLSX.utils.aoa_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, `Danh sách lớp ${this.Class}`);

            // Xuất tệp Excel
            XLSX.writeFile(wb, `Danh-sach-lop-${this.Class}.xlsx`);
        },

        mounted() {
            // Kiểm tra xem `this.$el` đã được gắn kết
            if (this.$el) {
                this.exportToExcel();
            }
        },

    }
}
</script>
<style scoped>
.down__excel {
    cursor: pointer;
    text-align: center;
    margin-left: 100px;
    background-color: #ccc;
    padding: 10px;
    border-radius: 5px;
    width: 60px;
    color: green;
}

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

.min-loader:before,
.min-loader:after,
.min-loader {

    border-radius: 100%;
    width: 2.5rem;
    height: 2.5rem;
    animation-fill-mode: both;
    animation: min-loader 1.8s infinite ease-in-out;
}

.min-loader {
    font-size: 0.1rem;
    margin-top: 100px;
    margin-bottom: 100px;
    margin-left: 700px;
    margin-right: 100px;
    position: relative;
    transform: translateZ(0);
    animation-delay: -0.6s;
    z-index: 2;
    position: absolute;

    &:before {
        left: -4rem;
        animation-delay: -1.2s;
    }

    &:after {
        left: 4rem;
    }

    &:before,
    &:after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
    }
}

@keyframes min-loader {

    0%,
    80%,
    100% {
        box-shadow: 0 2.5rem 0 -1.3em black;
    }

    40% {
        box-shadow: 0 2.5rem 0 0 black;
    }
}
</style>