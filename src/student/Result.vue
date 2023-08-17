<template>
    <div class="container mt-5">
        <div>
            <div class="d-flex flex-row mt-5">
                <div class="info-sd">
                    <ul class="list-group">
                        <li class="list-group-item active text-center TTHS">Thông tin học sinh</li>
                        <li class="list-group-item">MSHS: <b>{{ this.username }}</b></li>
                        <li class="list-group-item">Họ & tên: <b>{{ this.fullname }}</b></li>
                        <li class="list-group-item">Năm sinh: <b>{{ formatDate(this.namsinh) }}</b></li>
                        <li class="list-group-item">Lớp: <b>{{ Class.nameclass }}</b></li>
                        <li class="list-group-item">SĐT: <b>{{ this.phone }}</b></li>
                        <li class="list-group-item">Email: <b>{{ this.email }}</b></li>
                    </ul>
                </div>
                <div class="info-sd ml-2">
                    <div>
                        <div class="text-center DHK">Bảng điểm học kì I</div>
                        <table class="table table-primary">
                            <thead>
                                <tr>
                                    <th scope="col" class="title-scores">TT</th>
                                    <th scope="col" class="title-scores">Môn</th>
                                    <th scope="col" class="title-scores">ĐM</th>
                                    <th scope="col" class="title-scores">Đ15'</th>
                                    <th scope="col" class="title-scores">ĐGK</th>
                                    <th scope="col" class="title-scores">ĐCK</th>
                                    <th scope="col" class="title-scores">TBHKI</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in this.Scores" :key="index">
                                    <td>{{ index + 1 }}</td>
                                    <td class="nameSubject">{{ item.nameSubject }}</td>
                                    <td>{{ item.diemhk1tl }}</td>
                                    <td>{{ item.diemhk115p }}</td>
                                    <td>{{ item.diemhk11t }}</td>
                                    <td>{{ item.diemhk1ck }}</td>
                                    <td><b>{{ item.TBHKI }}</b></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div>
                        <div class="text-center DHK">Kết quả học kì I</div>
                        <table class="table table-primary">
                            <thead>
                                <tr>
                                    <th scope="col" class="title-scores">Điểm trung bình học kì I:</th>
                                    <th scope="col" class="title-scores TBM">
                                        {{ this.TBMHKI }}
                                        <!-- {{
                                        parseFloat(SummaryFunction(this.ScoresSum)).toFixed(2) }} -->
                                        </th>
                                </tr>
                                <tr>
                                    <th scope="col" class="title-scores">
                                        Học lực
                                    </th>
                                    <th scope="col" class="title-scores TBM">
                                        {{ this.rankStudentHKI }}
                                        <!-- {{ Rank(SummaryFunction(this.ScoresSum)) }} -->
                                    </th>
                                </tr>
                            </thead>

                        </table>
                    </div>
                </div>
                <div class="ml-3">
                    <div>
                        <div class="text-center DHK">Bảng điểm học kì II</div>
                        <table class="table table-primary">
                            <thead>
                                <tr>
                                    <th scope="col" class="title-scores">TT</th>
                                    <th scope="col" class="title-scores">Môn</th>
                                    <th scope="col" class="title-scores">ĐM</th>
                                    <th scope="col" class="title-scores">Đ15'</th>
                                    <th scope="col" class="title-scores">ĐGK</th>
                                    <th scope="col" class="title-scores">ĐCK</th>
                                    <th scope="col" class="title-scores">TBHKII</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in this.Scores" :key="index">
                                    <td>{{ index + 1 }}</td>
                                    <td class="nameSubject">{{ item.nameSubject }}</td>
                                    <td>{{ item.diemhk2tl }}</td>
                                    <td>{{ item.diemhk215p }}</td>
                                    <td>{{ item.diemhk21t }}</td>
                                    <td>{{ item.diemhk2ck }}</td>
                                    <td><b>{{ item.TBHKII }}</b></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div>
                        <div>
                            <div class="text-center DHK">Kết quả học kì II</div>
                            <table class="table table-primary">
                                <thead>
                                    <tr>
                                        <th scope="col" class="title-scores">Điểm trung bình học kì II:</th>
                                        <th scope="col" class="title-scores TBM">
                                           {{(this.TBHKII).toFixed(2)}}
                                            <!-- {{
                                            parseFloat(SummaryFunction(this.ScoresSumHKII)).toFixed(2) }} -->
                                        </th>
                                    </tr>
                                    <tr>
                                        <th scope="col" class="title-scores">
                                            Học lực
                                        </th>
                                        <th scope="col" class="title-scores TBM">
                                           {{ this.rankStudentHKII }}
                                            <!-- {{ Rank(SummaryFunction(this.ScoresSumHKII)) }} -->
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div>
                            <div>
                                <div class="text-center DHK mt-5">TỔNG KẾT</div>
                                <table class="table table-primary">
                                    <thead>
                                        <tr>
                                            <th scope="col" class="title-scores">Điểm trung bình cả năm:</th>
                                            <th scope="col" class="title-scores TBM">
                                                {{ (this.TBCN).toFixed(2) }}
                                        
                                            </th>
                                        </tr>
                                        <tr>
                                            <th scope="col" class="title-scores">Học lực</th>
                                            <th scope="col" class="title-scores TBM">
                                                {{ this.rankStudentCN }}
                                                <!-- {{
                                                Rank(sumAB(SummaryFunction(this.ScoresSum),
                                                     SummaryFunction(this.ScoresSumHKII))) }} -->
                                            </th>
                                        </tr>
                                    </thead>
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
import axios from 'axios';
import moment from 'moment';
export default {
    data() {
        return {
            Student: {},
            Class: '',
            Scores: [],
            Summary: '',
            sum: 0,
            ScoresSum: [],
            ScoresSumHKII: [],
            rank: '', 
            TBMHKI:0, 
            TBHKII:0,
            TBCN:0,
            rankStudentHKI:'',
            rankStudentHKII:'', 
            rankStudentCN:'',
        }
    },
    async created() {
        this.username = JSON.parse(localStorage.getItem('user')).username
        this.fullname = JSON.parse(localStorage.getItem('user')).fullname
        this.namsinh = JSON.parse(localStorage.getItem('user')).namsinh
        this.phone = JSON.parse(localStorage.getItem('user')).phone
        this.email = JSON.parse(localStorage.getItem('user')).email
        this.idclass = JSON.parse(localStorage.getItem('user')).myclassID

        let res = await axios.get(`https://htqlthpt.onrender.com/class/info/${this.idclass}`)
        this.Class = res.data

        this.id = JSON.parse(localStorage.getItem('user'))._id
        res = await axios.get(`https://htqlthpt.onrender.com/student/infostudent/${this.id}`)
        this.Student = res.data
        for (let index = 0; index < this.Student.scoresID.length; index++) {
            let res = await axios.get(`https://htqlthpt.onrender.com/scores/showOne/${this.Student.scoresID[index]._id}`)
            this.Scores.push(res.data);
            this.ScoresSum.push(res.data.TBHKI)
            this.ScoresSumHKII.push(res.data.TBHKII)
        }
      
            this.TBMHKI = this.FTBM(this.ScoresSum)
            this.TBHKII = this.FTBM(this.ScoresSumHKII)
            this.TBCN = this.sumAB(parseFloat(this.FTBM(this.ScoresSum)), parseFloat(this.FTBM(this.ScoresSumHKII)))
            this.rankStudentHKI = this.Rank(this.FTBM(this.ScoresSum))
            this.rankStudentHKII = this.Rank(this.FTBM(this.ScoresSumHKII))
            this.rankStudentCN = this.Rank(this.TBCN)
    },

    methods: {

        formatDate(date) {
            return moment(date).format('DD-MM-YYYY');
        },

        FTBM(Scores) {
            this.sum = 0;
            let temp = 0;
            for (let i = 0; i < Scores.length; i++) {
                this.sum += parseFloat(Scores[i])
                temp++
            }
            const sum = parseFloat(this.sum) / temp;
            return sum
        },

        sumAB(a, b) {
            return ((a + b * 2) / 3)
        },

        Rank(DTBHKI) {
            if (DTBHKI >= 8.0) {
                return 'Giỏi'
            }
            else if (DTBHKI >= 6.5) {
                return 'Khá'
            }
            else if (DTBHKI >= 5.0) {
                return 'Trung Bình'
            }
            else if (DTBHKI >= 3.5) {
                return 'Yếu'
            }
            else if (DTBHKI > 0) {
                return 'Kém'
            }
            else if (DTBHKI == undefined) {
                return 'Chưa xếp loại'
            }
        }

    }
}
</script>


<style scoped>
.info-sd {
    display: inline-block;
}

.DHK {
    font-size: large;
    font-weight: bold;
    text-transform: uppercase;
}

.title-scores {
    font-style: italic;
}

.TBM {
    color: red;
}

.TTHS {
    text-transform: uppercase;
    font-weight: 800;
}

.nameSubject {
    font-weight: bold;
    text-transform: uppercase;
}
</style>