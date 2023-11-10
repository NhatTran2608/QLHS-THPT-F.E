<template>
    <div>
        <Header></Header>
        <div class="d-flex flex-row">
            <div class="text-center" style="width: 100%;">
                <div>
                    <Menu></Menu>
                </div>
                <div>
                    <div class="mt-4 home1 d-flex flex-row">
                        <button type="button" class="btn square bg-primary" data-container="body" data-toggle="popover"
                            data-placement="bottom">
                            <div class="text_content">
                                Tổng số học sinh:
                            </div>
                            <div class="slsv">
                                {{ Student.length }}
                            </div>
                        </button>

                        <button type="button" class="btn square bg-yellow" data-container="body" data-toggle="popover"
                            data-placement="bottom" :data-content="'Tổng số học sinh ' + Student.length">
                            <div class="text_content">
                                Tổng số lớp học:
                            </div>
                            <div class="slsv">
                                {{ Class.length }}
                            </div>
                        </button>

                        <button type="button" class="btn square bg-green" data-container="body" data-toggle="popover"
                            data-placement="bottom" :data-content="'Tổng số học sinh ' + Student.length">
                            <div class="text_content">
                                Tổng số giáo viên:
                            </div>
                            <div class="slsv">
                                {{ Teacher.length }}
                            </div>
                        </button>
                    </div>
                </div>
            </div>

        </div>
        <div class="text-center">
            <div class="container mt-2 mr-5">
                <Bar class="bar-home" :data="chartData" :options="options" :style="myStyles" />
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Header from '../components/Header.vue';
import Menu from '../components/Menu.vue'
import { Bar, PolarArea } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, RadialLinearScale, ArcElement } from 'chart.js'
export default {
    components: {
        Menu, Header,
        Bar,
        PolarArea
    },
    data() {
        return {
            Student: [],
            Class: [],
            Teacher: [],
            StudentMen: [],
            StudentGirl: [],
            nam: 0,
            nu: 0,
            chartData: {
                labels: [
                    'Nam',
                    'Nữ',
                ],
                datasets: [
                {
                        label: 'Nam',
                        data: [0],
                        backgroundColor: [
                            '#ffc107',
                            // '#198754',
                            // '#dc3545'
                        ]
                    },
                    {
                        label: 'Nữ',
                        data: [0],
                        backgroundColor: [
                            '#0d6efd',
                            // '#198754',
                            // '#dc3545'
                        ]
                    }
                ],
            },
            options: {
                responsive: true,
            },
        }
    },

    async created() {
        $(function () {
            $('[data-toggle="popover"]').popover();
        })
        axios.get(`http://localhost:3000/student/show-all`)
            .then(res => {
                let AB = []
                for (let index = 0; index < res.data.length; index++) {
                    if (res.data[index].role == 'HS')
                        AB.push(res.data[index])
                }
                this.Student = AB
            })
            .catch(err => {
                console.log(err);
            })

        axios.get(`http://localhost:3000/class/show`)
            .then(res => {
                this.Class = res.data
            })
            .catch(err => {
                console.log(err);
            })

        axios.get(`http://localhost:3000/teacher/all`)
            .then(res => {
                this.Teacher = res.data
            })
            .catch(err => {
                console.log(err);
            })

        let res = await axios.get(`http://localhost:3000/student/show-all`)
        let temp_men = []
        for (let index = 0; index < res.data.length; index++) {
            if (res.data[index].gioitinh == 'Nam' && res.data[index].role == 'HS')
                temp_men.push(res.data[index])
        }
        this.StudentMen = temp_men
        let resnu = await axios.get(`http://localhost:3000/student/show-all`)
        let temp_gril = []
        for (let index = 0; index < resnu.data.length; index++) {
            if (resnu.data[index].gioitinh == 'Nữ' && resnu.data[index].role == 'HS')
                temp_gril.push(resnu.data[index])
        }

        this.StudentGirl = temp_gril

    },

    mounted() {
        this.chart()
    },
    computed: {
        myStyles() {
            return {
                height: `${335}px`,
                position: 'relative',
                width: `${690}px`
            }
        }
    },
    methods: {
        async chart() {
            let res = await axios.get(`http://localhost:3000/student/show-all`)
            let temp_men = []
            for (let index = 0; index < res.data.length; index++) {
                if (res.data[index].gioitinh == 'Nam' && res.data[index].role == 'HS')
                    temp_men.push(res.data[index])
            }
            this.StudentMen = temp_men
            let resnu = await axios.get(`http://localhost:3000/student/show-all`)
            let temp_gril = []
            for (let index = 0; index < resnu.data.length; index++) {
                if (resnu.data[index].gioitinh == 'Nữ' && resnu.data[index].role == 'HS')
                    temp_gril.push(resnu.data[index])
            }
            this.chartData = {
                labels: [
                    'Thống kê số học sinh nam và nữ'

                ],
                datasets: [
                    {
                        label: 'Nam',
                        data: [temp_men.length],
                        backgroundColor: [
                            '#ffc107',
                        ]
                    },
                    {
                        label: 'Nữ',
                        data: [temp_gril.length],
                        backgroundColor: [
                            '#0d6efd',
                        ]
                    }
                ],
            }
        }
    }

}
</script>
<style scoped>
.bar-home {
    width: 500px;
    height: 100px;
    margin-left: 300px;
}

.PolarAreaChart-text {
    text-align: center;
    margin: auto;
}

.img-admin {
    text-align: center;
    margin: auto;
    width: 100px;
}

.home1 {
    display: flex;
    justify-content: space-between;
    margin-left: 285px;
}

.square {
    color: #fff;
    display: flex;
    align-items: center;
    width: 25%;
    border-radius: 5px;
    margin: 10px;
    padding: 20px 10px;
}

.square_left {
    display: flex;
    justify-content: center;
    padding: 10px;
}

.bg-primary {
    background-color: #0d6efd;
}

.bg-yellow {
    background-color: #ffc107;
}

.bg-green {
    background-color: #198754;
}

.bg-red {
    background-color: #dc3545;
}

.slsv {
    width: 50%;
    display: flex;
    margin-left: 20px;
    font-size: 30px;
    font-weight: 600;
    justify-content: center;
}

/*Ipad dọc(768 x 1024)*/
/*Ipad dọc(768 x 1024)*/
@media only screen and (min-width: 740px) and (max-width:1023px) {}

/*Iphone(480 x 640)*/
@media only screen and (max-width: 739px) {
    .square {
        color: #fff;
        display: flex;
        align-items: center;
        width: 25%;
        border-radius: 5px;
        margin: 10px;
        padding: 10px 10px;
    }

    .slsv {
        width: 50%;
        display: flex;
        margin-left: 20px;
        font-size: 30px;
        font-weight: 400;
        justify-content: center;
    }
}
</style>