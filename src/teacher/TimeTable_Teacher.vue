<template>
    <div>
        <div>
            <div class="container">
                <div class="text-title">
                    <h3>
                        Thời khóa biểu
                    </h3>
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
                                <i>{{ info.nameclass }}</i>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="d-flex flex-row">
                    <ul>
                        <li>
                            <i>Buổi sáng: từ tiết 1 đến tiết 5</i>
                        </li>
                        <li>
                            <i>Bắt đầu vào 7h00 sáng - kết thúc 11h20</i>
                        </li>
                        <li>
                            <i>Tiết 1: 7h - 7h45</i>
                        </li>
                        <li>
                            <i>Tiết 2: 7h50 - 8h35</i>
                        </li>
                        <li>
                            <i>Giải lao: 8h35 - 8h55</i>
                        </li>
                        <li>
                            <i>Tiết 3: 8h55 - 9h40</i>
                        </li>
                        <li>
                            <i>Tiết 4: 9h45 - 10h30</i>
                        </li>
                        <li>
                            <i>Tiết 5: 10h35 - 11h20</i>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <i>Buổi sáng: từ tiết 6 đến tiết 9</i>
                        </li>
                        <li>
                            <i>Bắt đầu vào 13h - kết thúc 16h30</i>
                        </li>
                        <li>
                            <i>Tiết 6: 13h - 13h45</i>
                        </li>
                        <li>
                            <i>Tiết 7 13h50 - 14h35</i>
                        </li>
                        <li>
                            <i>Giải lao: 14h35 - 14h55</i>
                        </li>
                        <li>
                            <i>Tiết 8: 14h55 - 15h40</i>
                        </li>
                        <li>
                            <i>Tiết 9: 15h45 - 16h30</i>
                        </li>
                    </ul>
                </div>
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
            }
        }
    },
    mounted() {
        this.abc()
    },
    methods: {
        async abc() {
            const Id = JSON.parse(localStorage.getItem('user'))._id

            let res = await axios.post(`http://localhost:3000/teacher/show/timetable`, { Id })

            const data = res.data
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
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                let thu = element.day
                let tiet = element.lesson
                tkb[tiet][thu].nameclass = element.ClassId.nameclass
            }

            this.tkb = tkb
        },
    }
}
</script>
<style scoped>
.text-title h3 {
    color: #fff;
    background-color: #042954;
    padding: 5px 5px;
    text-align: center;
    text-transform: uppercase;
}

.table td,
.table th {
    padding: 0.25rem;
}
</style>