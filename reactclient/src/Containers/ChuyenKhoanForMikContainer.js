import ChuyenKhoan from '../Components/ChuyenKhoan';
import { withFormik } from 'formik';
import * as Yup from 'yup';

const curReg = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const ChuyenKhoanForMikContainer = withFormik({
  mapPropsToValues() {
    // Init form field
    return {
      sotienchuyenkhoan: '',
      mataikhoanthuhuong: '',
      noidung: '',
    };
  },
  validationSchema: Yup.object().shape({
    // Validate form field
    sotienchuyenkhoan: Yup.string()
      .matches(curReg, 'Số tiền chuyển khoản không hợp lệ')
      .required('Vui lòng nhập số tiền chuyển khoản'),
    mataikhoanthuhuong: Yup.string()
      .required('Vui lòng nhập mã tài khoản thụ hưởng')
      .min(8, 'Mã tài khoản thụ hưởng phải dài hơn 8 ký tự')
      .max(30, 'Mã tài khoản thụ hưởng phải ngắn hơn 30 ký tự'),
  }),
})(ChuyenKhoan);

export default ChuyenKhoanForMikContainer;
