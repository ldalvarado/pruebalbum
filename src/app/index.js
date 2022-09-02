import { createApp } from 'vue'
import App from './App.vue'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import loadingOverlayComponent from './components/loadingOverlay.vue'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import CoreuiVue from '@coreui/vue';
import '@coreui/coreui/dist/css/coreui.min.css'

const app = createApp(App);

app.use(VueSweetalert2);
app.component('loading-overlay-original', Loading);
app.component('loading-overlay', loadingOverlayComponent);
app.use(CoreuiVue);

app.mount('#app');