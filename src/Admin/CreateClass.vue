<template>
    <div class="d-flex flex-row">
        <div>
            <Menu></Menu>
        </div>
        <div class="ml-3" style="width: 100%;">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a href="" data-target="#general" data-toggle="tab" class="nav-link active">Lớp 10</a>
                </li>
                <li class="nav-item">
                    <a href="" data-target="#episodes" data-toggle="tab" class="nav-link">Lớp 11</a>
                </li>
                <li class="nav-item">
                    <a href="" data-target="#episode" data-toggle="tab" class="nav-link">Lớp 12</a>
                </li>
            </ul>

            <div class="tab-content py-4 text-center">
                <div class="tab-pane active" id="general">
                    <ul class="cls" v-for="(item, index) in List10" :key="index">
                        <li class="li10">
                            <router-link class="nameclass" :to="'/class/list/' + item._id"> Lớp {{ item.nameclass
                            }}</router-link>
                        </li>

                    </ul>
                    <div class="mt-5 text-center">Tổng số lớp học: <b>{{ List10.length }}</b> lớp</div>
                </div>

                <div class="tab-pane" id="episodes">
                    <ul class="cls" v-for="(item, index) in List11" :key="index">
                        <li class="li10">
                            <router-link class="nameclass" :to="'/class/list/' + item._id"> Lớp {{ item.nameclass
                            }}</router-link>
                        </li>

                    </ul>
                    <div class="mt-5 text-center">Tổng số lớp học: <b> {{ List11.length }}</b> lớp</div>
                </div>

                <div class="tab-pane" id="episode">
                    <ul class="cls" v-for="(item, index) in List12" :key="index">
                        <li class="li10">
                            <router-link class="nameclass" :to="'/class/list/' + item._id"> Lớp {{ item.nameclass
                            }}</router-link>
                        </li>

                    </ul>
                    <div class="mt-5 text-center">Tổng số lớp học: <b>{{ List12.length }}</b> lớp</div>
                </div>
            </div>


            <button type="button" class="btn btn-primary addclass" data-toggle="modal" data-target="#exampleModalCenter">
                Thêm lớp học
            </button>

            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"
                aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Thêm lớp học</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form method="post" @submit.prevent="create_class">
                                <div>
                                    <div class="class">
                                        <select required="true" v-model="Class.grade">
                                            <option value="">--Chọn khối--</option>
                                            <option value="10">Khối 10</option>
                                            <option value="11">Khối 11</option>
                                            <option value="12">Khối 12</option>
                                        </select>
                                    </div>

                                    <div class="class" v-if="Class.grade != ''">
                                        <select name="" id="" required="true" v-model="Class.nameclass">
                                            <option value="">--Chọn lớp--</option>
                                            <option :value="this.Class.grade + 'a1'">A1</option>
                                            <option :value="this.Class.grade + 'a2'">A2</option>
                                            <option :value="this.Class.grade + 'a3'">A3</option>
                                        </select>
                                    </div>

                                    <!-- <div class="class" v-if="Class.nameclass != ''">
                                    Năm học bắt đầu:
                                    <select id="dob" v-model="this.nk" required="true">
                                        <option value="0">Year:</option>
                                        <option v-for="year in years" :value="year">{{ year }}</option>
                                    </select> -->
                                    <!-- {{ ((this.nk) + " - " +  (this.nk + 1)).toString() }} -->
                                    <!-- </div>
                                <div>
                                    <select name="" id="" v-model="Class.schoolyear" required="true">
                                        <option value=""></option>
                                        <option selected :value="format(this.nk)">
                                        
                                        </option>
                                    </select>
                                </div>
                             -->
                                    <div v-if="Class.nameclass != ''">
                                        <h5>Bạn muốn tạo lớp học <b>{{ Class.nameclass }}</b>?</h5>
                                    </div>
                                    <!-- <div v-if="(this.nk)!=''">
                                    <h5>Niên khóa: <b>{{ format(this.nk) }}</b></h5>
                                </div> -->
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                                    <button class="btn btn-primary">Tạo</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import axios from 'axios';
import Menu from '../components/Menu.vue'
export default {
    components: {
        Menu
    },
    data() {
        return {
            List10: [{}],
            List11: [{}],
            List12: [{}],
            Class: {
                grade: "",
                nameclass: '',
                //schoolyear: '',
            },
            // nk: '',
            // year:[],
            // sul:''

        }
    },
    created() {
        axios.get(`https://htqlthpt.onrender.com/class/show/class10`)
            .then(res => {
                this.List10 = res.data;
            })
            .catch(err => {
                console.log(err);
            }),
            axios.get(`https://htqlthpt.onrender.com/class/show/class11`)
                .then(res => {
                    this.List11 = res.data;
                })
                .catch(err => {
                    console.log(err);
                }),
            axios.get(`https://htqlthpt.onrender.com/class/show/class12`)
                .then(res => {
                    this.List12 = res.data;
                })
                .catch(err => {
                    console.log(err);
                })
    },
    methods: {
        create_class() {
            axios.post(`https://htqlthpt.onrender.com/class/add`, this.Class)
                .then(res => {
                    this.Class = ''
                    window.location.reload()
                })
                .catch(err => {
                    console.log(err);
                    alert(err.response.data.mes)
                })
        },

        // format(nk) {
        //     const sul = ((this.nk) + " - " + (this.nk + 1)).toString()
        //     // console.log(typeof (sul));
        //     // console.log(sul);

        //     return sul
        // },
    },

    // computed: {
    //     years() {
    //         const year = new Date().getFullYear()
    //         return Array.from({ length: year - 2000 }, (value, index) => 2001 + index)
    //     }
    // }

}
</script>
<style scoped>
.class {
    margin: 20px;
    display: inline-block;
}

.nameclass {
    color: #fff;
}

.modal-body {
    text-align: center;
}

.addclass {
    /* position: absolute; */
    right: 0;
    top: 30px;
    position: fixed;
    z-index: 1;
}

.li10 {
    cursor: pointer;
    background-color: green;
    color: rgb(255, 255, 255);
    display: inline-block;
    padding: 20px;
    margin: 5px;
    border-radius: 5px;
}

.cls {
    display: inline-block;
    padding-left: 0;
}

.nameclass:hover {
    text-decoration: none;
    color: red;
}

.tab-pane {
    text-align: center;
}
</style>