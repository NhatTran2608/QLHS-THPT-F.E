
<template >
    <div class="form-register d-flex flex-row">
        <div>
            <Menu></Menu>
        </div>
        <div class="container">
            <form method="post" @submit.prevent="editinfo" id="frmDangKyThanhVien">
                <table border="1" width="800px" cellspacing="0" cellpadding="10px">
                    <td colspan="2" align="center">
                        <li class="list-group-item active">CẬP NHẬT THÔNG TIN CÁ NHÂN</li>
                    </td>
                    <!-- Họ tên row - Start -->
                    <tr>
                        <td width="100px">
                            <label for="txtTK">Tài Khoản:</label>
                        </td>
                        <td>
                            <input type="text" name="txtTK" id="txtTK" required="required" placeholder="Vui lòng mã số user"
                                autofocus="autofocus" title="Nhập họ tên phải viết hoa toàn bộ" disabled
                                v-model="Teacher.username" />
                        </td>
                    </tr>
                    <tr>
                        <td width="100px">
                            <label for="txtHoTen">Họ tên:</label>
                        </td>
                        <td>
                            <input type="text" name="txtHoTen" id="txtHoTen" required="required"
                                placeholder="Vui lòng nhập Họ tên" autofocus="autofocus" disabled
                                title="Nhập họ tên phải viết hoa toàn bộ" v-model="Teacher.fullname" />
                        </td>
                    </tr>
                    <!-- Họ tên row - End -->
                    <!-- Mật khẩu row - Start -->
                    <tr>
                        <td>
                            <label for="gt">Giới tính:</label>
                        </td>
                        <td>
                            <select name="gt" id="gt" v-model="this.Teacher.sex" disabled>
                                <option selected value="">--Chọn giới tính--</option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="numTuoi">Ngày Tháng Năm Sinh:</label>
                        </td>
                        <td>
                            <input type="date" name="numTuoi" id="numTuoi" v-model="this.Teacher.birth" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="txtEmail">Email có thể liên hệ:</label>
                        </td>
                        <td>
                            <input type="email" placeholder="acb@gmail.com" name="txtEmail" id="txtEmail" required="true"
                                v-model="this.Teacher.email" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="txtcccd">CMND/CCCD:</label>
                        </td>
                        <td>
                            <input type="text" placeholder="Nhập CMND/CCCD" name="txtcccd" id="txtcccd" required="true"
                                v-model="this.Teacher.cccd" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="txtSoDienThoai">Số điện thoại:</label>
                        </td>
                        <td>
                            <input type="tel" name="txtSoDienThoai" id="txtSoDienThoai" required="true" pattern="[0-9]{10,}"
                                title="Định dạng là nhập là: Nhập 10 số trở lên xxxxxxxxxx"
                                placeholder="Nhập 10 số trở lên xxxxxxxxxx" v-model="this.Teacher.phone" />
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" align="center">
                            <button class="btn btn-primary text-uppercase">Cập nhật</button>
                            <router-link class="btn btn-primary text-uppercase" to="/teacher/home">Quay
                                lại</router-link>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    </div>
</template>
<script>
import Menu from '../components/Menu.vue'
import axios from 'axios';
import { data } from '../Data_City/dataJson'
export default {
    components:{
        Menu
    },
    data() {
        return {
            Teacher: {
                gioitinh: '',
                tp: '',
                xa: '',
                huyen: '',
                grade: '',
            },
            id: this.$route.params.id,
        }
    },

    created() {
        axios.get(`http://localhost:3000/teacher/show/${this.id}`)
            .then(res => {
                this.Teacher = res.data;

            })
            .catch(err => {
                console.log(err);
            })
    },


    methods: {

        editinfo() {
            axios.put(`http://localhost:3000/teacher/updateInfo/${this.id}`, this.Teacher)
                .then(() => {
                    window.location.reload()
                },)
                .catch(err => {
                    console.log(err)
                });

        },

        setTp(e) {
            const id = e.target.value
            for (let x of data) {
                if (x.Id === id) {
                    console.log(x)
                    this.tp = x
                }
            }
        },
        setHuyen(e) {
            const id = e.target.value
            for (let x of this.tp.Districts) {
                if (x.Id === id) {
                    console.log(x)
                    this.huyen = x
                }
            }
        },
        setXa(e) {
            const id = e.target.value
            for (let x of this.huyen.Wards) {
                if (x.Id === id) {
                    console.log(x)
                    this.xa = x
                }
            }
        },
        renderCity(data, citis, districts, wards) {
            for (const x of data) {
                citis.options[citis.options.length] = new Option(x.Name, x.Id);
            }
            citis.onchange = function () {
                district.length = 1;
                ward.length = 1;
                if (this.value != "") {
                    const result = data.filter(n => n.Id === this.value);
                    for (const k of result[0].Districts) {
                        district.options[district.options.length] = new Option(k.Name, k.Id);
                    }
                }
            };
            districts.onchange = function () {
                ward.length = 1;
                const dataCity = data.filter((n) => n.Id === citis.value);
                if (this.value != "") {
                    const dataWards = dataCity[0].Districts.filter(n => n.Id === this.value)[0].Wards;

                    for (const w of dataWards) {
                        wards.options[wards.options.length] = new Option(w.Name, w.Id);
                    }
                }
            };
        },

        SearchStudent() {
            return this.Class.filter(user => {
                return (
                    user.grade === this.Teacher.grade
                );
            });
        }
    },
}

</script>
<style>
.cv-item {
    margin-right: 10px;
}

.name-cv {
    margin-right: 20px;
}

table {
    margin: auto;
    width: -webkit-fill-available;
    width: 70%;
}

.plus {
    margin-left: 20px;
    border: none;
    background-color: #fff;
    border-radius: 100%;
}

.btn {
    margin: 10px;
    padding: 10px;
}

.myclass {
    margin-left: 20px;
}

.plus-img {
    width: 20px;
}
</style>