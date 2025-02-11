import axios from 'axios';

// Configura Axios en la ventana global (opcional, si usas axios en muchas partes)
declare global {
    interface Window {
        axios: typeof axios;
    }
}

window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
