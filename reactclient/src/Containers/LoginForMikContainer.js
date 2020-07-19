import LoginForm from '../Components/Auth/LoginForm';
import { withFormik } from 'formik';
import * as Yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const LoginForMikContainer = withFormik({
  mapPropsToValues() {
    // Init form field
    return {
      sodienthoai: '',
      matkhau: '',
    };
  },
  validationSchema: Yup.object().shape({
    // Validate form field
    sodienthoai: Yup.string()
      .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
      .required('Vui lòng nhập số điện thoại'),
    matkhau: Yup.string()
      .required('Vui lòng nhập mật khẩu')
      .min(6, 'Mật khẩu phải dài hơn 6 ký tự')
      .max(20, 'Mật khẩu phải ngắn hơn 20 ký tự'),
  }),
})(LoginForm);

export default LoginForMikContainer;
