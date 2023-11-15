<template>
    <div class="container">
        <div class="text-center">
            <h2>Mục tiêu học tập</h2>
        </div>
        <div class="row mt-3">
            <input type="radio" name="subject" id="mtoan" class="mhoc mh1" @click="check(this.value = 'Toán')" value="Toán"
                v-model="this.value">
            <div class="col-sm col-result result1">
                <label class="lb_subject" for="mtoan">Môn Toán</label>
            </div>
            <input type="radio" name="subject" id="mly" class="mhoc mh2" @click="check(this.value = 'Lý')" value="Lý"
                v-model="this.value">
            <div class="col-sm col-result result2">
                <label class="lb_subject" for="mly">Môn Lý</label>
            </div>
            <input type="radio" name="subject" id="mhoa" class="mhoc mh3" @click="check(this.value = 'Hóa')" value="Hóa"
                v-model="this.value">
            <div class="col-sm col-result result3">
                <label class="lb_subject" for="mhoa">Môn Hóa</label>
            </div>
            <input type="radio" name="subject" id="msinh" class="mhoc mh4" @click="check(this.value = 'Sinh')" value="Sinh"
                v-model="this.value">
            <div class="col-sm col-result result4">
                <label class="lb_subject" for="msinh">Môn Sinh</label>
            </div>
            <input type="radio" name="subject" id="mvan" class="mhoc mh5" @click="check(this.value = 'Văn')" value="Văn"
                v-model="this.value">
            <div class="col-sm col-result result5">
                <label class="lb_subject" for="mvan">Môn Văn</label>
            </div>
            <input type="radio" name="subject" id="msu" class="mhoc mh6" @click="check(this.value = 'Sử')" value="Sử"
                v-model="this.value">
            <div class="col-sm col-result result6">
                <label class="lb_subject" for="msu">Môn Sử</label>
            </div>
            <input type="radio" name="subject" id="mdia" class="mhoc mh7" @click="check(this.value = 'Địa')" value="Địa"
                v-model="this.value">
            <div class="col-sm col-result result7">
                <label class="lb_subject" for="mdia">Môn Địa</label>
            </div>
            <input type="radio" name="subject" id="mgdcd" class="mhoc mh8" @click="check(this.value = 'GDCD')" value="GDCD"
                v-model="this.value">
            <div class="col-sm col-result result8">
                <label class="lb_subject" for="mgdcd">Môn GDCD</label>
            </div>
        </div>

        <input type="checkbox" id="check-filter" class="box-filter">
        <label class="cls-filter" for="check-filter"><i class="fas fa-filter"></i></label>

        <input type="checkbox" name="" id="hk1" class="hk1">
        <label class="cls-label cls-label1" for="hk1">Học kì 1</label>

        <input type="checkbox" name="" id="hk2" class="hk2">
        <label class="cls-label cls-label2" for="hk2">Học kì 2</label>

        <div class="scores-hk1">
            <div class="row mt-3">
                <div class="col-sm">
                    <h5>🔎 HỌC KÌ I</h5>
                </div>
            </div>
            <table class="table">
                <thead class="thead-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Môn học</th>
                        <th scope="col">Điểm miệng</th>
                        <th scope="col">Điểm 15 phút</th>
                        <th scope="col">Điểm 1 tiết</th>
                        <th scope="col">Điểm cuối kì</th>
                        <th scope="col">Điểm TB học kì</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>
                            <h4>{{ this.value }}</h4>
                        </td>

                        <td v-if="(this.DMIENG_I != undefined || this.DMIENG_I != null)">
                            {{ this.DMIENG_I }}
                        </td>
                        <td v-if="(this.DMIENG_I == undefined || this.DMIENG_I == null)">
                            Chưa nhập điểm
                        </td>

                        <td v-if="(this.D15PHUT_I != undefined || this.D15PHUT_I != null)">
                            {{ this.D15PHUT_I }}
                            <span v-if="this.D15PHUT_IL2 != undefined">
                                {{ '| ' + this.D15PHUT_IL2 }}
                            </span>
                        </td>
                        <td v-if="(this.D15PHUT_I == undefined || this.D15PHUT_I == null)">
                            Chưa nhập điểm
                        </td>

                        <td v-if="(this.D1T_I != undefined || this.D1T_I != null)">
                            {{ this.D1T_I }}
                        </td>
                        <td v-if="(this.D1T_I == null || this.D1T_I == undefined)">
                            Chưa nhập điểm
                        </td>

                        <td v-if="this.DCHKI != undefined || this.DCHKII != null">
                            {{ this.DCHKI }}
                        </td>
                        <td v-if="this.DCHKI == undefined || this.DCHKI == null">
                            Chưa nhập điểm
                        </td>
                        <td v-if="this.DTBHKI != undefined || this.DTBHKI != null">
                            {{ this.DTBHKI }}
                        </td>
                        <td v-if="this.DTBHKI == undefined || this.DTBHKI == null">
                            Chưa tính điểm
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="scores-hk2">
            <div class="row mt-3">
                <div class="col-sm">
                    <h5>🔎 HỌC KÌ II</h5>
                </div>
            </div>

            <table class="table">
                <thead class="thead-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Môn học</th>
                        <th scope="col">Điểm miệng</th>
                        <th scope="col">Điểm 15 phút</th>
                        <th scope="col">Điểm 1 tiết</th>
                        <th scope="col">Điểm cuối kì</th>
                        <th scope="col">Điểm TB học kì</th>
                        <th scope="col">Điểm TB cả năm</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>
                            <h4>{{ this.value }}</h4>
                        </td>
                        <td v-if="this.DMIENG_II != undefined || this.DMIENG_II != null">
                            {{ this.DMIENG_II }}
                        </td>
                        <td v-if="this.DMIENG_II == undefined || this.DMIENG_II == null">
                            Chưa nhập điểm
                        </td>
                        <td v-if="this.D15PHUT_II != undefined || this.D15PHUT_II != null">
                            {{ this.D15PHUT_II }}
                            <span v-if="this.D15PHUT_IIL2 != undefined">
                                {{ '| ' + this.D15PHUT_IIL2 }}
                            </span>
                        </td>
                        <td v-if="this.D15PHUT_II == undefined || this.D15PHUT_II == null">
                            Chưa nhập điểm
                        </td>
                        <td v-if="this.D1T_II != undefined || this.D1T_II != null">
                            {{ this.D1T_II }}
                        </td>
                        <td v-if="this.D1T_II == undefined || this.D1T_II == null">
                            Chưa nhập điểm
                        </td>
                        <td v-if="this.DCHKII != undefined || this.DCHKII != null">
                            {{ this.DCHKII }}
                        </td>
                        <td v-if="this.DCHKII == undefined || this.DCHKII == null">
                            Chưa nhập điểm
                        </td>
                        <td v-if="this.DTBHKII != undefined || this.DTBHKII != null">
                            {{ this.DTBHKII }}
                        </td>
                        <td v-if="this.DTBHKII == undefined || this.DTBHKII == null">
                            Chưa tính điểm
                        </td>
                        <td v-if="this.DTBCN != undefined || this.DTBCN != null">
                            {{ this.DTBCN }}
                        </td>
                        <td v-if="this.DTBCN == undefined || this.DTBCN == null">
                            Chưa tính điểm
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            value: '',
            Student: {},
            namesubject: '',
            DTBCN: undefined,
            DMIENG_I: undefined,
            D15PHUT_I: undefined,
            D15PHUT_IL2: undefined,
            D1T_I: undefined,
            DCHKI: undefined,
            DCHKII: undefined,
            DMIENG_II: undefined,
            D15PHUT_II: undefined,
            D15PHUT_IIL2: undefined,
            D1T_II: undefined,
            DTBHKII: undefined,
            DTBHKI: undefined,
        }
    },

    created() {
        this.id = JSON.parse(localStorage.getItem('user'))._id
        axios.get(`http://localhost:3000/student/infostudent/${this.id}`)
            .then(res => {
                this.Student = res.data
                for (let index = 0; index < this.Student.scoresID.length; index++) {
                    this.namesubject = this.Student.scoresID[index].nameSubject
                    if (this.id == this.value) {
                        console.log(this.Student.scoresID[index].TBCN);
                    }
                }
            })
            .catch(err => console.log(err))
    },

    methods: {
        check(nameS) {
            if (nameS != '') {
                const id = JSON.parse(localStorage.getItem('user'))._id
                axios.get(`http://localhost:3000/student/infostudent/${id}`)
                    .then(res => {
                        this.Student = res.data
                        for (let index = 0; index < this.Student.scoresID.length; index++) {
                            this.namesubject = this.Student.scoresID[index].nameSubject
                            if (this.namesubject == nameS) {
                                this.DMIENG_I = this.Student.scoresID[index].diemhk1tl
                                this.D15PHUT_I = this.Student.scoresID[index].diemhk115p
                                this.D15PHUT_IL2 = this.Student.scoresID[index].diemhk115pl2
                                this.D1T_I = this.Student.scoresID[index].diemhk11t
                                this.DCHKI = this.Student.scoresID[index].diemhk1ck
                                this.DTBHKI = this.Student.scoresID[index].TBHKI
                                this.DMIENG_II = this.Student.scoresID[index].diemhk2tl
                                this.D15PHUT_II = this.Student.scoresID[index].diemhk215p
                                this.D15PHUT_IIL2 = this.Student.scoresID[index].diemhk215pl2
                                this.D1T_II = this.Student.scoresID[index].diemhk21t
                                this.DCHKII = this.Student.scoresID[index].diemhk2ck
                                this.DTBHKII = this.Student.scoresID[index].TBHKII
                                this.DTBCN = this.Student.scoresID[index].TBCN
                            }
                        }
                    })
                    .catch(err => console.log(err))
            }
        }
    }

}
</script>
<style scoped>
.col-result {
    padding: 0;
    border: 1px solid black;
    margin: 5px;
    text-align: center;
    cursor: pointer;

}

.col-result {
    border-radius: 5px;
}


.lb_subject {
    padding: 18px;
    cursor: pointer;
}


.mh1:checked~.result1 {
    background-color: aqua;
}

.mh2:checked~.result2 {
    background-color: aqua;
}

.mh3:checked~.result3 {
    background-color: aqua;
}

.mh4:checked~.result4 {
    background-color: aqua;
}

.mh5:checked~.result5 {
    background-color: aqua;
}

.mh6:checked~.result6 {
    background-color: aqua;
}

.mh7:checked~.result7 {
    background-color: aqua;
}

.mh8:checked~.result8 {
    background-color: aqua;
}

.mhoc {
    display: none;
}

.fa-filter {
    margin-top: 5px;
    padding: 15px;
    color: blue;
    background-color: aqua;
    border-radius: 5px;

}

#check-filter {
    display: none;

}

.cls-filter {
    cursor: pointer;
}

.box-filter:checked~.cls-label {
    display: none;
}

.cls-label {
    display: inline-block;
    margin-right: 10px;
    margin-left: 10px;
    cursor: pointer;
    padding: 10px;
    background-color: rgb(255, 255, 255);
    border-radius: 5px;
    border: 1px solid black;
}

.hk1 {
    display: none;
}

.hk2 {
    display: none;
}

.hk1:checked~.cls-label1 {
    background-color: aqua;
}

.hk2:checked~.cls-label2 {
    background-color: aqua;
}

.hk1:checked~.scores-hk1 {
    display: block;
}

.hk2:checked~.scores-hk2 {
    display: block;
}

.scores-hk1 {
    display: none;
}

.scores-hk2 {
    display: none;
}
</style>