<template>
    <div>
        <Header></Header>
    </div>
    <div class="d-flex flex-row">
        <div>
            <Menu></Menu>
        </div>
        <div class="container text-center mt-4">
            <div>
                <div class="home1">
                    <div class="square bg-primary">
                        <div class="square_left ">
                            <div class="text_content">
                                Tổng Số Học sinh:
                            </div>
                        </div>
                        <div class="slsv">
                            {{ Student.length }}
                        </div>
                    </div>
                    <div class="square bg-yellow">
                        <div class="square_left">
                            <div class="text_content">
                                Tổng số lớp học:
                            </div>
                        </div>
                        <div class="slsv">
                            {{ Class.length }}
                        </div>
                    </div>
                    <div class="square bg-green">
                        <div class="square_left">
                            <div class="text_content">
                                Tổng số giáo viên:
                            </div>
                        </div>
                        <div class="slsv">
                            {{ Teacher.length }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Header from '../components/Header.vue';
import Menu from '../components/Menu.vue'

export default {
    components: {
        Menu, Header
    },
    data() {
        return {
            Student: [],
            Class: [],
            Teacher: [],
        }
    },

    created() {
        axios.get(`https://htqlthpt.onrender.com/student/show-all`)
            .then(res => {
                this.Student = res.data

            })
            .catch(err => {
                console.log(err);
            })

        axios.get(`https://htqlthpt.onrender.com/class/show`)
            .then(res => {
                this.Class = res.data
            })
            .catch(err => {
                console.log(err);
            })

        axios.get(`https://htqlthpt.onrender.com/teacher/all`)
            .then(res => {
                this.Teacher = res.data
            })
            .catch(err => {
                console.log(err);
            })

    }

}
</script>
<style scoped>
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
</style>