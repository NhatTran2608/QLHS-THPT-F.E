<template>
    <div class="d-flex flex-row">
        <div>
            <Menu></Menu>
        </div>
        <div class="form-GV container">
            <div class="text-title">
                <h2>
                    Phân công giảng dạy
                </h2>
            </div>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th class="text-center" scope="col">TT</th>
                        <th class="text-center" scope="col">MSCB</th>
                        <th class="text-center" scope="col">Họ & Tên</th>
                        <th class="text-center" scope="col">Môn giảng dạy</th>
                        <th class="text-center" scope="col">Lớp phụ trách GD</th>
                        <th class="text-center" scope="col">Phân công GD</th>
                    </tr>
                </thead>
                <tbody v-for="(item, index) in Teacher" :key="index">
                    <tr>
                        <td class="text-center">{{ index + 1 }}</td>
                        <td class="text-center">{{ item.username }}</td>
                        <td>{{ item.fullname }}</td>
                        <td class="text-center">{{ item.subject }}</td>
                        <td class="text-center">
                            <div class="item-nameclass" v-for="(i, indexz) in Teacher[index].classID" :key="indexz">
                                {{ i.nameclass }} &nbsp; &nbsp;
                            </div>
                        </td>
                        <td class="text-center">
                            <button class="buttom-dispatch" @click="edit(item)"><i class="fas fa-retweet"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
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
            Teacher: [],
            id: '',
            TC: '',
        }
    },
    created() {
        axios.get(`http://localhost:3000/teacher/all`)
            .then(res => {
                this.Teacher = res.data

            })
            .catch(err => {
                console.log(err);
            })

    },

    ///admin/edit/class_teacher/:id
    methods: {
        edit(id) {
            this.$router.replace({ path: `/admin/edit/class_teacher/${id._id}` })
            localStorage.setItem('editclassid', JSON.stringify(id))
        }
    },
}
</script>
<style scoped>
.buttom-dispatch {
    border: none;
    border-radius: 5px;
    background-color: aqua;
    padding: 10px;
}

.form-GV{
    width: 100%;
}

.buttom-dispatch:hover {
    background-color: blue;
}

.text-title h2 {
    color: #fff;
    background-color: #042954;
    padding: 10px 10px;
    text-align: center;
    margin-bottom: 10px;
    text-transform: uppercase;
}

.item-nameclass {
    display: inline-block;
}
</style>