
<template >
    <div class="form-register">
        <div class="container">

            <form method="post" @submit.prevent="adduser" id="frmDangKyThanhVien">

                <table border="1" width="800px" cellspacing="0" cellpadding="10px">

                    <td colspan="2" align="center">
                        <li class="list-group-item active">THÊM TÀI KHOẢN HỌC SINH</li>
                    </td>
                    <!-- Họ tên row - Start -->
                    <tr>
                        <td width="100px">
                            <label for="txtTK">Tài Khoản:</label>
                        </td>
                        <td>
                            <input type="text" name="txtTK" id="txtTK" required="required" placeholder="Vui lòng mã số user"
                                autofocus="autofocus" title="Nhập username"
                                v-model="Student.username" />
                        </td>
                    </tr>

                    <tr>
                        <td width="100px">
                            <label for="txtHoTen">Họ tên:</label>
                        </td>
                        <td>
                            <input type="text" name="txtHoTen" id="txtHoTen" required="required"
                                placeholder="Vui lòng nhập Họ tên" autofocus="autofocus"
                                title="Nhập họ tên" v-model="Student.fullname" />
                        </td>
                    </tr>
                    <!-- Họ tên row - End -->
                    <!-- Mật khẩu row - Start -->
                    <tr>
                        <td>
                            <label for="txtMatKhau">Mật khẩu:</label>
                        </td>
                        <td>
                            <input type="password" name="txtMatKhau" id="txtMatKhau" required="required"
                                placeholder="Vui lòng nhập Mật khẩu" maxlength="32" v-model="Student.password" />
                        </td>
                    </tr>
                    <!-- Mật khẩu row - End -->
                    <!-- Giới tính row - Start -->
                    <tr>
                        <td>
                            <label for="gt">Giới tính:</label>
                        </td>
                        <td>
                            <select name="gt" id="gt" v-model="Student.gioitinh">
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
                            <input type="date" name="numTuoi" id="numTuoi" v-model="Student.namsinh" />
                        </td>
                    </tr>

                    <!-- Giới thiệu bản thân row - End -->
                    <!-- Email liên hệ row - Start -->
                    <tr>
                        <td>
                            <label for="txtEmail">Email có thể liên hệ:</label>
                        </td>
                        <td>
                            <input type="email" placeholder="acb@gmail.com" name="txtEmail" id="txtEmail" required="true"
                                v-model="Student.email" />
                        </td>
                    </tr>
                    <!-- Email liên hệ row - End -->
                    <!-- Địa chỉ web row - Start -->

                    <tr>
                        <td>
                            <label for="txtcccd">CMND/CCCD:</label>
                        </td>
                        <td>
                            <input type="text" placeholder="Nhập CMND/CCCD" name="txtcccd" id="txtcccd" required="true"
                                v-model="Student.cccd" />
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label for="txtSoDienThoai">Số điện thoại:</label>
                        </td>
                        <td>
                            <input type="tel" name="txtSoDienThoai" id="txtSoDienThoai" required="true" pattern="[0-9]{10,}"
                                title="Định dạng là nhập là: Nhập 10 số trở lên xxxxxxxxxx"
                                placeholder="Nhập 10 số trở lên xxxxxxxxxx" v-model="Student.phone" />
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label for="grade">Khối lớp</label>
                        </td>
                        <td>
                            <select name="" id="grade" v-model="Student.grade">
                                <option value="">--Chọn khối lớp--</option>
                                <option value="10">Khối 10</option>
                                <option value="11">Khối 11</option>
                                <option value="12">Khối 12</option>
                            </select>
                        </td>
                    </tr>
                    <tr v-if="Student.grade!=''">
                        <td>
                            <label for="myclass">Lớp</label>
                        </td>
                        <td>
                            <select name="" v-model="Student.myclassID">
                                <option v-for="(item, index) in SearchStudent()" :value="item._id" :key="index">
                                Lớp {{ item.nameclass }}
                                </option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label for="textFather">Họ và tên cha:</label>
                        </td>
                        <td>
                            <input type="text" placeholder="Vui lòng nhập Họ tên" name="textFather" id="textFather"
                                v-model="Student.father" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="phoneFather">SĐT cha:</label>
                        </td>
                        <td>
                            <input type="tel" name="phoneFather" id="phoneFather" pattern="[0-9]{10,}"
                                title="Định dạng là nhập là: Nhập 10 số trở lên xxxxxxxxxx"
                                placeholder="Nhập 10 số trở lên xxxxxxxxxx" v-model="Student.phoneFather" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="textMother">Họ và tên mẹ:</label>
                        </td>
                        <td>
                            <input type="text" placeholder="Vui lòng nhập Họ tên" name="textMother" id="textMother"
                                v-model="Student.mother" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="phoneMother">SĐT mẹ:</label>
                        </td>
                        <td>
                            <input type="tel" name="phoneMother" id="phoneMother" pattern="[0-9]{10,}"
                                title="Định dạng là nhập là: Nhập 10 số trở lên xxxxxxxxxx"
                                placeholder="Nhập 10 số trở lên xxxxxxxxxx" v-model="Student.phoneMother" />
                        </td>
                    </tr>

                    <!-- Màu yêu thích row - End -->
                    <!-- TP/Tỉnh sinh sống row - Start -->
                    <tr @click="(e) => { e.preventDefault() }">
                        <td>
                            <label for="txtThanhPhoThuongTru">Bạn đang sinh sống ở TP/Tỉnh nào?</label>
                        </td>
                        <td>
                            <select @change="(e) => { this.setTp(e) }" class="form-select form-select-sm mb-3" id="city"
                                aria-label=".form-select-sm" v-model="Student.tp">
                                <option value="" selected>--Chọn tỉnh thành--</option>
                            </select><br>

                            <select @change="(e) => { this.setHuyen(e) }" class="form-select form-select-sm mb-3"
                                id="district" aria-label=".form-select-sm" v-model="Student.huyen">
                                <option value="" selected>--Chọn quận huyện--</option>
                            </select><br>

                            <select @change="(e) => { this.setXa(e) }" class="form-select form-select-sm" id="ward"
                                aria-label=".form-select-sm" v-model="Student.xa">
                                <option value="" selected>--Chọn phường xã--</option>
                            </select>
                        </td>

                    </tr>

                    <!-- Nút bấm row - Start -->
                    <tr>
                        <td colspan="2" align="center">
                            <button class="btn btn-primary text-uppercase">Tạo</button>
                            <button type="reset" class="btn btn-primary text-uppercase">Reset</button>
                        </td>
                    </tr>
                    <!-- Nút bấm row - End -->
                </table>
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

import { data } from '../Data_City/dataJson'
export default {
    data() {
        return {
            Class: [{}],
            selectedId: '',
            Student: {
                gioitinh: '',
                tp: '',
                xa: '',
                huyen: '',
                grade: '',
            },
        }
    },

    mounted() {
        // check(this.$router)
        var citis = document.getElementById("city");
        var districts = document.getElementById("district");
        var wards = document.getElementById("ward");
        this.renderCity(data, citis, districts, wards)
        
    },

    created() {
        axios.get(`http://localhost:3000/class/show`)
            .then(res => {
                this.Class = res.data;
              //  console.log(this.selectedId)

            })
            .catch(err => {
                console.log(err);
            })
    },


    methods: {

        adduser() {
            this.Student.tp = this.tp.Name
            this.Student.huyen = this.huyen.Name
            this.Student.xa = this.xa.Name
            axios.post('http://localhost:3000/auth/register/student', this.Student)
                .then(res => {
                    this.Student = '';
                    alert("Đăng ký tài khoản thành công")
                    window.location.reload()
                },)
                .catch(err => {
                    console.log(err)
                    alert(err.response.data.mes)
                   // window.location.reload()
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
                    user.grade === this.Student.grade
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