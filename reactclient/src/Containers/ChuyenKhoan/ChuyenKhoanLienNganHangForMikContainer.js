import ChuyenKhoanLienNganHang from '../../Components/ChuyenKhoan/ChuyenKhoanLienNganHang';
import { withFormik } from 'formik';
import * as Yup from 'yup';

const curReg = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const ChuyenKhoanLienNganHangForMikContainer = withFormik({
  mapPropsToValues() {
    // Init form field
    return {
      mataikhoanthuhuong: '',
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
})(ChuyenKhoanLienNganHang);

export default ChuyenKhoanLienNganHangForMikContainer;
