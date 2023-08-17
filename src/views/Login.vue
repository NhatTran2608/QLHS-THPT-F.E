
<template>
    <div>
        <div v-if="this.checkload == true" class="form-loader">
            <div  class="loader"></div>
        </div>
        <div>
            <div class="container-fluid p-0">
                <section class="vh-100" style="background-color: rgb(122 202 241);">
                    <div class="container h-100">
                        <div class="row d-flex justify-content-center align-items-center h-100">
                            <div class="col col-xl-10">
                                <div class="card" style="border-radius: 5rem;">
                                    <div class="row g-0">
                                        <div class="col-md-6 col-lg-5 d-none d-md-block">
                                            <img src="https://websitehoctructuyen.com/wp-content/uploads/2020/10/phan-mem-quan-ly-hoc-sinh.jpg"
                                                alt="login form" class="img-fluid"
                                                style="border-radius: 1rem 0 0 1rem; margin-top: 50% " />
                                        </div>
                                        <div class="col-md-6 col-lg-7 d-flex align-items-center">
                                            <div class="card-body p-4 p-lg-5 text-black">

                                                <form method='post' @submit.prevent="login">
                                                    <div class="d-flex align-items-center mb-3 pb-1">
                                                        <i class="fas fa-cubes fa-2x me-3" style="color: #ff6219;"></i>
                                                        <span class="h2 fw-bold mb-0"> HỆ THỐNG QUẢN LÝ</span>
                                                    </div>

                                                    <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Đăng nhập
                                                        vào
                                                        tài khoản của bạn</h5>

                                                    <div class="form-outline mb-4">
                                                        <label class="form-label" for="form2Example17">Tài khoản</label>
                                                        <input type="text" id="form2Example17"
                                                            class="form-control form-control-lg" v-model="User.username">
                                                    </div>

                                                    <div class="form-outline mb-4">
                                                        <label class="form-label" for="form2Example27">Mật khẩu</label>
                                                        <input type="password" id="form2Example27"
                                                            class="form-control form-control-lg" v-model="User.password">
                                                    </div>

                                                    <div class="pt-1 mb-4">
                                                        <button class="btn btn-dark btn-lg btn-block" @click="login()">Đăng
                                                            nhập</button>
                                                    </div>
                                                    <router-link to="#" class="small text-muted"> Bạn quên mật
                                                        khẩu?</router-link>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>

    </div>
</template>
<script>

import axios from 'axios';
export default {
    data() {
        return {
            User: {},
            checkload: false,
        }
    },
    methods: {
        async login() {
            try {
                this.checkload = true
                let res = await axios.post(`https://htqlthpt.onrender.com/auth/login`, this.User)
                localStorage.setItem('user', JSON.stringify(res.data))
                if (res.data.role === 'AD') {
                    this.$router.replace({ path: '/admin/home' })
                }
                else if (res.data.role === 'GV') {
                    this.$router.replace({ path: '/teacher/home' })
                }
                else if (res.data.role === 'HS') {
                    this.$router.replace({ path: '/home/student' })
                }
            }
            catch (err) {
                console.log(err);
                alert(err.response.data.mes)
            }
            this.checkload = false

        },
    }
}
</script>
<style scoped>
.form-loader {
    position: absolute;
    text-align: -webkit-center;
    padding: 20%;
    z-index: 2;
    left: 0;
    right: 0;
}

.loader {
    transform: rotateZ(45deg);
    perspective: 1000px;
    border-radius: 50%;
    width: 52px;
    height: 52px;
    color: #000;
}

.loader:before,
.loader:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    transform: rotateX(70deg);
    animation: 1s spin linear infinite;
}

.loader:after {
    color: #FF3D00;
    transform: rotateY(70deg);
    animation-delay: .4s;
}

@keyframes rotate {
    0% {
        transform: translate(-50%, -50%) rotateZ(0deg);
    }

    100% {
        transform: translate(-50%, -50%) rotateZ(360deg);
    }
}

@keyframes rotateccw {
    0% {
        transform: translate(-50%, -50%) rotate(0deg);
    }

    100% {
        transform: translate(-50%, -50%) rotate(-360deg);
    }
}

@keyframes spin {

    0%,
    100% {
        box-shadow: .2em 0px 0 0px currentcolor;
    }

    12% {
        box-shadow: .2em .2em 0 0 currentcolor;
    }

    25% {
        box-shadow: 0 .2em 0 0px currentcolor;
    }

    37% {
        box-shadow: -.2em .2em 0 0 currentcolor;
    }

    50% {
        box-shadow: -.2em 0 0 0 currentcolor;
    }

    62% {
        box-shadow: -.2em -.2em 0 0 currentcolor;
    }

    75% {
        box-shadow: 0px -.2em 0 0 currentcolor;
    }

    87% {
        box-shadow: .2em -.2em 0 0 currentcolor;
    }
}</style>