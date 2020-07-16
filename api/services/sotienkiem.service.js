const SoTietKiem = require('../db/models/SoTietKiem.Model');
const chuyenKhoanService = require('./chuyenkhoan.service');
const taiKhoanThanhToanService = require('./taikhoan.service');
const laiSuatService = require('./laisuat.service');

//#region BaseService
function generateMaSoTietKiem(sodienthoai, laisuat) {
  const now = new Date();
  const d = ('0' + now.getDate()).slice(-2);
  const m = ('0' + now.getMonth()).slice(-2);
  const y = now.getFullYear().toString().substr(-2);
  const hs = ('0' + now.getHours()).slice(-2);
  const mn = ('0' + now.getMinutes()).slice(-2);

  return '' + sodienthoai + laisuat + d + m + y + hs + mn;
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
module.exports.taoSoTietKiem = async (sotietkiem) => {
  const {
    ngaymo,
    ngaydong,
    sotiengui,
    laisuatId,
    laisuat,
    kyhan,
    tienlai,
    taikhoanthanhtoanMataikhoan,
    khachhangSodienthoai,
    hinhthuctralaiId,
  } = sotietkiem;
  console.log(sotietkiem);

  const maSoTietKiem = generateMaSoTietKiem(khachhangSodienthoai, laisuat);

  //Tạo sổ tiết kiệm
  const newSotietkiem = await SoTietKiem.create({
    id: maSoTietKiem,
    ngaymo,
    ngaydong,
    sotiengui,
    kyhan,
    tienlai,
    tinhtrang: 'Đang trong thời gian gửi tiết kiệm',
    createdAt: new Date(),
    updatedAt: new Date(),
    laisuatId,
    hinhthuctralaiId,
    taikhoanthanhtoanMataikhoan,
    khachhangSodienthoai,
  });

  if (!newSotietkiem) {
    return {
      error: 'Không thể tạo sổ tiết kiệm',
    };
  }

  // Nếu tạo sổ tiết kiệm không bị lỗi thì chuyển qua cập nhật lại số dư cho tài khoản thanh toán
  const capNhatTaiKhoanThanhToan = await taiKhoanThanhToanService.capNhatSoDu({
    mataikhoan: taikhoanthanhtoanMataikhoan,
    sotienchuyenkhoan: -sotiengui,
  });

  if (!capNhatTaiKhoanThanhToan) {
    return {
      error: 'Cập nhật tài khoản thanh toán thất bại',
    };
  }

  // Cập nhật thông tin chuyển khoản
  const maChuyenKhoan = generateMaChuyenKhoan(
    taikhoanthanhtoanMataikhoan,
    maSoTietKiem
  );
  const now = new Date();
  const dmy =
    now.getDate() + '-' + (+now.getMonth() + +1) + '-' + now.getFullYear();
  const taoChuyenKhoan = await chuyenKhoanService.taoChuyenKhoan({
    maChuyenKhoan,
    mataikhoanchuyenkhoan: taikhoanthanhtoanMataikhoan,
    mataikhoanthuhuong: maSoTietKiem,
    sotienchuyenkhoan: sotiengui,
    sodutaikhoanchuyenkhoantruocgiaodich:
      capNhatTaiKhoanThanhToan.sodutruocgiaodich,
    sodutaikhoanchuyenkhoansaugiaodich:
      capNhatTaiKhoanThanhToan.sodusaugiaodich,
    sodutaikhoanthuhuongtruocgiaodich: 0,
    sodutaikhoanthuhuongsaugiaodich: sotiengui,
    noidung: 'Tạo sổ tiết kiệm',
    thoigian: now,
    thoigiandmy: dmy,
    loaichuyenkhoanId: 4,
  });
  if (!taoChuyenKhoan) {
    return {
      error: 'Tạo thông tin chuyển khoản thất bại',
    };
  }

  return newSotietkiem;
};

module.exports.findAll = async () => {
  let danhSachSoTietKiem = await SoTietKiem.findAll();
  if (!danhSachSoTietKiem) {
    return {
      error: 'Bảng danh sách sổ tiết kiệm rỗng',
    };
  }
  return danhSachSoTietKiem;
};

module.exports.findAllByPhone = async (khachhangSodienthoai) => {
  let danhSachSoTietKiem = await SoTietKiem.findAll({
    where: {
      khachhangSodienthoai,
    },
  });
  if (!danhSachSoTietKiem) {
    return {
      error: 'Số điện thoại không tồn tại',
    };
  }
  return danhSachSoTietKiem;
};

module.exports.findBy;
//#endregion

//#region BusService
async function renewSoTietKiem(sotietkiem) {
  const {
    ngaymo,
    ngaydong,
    sotiengui,
    laisuatId,
    laisuat,
    kyhan,
    tienlai,
    taikhoanthanhtoanMataikhoan,
    khachhangSodienthoai,
    hinhthuctralaiId,
  } = sotietkiem;

  const maSoTietKiem = generateMaSoTietKiem(khachhangSodienthoai, laisuat);

  //Tạo sổ tiết kiệm
  const newSotietkiem = await SoTietKiem.create({
    id: maSoTietKiem,
    ngaymo,
    ngaydong,
    sotiengui,
    kyhan,
    tienlai,
    tinhtrang: 'Đang trong thời gian gửi tiết kiệm',
    createdAt: new Date(),
    updatedAt: new Date(),
    laisuatId,
    hinhthuctralaiId,
    taikhoanthanhtoanMataikhoan,
    khachhangSodienthoai,
  });

  if (!newSotietkiem) {
    return {
      error: 'Không thể tạo sổ tiết kiệm',
    };
  }
  return newSotietkiem;
}
function addWeeks(date, weeks) {
  return new Date(date.setDate(date.getDate() + weeks * 7));
}
function addMonths(date, months) {
  const d = date.getDate();
  date.setMonth(date.getMonth() + +months);
  if (date.getDate() != d) {
    date.setDate(0);
  }
  return date;
}
function tinhTienLai(sotiengui, laisuat, kyhan) {
  if (kyhan) {
    return parseInt(+sotiengui * (+laisuat / 100) * (+kyhan / 360));
  }
}
function kiemTraHanRutTien(sotietkiem) {
  const now = new Date();
  const { ngaydong } = sotietkiem;
  // console.log('Ngày đóng');
  // console.log(
  //   `${ngaydong.getDate()}/${ngaydong.getMonth()}/${ngaydong.getFullYear()}`
  // );
  if (
    ngaydong.getDate() === now.getDate() &&
    ngaydong.getMonth() === now.getMonth() &&
    ngaydong.getFullYear() === now.getFullYear()
  ) {
    return true;
  }
  return false;
}
module.exports.capNhatSoTietKiem = async () => {
  console.log('Kiểm tra cập nhật sổ tiết kiệm cron');
  // Mỗi ngày sẽ tiến hành quét những sổ tiết kiệm đang trong trạng thái gửi tiết kiệm
  // Nếu những sổ tiết kiệm này đã đến hạn tất toán hoặc tạo sổ mới với lãi nhập gốc sẽ tiến hành cập nhật lại
  const danhSachSoTietKiem = await SoTietKiem.findAll({
    where: {
      tinhtrang: 'Đang trong thời gian gửi tiết kiệm',
    },
  });
  const danhSachLaiSuat = await laiSuatService.findAll();

  danhSachSoTietKiem.map(async (sotietkiem) => {
    const {
      id,
      ngaydong,
      sotiengui,
      kyhan,
      tienlai,
      khachhangSodienthoai,
      taikhoanthanhtoanMataikhoan,
    } = sotietkiem;
    const kt = kiemTraHanRutTien(sotietkiem);
    console.log(kt);
    // Kiểm tra tới hạn trả lãi
    if (kt === true) {
      console.log(`Hình thức trả lãi: ${sotietkiem.hinhthuctralaiId}`);
      if (+sotietkiem.hinhthuctralaiId === 1) {
        console.log('Hình thức nhập lãi gốc');
        console.log(`${sotietkiem.id}: ${kt}`);
        // Nếu hình thức trả lãi với id = 1
        // Đây là kiểu lãi nhập gốc, tức là sổ tiết kiệm sẽ được tạo mới với số tiền gửi là lãi nhập gốc
        // Các thông tin cần cập nhật lại là: ngày gửi, kỳ hạn (giữ nguyên => ngày đóng)
        //                                    ngày đóng, số tiền gửi, tiền lãi,
        //                                    lãi suất id (lãi suất tại thời điểm tạo mới sổ, không phải lãi suất cũ)
        // Các thông tin về số điện thoại khách hàng, tài khoản thanh toán để nhận tiền sẽ giữ nguyên

        // Đồng thời với việc tạo mới sổ tiết kiệm là việc cập nhật tình trạng của sổ thanh toán cũ
        // Tình trạng lúc này sẽ là "Đã hoàn tất tiết kiệm"
        // Thông tin của sổ tiết kiệm cũ chỉ còn để lưu trữ và tra cứu

        let newNgayDong, newSoTienGui, newLaiSuat, newLaiSuatId, newTienLai;
        let kyhand; // Kỳ hạn theo ngày
        newSoTienGui = +sotiengui + +tienlai;
        const splKyHan = kyhan.split(' ');
        if (splKyHan[1] === 'tuần') {
          newNgayDong = addWeeks(ngaydong, +splKyHan[0]);
          kyhand = splKyHan[0] * 7;
        } else if (splKyHan[1] === 'tháng') {
          newNgayDong = addMonths(ngaydong, +splKyHan[0]);
          kyhand = splKyHan[0] * 30;
        }

        danhSachLaiSuat.map((laisuat) => {
          if (
            +newSoTienGui >= +laisuat.muctientoithieu &&
            +newSoTienGui < +laisuat.muctientoida &&
            laisuat.kyhan === kyhan
          ) {
            newLaiSuat = laisuat.laisuat;
            newLaiSuatId = laisuat.id;
          } else if (
            +newSoTienGui >= +laisuat.muctientoithieu &&
            +laisuat.muctientoida === -1 &&
            laisuat.kyhan === kyhan
          ) {
            newLaiSuat = laisuat.laisuat;
            newLaiSuatId = laisuat.id;
          }
        });
        newTienLai = tinhTienLai(newSoTienGui, newLaiSuat, kyhand);
        const newMaSoTietKiem = generateMaSoTietKiem(
          khachhangSodienthoai,
          newLaiSuat
        );

        // console.log(`new mã sổ tiết kiệm: ${newMaSoTietKiem}`);
        // console.log(`Thông tin tạo mới sổ tiết kiệm`);
        // console.log(`new ngày mở: ${ngaydong}`);
        // console.log(`new ngày đóng: ${newNgayDong}`);
        // console.log(`new số tiền gửi: ${newSoTienGui}`);
        // console.log(`new kỳ hạn: ${kyhan}`);
        // console.log(`new tiền lãi: ${newTienLai}`);
        // console.log(`new lãi suất: ${newLaiSuat}`);
        // console.log(`new lãi suất id: ${newLaiSuatId}`);
        // console.log(`khách hàng số điện thoại: ${khachhangSodienthoai}`);
        // console.log(`mã tài khoản thanh toán ${taikhoanthanhtoanMataikhoan}`);

        // Tạo mới sổ tiết kiệm

        const newSotietkiem = await SoTietKiem.create({
          id: newMaSoTietKiem,
          ngaymo: ngaydong,
          ngaydong: newNgayDong,
          sotiengui: newSoTienGui,
          kyhan,
          tienlai: newTienLai,
          tinhtrang: 'Đang trong thời gian gửi tiết kiệm',
          createdAt: new Date(),
          updatedAt: new Date(),
          laisuatId: newLaiSuatId,
          hinhthuctralaiId: 1,
          taikhoanthanhtoanMataikhoan,
          khachhangSodienthoai,
        });

        if (!newSotietkiem) {
          return {
            error: 'Không thể tạo sổ tiết kiệm',
          };
        }

        // Cập nhật tình trạng sổ tiết kiệm cũ
        sotietkiem.tinhtrang = 'Đã hoàn tất tiết kiệm';
        const capNhatSoCu = await sotietkiem.save();
        if (!capNhatSoCu) {
          return {
            error: 'Không thể cập nhật trạng thái',
          };
        }
      } else if (+sotietkiem.hinhthuctralaiId === 2) {
        // Nếu hình thức trả lãi với id = 2
        // Đây là kiểu trả lãi tất toán, toàn bộ tiền được gửi vào tài khoản thanh toán của khách hàng
        // Trạng thái của sổ tiết kiệm được cập nhật lại thành "Đã hoàn tất tiết kiệm"

        // Chuyển tiền từ sổ tiết kiệm vào tài khoản thanh toán
        console.log('Hình thức tất toán');
        console.log(`${sotietkiem.id}: ${kt}`);
        const tongTienSauTietKiem = +sotiengui + +tienlai;
        console.log(`Tổng tiền sau tiết kiệm: ${tongTienSauTietKiem}`);

        const capNhatTaiKhoanThanhToan = await taiKhoanThanhToanService.capNhatSoDu(
          {
            mataikhoan: taikhoanthanhtoanMataikhoan,
            sotienchuyenkhoan: +tongTienSauTietKiem,
          }
        );
        if (!capNhatTaiKhoanThanhToan) {
          console.log('Cập nhật tài khoản thanh toán thất bại');
          return {
            error: 'Cập nhật tài khoản thanh toán thất bại',
          };
        }
        // Cập nhật thông tin chuyển khoản
        console.log('Cập nhật thông tin chuyển khoản');
        const maChuyenKhoan = generateMaChuyenKhoan(
          id,
          taikhoanthanhtoanMataikhoan
        );
        const now = new Date();
        const dmy =
          now.getDate() +
          '-' +
          (+now.getMonth() + +1) +
          '-' +
          now.getFullYear();
        const taoChuyenKhoan = await chuyenKhoanService.taoChuyenKhoan({
          maChuyenKhoan,
          mataikhoanchuyenkhoan: id,
          mataikhoanthuhuong: taikhoanthanhtoanMataikhoan,
          sotienchuyenkhoan: tongTienSauTietKiem,
          sodutaikhoanchuyenkhoantruocgiaodich: sotiengui,
          sodutaikhoanchuyenkhoansaugiaodich: 0,
          sodutaikhoanthuhuongtruocgiaodich: +capNhatTaiKhoanThanhToan.sodutruocgiaodich,
          sodutaikhoanthuhuongsaugiaodich: +capNhatTaiKhoanThanhToan.sodusaugiaodich,
          noidung: 'Tất toán tiết kiệm',
          thoigian: now,
          thoigiandmy: dmy,
          loaichuyenkhoanId: 5,
        });
        if (!taoChuyenKhoan) {
          return {
            error: 'Tạo thông tin chuyển khoản thất bại',
          };
        }
        console.log('Cập nhật thông tin chuyển khoản thành công');
        sotietkiem.tinhtrang = 'Đã hoàn tất trả lãi';
        const capNhatSoCu = await sotietkiem.save();
        if (!capNhatSoCu) {
          return {
            error: 'Không thể cập nhật trạng thái',
          };
        }
      }
    }
  });
};

//#endregion
async function capNhatThongTinChuyenKhoan(thongtin) {
  // Cập nhật thông tin chuyển khoản
  const {
    mataikhoanchuyenkhoan,
    mataikhoanthuhuong,
    sotienchuyenkhoan,
    sodutaikhoanchuyenkhoantruocgiaodich,
    sodutaikhoanchuyenkhoansaugiaodich,
    sodutaikhoanthuhuongtruocgiaodich,
    sodutaikhoanthuhuongsaugiaodich,
    noidung,
    loaichuyenkhoanId,
  } = thongtin;

  const maChuyenKhoan = generateMaChuyenKhoan(
    mataikhoanchuyenkhoan,
    mataikhoanthuhuong
  );
  const now = new Date();
  const dmy =
    now.getDate() + '-' + (+now.getMonth() + +1) + '-' + now.getFullYear();
  const taoChuyenKhoan = await chuyenKhoanService.taoChuyenKhoan({
    maChuyenKhoan,
    mataikhoanchuyenkhoan,
    mataikhoanthuhuong,
    sotienchuyenkhoan,
    sodutaikhoanchuyenkhoantruocgiaodich,
    sodutaikhoanchuyenkhoansaugiaodich,
    sodutaikhoanthuhuongtruocgiaodich,
    sodutaikhoanthuhuongsaugiaodich,
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

  console.log('Tạo chuyển khoản thành công');
  return taoChuyenKhoan;
}
