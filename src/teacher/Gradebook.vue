<template>
    <div class="d-flex flex-row">
        <div>
            <Menu></Menu>
        </div>
        <div class="container">
            <div class="text-center mt-2">
                <h3>SỔ ĐIỂM</h3>
            </div>
            <div class="class-form">
                <div class="class-for" v-for="(item, index) in Teacher.classID" :key="index">
                    <div class="class-item">
                        <label style="cursor: pointer;" :for="index"> Lớp {{ item.nameclass }} </label>
                        <input style="display: none;" type="radio" name="ad" :id="index" :value="item._id"
                            v-model="this.temp">
                    </div>
                </div>

                <div v-if="this.temp">
                    {{ pushscores(this.temp) }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Menu from '../components/Menu.vue'

export default {
    components:{
        Menu
    },
    data() {
        return {
            Teacher: {},
            temp: '',
            idz: ''
        }
    },
    created() {
        const id = JSON.parse(localStorage.getItem('user'))._id
        axios.get(`http://localhost:3000/teacher/show/${id}`)
            .then(res => {
                //localStorage.setItem('classid', JSON.stringify(res.data))
                console.log(res.data);
                this.Teacher = res.data
            })
            .catch(err => console.log(err))
    },
    methods: {
        pushscores(idz) {
            this.$router.replace({ path: `/teacher/list/scores/${idz}` })
            localStorage.setItem('classid', JSON.stringify(idz))
        },
    }
}
</script>
<style scoped>
.class-for {
    display: inline-block;
    margin: 10px;
    padding: 15px;
    background-color: green;
    color: #fff;
    margin-top: 10px;
    border-radius: 5px;
    cursor: pointer;
}

.class-for:hover {
    color: red;
}

.class-form {
    text-align: center;
}
</style>