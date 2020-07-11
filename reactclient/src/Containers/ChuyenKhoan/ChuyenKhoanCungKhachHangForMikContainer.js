import ChuyenKhoanCungKhachHang from '../../Components/ChuyenKhoan/ChuyenKhoanCungKhachHang';
import { withFormik } from 'formik';
import * as Yup from 'yup';

const curReg = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const ChuyenKhoanCungKhachHangForMikContainer = withFormik({
  mapPropsToValues() {
    // Init form field
    return {
      sotienchuyenkhoan: '',
      noidung: '',
    };
  },
  validationSchema: Yup.object().shape({
    // Validate form field
    sotienchuyenkhoan: Yup.string()
      .matches(curReg, 'Số tiền chuyển khoản không hợp lệ')
      .required('Vui lòng nhập số tiền chuyển khoản'),
  }),
})(ChuyenKhoanCungKhachHang);

export default ChuyenKhoanCungKhachHangForMikContainer;
