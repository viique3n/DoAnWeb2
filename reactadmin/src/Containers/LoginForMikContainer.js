import LoginForm from '../Components/LoginForm';
import { withFormik } from 'formik';
import * as Yup from 'yup';

const LoginForMikContainer = withFormik({
  mapPropsToValues() {
    // Init form field
    return {
      email: '',
      matkhau: '',
    };
  },
  validationSchema: Yup.object().shape({
    // Validate form field
    email: Yup.string()
      .email('Email không hợp lệ')
      .required('Vui lòng nhập email'),
    matkhau: Yup.string()
      .required('Vui lòng nhập mật khẩu')
      .min(6, 'Mật khẩu phải dài hơn 6 ký tự')
      .max(20, 'Mật khẩu phải ngắn hơn 20 ký tự'),
  }),
})(LoginForm);

export default LoginForMikContainer;
