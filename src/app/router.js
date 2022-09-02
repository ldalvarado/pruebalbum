import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
export default new Router({
  mode: "history",
  routes: [
        {
            path: "/",
            alias: "/videoslist",
            name: "videoslist",
            component: () => import("./components/VideosList")
        },
        {
            path: "/videoslist/:id",
            name: "tutorial-details",
            component: () => import("./components/Video")
        },
        {
            path: "/add",
            name: "add",
            component: () => import("./components/AddVideo")
        }
    ]
});