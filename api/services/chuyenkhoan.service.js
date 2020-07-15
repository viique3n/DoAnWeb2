const ChuyenKhoan = require('../db/models/ChuyenKhoan.Model');
const TaiKhoanThanhToan = require('../db/models/TaiKhoanThanhToan.Model');
const SoTietKiem = require('../db/models/SoTietKiem.Model');
const hanMucGiaoDichService = require('../services/hanmucgiaodich.service');
const khachHangService = require('../services/khachang.service');
const taiKhoanService = require('../services/taikhoan.service');

async function getThongTinChuyenKhoanCuaTaiKhoanTaiThoiGian(
  mataikhoanchuyenkhoan,
  thoigian
) {
  const t = new Date(thoigian);
  console.log(t);
  const dmy = t.getDate() + '-' + (+t.getMonth() + +1) + '-' + t.getFullYear();
  console.log(dmy);
  const thongtinchuyenkhoan = await ChuyenKhoan.findAll({
    where: {
      thoigiandmy: dmy,
      mataikhoanchuyenkhoan,
    },
  });

  // console.log('------------ DMY--------------');
  // thongtinchuyenkhoan.map((chuyenkhoan) => {
  //   console.log(chuyenkhoan.dataValues);
  // });

  return thongtinchuyenkhoan;
}

async function kiemTraChuyenKhoanHopLe(
  taikhoanchuyenkhoan,
  taikhoanthuhuong,
  thongtinchuyenkhoan
) {
  // Tài khoản chuyển khoản và thụ hưởng: mataikhoan, donvitiente, sodu, tinhtrang, khachhangSodienthoai
  // Thông tin chuyển khoản: id, mataikhoanchuyenkhoan, mataikhoanthuhuong,
  //                          sotienchuyenkhoan, noidung, thoigian, loaichuyenkhoan

  // Kiểm tra tình trạng tài khoản chuyển khoản (Chỉ được chuyển tiền đối với tài khoản đã kích hoạt)
  // Kiểm tra tình trạng tài khoản thụ hưởng (Chỉ được nhận tiền đối với tài khoản đã kích hoạt)
  // Kiểm tra số tiền chuyển khoản trong thông tin chuyển khoản (Ví dụ: chia chết cho 50000)

  // Kiểm tra đối tượng khách hàng sở hữu tài khoản chuyển khoản (Khách hàng thông thường và khách hàng ưu tiên)
  // Kiểm tra hạn mức giao dịch của đối tượng khách hàng đối với tài khoản chuyển khoản
  // Ví dụ: Đối tượng khách hàng thông thường
  // Hạn mức giao dịch tối đa khi chuyển khoản cho một tài khoản cùng ngân hàng là 300 triệu TRONG MỘT NGÀY
  // Hạn mức giao dịch tối đa khi chuyển khoản cho một tài khoản cùng ngân hàng là 300 triệu TRÊN MỘT GIAO DỊCH
  // Kiểm tra số tiền chuyển khoản có phù hợp với hạn mức hay không
  // Kiểm tra số tiền chuyển khoản trong ngày có phù hợp với hạn mức hay không
  let errors = [];

  // 1: Kiểm tra tình trạng tài khoản hợp lệ của TÀI KHOẢN CHUYỂN KHOẢN VÀ TÀI KHOẢN THỤ HƯỞNG
  if (taikhoanchuyenkhoan.tinhtrang !== 'Đã kích hoạt') {
    console.log('tài khoản chuyển khoản chưa kích hoạt');
    errors.push({
      tinhtrangtaikhoanchuyenkhoan: 'Tình trạng không được phép chuyển khoản',
    });
  }
  if (taikhoanthuhuong.tinhtrang !== 'Đã kích hoạt') {
    console.log('tài khoản thụ hưởng chưa kích hoạt');
    errors.push({
      tinhtrangtaikhoanthuhuong: 'Tình trạng không được phép nhận chuyển khoản',
    });
  }

  // 2: Kiểm tra số tiền chuyển khoản có đủ hay không
  if (+taikhoanchuyenkhoan.sodu < +thongtinchuyenkhoan.sotienchuyenkhoan) {
    console.log(`Số dư tài khoản chuyển khoản ${taikhoanchuyenkhoan.sodu}`);
    console.log(
      `Số tiền chuyển khoản ${thongtinchuyenkhoan.sotienchuyenkhoan}`
    );
    console.log('Số dư tài khoản chuyển khoản không đủ');
    errors.push({
      sodutaikhoanchuyenkhoan: 'Số dư không đủ',
    });
  }

  // 3: Kiểm tra số tiền chuyển khoản có hợp lệ (Chia hết cho 50 nghìn)
  if (thongtinchuyenkhoan.sotienchuyenkhoan % 50000 !== 0) {
    console.log('Số tiền chuyển khoản không hợp lệ');
    errors.push({
      sotienchuyenkhoan: 'Số tiền chuyển khoản không hợp lệ',
    });
  }

  // 4: Kiểm tra loại chuyển khoản:
  // 4.1: Chuyển khoản cho tài khoản của cùng khách hàng
  // 4.2: Chuyển khoản cho tài khoản của một khách hàng khách trong cùng một ngân hàng
  // 4.3: Chuyển khoản cho tài khoản của một khách hàng thuộc một ngân hàng khác
  const { loaichuyenkhoanId } = thongtinchuyenkhoan;
  console.log(`loại chuyển khoản: ${loaichuyenkhoanId}`);

  // 5: Kiểm tra đối tượng khách hàng (khách hàng sở hữu tài khoản chuyển khoản ----- khách hàng thông thường và khách hàng ưu tiên)
  const { khachhangSodienthoai } = taikhoanchuyenkhoan;
  console.log(`Số điệnt thoại tài khoản chuyển khoản: ${khachhangSodienthoai}`);
  let khachhang = await khachHangService.findByPhone(khachhangSodienthoai);
  khachhang = khachhang.dataValues;
  console.log('Khách hàng chuyển khoản');
  console.log(khachhang);
  if (khachhang.error) {
    // Sẽ không gặp phải lỗi này
    errors.push({
      sodienthoaikhachhang: 'Database lỗi gì gì đó',
    });
  }
  const { doituongkhachhangId } = khachhang;
  let hanmuc = await hanMucGiaoDichService.findByLoaiChuyenKhoanVaDoiTuongKhachHang(
    loaichuyenkhoanId,
    doituongkhachhangId
  );
  hanmuc = hanmuc.dataValues;
  const hanMucId = hanmuc.id;
  console.log('Hạn mức chuyển khoản');
  console.log(hanmuc);
  console.log(`Hạn mức id: ${hanMucId}`);
  if (hanmuc.error) {
    // Sẽ không gặp lỗi này
    errors.push({
      hanmucbiloi: 'Lỗi hạn mục db',
    });
  }

  // Kiểm tra hạn mức trong ngày của tài khoản thanh toán
  let thongtinchuyenkhoanTKTT = await getThongTinChuyenKhoanCuaTaiKhoanTaiThoiGian(
    taikhoanchuyenkhoan.mataikhoan,
    thongtinchuyenkhoan.thoigian
  );
  console.log('Thông tin chuyển khoản của tài khoản trong ngày');
  // console.log(thongtinchuyenkhoanTKTT);
  thongtinchuyenkhoanTKTT.map((ck) => {
    console.log(ck.dataValues);
  });

  // Tính tổng số tiền chuyển khoản trong ngày của tài khoản chuyển khoản
  let tongtienchuyenkhoan = 0;
  thongtinchuyenkhoanTKTT.map(
    (ck) => (tongtienchuyenkhoan = +tongtienchuyenkhoan + +ck.sotienchuyenkhoan)
  );

  if (hanMucId != 11 && hanMucId != 12) {
    console.log(`Hạn mức id here: ${hanMucId}`);
    // Số tiền chuyển khoản vượt hạn mức tối đa trên ngày
    console.log(
      `Hạn mức tối đa/ngày của tài khoản: ${+hanmuc.hanmuctoidatrenngay}`
    );
    console.log(
      `Hạn mức tối đa/giao dịch của tài khoản: ${+hanmuc.hanmuctoidatrengiaodich}`
    );
    console.log(
      `Số tiền tài khoản đã chuyển khoản trong ngày: ${tongtienchuyenkhoan}`
    );
    console.log(
      `Thông tin số tiền giao dịch: ${+thongtinchuyenkhoan.sotienchuyenkhoan}`
    );
    if (
      +thongtinchuyenkhoan.sotienchuyenkhoan + +tongtienchuyenkhoan >
      +hanmuc.hanmuctoidatrenngay
    ) {
      errors.push({
        hanmuctrenngayquaquydinh:
          'Hạn mức chuyển khoản trên ngày vượt quá quy định',
      });
    }

    // Số tiền chuyển khoản vượt hạn mức tối đa trên một giao dịch
    if (
      +thongtinchuyenkhoan.sotienchuyenkhoan > +hanmuc.hanmuctoidatrengiaodich
    ) {
      errors.push({
        hanmuctrengiaodichquaquydinh:
          'Hạn mức chuyển khoản trên giao dịch vượt quá quy định',
      });
    }
  }

  return errors;
}

function generateMaChuyenKhoan(mataikhoanchuyenkhoan, mataikhoanthuhuong) {
  const now = new Date();
  const d = ('0' + now.getDate()).slice(-2);
  const m = ('0' + now.getMonth()).slice(-2);
  const y = now.getFullYear().toString().substr(-2);
  const hs = ('0' + now.getHours()).slice(-2);
  const mn = ('0' + now.getMinutes()).slice(-2);
  const sc = ('0' + now.getSeconds()).slice(-2);
  return (
    '' + mataikhoanchuyenkhoan + mataikhoanthuhuong + d + m + y + hs + mn + sc
  );
}

module.exports.taoChuyenKhoan = async (thongtinchuyenkhan) => {
  const {
    maChuyenKhoan,
    mataikhoanchuyenkhoan,
    mataikhoanthuhuong,
    sotienchuyenkhoan,
    sodutaikhoanchuyenkhoantruocgiaodich,
    sodutaikhoanchuyenkhoansaugiaodich,
    sodutaikhoanthuhuongtruocgiaodich,
    sodutaikhoanthuhuongsaugiaodich,
    noidung,
    thoigian,
    thoigiandmy,
    loaichuyenkhoanId,
  } = thongtinchuyenkhan;
  const taoChuyenKhoan = await ChuyenKhoan.create({
    id: maChuyenKhoan,
    mataikhoanchuyenkhoan,
    mataikhoanthuhuong,
    sotienchuyenkhoan,
    sodutaikhoanchuyenkhoantruocgiaodich,
    sodutaikhoanchuyenkhoansaugiaodich,
    sodutaikhoanthuhuongtruocgiaodich,
    sodutaikhoanthuhuongsaugiaodich,
    noidung,
    thoigian,
    thoigiandmy,
    loaichuyenkhoanId,
  });
  if (!taoChuyenKhoan) {
    return {
      error: 'Tạo thông tin chuyển khoản thất bại',
    };
  }
  return taoChuyenKhoan;
};

module.exports.chuyenKhoanNoiBo = async (thongtinchuyenkhoan) => {
  const {
    mataikhoanchuyenkhoan,
    mataikhoanthuhuong,
    sotienchuyenkhoan,
    noidung,
    thoigian,
    loaichuyenkhoanId,
  } = thongtinchuyenkhoan;

  let taiKhoanChuyenKhoan = await taiKhoanService.findById(
    mataikhoanchuyenkhoan
  );
  taiKhoanChuyenKhoan = taiKhoanChuyenKhoan.dataValues;
  console.log('tai khoan chuyen khoan');
  console.log(taiKhoanChuyenKhoan);

  let taiKhoanThuHuong = await taiKhoanService.findById(mataikhoanthuhuong);
  taiKhoanThuHuong = taiKhoanThuHuong.dataValues;
  console.log('tai khoan thu huong');
  console.log(taiKhoanThuHuong);

  const kiemtra = await kiemTraChuyenKhoanHopLe(
    taiKhoanChuyenKhoan,
    taiKhoanThuHuong,
    thongtinchuyenkhoan
  );
  console.log('THÔNG TIN KIỂM TRA');
  console.log(kiemtra);

  if (Array.isArray(kiemtra) && kiemtra.length) {
    console.log('lỗi');
    console.log(kiemtra);
    return {
      errors: kiemtra,
    };
  }

  // Cập nhật tài khoản chuyển khoản
  const capNhatTaiKhoanChuyenKhoan = await taiKhoanService.capNhatSoDu({
    mataikhoan: mataikhoanchuyenkhoan,
    sotienchuyenkhoan: -sotienchuyenkhoan,
  });
  if (!capNhatTaiKhoanChuyenKhoan) {
    return {
      error: 'Cập nhật tài khoản chuyển khoản thất bại',
    };
  }
  console.log('Cập nhật tài khoản chuyển khoản thành công');

  // Cập nhật tài khoản thụ hưởng
  const capNhatTaiKhoanThuHuong = await taiKhoanService.capNhatSoDu({
    mataikhoan: mataikhoanthuhuong,
    sotienchuyenkhoan,
  });
  if (!capNhatTaiKhoanThuHuong) {
    return {
      error: 'Cập nhật tài khoản thụ hưởng thất bại',
    };
  }
  console.log('Cập nhật tài khoản thụ hưởng thành công');

  const now = new Date();
  const dmy =
    now.getDate() + '-' + (+now.getMonth() + +1) + '-' + now.getFullYear();
  const maChuyenKhoan = generateMaChuyenKhoan(
    mataikhoanchuyenkhoan,
    mataikhoanthuhuong
  );
  const taoChuyenKhoan = await ChuyenKhoan.create({
    id: maChuyenKhoan,
    mataikhoanchuyenkhoan,
    mataikhoanthuhuong,
    sotienchuyenkhoan,
    sodutaikhoanchuyenkhoantruocgiaodich:
      capNhatTaiKhoanChuyenKhoan.sodutruocgiaodich,
    sodutaikhoanchuyenkhoansaugiaodich:
      capNhatTaiKhoanChuyenKhoan.sodusaugiaodich,
    sodutaikhoanthuhuongtruocgiaodich:
      capNhatTaiKhoanThuHuong.sodutruocgiaodich,
    sodutaikhoanthuhuongsaugiaodich: capNhatTaiKhoanThuHuong.sodusaugiaodich,
    noidung,
    thoigian: now,
    thoigiandmy: dmy,
    loaichuyenkhoanId,
  });
  if (!taoChuyenKhoan) {
    return {
      error: 'Tạo thông tin chuyển khoản thất bại',
    };
  }
  return {
    thanhcong: 'Chuyển khoản thành công',
  };
};
module.exports.chuyenTienTietKiemSangThanhToan = async () => {};
module.exports.chuyenKhoanLienNganHang = async () => {};
