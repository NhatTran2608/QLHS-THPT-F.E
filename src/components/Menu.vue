<template>
    <div class="nav_back"></div>
    <div id="Menu">
        <div :class="this.isShowText == false ? 'centerText' : 'head'" id="SHOWMENU">
            <div class="left" v-if="this.isShowText">MENU</div>
            <div class="right">
                <div class="openMenu" v-if="!this.isShowText" @click="openClick()">
                    <i class="fa-solid fa-bars"></i>
                </div>
                <div class="closeMenu" @click="closeClick()" v-if="this.isShowText">
                    <i class="fa-solid fa-xmark"></i>
                </div>
            </div>
        </div>
        <div class="borderUnder" :class="this.isShowText == false ? 'justify_content_center' : ''">
            <i class="fa-solid fa-house"></i>
            <router-link v-if="this.role == 'AD'" to="/admin/home" class="home_js hover_color" :class="'current_menu'">
                <div v-if="this.isShowText">
                    Trang chủ
                </div>
            </router-link>
            <router-link v-if="this.role == 'HS'" to="/home/student" class="home_js hover_color" :class="'current_menu'">
                <div v-if="this.isShowText">
                    Trang chủ
                </div>
            </router-link>
            <router-link v-if="this.role == 'GV'" to="/teacher/home" class="home_js hover_color" :class="'current_menu'">
                <div v-if="this.isShowText">
                    Trang chủ
                </div>
            </router-link>
        </div>

        <div v-if="this.role == 'GV'">

            <div class="borderUnder cvht_js hover_color" :class="this.isShowText == false ? 'justify_content_center' : ''"
                @click="handleClickCVHT()">
                <i class="fa-solid fa-user-tie"></i>
                <div v-if="this.isShowText">
                    Giáo viên
                </div>
                <i class="fa-solid fa-angle-down iconRight" v-if="this.isShowText"></i>
            </div>

            <div class="drop_down_cvht dropDown" v-if="this.isShowDropDownCVHT">
                <div class="link_to">
                    <router-link :to="`/teacher/infor/${id}`" class="listSv_js hover_color" :class="'current_menu'">
                        <i class="fa-solid fa-chevron-right"></i>
                        Thông tin
                    </router-link>
                </div>
                <div class="link_to">
                    <router-link :to="`/teacher/edit-Individual/${id}`" class="listSv_js hover_color"
                        :class="'current_menu'">
                        <i class="fa-solid fa-chevron-right"></i>
                        Cập nhật thông tin
                    </router-link>
                </div>
                <div class="link_to">
                    <router-link to="" class="listSv_js hover_color" :class="'current_menu'">
                        <i class="fa-solid fa-chevron-right"></i>
                        Danh sách học sinh
                    </router-link>
                </div>
                <div class="link_to">
                    <router-link to="/teacher/gradebook" class="addnew_js hover_color" :class="'current_menu'">
                        <i class="fa-solid fa-chevron-right"></i>
                        Nhập điểm cho học sinh
                    </router-link>
                </div>
            </div>

            <div @click="checkCN()">

                <div class="borderUnder cvht_js hover_color"
                    :class="this.isShowText == false ? 'justify_content_center' : ''" @click="handleClickGVCN()">
                    <i class="fa-solid fa-user-tie"></i>
                    <div v-if="this.isShowText">
                        Giáo viên chủ nhiệm
                    </div>
                    <i class="fa-solid fa-angle-down iconRight" v-if="this.isShowText"></i>
                </div>

                <div class="drop_down_cvht dropDown" v-if="this.isShowDropDownGVCN">
                    <div class="link_to">
                        <router-link to="/teacher/list-student" class="listSv_js hover_color" :class="'current_menu'"
                            @click="clickCurrentMenu('cv2')">
                            <i class="fa-solid fa-chevron-right"></i>
                            Danh sách học sinh
                        </router-link>
                    </div>
                    <div class="link_to">
                        <router-link to="/teacher/assess-student" class="listSv_js hover_color" :class="'current_menu'">
                            <i class="fa-solid fa-chevron-right"></i>
                            Đánh giá hạnh kiểm
                        </router-link>
                    </div>
                    <div class="link_to">
                        <router-link to="#" class="addnew_js hover_color" :class="'current_menu'">
                            <i class="fa-solid fa-chevron-right"></i>
                            Thống kê chất lượng
                        </router-link>
                    </div>
                </div>

            </div>

        </div>

        <div v-if="this.role == 'AD'">

            <div class="borderUnder cvht_js hover_color" :class="this.isShowText == false ? 'justify_content_center' : ''"
                @click="handleClickCVHT()">
                <i class="fa-solid fa-user-tie"></i>
                <div v-if="this.isShowText">
                    Admin
                </div>
                <i class="fa-solid fa-angle-down iconRight" v-if="this.isShowText"></i>
            </div>

            <div class="drop_down_cvht dropDown" v-if="this.isShowDropDownCVHT">
                <div class="link_to">
                    <router-link to="/admin/list/teacher" class="listSv_js hover_color" :class="'current_menu'">
                        <i class="fa-solid fa-chevron-right"></i>
                        Phân công giảng dạy
                    </router-link>
                </div>
                <div class="link_to">
                    <router-link to="/register/user" class="listSv_js hover_color" :class="'current_menu'">
                        <i class="fa-solid fa-chevron-right"></i>
                        Đăng ký tài khoản
                    </router-link>
                </div>
                <div class="link_to">
                    <router-link to="/create/class" class="listSv_js hover_color" :class="'current_menu'">
                        <i class="fa-solid fa-chevron-right"></i>
                        Danh sách các lớp học
                    </router-link>
                </div>

                <div class="link_to">
                    <router-link to="/admin/list-editInfo" class="listSv_js hover_color" :class="'current_menu'">
                        <i class="fa-solid fa-chevron-right"></i>
                        Danh sách giáo viên
                    </router-link>
                </div>

                <div class="link_to">
                    <router-link to="/admin/bin" class="addnew_js hover_color" :class="'current_menu'">
                        <i class="fa-solid fa-chevron-right"></i>
                        Thùng rác
                    </router-link>
                </div>
            </div>

        </div>

        <div v-if="this.role == 'HS'">
            <div class="borderUnder hover_color" :class="this.isShowText == false ? 'justify_content_center' : ''"
                @click="handleClickSV('drop_down_sv')">
                <i class="fa-solid fa-user-tie"></i>
                <div v-if="this.isShowText">
                    Học sinh
                </div>
                <i class="fa-solid fa-angle-down iconRight" v-if="this.isShowText"></i>
            </div>

            <div class="drop_down_cvht dropDown" v-if="this.isShowDropDownSV">
                <div class="link_to hover_color">
                    <router-link :to="`/student/info/${id}`" class="listSv_js hover_color" :class="'current_menu'">
                        <i class="fa-solid fa-chevron-right"></i>
                        Thông tin
                    </router-link>
                </div>
                <div class="link_to hover_color">
                    <router-link to="#" class="addnew_js hover_color" :class="'current_menu'">
                        <i class="fa-solid fa-chevron-right"></i>
                        Cập nhật thông tin
                    </router-link>
                </div>
                <div class="link_to hover_color">
                    <router-link :to="`/student/result/${id}`" class="addnew_js hover_color" :class="'current_menu'">
                        <i class="fa-solid fa-chevron-right"></i>
                        Xem điểm học kì
                    </router-link>
                </div>

            </div>
        </div>

        <router-link to="#" class="borderUnder underline_node hover_color" @click="clickCurrentMenu('thongbao')"
            :class="this.isShowText == false ? 'justify_content_center' : ''">
            <i class="fa-solid fa-bullhorn"></i>
            <div v-if="this.isShowText" :class="'current_menu'">
                Thông báo
            </div>
        </router-link>

        <div class="borderUnder hover_color" :class="this.isShowText == false ? 'justify_content_center' : ''"
            @click="handleClickAccount('drop_down_account')">
            <i class="fa-solid fa-gear"></i>
            <div v-if="this.isShowText">
                Tài khoản
            </div>
            <i class="fa-solid fa-angle-down iconRight" v-if="this.isShowText"></i>
        </div>

        <div class="drop_down_cvht dropDown" v-if="this.isShowDropDownAccount">
            <div class="link_to">
                <div class="listSv_js hover_color" v-if="this.role == 'GV'">
                    <i class="fa-solid fa-chevron-right"></i>
                    <router-link :class="'current_menu'" :to="`/teacher/changepassword/${id}`">Đổi mật khẩu</router-link>
                </div>
                <div class="listSv_js hover_color" v-if="this.role == 'HS' || this.role == 'AD'">
                    <i class="fa-solid fa-chevron-right"></i>
                    <router-link :class="'current_menu'" :to="`/changepassword/${id}`">Đổi mật khẩu</router-link>
                </div>
            </div>
            <div class="link_to">
                <div class="addnew_js hover_color" :class="'current_menu'" @click="logout()">
                    <i class="fa-solid fa-chevron-right"></i>Đăng xuất
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            isShowText: true,
            isShowDropDownCVHT: true,
            isShowDropDownAccount: true,
            isShowDropDownSV: true,
            isShowDropDownGVCN: false,
        }
    },

    created() {
        this.id = JSON.parse(localStorage.getItem('user'))._id
        this.role = JSON.parse(localStorage.getItem('user')).role
        this.GVCN = JSON.parse(localStorage.getItem('user')).form_teacherID
    },

    methods: {

        closeMenu() {
            this.isShowText = false
            this.isShowDropDownCVHT = false
            this.isShowDropDownSV = false
            this.isShowDropDownAccount = false
            this.isShowDropDownGVCN = false
        },

        openMenu() {
            this.isShowDropDownGVCN = true
            this.isShowText = true
            this.isShowDropDownCVHT = true
            this.isShowDropDownSV = true
            this.isShowDropDownAccount = true
        },

        openClick() {
            this.openMenu()
            let menu = document.getElementById("Menu")
            let nav = document.querySelector(".nav_back")
            if (menu) {
                menu.classList.add("openMenu")
                menu.classList.remove("closeMenu")
                nav.classList.add("openNav")
                nav.classList.remove("closeNav")
            }
        },

        closeClick() {
            this.closeMenu()
            let menu = document.getElementById("Menu")
            let nav = document.querySelector(".nav_back")
            if (menu) {
                menu.classList.remove("openMenu")
                menu.classList.add("closeMenu")
                nav.classList.remove("openNav")
                nav.classList.add("closeNav")
            }
        },

        setIsShowDropDownCVHT() {
            this.isShowDropDownCVHT = !this.isShowDropDownCVHT
        },

        handleClickCVHT() {
            this.setIsShowDropDownCVHT('drop_down_cvht')
        },

        setIsShowDropDownSV() {
            this.isShowDropDownSV = !this.isShowDropDownSV
        },

        handleClickSV() {
            if (this.role == 'HS')
                this.setIsShowDropDownSV('drop_down_sv')
            else {
                alert('Bạn không có quyền truy cập')
            }
        },

        setIsShowDropDownAccount() {
            this.isShowDropDownAccount = !this.isShowDropDownAccount
        },

        handleClickAccount() {
            this.setIsShowDropDownAccount('drop_down_account')
        },

        setIsShowDropDownGVCN() {
            this.isShowDropDownGVCN = !this.isShowDropDownGVCN
        },

        handleClickGVCN() {
            this.setIsShowDropDownGVCN('drop_down_gvcn')
        },

        logout() {
            localStorage.clear()
            this.$router.replace({ path: '/login' })
        },
        checkCN() {
            if (this.GVCN == undefined) {
                alert('Bạn chưa được mở khóa chức năng này')
                this.$router.replace({ path: `/teacher/home` })
                !this.handleClickGVCN()
            }
        },

    }
}

</script>

<style lang="scss" scoped>
.current_menu {
    color: #fdc500 !important;
}

.nav_back {
    width: 250px;
}

.closeNav {
    text-align: center;
    animation: closeNav 0.3s linear forwards;
}

.openNav {
    text-align: center;
    animation: openNav 0.3s linear forwards;
}

@keyframes closeNav {
    from {
        width: 250px;
    }

    to {
        width: 50px;
    }
}

@keyframes openNav {
    from {
        width: 50px;
    }

    to {
        width: 250px;
    }
}

#Menu {


    .underline_node {
        text-decoration: none;
    }

    width: 250px;
    background-color: #042954;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;

    .hover_color {
        cursor: pointer;

        &:hover {
            color: #fdc500 !important;
        }
    }

    .centerText {
        // display: flex;
        // align-items: center;
        // justify-content: center;
        height: 50px;
        width: 100%;
        background-color: #fdc500;
        color: #fff;
        align-items: center;
        padding: 0 10px;
        font-size: 25px;

        &:hover {
            background-color: rgb(227, 202, 8);
        }
    }

    &.closeMenu {
        animation: closeMenu 0.3s linear forwards;
    }

    &.openMenu {
        width: 100%;
        height: 100%;
        //text-align: center;
        animation: openMenu 0.3s linear forwards;
    }


    .dropDown {
        padding: 10px 0 10px 20px;
        align-items: center;
        border-bottom: 1px solid #ccc;
        background-color: #042954;
        color: #fff;
        // font-size: 15px;

        .link_to {
            padding: 5px;

            a {
                text-decoration: none;
                color: #fff;
            }
        }

        i {
            padding: 5px;
            font-size: 10px;
            color: #fdc500;
        }

    }

    .borderUnder {
        cursor: pointer;
        height: 40px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ccc;
        background-color: #042954;
        color: #fff;
        position: relative;

        i {
            padding: 10px;
            color: #fdc500;
        }

        a {
            color: #fff;
            text-decoration: none;
        }

        .iconRight {
            position: absolute;
            right: 10px;
        }
    }

    // .justify_content_center {
    //     justify-content: center;
    // }

    .head {
        height: 50px;
        background-color: #fdc500;
        display: flex;
        color: #fff;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        font-size: 25px;

        .right {
            padding: 8px;
            cursor: pointer;

            .openMenu {
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 5px 8px;

                &:hover {
                    background-color: #ccc;
                }
            }

            .closeMenu {
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 5px 8px;

                &:hover {
                    background-color: #ccc;
                }
            }
        }
    }

    @keyframes closeMenu {
        from {
            width: 250px;
        }

        to {
            width: 50px;
        }
    }

    @keyframes openMenu {
        from {
            width: 50px;
            opacity: 0;
        }

        to {
            width: 250px;
            opacity: 1;
        }
    }

}
</style>
