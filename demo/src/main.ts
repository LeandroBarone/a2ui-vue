import { createApp } from 'vue';
import { createA2UI } from '../../src/v0_8/public-api';
import App from './App.vue';

const app = createApp(App);

app.use(createA2UI());

app.mount('#app');
