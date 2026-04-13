window.SB_CONFIG = {
  URL: "https://zatxvklirqvyacslkpgy.supabase.co",
  KEY: "sb_publishable_BTEsky-YqE0YVrEtTb91vA_V1XfrtyW"
};

// Danh sách 15 Module chuẩn theo bảng quy đổi (image_3c69e5.png)
window.APP_MODULES = [
  { id: "Tao_Don",             label: "Tạo đơn hàng",          icon: "🧾", file: "Tao_Don.html" },
  { id: "Sua_Phieu_Dat_Hang",  label: "Sửa phiếu đặt hàng",    icon: "📋", file: "Sua_Don.html" },
  { id: "Xu_Ly",               label: "Xử lý đơn hàng",        icon: "⚙️", file: "Xu_Ly.html" },
  { id: "Thiet_Ke",            label: "Thiết kế",              icon: "🎨", file: "Thiet_Ke.html" },
  { id: "Duyet_File",          label: "Duyệt File",            icon: "✅", file: "Duyet_File.html" },
  { id: "Cho_In",              label: "Đơn chờ in",            icon: "🖨️", file: "Cho_In.html" },
  { id: "Gia_Cong_Lien_Ket",   label: "Gia công liên kết",      icon: "🔗", file: "Gia_Cong.html" },
  { id: "Giao_Hang",           label: "Giao hàng",             icon: "🚚", file: "Giao_Hang.html" },
  { id: "Thanh_Toan",          label: "Thanh toán",            icon: "💳", file: "Thanh_Toan.html" },
  { id: "Cong_No",             label: "Công nợ",               icon: "💸", file: "Cong_No.html" },
  { id: "Quan_Tri_Don_Hang",   label: "Quản trị đơn hàng",      icon: "🗂️", file: "Quan_Tri.html" },
  { id: "Bao_Cao_Cong_Viec",   label: "Báo cáo công việc",      icon: "📝", file: "BC_Cong_Viec.html" },
  { id: "Quan_Ly_Tien_Do",     label: "Quản lý tiến độ",        icon: "🛰️", file: "Tien_Do.html" },
  { id: "Thu_Chi",             label: "Tiền mặt đầu ngày & Chi", icon: "💰", file: "Thu_Chi.html" },
  { id: "Bao_Cao_Thu_Chi",     label: "Báo cáo thu chi",        icon: "📊", file: "BC_Thu_Chi.html" },
  { id: "Kho_Vat_Tu",         label: "Kho vật tư",          icon: "🏗️", file: "Kho.html" },
  { id: "Bang_Gia_San_Pham",  label: "Bảng giá sản phẩm",   icon: "🏷️", file: "Bang_Gia.html" },
  { id: "Dinh_Muc_Nguyen_Lieu", label: "Định mức nguyên liệu", icon: "🧪", file: "Nguyen_Lieu.html" },
  { id: "Cham_Cong",             label: "Chấm công nhanh",     icon: "🕒", file: "Cham_Cong.html" },
  { id: "Quan_Ly_Luong",         label: "Bảng tính lương",     icon: "💰", file: "Quan_Ly_Luong.html" },
  { id: "Admin_Quan_Ly_Nhan_Su", label: "Quản trị nhân sự",    icon: "⚙️", file: "Admin_Quan_Ly_Nhan_Su.html" },
];

window.formatDateTimeVN = function() {
  const d = new Date();
  const pad = (n) => n.toString().padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};