//component request-user
Vue.component('request-user', {
    data: () => ({
        name: '',
        city: '',
    }),
    template:
    `
    <div class="wrapper">
        <div class="name-box">
            用户名:<input type="text" v-model="name">
            <!-- <span>name: {{ name }}</span> -->
        </div>
        <div class="city-box">
            来自城市:<select v-model="city">
                <option disabled value="">请选择</option>
                <option>罗马</option>
                <option>纽约</option>
                <option>北京</option>
                <option>伦敦</option>
                <option>巴黎</option>
            </select>
            <!-- <span>city: {{ city }}</span> -->
        </div>
        <button @click="sendUser">提交</button>
    </div>
    `,
    methods: {
        sendUser () {
            const that = this;
            axios.post('/createUser', {
                name: that.name,
                city: that.city
            })
            .then(function (response) {
                console.log(response.data);
                alert('提交成功!');
                that.name = '';
                that.city = '';
            })
            .catch(function (error) {
                console.log("error:", error);
            });
        }
    },
});

//component all-users
Vue.component('all-users', {
    data: () => ({
        users: []
    }),
    template:
    `
    <div class="wrapper">
        <table width="850" border="0" cellspacing="0" cellpadding="0">
            <tr>
                <th>用户ID</th>
                <th>用户名称</th>
                <th>来自城市</th>
                <th>注册时间</th>
                <th>操作</th>
            </tr>
            <tr v-for="(v,k) in users" :key="k">
                <td>{{v.id}}</td>
                <td>{{v.name}}</td>
                <td>{{v.city}}</td>
                <td>{{v.createdAt.slice(0, 10)}}</td>
                <td><a href="" @click.prevent="deleteUser(v.id)">删除</a></td>
            </tr>
        </table>
    </div>
    `,
    methods: {
        getUsers () {
            const that = this;
            axios.get('/allUsers')
            .then(function (response) {
                console.log(response.data.info);
                that.users = response.data.info;
            })
            .catch(function (error) {
                console.log("error:", error);
            });
        },
        deleteUser (id) {
            const that = this;
            axios.post('/deleteUser', {
                id,
            })
            .then(function (response) {
                console.log(response.data);
                alert('删除成功!');
                that.getUsers();
            })
            .catch(function (error) {
                console.log("error:", error);
            });
        }
    },
    created () {
        this.getUsers();
    },
});



const Foo = { template: '<request-user />' }
const Bar = { template: '<all-users />' }

const routes = [
    { path: '/createUser', component: Foo },
    { path: '/seeAndDeleteUser', component: Bar }
];

//regist router
const router = new VueRouter({
    mode: 'history',
    routes
});

//create vue obj
var app = new Vue({
    el: '#app',
    router,
    data: {
        message: 'Hello Vue!'
    },
})