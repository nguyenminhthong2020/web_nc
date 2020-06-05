import Vue from 'vue'
import { required, min, max, email, min_value } from 'vee-validate/dist/rules';
import { ValidationProvider, extend, ValidationObserver} from 'vee-validate';
import App from './App.vue'
import router from './router'
import store from './store'

// Add a rule.
extend('secret', {
  validate: value => value === 'example',
  message: 'This is not the magic word'
});
// Add the required rule
extend('required', {
  ...required,
  message: 'This field is required'
});
extend('required_email', {
  ...required,
  message: 'Nhập email giùm con đi cha nội !'
});

//Tuổi
extend('is_age', 
    value => {
       if((!isNaN(value)) && (value > 0))
          {
            return true;
          }
        return 'Nhập vào số nguyên dương mới đúng !'
     }
);

//Giới tính
extend('gioitinh_of', (value, values) => {
  return values.indexOf(value) !== -1;
})
//min, max, email, min_value
extend('min', {
  ...min,
  message: 'Nhập ít nhất 6 từ !'
});
extend('max', {
  ...max,
  message: 'Nhập nhiều nhất 10 từ !'
});
extend('email', {
  ...email,
  message: 'Nhập đúng định dạng email !'
});
extend('min_value', {
  ...min_value,
  message: 'Nhập số nguyên dương >= 3 !'
});
// Register it globally
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
