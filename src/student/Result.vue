<template>
    <div class="container mt-2">
        <div>
            <div class="text-center">
                <h2>BẢNG ĐIỂM CÁ NHÂN</h2>
            </div>
            <div class="d-flex flex-row mt-2">
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
                        <div class="text-center list-group-item active text-center DHK">Bảng điểm học kì I</div>
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
                                    <td>{{ item.diemhk115p }}
                                        <span v-if="item.diemhk115pl2 != undefined">{{ '| ' +
                                            item.diemhk115pl2 }}</span>
                                    </td>
                                    <td>{{ item.diemhk11t }}</td>
                                    <td>{{ item.diemhk1ck }}</td>
                                    <td><b>{{ item.TBHKI }}</b></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <div class="text-center list-group-item active text-center DHK">Kết quả học kì I</div>
                        <table class="table table-primary">
                            <thead>
                                <tr>
                                    <th scope="col" class="title-scores">Điểm trung bình học kì I:</th>
                                    <th scope="col" class="title-scores TBM">
                                        {{ (this.TBMHKI).toFixed(2) }}
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="col" class="title-scores">
                                        Học lực
                                    </th>
                                    <th scope="col" class="title-scores TBM">
                                        {{ this.rankStudentHKI }}
                                    </th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div>
                        <div class="text-center DHK list-group-item list-group-item-danger mt-2">Điểm trung bình cả năm
                        </div>
                        <table class="table table-primary">
                            <thead>
                                <tr v-for="(item, index) in this.Scores" :key="index">
                                    <th> {{ item.nameSubject }}</th>
                                    <th class="DTBCN">{{ item.TBCN }}</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
                <div class="ml-3">
                    <div>
                        <div class="text-center list-group-item active text-center DHK">Bảng điểm học kì II</div>
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
                                    <td>{{ item.diemhk215p }} <span v-if="item.diemhk215pl2 != undefined">{{ '| ' +
                                        item.diemhk215pl2 }}</span></td>
                                    <td>{{ item.diemhk21t }}</td>
                                    <td>{{ item.diemhk2ck }}</td>
                                    <td><b>{{ item.TBHKII }}</b></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <div>
                            <div class="text-center list-group-item active text-center DHK">Kết quả học kì II</div>
                            <table class="table table-primary">
                                <thead>
                                    <tr>
                                        <th scope="col" class="title-scores">Điểm trung bình học kì II:</th>
                                        <th scope="col" class="title-scores TBM">
                                            {{ (this.TBHKII).toFixed(2) }}
                                        </th>
                                    </tr>
                                    <tr>
                                        <th scope="col" class="title-scores">
                                            Học lực
                                        </th>
                                        <th scope="col" class="title-scores TBM">
                                            {{ this.rankStudentHKII }}
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div>
                            <div>
                                <div class="text-center DHK list-group-item list-group-item-danger mt-2">TỔNG KẾT</div>
                                <table class="table table-primary">
                                    <thead>
                                        <tr>
                                            <th scope="col" class="title-scores">Điểm trung bình cả năm:</th>
                                            <th scope="col" class="title-scores TBM">
                                                {{ (this.TBCN).toFixed(2) }}
                                            </th>
                                        </tr>
                                        <tr v-if="this.Result.conduct != undefined">
                                            <th scope="col" class="title-scores">Đánh giá của GVCN:</th>
                                            <th scope="col" class="title-scores">
                                                <textarea name="" id="" cols="20" rows="2"
                                                    disabled>{{ this.Result.conduct }}</textarea>

                                            </th>
                                        </tr>
                                        <tr v-if="this.Result.rank_conduct != undefined">
                                            <th scope="col" class="title-scores">Xếp loại hạnh kiểm:</th>
                                            <th scope="col" class="title-scores TBM"><i> {{
                                                this.Result.rank_conduct }}</i>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th scope="col" class="title-scores">Học lực</th>
                                            <th scope="col" class="title-scores TBM">
                                                {{ this.rankStudentCN }}
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
            id: '',
            Class: '',
            Scores: [],
            Summary: '',
            Result: {},
            sum: 0,
            ScoresSum: [],
            ScoresSumHKII: [],
            rank: '',
            TBMHKI: 0,
            TBHKII: 0,
            TBCN: 0,
            resultID1: '',
            rankStudentHKI: '',
            rankStudentHKII: '',
            rankStudentCN: '',
            resultID: {
                // Academic_ability: ''
            },
        }
    },

    async created() {
        this.username = JSON.parse(localStorage.getItem('user')).username
        this.fullname = JSON.parse(localStorage.getItem('user')).fullname
        this.namsinh = JSON.parse(localStorage.getItem('user')).namsinh
        this.phone = JSON.parse(localStorage.getItem('user')).phone
        this.email = JSON.parse(localStorage.getItem('user')).email
        this.idclass = JSON.parse(localStorage.getItem('user')).myclassID


        let res = await axios.get(`http://localhost:3000/class/info/${this.idclass}`)
        this.Class = res.data
        this.id = JSON.parse(localStorage.getItem('user'))._id
        res = await axios.get(`http://localhost:3000/student/infostudent/${this.id}`)
        this.Student = res.data
        this.Result = res.data.resultID
        for (let index = 0; index < this.Student.scoresID.length; index++) {
            let res = await axios.get(`http://localhost:3000/scores/showOne/${this.Student.scoresID[index]._id}`)
            this.Scores.push(res.data);
            this.ScoresSum.push(res.data.TBHKI)
            this.ScoresSumHKII.push(res.data.TBHKII)
        }
        this.resultID1 = JSON.parse(localStorage.getItem('user')).resultID
        this.TBMHKI = this.FTBM(this.ScoresSum)
        this.TBHKII = this.FTBM(this.ScoresSumHKII)
        this.TBCN = this.sumAB(parseFloat(this.FTBM(this.ScoresSum)), parseFloat(this.FTBM(this.ScoresSumHKII)))
        this.rankStudentHKI = this.RankHKI(this.FTBM(this.ScoresSum))
        this.rankStudentHKII = this.RankHKII(this.FTBM(this.ScoresSumHKII))
        this.rankStudentCN = this.Rank(this.TBCN)
        this.HL(this.Rank(this.TBCN))

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

        RankHKI(DTB) {
            let toanhki = {};
            let vanhki = {};
            let lyhki = {}
            let sinhhki = {}
            let diahki = {};
            let suhki = {};
            let hoahki = {};
            let gdcdhki = {};
            for (let index = 0; index < this.Scores.length; index++) {
                if (this.Scores[index].nameSubject == 'Toán') {
                    toanhki = this.Scores[index].TBHKI;
                }
                if (this.Scores[index].nameSubject == 'Văn') {
                    vanhki = this.Scores[index].TBHKI
                }
                if (this.Scores[index].nameSubject == 'Hóa') {
                    hoahki = this.Scores[index].TBHKI
                }
                if (this.Scores[index].nameSubject == 'Sinh') {
                    sinhhki = this.Scores[index].TBHKI
                }
                if (this.Scores[index].nameSubject == 'Sử') {
                    suhki = this.Scores[index].TBHKI
                }
                if (this.Scores[index].nameSubject == 'Địa') {
                    diahki = this.Scores[index].TBHKI
                }
                if (this.Scores[index].nameSubject == 'GDCD') {
                    gdcdhki = this.Scores[index].TBHKI
                }
                if (this.Scores[index].nameSubject == 'Lý') {
                    lyhki = this.Scores[index].TBHKI
                }
            }

            if ((DTB >= 8.0 && toanhki >= 6.5 && vanhki >= 6.5 && suhki >= 6.5 && diahki >= 6.5 && sinhhki >= 6.5 && gdcdhki >= 6.5 && lyhki >= 6.5 && hoahki >= 6.5) && (toanhki >= 8.0 || vanhki >= 8.0)) {
                return 'Giỏi'
            }
            else if ((DTB >= 6.5 && toanhki >= 5.0 && vanhki >= 5.0 && suhki >= 5.0 && diahki >= 5.0 && sinhhki >= 5.0 && gdcdhki >= 5.0 && lyhki >= 5.0 && hoahki >= 5.0) && (toanhki >= 6.5 || vanhki >= 6.5)) {
                return 'Khá'
            }
            else if ((DTB >= 5.0 && toanhki >= 3.5 && vanhki >= 3.5 && suhki >= 3.5 && diahki >= 3.5 && sinhhki >= 3.5 && gdcdhki >= 3.5 && lyhki >= 3.5 && hoahki >= 3.5) && (toanhki >= 5.0 || vanhki >= 5.0)) {
                return 'Trung Bình'
            }
            else if ((DTB >= 3.5 && toanhki >= 2.5 && vanhki >= 2.5 && suhki >= 2.5 && diahki >= 2.5 && sinhhki >= 2.5 && gdcdhki >= 2.5 && lyhki >= 2.5 && hoahki >= 2.5) && (toanhki >= 3.5 || vanhki >= 3.5)) {
                return 'Yếu'
            }
            else if (DTB > 0) {
                return 'Kém'
            }
            else if (DTB == undefined) {
                return 'Chưa xếp loại'
            }
            // else if ((toan == undefined || van == undefined || su == undefined || dia == undefined || sinh == undefined || gdcd == undefined || ly == undefined || hoa == undefined)) {
            //     return 'Chưa thể xếp loại'
            // }
        },

        RankHKII(DTB) {
            let toanhkii = {};
            let vanhkii = {};
            let lyhkii = {}
            let sinhhkii = {}
            let diahkii = {};
            let suhkii = {};
            let hoahkii = {};
            let gdcdhkii = {};
            for (let index = 0; index < this.Scores.length; index++) {
                if (this.Scores[index].nameSubject == 'Toán') {
                    toanhkii = this.Scores[index].TBHKII;
                }
                if (this.Scores[index].nameSubject == 'Văn') {
                    vanhkii = this.Scores[index].TBHKII
                }
                if (this.Scores[index].nameSubject == 'Hóa') {
                    hoahkii = this.Scores[index].TBHKII
                }
                if (this.Scores[index].nameSubject == 'Sinh') {
                    sinhhkii = this.Scores[index].TBHKII
                }
                if (this.Scores[index].nameSubject == 'Sử') {
                    suhkii = this.Scores[index].TBHKII
                }
                if (this.Scores[index].nameSubject == 'Địa') {
                    diahkii = this.Scores[index].TBHKII
                }
                if (this.Scores[index].nameSubject == 'GDCD') {
                    gdcdhkii = this.Scores[index].TBHKII
                }
                if (this.Scores[index].nameSubject == 'Lý') {
                    lyhkii = this.Scores[index].TBHKII
                }
            }
            if ((DTB >= 8.0 && toanhkii >= 6.5 && vanhkii >= 6.5 && suhkii >= 6.5 && diahkii >= 6.5 && sinhhkii >= 6.5 && gdcdhkii >= 6.5 && lyhkii >= 6.5 && hoahkii >= 6.5) && (toanhkii >= 8.0 || vanhkii >= 8.0)) {
                return 'Giỏi'
            }
            else if ((DTB >= 6.5 && toanhkii >= 5.0 && vanhkii >= 5.0 && suhkii >= 5.0 && diahkii >= 5.0 && sinhhkii >= 5.0 && gdcdhkii >= 5.0 && lyhkii >= 5.0 && hoahkii >= 5.0) && (toanhkii >= 6.5 || vanhkii >= 6.5)) {
                return 'Khá'
            }
            else if ((DTB >= 5.0 && toanhkii >= 3.5 && vanhkii >= 3.5 && suhkii >= 3.5 && diahkii >= 3.5 && sinhhkii >= 3.5 && gdcdhkii >= 3.5 && lyhkii >= 3.5 && hoahkii >= 3.5) && (toanhkii >= 5.0 || vanhkii >= 5.0)) {
                return 'Trung Bình'
            }
            else if ((DTB >= 3.5 && toanhkii >= 2.5 && vanhkii >= 2.5 && suhkii >= 2.5 && diahkii >= 2.5 && sinhhkii >= 2.5 && gdcdhkii >= 2.5 && lyhkii >= 2.5 && hoahkii >= 2.5) && (toanhkii >= 3.5 || vanhkii >= 3.5)) {
                return 'Yếu'
            }
            else if (DTB > 0) {
                return 'Kém'
            }
            else if (DTB == undefined) {
                return 'Chưa xếp loại'
            }
            // else if ((toan == undefined || van == undefined || su == undefined || dia == undefined || sinh == undefined || gdcd == undefined || ly == undefined || hoa == undefined)) {
            //     return 'Chưa thể xếp loại'
            // }
        },
        Rank(DTB) {
            let toan = {};
            let van = {};
            let ly = {}
            let sinh = {}
            let dia = {};
            let su = {};
            let hoa = {};
            let gdcd = {};
            for (let index = 0; index < this.Scores.length; index++) {
                if (this.Scores[index].nameSubject == 'Toán') {
                    toan = this.Scores[index].TBCN;
                }
                if (this.Scores[index].nameSubject == 'Văn') {
                    van = this.Scores[index].TBCN
                }
                if (this.Scores[index].nameSubject == 'Hóa') {
                    hoa = this.Scores[index].TBCN
                }
                if (this.Scores[index].nameSubject == 'Sinh') {
                    sinh = this.Scores[index].TBCN
                }
                if (this.Scores[index].nameSubject == 'Sử') {
                    su = this.Scores[index].TBCN
                }
                if (this.Scores[index].nameSubject == 'Địa') {
                    dia = this.Scores[index].TBCN
                }
                if (this.Scores[index].nameSubject == 'GDCD') {
                    gdcd = this.Scores[index].TBCN
                }
                if (this.Scores[index].nameSubject == 'Lý') {
                    ly = this.Scores[index].TBCN
                }
            }
            if ((DTB >= 8.0 && toan >= 6.5 && van >= 6.5 && su >= 6.5 && dia >= 6.5 && sinh >= 6.5 && gdcd >= 6.5 && ly >= 6.5 && hoa >= 6.5) && (toan >= 8.0 || van >= 8.0)) {
                return 'Giỏi'
            }
            else if ((DTB >= 6.5 && toan >= 5.0 && van >= 5.0 && su >= 5.0 && dia >= 5.0 && sinh >= 5.0 && gdcd >= 5.0 && ly >= 5.0 && hoa >= 5.0) && (toan >= 6.5 || van >= 6.5)) {
                return 'Khá'
            }
            else if ((DTB >= 5.0 && toan >= 3.5 && van >= 3.5 && su >= 3.5 && dia >= 3.5 && sinh >= 3.5 && gdcd >= 3.5 && ly >= 3.5 && hoa >= 3.5) && (toan >= 5.0 || van >= 5.0)) {
                return 'Trung Bình'
            }
            else if ((DTB >= 3.5 && toan >= 2.5 && van >= 2.5 && su >= 2.5 && dia >= 2.5 && sinh >= 2.5 && gdcd >= 2.5 && ly >= 2.5 && hoa >= 2.5) && (toan >= 3.5 || van >= 3.5)) {
                return 'Yếu'
            }
            else if (DTB > 0) {
                return 'Kém'
            }
            else if (DTB == undefined) {
                return 'Chưa xếp loại'
            }
            // else if ((toan == undefined || van == undefined || su == undefined || dia == undefined || sinh == undefined || gdcd == undefined || ly == undefined || hoa == undefined)) {
            //     return 'Chưa thể xếp loại'
            // }
        },

        HL(a) {
            // console.log(a);
            // console.log(this.id);
            this.resultID.Academic_ability = a
            axios.put(`http://localhost:3000/scores/update/summaryStudent/${this.resultID1}`, this.resultID)
                .then(() => {
                    this.resultID.Academic_ability = a
                })
                .catch(err => {
                    console.log(err);
                })
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

.DTBCN {
    text-align: end;
}
</style>