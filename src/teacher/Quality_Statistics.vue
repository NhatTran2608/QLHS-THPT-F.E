<template>
    <div>
        <div>
            <div class="d-flex flex-row">
                <div>
                    <Menu></Menu>
                </div>
                <div>
                    <div class="container mt-2">
                        <h4 class="text-center title-bd" v-if="this.Teacher.form_teacherID.nameclass != undefined">
                            BIỂU ĐỒ ĐÁNH GIÁ HỌC LỰC HỌC SINH LỚP {{ this.Teacher.form_teacherID.nameclass }}
                        </h4>
                        <div class="container">
                            <div class="form__HL">
                                <div class="sum_student_hl">
                                    🌍 Tổng số học sinh: <b> {{ Student.length }} </b> học sinh
                                </div>

                                <div class="downBDHL">
                                    <button class="bt-img-hl" @click="downloadImage">Tải xuống biểu đồ</button>
                                </div>
                            </div>
                        </div>
                        <Bar :data="chartData" :options="options" ref="barChart" :style="myStyles" />

                    </div>
                    <div class="container mt-5">
                        <h4 class="text-center title-bd" v-if="this.Teacher.form_teacherID.nameclass != undefined">
                            BIỂU ĐỒ ĐÁNH GIÁ HẠNH KIỂM HỌC SINH LỚP {{ this.Teacher.form_teacherID.nameclass }}
                        </h4>
                        <div class="container">
                            <div class="form__HL">
                                <div class="sum_student_hl">
                                    🌍 Tổng số học sinh: <b> {{ Student.length }} </b> học sinh
                                </div>
                                <div class="downBDHL">
                                    <button class="bt-img-hl" @click="downloadImageHK">Tải xuống biểu đồ</button>
                                </div>
                            </div>
                        </div>
                        <Bar :data="chartDataHK" :options="options" ref="barChartHK" :style="myStyles" />
                        <div>

                            <input type="checkbox" class="danhsach_HL" id="danhsach_HL">
                            <div class="ds_ct mt-4">
                                <label for="danhsach_HL" class="bt-img-hl ">Danh sách chi tiết</label>
                            </div>


                            <div ref="excelTable" class="table_HL mt-4">
                                <table class="table">
                                    <thead>
                                        <div class="bt-img-hl mb-3" @click="exportToExcel">Tải xuống</div>
                                        <!-- <i title="Download Excel" class="fas fa-file-excel down__excel"></i> -->
                                        <tr>
                                            <th scope="col">TT</th>
                                            <th scope="col" @click="sortData('username')">MSHS <i
                                                    class="fa-solid fa-caret-down"></i></th>
                                            <th class="text-center" @click="sortData('fullname')" scope="col">Họ và tên <i
                                                    class="fa-solid fa-caret-down"></i></th>
                                            <th class="text-center" scope="col">Ngày tháng năm sinh</th>
                                            <th scope="col">Điểm trung bình</th>
                                            <th scope="col">Học lực</th>
                                            <th scope="col">Hạnh kiểm</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in sortedData" :key="index">
                                            <td>{{ index + 1 }}</td>
                                            <td>{{ item.username }}</td>
                                            <td>{{ item.fullname }}</td>
                                            <td class="text-center">{{ formatDate(item.namsinh) }}</td>
                                            <td class="text-center">
                                                {{ (item.resultID.scoreResult).toFixed(2) }}
                                            </td>
                                            <td v-if="item.resultID.Academic_ability != undefined">{{
                                                item.resultID.Academic_ability }}</td>
                                            <td v-if="item.resultID.Academic_ability == undefined">
                                                Chưa xếp loại
                                            </td>
                                            <td v-if="item.resultID.rank_conduct != undefined">
                                                {{ item.resultID.rank_conduct }}
                                            </td>
                                            <td v-if="item.resultID.rank_conduct == undefined">
                                                Chưa xếp loại
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Bar, PolarArea } from 'vue-chartjs'
import moment from 'moment'
import * as XLSX from 'xlsx';
import Menu from '../components/Menu.vue'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, RadialLinearScale, ArcElement } from 'chart.js'
import axios from 'axios'
export default {
    name: 'PolarAreaChart',
    components: {
        Bar,
        PolarArea,
        Menu
    },
    data() {
        return {
            Summary: [],
            Student: [],
            TeacherTK: [],
            TempTK: [],
            Teacher:
            {
                form_teacherID: [
                    {
                        nameclass: ''
                    }
                ]
            }
            ,
            StudentTK: [
                // {
                //     resultID: {
                //         Academic_ability: ''
                //     }
                // }
            ],
            Scores: [],
            ScoresSum: [],
            lenStudent: 0,
            g: 0,
            tb: 0,
            k: 0,
            y: 0,
            hkt: 0,
            hkk: 0,
            hktb: 0,
            hky: 0,
            ScoresSumHKII: [],
            TBMHKI: 0,
            TBHKII: 0,
            TBCN: 0,
            ListStudents: [],
            chartData: {
                labels: [
                    'Giỏi (8 - 10)',
                    'Khá (7.9 - 6.5)',
                    'Trung Bình (5.0 - 6.4)',
                    'Dưới Trung Bình (< 5.0)'
                ],
                datasets: [
                    {
                        label: 'Kết quả',
                        data: [0, 0, 0, 0],
                        backgroundColor: [
                            '#0d6efd',
                            '#ffc107',
                            '#198754',
                            '#dc3545'
                        ]
                    }
                ],

            },
            chartDataHK: {
                labels: [
                    'Tốt',
                    'Khá',
                    'Trung Bình',
                    'Yếu'
                ],
                datasets: [
                    {
                        label: 'Kết quả',
                        data: [0, 0, 0, 0],
                        backgroundColor: [
                            '#0d6efd',
                            '#ffc107',
                            '#198754',
                            '#dc3545'
                        ]
                    }
                ],

            },
            options: {
                responsive: true,

            },
            sortBy: '',
            sortOrder: 'asc',
        }
    },


    async created() {
        this.id = JSON.parse(localStorage.getItem('user'))._id
        let res = await axios.get(`http://localhost:3000/teacher/class-student/${this.id}`)
        this.Teacher = res.data
        this.Temp = this.Teacher.form_teacherID.students
        if (this.Teacher.form_teacherID != undefined) {
            for (let index = 0; index < this.Temp.length; index++) {
                let res = await axios.get(`http://localhost:3000/student/infostudent/${this.Temp[index]}`)
                this.Student.push(res.data)
            }
        }
    },

    async mounted() {
        this.chart()
    },

    methods: {
        async chart() {
            this.id = JSON.parse(localStorage.getItem('user'))._id
            let res = await axios.get(`http://localhost:3000/teacher/class-student/${this.id}`)
            this.TeacherTK = res.data
            this.TempTK = this.TeacherTK.form_teacherID.students
            if (this.TeacherTK.form_teacherID != undefined) {
                for (let index = 0; index < this.TempTK.length; index++) {
                    let res = await axios.get(`http://localhost:3000/student/infostudent/${this.TempTK[index]}`)
                    this.StudentTK.push(res.data)
                    if (this.StudentTK[index].resultID.Academic_ability == 'Giỏi') {
                        this.g = this.g + 1
                    }
                    if (this.StudentTK[index].resultID.Academic_ability == 'Khá') {
                        this.k = this.k + 1
                    }
                    if (this.StudentTK[index].resultID.Academic_ability == 'Trung Bình') {
                        this.tb = this.tb + 1
                    }
                    if (this.StudentTK[index].resultID.Academic_ability == 'Yếu') {
                        this.y = this.y + 1
                    }
                    if (this.StudentTK[index].resultID.Academic_ability == 'Kém') {
                        this.y = this.y + 1
                    }
                    // Hạnh kiểm
                    if (this.StudentTK[index].resultID.rank_conduct == 'Tốt') {
                        this.hkt = this.hkt + 1
                    }
                    if (this.StudentTK[index].resultID.rank_conduct == 'Khá') {
                        this.hkk = this.hkk + 1
                    }
                    if (this.StudentTK[index].resultID.rank_conduct == 'Trung Bình') {
                        this.hktb = this.hktb + 1
                    }
                    if (this.StudentTK[index].resultID.rank_conduct == 'Yếu') {
                        this.hky = this.hky + 1
                    }
                }
            }
            const sum = this.g + this.k + this.tb + this.y
            const cxl = this.StudentTK.length - sum
            const sumhk = this.hkt + this.hkk + this.hktb + this.hky
            const hkcxl = this.StudentTK.length - sumhk
            this.chartData = {
                labels: [
                    'Giỏi (8 - 10)',
                    'Khá (7.9 - 6.5)',
                    'Trung Bình (5.0 - 6.4)',
                    'Dưới Trung Bình (< 5.0)',
                    'Chưa được xếp loại'
                ],
                datasets: [
                    {
                        label: 'Học lực',
                        data: [this.g, this.k, this.tb, this.y, cxl],
                        backgroundColor: [
                            '#0d6efd',
                            '#ffc107',
                            '#198754',
                            '#dc3545',
                            '#999'
                        ]
                    }
                ],
            },
                this.chartDataHK = {
                    labels: [
                        'Tốt',
                        'Khá',
                        'Trung Bình',
                        'Yếu',
                        'Chưa xếp loại'
                    ],
                    datasets: [
                        {
                            label: 'Hạnh kiểm',
                            data: [this.hkt, this.hkk, this.hktb, this.hky, hkcxl],
                            backgroundColor: [
                                '#0d6efd',
                                '#ffc107',
                                '#198754',
                                '#dc3545',
                                '#999'
                            ]
                        }
                    ],

                }
        },
        exportToExcel() {
            // Sử dụng ref để lấy tham chiếu đến bảng
            const table = this.$refs.excelTable;

            // Tạo một mảng dữ liệu từ bảng
            const data = [
                ["TT", "Mã Số", "Họ và tên", "Ngày sinh", "Học lực", "Hạnh kiểm"]
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
            XLSX.utils.book_append_sheet(wb, ws, `Danh sách thống kê học lực`);

            // Xuất tệp Excel
            XLSX.writeFile(wb, `Danh-sach-thong-ke-hoc-luc-${this.Teacher.form_teacherID.nameclass}.xlsx`);
        },

        formatDate(date) {
            return moment(date).format('DD-MM-YYYY');
        },

        downloadImage() {
            // Lấy biểu đồ từ $refs
            const chart = this.$refs.barChart.chart;

            // Cập nhật dữ liệu của biểu đồ
            chart.data.labels = this.chartData.labels;
            chart.data.datasets.forEach((dataset, i) => {
                dataset.data = this.chartData.datasets[i].data;
            });

            // Cập nhật biểu đồ
            chart.update();

            // Tải về hình ảnh của biểu đồ
            const dataURL = chart.toBase64Image();
            const a = document.createElement('a');
            a.href = dataURL;
            a.download = `Thong-Ke-Hoc-Luc.png-${this.Teacher.form_teacherID.nameclass}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        },
        downloadImageHK() {
            // Lấy biểu đồ từ $refs
            const chart = this.$refs.barChartHK.chart;

            // Cập nhật dữ liệu của biểu đồ
            chart.data.labels = this.chartDataHK.labels;
            chart.data.datasets.forEach((dataset, i) => {
                dataset.data = this.chartDataHK.datasets[i].data;
            });

            // Cập nhật biểu đồ
            chart.update();

            // Tải về hình ảnh của biểu đồ
            const dataURL = chart.toBase64Image();
            const a = document.createElement('a');
            a.href = dataURL;
            a.download = `Thong-Ke-Hanh-Kiem-Lop-${this.Teacher.form_teacherID.nameclass}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        },
        sortData(column) {
            if (this.sortBy === column) {
                // Đảo chiều sắp xếp nếu cột đã được chọn
                this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
            } else {
                // Sắp xếp theo cột mới
                this.sortBy = column;
                this.sortOrder = 'asc';
            }
        },
    },
    computed: {
        myStyles() {
            return {
                height: `${100}%`,
                // position: 'relative',
                width: `${100}%`
            }
        },

        sortedData() {
            return this.StudentTK.slice().sort((a, b) => {
                const order = this.sortOrder === 'asc' ? 1 : -1;
                return a[this.sortBy] > b[this.sortBy] ? order : -order;
            });

        },
    },
}
</script>
<style scoped>
.title-bd {
    text-transform: uppercase;
}

.table_HL {
    display: none;
}

.danhsach_HL {
    display: none;
}

#danhsach_HL:checked~.table_HL {
    display: block;
}




.bt-img-hl {

    padding: 10px 15px;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
    outline: none;
    color: #fff;
    background-color: #04AA6D;
    border: none;
    border-radius: 15px;
    box-shadow: 0 5px #999;

}

.bt-img-hl:hover {
    background-color: #3e8e41
}

.bt-img-hl:active {
    background-color: #3e8e41;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
}

.sum_student_hl {
    text-align: start;
    display: inline-block;
}

.downBDHL {
    text-align: end;
    display: inline-block;
}

.form__HL {
    display: flex;
    justify-content: space-between;
}

.ds_ct {
    text-align: center;
    margin: auto;
}
</style>