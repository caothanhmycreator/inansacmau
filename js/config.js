window.SB_CONFIG = {
  URL: "https://zatxvklirqvyacslkpgy.supabase.co",
  KEY: "sb_publishable_BTEsky-YqE0YVrEtTb91vA_V1XfrtyW"
};

/**
 * DANH SÁCH MODULE HỆ THỐNG IN ẤN SẮC MÀU
 * Được phân loại theo nhóm chức năng để quản lý khoa học hơn
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

/**
 * HỆ THỐNG THÔNG BÁO ĐẨY THEO VAI TRÒ (DÁN THÊM)
 */
(function() {
    const NOTIFY_CONFIG = {
        "Admin": ["Tất cả"],
        "Thiet_Ke": ["Chờ thiết kế"],
        "Nhan_Vien_In": ["Chờ in"],
        "Quan_Ly_Don": ["Chờ xử lý", "Chờ duyệt file", "Chờ thiết kế", "Chờ in", "Chờ gia công", "Chờ thanh toán", "Chờ giao hàng"]
    };

    let lastCheckData = {};
    let isFirstLoad = true;

    async function checkOrders() {
        try {
            const user = JSON.parse(localStorage.getItem('currentUser'));
            if (!user) return;

            const role = user.Vai_Tro || "";
            const states = NOTIFY_CONFIG[role] || [];
            if (states.length === 0) return;

            const h = { 'apikey': window.SB_CONFIG.KEY, 'Authorization': `Bearer ${window.SB_CONFIG.KEY}` };
            let q = states.includes("Tất cả") ? "" : `&Trang_Thai=in.(${states.join(',')})`;
            
            const res = await fetch(`${window.SB_CONFIG.URL}/rest/v1/NhatKy_BanHang?select=id,Trang_Thai,Ten_Khach${q}`, { headers: h });
            const data = await res.json();

            let newItems = [];
            data.forEach(item => {
                if (!lastCheckData[item.id] || lastCheckData[item.id] !== item.Trang_Thai) {
                    newItems.push(item);
                }
                lastCheckData[item.id] = item.Trang_Thai;
            });

            if (isFirstLoad) { isFirstLoad = false; return; }

            if (newItems.length > 0) {
                // 1. Phát tiếng chuông báo
                new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3').play().catch(() => {});
                
                // 2. Thông báo hệ điều hành (Native Push)
                if ("Notification" in window && Notification.permission === "granted") {
                    new Notification(`🔔 SẮC MÀU: ${role.toUpperCase()}`, { 
                        body: `Có đơn mới: ${newItems[0].Ten_Khach}`,
                        requireInteraction: true 
                    });
                }
                
                // 3. Thông báo Pop-up Web (nếu có thư viện SweetAlert)
                if (window.Swal) {
                    window.parent.Swal.fire({ 
                        title: 'ĐƠN MỚI!', 
                        text: `Bộ phận ${role} có đơn hàng vừa cập nhật.`, 
                        icon: 'info', 
                        toast: true, 
                        position: 'top-end', 
                        timer: 5000, 
                        showConfirmButton: false 
                    });
                }
            }
        } catch (e) { console.error("Lỗi Notify:", e); }
    }

    // Xin quyền thông báo ngay khi tải trang
    if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission();
    }

    // Khởi động vòng lặp kiểm tra mỗi 25 giây
    setInterval(checkOrders, 25000);
    // Chạy kiểm tra ngay lập tức khi load
    setTimeout(checkOrders, 2000);
})();

/**
 * HỆ THỐNG THÔNG BÁO ĐẨY - BẢN CƯỠNG CHẾ KIỂM TRA
 */
(function() {
    let lastCheckData = {};
    let isFirstLoad = true;

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
            let q = states.includes("Tất cả") ? "" : `&Trang_Thai=in.(${states.join(',')})`;
            
            const res = await fetch(`${window.SB_CONFIG.URL}/rest/v1/NhatKy_BanHang?select=id,Trang_Thai,Ten_Khach${q}`, { headers: h });
            const data = await res.json();

            // Dòng này để Mỹ kiểm tra trong tab Console xem nó có quét đơn không
            console.log(`[Thông báo] Đang quét đơn cho ${role}... Tìm thấy: ${data.length}`);

            let newItems = [];
            data.forEach(item => {
                if (!lastCheckData[item.id] || lastCheckData[item.id] !== item.Trang_Thai) {
                    newItems.push(item);
                }
                lastCheckData[item.id] = item.Trang_Thai;
            });

            if (isFirstLoad) { 
                isFirstLoad = false; 
                console.log("[Thông báo] Ghi nhớ dữ liệu lần đầu thành công.");
                return; 
            }

            if (newItems.length > 0) {
                console.log("🔔 PHÁT HIỆN ĐƠN MỚI:", newItems[0]);
                
                // 1. Phát âm thanh
                const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
                audio.play().catch(() => console.log("Trình duyệt chặn tự động phát âm thanh."));
                
                // 2. Thông báo hệ thống
                if ("Notification" in window && Notification.permission === "granted") {
                    new Notification(`🔔 SẮC MÀU: CÓ ĐƠN MỚI`, { 
                        body: `Khách: ${newItems[0].Ten_Khach} - ${newItems[0].Trang_Thai}`,
                        requireInteraction: true 
                    });
                }
                
                // 3. Ép hiện Swal ở trang chính (Dù đang ở Iframe)
                const targetSwal = window.Swal || window.parent.Swal;
                if (targetSwal) {
                    targetSwal.fire({ 
                        title: 'CÓ ĐƠN MỚI!', 
                        text: `${newItems[0].Ten_Khach} vừa cập nhật trạng thái: ${newItems[0].Trang_Thai}`, 
                        icon: 'info', 
                        toast: true, 
                        position: 'top-end', 
                        timer: 10000,
                        showConfirmButton: false 
                    });
                }
            }
        } catch (e) { console.error("Lỗi Notify:", e); }
    }

    // Yêu cầu quyền ngay lập tức
    if ("Notification" in window) {
        if (Notification.permission === "default") {
            Notification.requestPermission();
        }
    }

    setInterval(checkOrders, 20000); // 20 giây quét một lần
    setTimeout(checkOrders, 3000);   // Chạy thử sau 3 giây khi load
})();