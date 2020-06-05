import Vue from 'vue'
import VueRouter from 'vue-router'

//Component
import Home from '../components/dashboard/Home'

Vue.use(VueRouter)


let routes = [
    {
        path: "/", component: Home,
    },
    {
        path: "/admin",
        component: () => import(/* webpackChunkName: "DashboardAdminCmp" */ '../components/admin/DashboardAdminCmp'),
        children: [
            {
                path: "/admin/customer",
                component: () => import(/* webpackChunkName: "ListEmployeeCmp" */ '../components/admin/customer/ListEmployeeCmp')
            },
            {
                path: "/admin/partner",
                component: () => import(/* webpackChunkName: "ListPartnerCmp" */ '../components/admin/customer/ListPartnerCmp')
            },
            {
                path: "/admin/transation",
                component: () => import(/* webpackChunkName: "ListTransactionCmp" */ '../components/admin/customer/ListTransactionCmp')
            },
        ]
    },
    {
        path: "/customer",
        component: () => import(/* webpackChunkName: "DashboardCustomerCmp" */ '../components/customer/DashboardCustomerCmp'),
        children: [
            {
                path: "/customer/account",
                component: () => import(/* webpackChunkName: "ListAccountCmp" */ '../components/customer/account/ListAccountCmp')
            },
            {
                path: "/customer/profile",
                component: () => import(/* webpackChunkName: "CustomerProfile" */ '../components/customer/account/CustomerProfile')
            },
        ]
    },
]

let router = new VueRouter({
    routes: routes,
    mode: "history"
})

export default router