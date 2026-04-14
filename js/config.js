window.SB_CONFIG = {
  URL: "https://zatxvklirqvyacslkpgy.supabase.co",
  KEY: "sb_publishable_BTEsky-YqE0YVrEtTb91vA_V1XfrtyW"
};

/**
 * DANH SÁCH MODULE HỆ THỐNG IN ẤN SẮC MÀU
 */
window.APP_MODULES = [
  // --- NHÓM KINH DOANH & BÁN HÀNG ---
  { id: "Tao_Don",              label: "Tạo đơn hàng",           icon: "🧾", file: "Tao_Don.html",      group: "Kinh doanh" },
  { id: "Sua_Phieu_Dat_Hang",   label: "Sửa phiếu đặt hàng",     icon: "📋", file: "Sua_Don.html",      group: "Kinh doanh" },
  { id: "Bang_Gia_San_Pham",    label: "Bảng giá sản phẩm",      icon: "🏷️", file: "Bang_Gia.html",     group: "Kinh doanh" },
  { id: "Cong_No",              label: "Công nợ khách hàng",     icon: "💸", file: "Cong_No.html",      group: "Kinh doanh" },

  // --- NHÓM THIẾT KẾ & SẢN XUẤT ---
  { id: "Xu_Ly",                label: "Xử lý đơn hàng",         icon: "⚙️", file: "Xu_Ly.html",        group: "Sản xuất" },
  { id: "Thiet_Ke",             label: "Thiết kế đồ họa",        icon: "🎨", file: "Thiet_Ke.html",      group: "Sản xuất" },
  { id: "Duyet_File",           label: "Duyệt File in",          icon: "✅", file: "Duyet_File.html",    group: "Sản xuất" },
  { id: "Cho_In",               label: "Đơn chờ in",             icon: "🖨️", file: "Cho_In.html",       group: "Sản xuất" },
  { id: "Gia_Cong_Lien_Ket",    label: "Gia công liên kết",      icon: "🔗", file: "Gia_Cong.html",      group: "Sản xuất" },
  { id: "Giao_Hang",            label: "Giao hàng",              icon: "🚚", file: "Giao_Hang.html",     group: "Sản xuất" },
  { id: "Quan_Ly_Tien_Do",      label: "Quản lý tiến độ",        icon: "🛰️", file: "Tien_Do.html",       group: "Sản xuất" },

  // --- NHÓM KHO & NGUYÊN LIỆU ---
  { id: "Kho_Vat_Tu",           label: "Kho vật tư",             icon: "🏗️", file: "Kho.html",           group: "Kho" },
  { id: "Dinh_Muc_Nguyen_Lieu", label: "Định mức nguyên liệu",   icon: "🧪", file: "Nguyen_Lieu.html",   group: "Kho" },

  // --- NHÓM KẾ TOÁN & TÀI CHÍNH ---
  { id: "Thanh_Toan",           label: "Thanh toán đơn hàng",    icon: "💳", file: "Thanh_Toan.html",    group: "Kế toán" },
  { id: "Thu_Chi",              label: "Tiền mặt & Chi",         icon: "💰", file: "Thu_Chi.html",      group: "Kế toán" },
  { id: "Bao_Cao_Thu_Chi",      label: "Báo cáo thu chi",        icon: "📊", file: "BC_Thu_Chi.html",    group: "Kế toán" },

  // --- NHÓM QUẢN TRỊ & NHÂN SỰ ---
  { id: "Quan_Tri_Don_Hang",    label: "Quản trị đơn hàng",      icon: "🗂️", file: "Quan_Tri.html",      group: "Quản trị" },
  { id: "Bao_Cao_Cong_Viec",    label: "Báo cáo công việc",      icon: "📝", file: "BC_Cong_Viec.html",  group: "Quản trị" },
  { id: "Cham_Cong",            label: "Chấm công nhanh",        icon: "🕒", file: "Cham_Cong.html",     group: "Quản trị" },
  { id: "Quan_Ly_Luong",        label: "Bảng tính lương",        icon: "💵", file: "Quan_Ly_Luong.html", group: "Quản trị" },
  { id: "Admin_Quan_Ly_Nhan_Su",label: "Quản trị nhân sự",       icon: "🛠️", file: "Admin_Quan_Ly_Nhan_Su.html", group: "Quản trị" },
];

/**
 * Hàm định dạng ngày giờ Việt Nam
 */
window.formatDateTimeVN = function() {
  const d = new Date();
  const pad = (n) => n.toString().padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};


(function() {
    let lastId = localStorage.getItem('last_order_id_notify');
    const NOTIFY_CONFIG = {
        "Admin": ["Tất cả"],
        "Thiet_Ke": ["Chờ thiết kế"],
        "Nhan_Vien_In": ["Chờ in"],
        "Quan_Ly_Don": ["Chờ xử lý", "Chờ duyệt file", "Chờ thiết kế", "Chờ in", "Chờ gia công", "Chờ thanh toán", "Chờ giao hàng"]
    };

    async function checkOrders() {
        try {
            const user = JSON.parse(localStorage.getItem('currentUser'));
            if (!user) return;
            const role = user.Vai_Tro || "";
            const states = NOTIFY_CONFIG[role] || [];
            if (states.length === 0) return;

            const h = { 'apikey': window.SB_CONFIG.KEY, 'Authorization': `Bearer ${window.SB_CONFIG.KEY}` };
            // Quét đơn hàng mới nhất
            const res = await fetch(`${window.SB_CONFIG.URL}/rest/v1/NhatKy_BanHang?select=id,Trang_Thai,Ten_Khach_Hang&order=id.desc&limit=1`, { headers: h });
            const data = await res.json();

            if (data && data.length > 0) {
                const latest = data[0];
                if (latest.id != lastId) {
                    if (lastId && (states.includes("Tất cả") || states.includes(latest.Trang_Thai))) {
                        
                        // 1. CHUÔNG BÁO
                        new Audio('https://notificationsounds.com/storage/sounds/notifications/glass.mp3').play().catch(()=>{});

                        // 2. THÔNG BÁO WINDOWS (BANNER)
                        if (Notification.permission === "granted") {
                            new Notification("🔔 SẮC MÀU: ĐƠN MỚI", {
                                body: `Khách: ${latest.Ten_Khach_Hang}\nTrạng thái: ${latest.Trang_Thai}`,
                                requireInteraction: true,
                                icon: "favicon.ico"
                            });
                        }
                    }
                    lastId = latest.id;
                    localStorage.setItem('last_order_id_notify', latest.id);
                }
            }
        } catch (e) {}
    }

    if ("Notification" in window && Notification.permission !== "granted") {
        Notification.requestPermission();
    }

    setInterval(checkOrders, 10000); // 10 giây quét 1 lần
    checkOrders();
})();