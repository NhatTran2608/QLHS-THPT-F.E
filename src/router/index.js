import { createWebHistory, createRouter } from "vue-router";
import Login from '../views/Login.vue';
import Home_Student from '../student/Home.vue';
import Home_Admin from '../Admin/Home.vue'
import Register from '../Admin/Register.vue'
import CreateClass from '../Admin/CreateClass.vue'
import ListClass from '../Admin/ListClass.vue';
import Bin from '../Admin/Bin.vue'
import EditStudent from '../Admin/EditStudent.vue';
import RegisterTeacher from "../Admin/RegisterTeacher.vue";
import RegisterUser from "../Admin/RegisterHome.vue";
import HomeTeacher from "../teacher/Home.vue"
import Gradebook from "../teacher/Gradebook.vue"
import ListScores from "../teacher/ListScores.vue"
import EditTeacher from "../Admin/EditTeacher.vue"
import ListTeacher from "../Admin/ListTeacher.vue"
import AddClass_Teacher from "../Admin/AddClass_Teacher.vue"
import Assess from "../teacher/AssessStudent.vue"
import Result from "../student/Result.vue"
import ChangePassword from "../student/ChangePassword.vue"
import ChangePasswordTC from "../teacher/ChangePassword.vue"
import Info_Student from "../student/Info_Student.vue"
import Statistical_Subject from "../teacher/Statistical.vue"
import ListEditTeacher from '../Admin/ListEditTeacher.vue'
import InfoTeacher from '../teacher/Info_Teacher.vue'
import EditTeacherIndividual from '../teacher/EditInfo_Individual.vue'
import ListStudentCN from '../teacher/ListStudent.vue'

const routes = [
    {
        path:'/teacher/list-student',
        component: ListStudentCN
    },
    {
        path:'/teacher/edit-Individual/:id', 
        component: EditTeacherIndividual
    },
    {
        path:'/teacher/infor/:id',
        component: InfoTeacher
    },
    {
        path:'/admin/list-editInfo', 
        component: ListEditTeacher
    },
    {
        path:'/teacher/list/scores/:id',
        component: ListScores,
    },
    {
        path: '/register/teacher',
        component: RegisterTeacher,
    },
    {
        path: '/admin/list/teacher',
        component: ListTeacher,
    },
    {
        path: '/admin/edit/teacher/:id',
        component: EditTeacher,
    },
    {
        path:'/register/user',
        component: RegisterUser
    },
    {
        path: '/register',
        component: Register,
    },
    {
        path:'/login',
        component: Login,
    },
    {
        path:'/class/list/:id',
        component: ListClass,
    },
    {
        path: '/create/class',
        component: CreateClass,
    },
    {
        path: '/teacher/home',
        component: HomeTeacher,
    },
    
    {
        path:'/home/student',
        component: Home_Student,
    },
    {
        path:'/admin/bin',
        component: Bin,
    },
    {
        path:'/admin/edit/student/:id',
        component: EditStudent,
    },
    {
        path:'/admin/home',
        component: Home_Admin,
    },
    {
        path:'/teacher/gradebook',
        component: Gradebook,

    },
    {
        path:'/admin/edit/class_teacher/:id',
        component: AddClass_Teacher,
    },
    {
        path:'/teacher/assess-student',
        component: Assess
    },
    {
        path:'/student/result/:id',
        component: Result
    },
    {
        path: '/changepassword/:id',
        component: ChangePassword,
    },
    {
        path:'/teacher/changepassword/:id',
        component: ChangePasswordTC,
    },
    {
        path: '/student/info/:id',
        component: Info_Student,
    },
    {
        path:'/teacher/statistical/subject',
        component: Statistical_Subject,
    },
    {
        path: '/:pathMatch(.*)*',
        //path:'/',
        redirect: '/login'
    },
   
    
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
