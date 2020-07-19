import SignUpForm from '../Components/Auth/SignUpForm';
import { withFormik } from 'formik';
import * as Yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const SignupForMikContainer = withFormik({
  mapPropsToValues() {
    // Init form field
    return {
      email: '',
      sodienthoai: '',
      matkhau: '',
      tenkhachhang: '',
    };
  },
  validationSchema: Yup.object().shape({
    // Validate form field
    email: Yup.string()
      .email('Địa chỉ email không hợp lệ')
      .required('Vui lòng nhập Email'),
    sodienthoai: Yup.string()
      .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
      .required('Vui lòng nhập số điện thoại'),
    matkhau: Yup.string()
      .required('Vui lòng nhập mật khẩu')
      .min(6, 'Mật khẩu phải dài hơn 6 ký tự')
      .max(20, 'Mật khẩu phải ngắn hơn 20 ký tự'),
    tenhienthi: Yup.string()
      .min(5, 'Tên phải dài hơn 5 ký tự')
      .max(30, 'Tên phải ngắn hơn 30 ký tự')
      .required('Yêu cầu nhập tên khách hàng'),
  }),
})(SignUpForm);

export default SignupForMikContainer;
