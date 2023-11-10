<template>
    <div v-if="Class != null">
        <div>
            <div class="text-title mb-2">
                <h3>Bảng điểm môn {{ this.subject }} lớp {{ Class.nameclass }} </h3>
            </div>
            <div>
                <div class=" mt-4">
                    <form method="post" @submit.prevent="submitScores()">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <td class="text-center title-hk" colspan="3">#</td>
                                    <td class="text-center title-hk" colspan="5">HKI</td>
                                    <td class="text-center title-hk" colspan="7">HKII</td>
                                </tr>
                                <tr>
                                    <th>TT</th>
                                    <th>Họ & Tên</th>
                                    <th>Mã số</th>
                                    <th>Điểm miệng</th>
                                    <th>Điểm 15 phút đợt 1</th>
                                    <th>Điểm 15 phút lần 2</th>
                                    <th>Điểm giữa kì</th>
                                    <th>Điểm cuối kì</th>
                                    <th>TBHKI</th>
                                    <th></th>
                                    <th>Điểm miệng</th>
                                    <th>Điểm 15 phút đợt 1</th>
                                    <th>Điểm 15 phút đợt 2</th>
                                    <th>Điểm giữa kì</th>
                                    <th>Điểm cuối kì</th>
                                    <th>TBHKII</th>
                                    <th>TBCN</th>
                                </tr>
                            </thead>
                            <tbody v-for="(item, index) in Class.students" :key="item._id">
                                <tr>
                                    <td>{{ index + 1 }}</td>
                                    <td class="namestudent"><b>{{ item.fullname }}</b></td>
                                    <td>{{ item.username }}</td>
                                    <td><input type="number" min="0" class="inputscores" max="10" step="0.1"
                                            v-model="this.Scores[index].diemhk1tl"></td>
                                    <td><input type="number" min="0" class="inputscores" max="10" step="0.1"
                                            v-model="this.Scores[index].diemhk115p"></td>
                                    <td><input type="number" min="0" class="inputscores" max="10" step="0.1"
                                            v-model="this.Scores[index].diemhk115pl2"></td>
                                    <td><input type="number" min="0" class="inputscores" max="10" step="0.1"
                                            v-model="this.Scores[index].diemhk11t"></td>
                                    <td><input type="number" min="0" class="inputscores" max="10" step="0.1"
                                            v-model="this.Scores[index].diemhk1ck"></td>
                                    <td class="inputscores" style="color: red;">
                                        {{ this.Scores[index].TBHKI }}
                                        <!-- 
                                        {{ DiemTBHKI(Scores[index].diemhk1tl,
                                            Scores[index].diemhk115p,
                                            Scores[index].diemhk11t, Scores[index].diemhk1ck) }} -->

                                    </td>
                                    <td>
                                        <div>||</div>
                                    </td>
                                    <td><input type="number" min="0" class="inputscores" max="10" step="0.1"
                                            v-model="this.Scores[index].diemhk2tl"></td>
                                    <td><input type="number" min="0" class="inputscores" max="10" step="0.1"
                                            v-model="this.Scores[index].diemhk215p"></td>
                                    <td><input type="number" min="0" class="inputscores" max="10" step="0.1"
                                            v-model="this.Scores[index].diemhk215pl2"></td>
                                    <td><input type="number" min="0" class="inputscores" max="10" step="0.1"
                                            v-model="this.Scores[index].diemhk21t"></td>
                                    <td><input type="number" min="0" class="inputscores" max="10" step="0.1"
                                            v-model="this.Scores[index].diemhk2ck"></td>
                                    <td class="inputscores" style="color: red;">
                                        {{ this.Scores[index].TBHKII }}
                                        <!-- {{
                                            DiemTBHKII(Scores[index].diemhk2tl, Scores[index].diemhk215p,
                                                Scores[index].diemhk21t, Scores[index].diemhk2ck)
                                        }} -->
                                    </td>
                                    <td class="inputscores" style="color: red;">
                                        <!-- {{ DiemTBCN(this.sumhk1, this.sumhk2) }} -->
                                        {{ this.Scores[index].TBCN }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <!-- <div>
                        Tổng cộng: <b>{{ Class.students.length }}</b> học sinh
                        </div> -->
                        <div class="text-buttom"><button class="buttomm">Cập nhật</button></div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div class="container mt-5 text-center title-bd">
        <h4>
            BIỂU ĐỒ THỂ HỆ ĐIỂM SỐ CỦA HỌC SINH MÔN {{ this.subject }} lớp {{ Class.nameclass }}
        </h4>
    </div>
    <div class="container mt-2">
        <Bar :data="chartData" :options="options" />
    </div>
</template>
<script>
import axios from 'axios';
import { Bar, PolarArea } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, RadialLinearScale, ArcElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, RadialLinearScale, ArcElement)

export default {
    name: 'PolarAreaChart',
    components: {
        Bar,
        PolarArea
    },
    data() {
        return {
            Student: [],
            Class: {},
            subject: '',
            Scores: [],
            sul: [],
            SumHKI: 0,
            SumHKII: 0,
            HK: 0,
            sumhk1: 0,
            sumhk2: 0,
            sum: 0,
            g: 0,
            k: 0,
            tb: 0,
            dtb: 0,
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
            options: {
                responsive: true,

            },
        }
    },
    async mounted() {
        this.chart()
    },

    async created() {
        this.subject = JSON.parse(localStorage.getItem('user')).subject

        const subject = JSON.parse(localStorage.getItem('user')).subject
        const id = JSON.parse(localStorage.getItem('classid'))
        let scoreFake = []
        let res = await axios.get(`http://localhost:3000/class/info/${id}`)
        this.Class = res.data
        //const listStudents = res.data.students
        let temp = res.data.students
        for (let indexz = 0; indexz < temp.length; indexz++) {
            this.Scores.push({})
        }
        for (let indexz = 0; indexz < temp.length; indexz++) {
            let res = await axios.get(`http://localhost:3000/student/infostudent/${temp[indexz]._id}`)
            const studentID = res.data._id
            for (let i = 0; i < temp.length; i++) {
                scoreFake[indexz] = {
                    nameSubject: subject,
                    studentID: studentID,
                }
                if (res.data.scoresID.length) {
                    res.data.scoresID.forEach(score => {
                        if (score.nameSubject == subject) {
                            scoreFake[indexz] = {
                                ...scoreFake[indexz],
                                diemhk1tl: score.diemhk1tl,
                                diemhk115p: score.diemhk115p,
                                diemhk115pl2: score.diemhk115pl2,
                                diemhk11t: score.diemhk11t,
                                diemhk1ck: score.diemhk1ck,
                                diemhk2tl: score.diemhk2tl,
                                diemhk215p: score.diemhk215p,
                                diemhk215pl2: score.diemhk215pl2,
                                diemhk21t: score.diemhk21t,
                                diemhk2ck: score.diemhk2ck,
                            }
                        }
                    });
                }
            }
        }
        // this.Scores = scoreFake
        for (let index = 0; index < scoreFake.length; index++) {
            let tbhk2 = this.DiemTBHKII(scoreFake[index].diemhk2tl,
                scoreFake[index].diemhk215p, scoreFake[index].diemhk215pl2,
                scoreFake[index].diemhk21t, scoreFake[index].diemhk2ck)
            let tbhk1 = this.DiemTBHKI(scoreFake[index].diemhk1tl,
                scoreFake[index].diemhk115p, scoreFake[index].diemhk115pl2,
                scoreFake[index].diemhk11t, scoreFake[index].diemhk1ck)
            let tbcn = this.DiemTBCN(parseFloat(tbhk2), parseFloat(tbhk1))
            scoreFake[index].TBHKI = parseFloat(tbhk1)
            scoreFake[index].TBHKII = parseFloat(tbhk2)
            scoreFake[index].TBCN = tbcn
        }

        this.Scores = scoreFake

    },
    methods: {

        async chart() {
            this.subject = JSON.parse(localStorage.getItem('user')).subject
            const subject = JSON.parse(localStorage.getItem('user')).subject
            const id = JSON.parse(localStorage.getItem('classid'))
            let scoreFake = []
            let res = await axios.get(`http://localhost:3000/class/info/${id}`)
            this.Class = res.data
            //const listStudents = res.data.students
            let temp = res.data.students
            for (let indexz = 0; indexz < temp.length; indexz++) {
                this.Scores.push({})
            }
            for (let indexz = 0; indexz < temp.length; indexz++) {
                let res = await axios.get(`http://localhost:3000/student/infostudent/${temp[indexz]._id}`)
                const studentID = res.data._id
                for (let i = 0; i < temp.length; i++) {
                    scoreFake[indexz] = {
                        nameSubject: subject,
                        studentID: studentID,
                    }
                    if (res.data.scoresID.length) {
                        res.data.scoresID.forEach(score => {
                            if (score.nameSubject == subject) {
                                scoreFake[indexz] = {
                                    ...scoreFake[indexz],
                                    diemhk1tl: score.diemhk1tl,
                                    diemhk115p: score.diemhk115p,
                                    diemhk115pl2: score.diemhk115pl2,
                                    diemhk11t: score.diemhk11t,
                                    diemhk1ck: score.diemhk1ck,
                                    diemhk2tl: score.diemhk2tl,
                                    diemhk215p: score.diemhk215p,
                                    diemhk215pl2: score.diemhk215pl2,
                                    diemhk21t: score.diemhk21t,
                                    diemhk2ck: score.diemhk2ck,
                                }
                            }
                        });
                    }
                }
            }
            // this.Scores = scoreFake
            for (let index = 0; index < scoreFake.length; index++) {
                let tbhk2 = this.DiemTBHKII(scoreFake[index].diemhk2tl,
                    scoreFake[index].diemhk215p, scoreFake[index].diemhk215pl2,
                    scoreFake[index].diemhk21t, scoreFake[index].diemhk2ck)
                let tbhk1 = this.DiemTBHKI(scoreFake[index].diemhk1tl,
                    scoreFake[index].diemhk115p, scoreFake[index].diemhk115pl2,
                    scoreFake[index].diemhk11t, scoreFake[index].diemhk1ck)
                let tbcn = this.DiemTBCN(parseFloat(tbhk2), parseFloat(tbhk1))
                scoreFake[index].TBHKI = parseFloat(tbhk1)
                scoreFake[index].TBHKII = parseFloat(tbhk2)
                scoreFake[index].TBCN = tbcn
                if (scoreFake[index].TBCN >= 7.95) {
                    this.g++
                }
                if (scoreFake[index].TBCN >= 6.55 && scoreFake[index].TBCN <= 7.94) {
                    this.k++
                }
                if (scoreFake[index].TBCN >= 4.95 && scoreFake[index].TBCN <= 6.54) {
                    this.tb++
                }
                if (scoreFake[index].TBCN >= 0.00 && scoreFake[index].TBCN <= 4.94) {
                    this.dtb++
                }
            }

            this.Scores = scoreFake
            console.log(this.g);



            this.chartData = {
                labels: [
                    'Giỏi (8 - 10)',
                    'Khá (7.9 - 6.5)',
                    'Trung Bình (5.0 - 6.4)',
                    'Dưới Trung Bình (< 5.0)'
                ],
                datasets: [
                    {
                        label: 'Kết quả',
                        data: [this.g, this.k, this.tb, this.dtb],
                        backgroundColor: [
                            '#0d6efd',
                            '#ffc107',
                            '#198754',
                            '#dc3545'
                        ]
                    }
                ],
            }

        },

        submitScores() {
            for (let index = 0; index < this.Scores.length; index++) {
                this.SumHKI = this.DiemTBHKI(this.Scores[index].diemhk1tl,
                    this.Scores[index].diemhk115p, this.Scores[index].diemhk115pl2,
                    this.Scores[index].diemhk11t, this.Scores[index].diemhk1ck)
                this.Scores[index].TBHKI = parseFloat(this.SumHKI);
                this.SumHKII = this.DiemTBHKII(this.Scores[index].diemhk2tl, this.Scores[index].diemhk215p,
                    this.Scores[index].diemhk215pl2,
                    this.Scores[index].diemhk21t, this.Scores[index].diemhk2ck)
                this.Scores[index].TBHKII = parseFloat(this.SumHKII);
                this.HK = this.DiemTBCN(parseFloat(this.SumHKI), parseFloat(this.SumHKII))
                this.Scores[index].TBCN = parseFloat(this.HK)
            }
            axios.post(`http://localhost:3000/scores/create`, this.Scores)
                .then(() => {
                    console.log(this.Scores);
                    // alert('Cập nhật thành công điểm số');
                    window.location.reload()
                })
                .catch(err => {
                    console.log(err, 'lỗi');
                })
        },

        DiemTBHKI(diemmieng, diem15p, diem15pl2, diem1t, diemcuoiki1) {
            if (diemmieng == null || diem15p == null || diem1t == null || diemcuoiki1 == null || diem15pl2 == null)
                this.sumhk1 = 0.00
            else
                this.sumhk1 = ((diemmieng) + (diem15p) + (diem15pl2) + (diem1t * 2) + (diemcuoiki1 * 3)) / 8
            return this.sumhk1.toFixed(2);
        },
        DiemTBHKII(diemmieng2, diem15p2, diem15pl2, diem1t2, diemcuoiki2) {
            if (diemmieng2 == null || diem15p2 == null || diem1t2 == null || diemcuoiki2 == null || diem15pl2 == null)
                this.sumhk2 = 0.00
            else
                this.sumhk2 = ((diemmieng2) + (diem15p2) + (diem15pl2) + (diem1t2 * 2) + (diemcuoiki2 * 3)) / 8
            return this.sumhk2.toFixed(2);
        },

        DiemTBCN(DTBHKI, DTBHKII) {
            if (DTBHKI == null || DTBHKII == null)
                this.sum = 0.00
            else
                this.sum = (DTBHKI + DTBHKII * 2) / 3
            return this.sum.toFixed(2)
        },
    }
}
</script>
<style scoped>
.inputscores {
    text-align: center;
    color: rgb(0, 0, 0);

}

.inputscores:focus {
    background-color: #ccc;
}

.text-title {
    text-transform: uppercase;
    text-align: center;
}

.text-buttom {
    text-align: center;

}

.buttomm {
    margin-top: 10px;
    padding: 15px;
    border: none;
    font-weight: 600;
    color: #fff;
    border-radius: 5px;
    background-color: rgb(50, 50, 217);
}

.buttomm:hover {
    background-color: rgb(248, 66, 66);
}

.title-hk {
    font-weight: 700;
}

.table td {
    padding: 5px;
}

input {
    width: 60px;
}

.namestudent {
    width: 185px;
}

.title-bd {
    text-transform: uppercase;
}
</style>