import 'izitoast/dist/css/iziToast.min.css'
import iZtoast from 'izitoast'

// let count = 0;

const toast = {
    error: (message, title = 'Error') => {
        return iZtoast.error({
            title: '',
            message: message,
            position: 'topRight',
            timeout: 2500,
            // target: 'header'
        });
    },
    success: (message, title = 'Success') => {
        // count ++ 
        // if (count % 2 === 0 ) {
        return iZtoast.success({
            title: '',
            message: message,
            position: 'topRight',
            timeout: 2000,
        }); 
    }
};

export default toast;

