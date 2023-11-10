<template>
    <div class="d-flex flex-row">
        <div>
            <Menu></Menu>
        </div>
        <div class="ml-3" style="width: 100%;">
            <div class="text-title">
                <h2>
                    Sắp xếp thời khóa biểu
                </h2>
            </div>
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
                    <ul class="cls" v-if="List10.length < 1">
                        <h4>Danh sách rỗng</h4>
                    </ul>
                    <ul class="cls" v-for="(item, index) in List10" :key="index">
                        <li class="li10"><button class="btn"  @click="copyID(item)">
                            <router-link class="nameclass" :to="'/admin/create-timetable-class/' + item._id"> Lớp {{ item.nameclass
                            }}
                        </router-link></button>
                        </li>

                    </ul>
                    <div class="mt-5 text-center">Tổng số lớp học: <b>{{ List10.length }}</b> lớp</div>
                </div>

                <div class="tab-pane" id="episodes">
                    <ul class="cls" v-if="List11.length < 1">
                        <h4>Danh sách rỗng</h4>
                    </ul>
                    <ul class="cls" v-for="(item, index) in List11" :key="index">
                        <li class="li10"><button class="btn"  @click="copyID(item)"> 
                            <router-link class="nameclass" :to="'/admin/create-timetable-class/' + item._id"> Lớp {{ item.nameclass
                            }}</router-link>
                        </button>
                            
                        </li>
                    </ul>
                    <div class="mt-5 text-center">Tổng số lớp học: <b> {{ List11.length }}</b> lớp</div>
                </div>

                <div class="tab-pane" id="episode">
                    <ul class="cls" v-if="List12.length < 1">
                        <h4>Danh sách rỗng</h4>
                    </ul>
                    <ul class="cls" v-for="(item, index) in List12" :key="index">
                        <li class="li10"><button class="btn" @click="copyID(item)">
                            <router-link class="nameclass" :to="'/admin/create-timetable-class/' + item._id"> Lớp {{ item.nameclass
                            }}</router-link>
                            </button>
                        </li>
                    </ul>
                    <div class="mt-5 text-center">Tổng số lớp học: <b>{{ List12.length }}</b> lớp</div>
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
            id:''
            // nk: '',
            // year:[],
            // sul:''

        }
    },
    created() {
        //localStorage.removeItem('IDCLASS')
        axios.get(`http://localhost:3000/class/show/class10`)
            .then(res => {
                this.List10 = res.data;
            })
            .catch(err => {
                console.log(err);
            }),
            axios.get(`http://localhost:3000/class/show/class11`)
                .then(res => {
                    this.List11 = res.data;
                })
                .catch(err => {
                    console.log(err);
                }),
            axios.get(`http://localhost:3000/class/show/class12`)
                .then(res => {
                    this.List12 = res.data;
                })
                .catch(err => {
                    console.log(err);
                })
    },

    methods:{
        copyID(user){
            this.id = user._id
            localStorage.setItem('IDCLASS', JSON.stringify(this.id));
            console.log(this.id);
            window.location.reload()
        }
    }


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

.text-title h2 {
    color: #fff;
    background-color: #042954;
    padding: 10px 10px;
    text-align: center;
    margin-bottom: 10px;
    text-transform: uppercase;
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

.btn{
    padding: 0;
}

</style>