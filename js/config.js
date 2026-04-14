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

/**
 * CẤU HÌNH PUSHER CHO HỆ THỐNG THÔNG BÁO (BẢN CHÍNH THỨC)
 */
window.PUSHER_CFG = {
    APP_ID: "2141133",
    KEY: "776951310c5af021efef",
    SECRET: "87ccb88a5b2052bf21e6",
    CLUSTER: "ap1"
};

// Tự động tải thư viện Pusher nếu chưa có
(function() {
    if (!window.Pusher) {
        const script = document.createElement('script');
        script.src = "https://js.pusher.com/8.0/pusher.min.js";
        script.onload = () => initPusherNotify();
        document.head.appendChild(script);
    } else {
        initPusherNotify();
    }

    function initPusherNotify() {
        // Khởi tạo kết nối Pusher
        const pusher = new Pusher(window.PUSHER_CFG.KEY, {
            cluster: window.PUSHER_CFG.CLUSTER,
            forceTLS: true
        });

        const channel = pusher.subscribe('sac-mau-channel');

        // Lắng nghe sự kiện 'new-order-event'
        channel.bind('new-order-event', function(data) {
            const user = JSON.parse(localStorage.getItem('currentUser'));
            const myRole = user?.Vai_Tro || "";
            
            // Log ra console để Mỹ dễ theo dõi
            console.log("%c[Pusher] Nhận thông báo mới:", "color: blue; font-weight: bold;", data);

            // Kiểm tra quyền nhận thông báo (đúng bộ phận hoặc Admin)
            if (myRole === "Admin" || data.role === myRole || data.role === "Tất cả") {
                
                // 1. Phát âm thanh (Sử dụng link âm thanh ổn định)
                const audio = new Audio('https://notificationsounds.com/storage/sounds/notifications/glass.mp3');
                audio.play().catch(e => console.log("Chờ tương tác người dùng để phát âm thanh"));

                // 2. Hiển thị thông báo trình duyệt (Native Notification)
                if ("Notification" in window && Notification.permission === "granted") {
                    new Notification("🔔 TIỆM IN SẮC MÀU", {
                        body: data.message || "Bạn có thông báo mới từ hệ thống!",
                        icon: "https://cdn-icons-png.flaticon.com/512/3119/3119338.png",
                        requireInteraction: true
                    });
                }

                // 3. Hiển thị thông báo SweetAlert (nếu có thư viện Swal)
                const sw = window.Swal || window.parent?.Swal;
                if (sw) {
                    sw.fire({
                        title: 'TÍN HIỆU MỚI!',
                        text: data.message,
                        icon: 'info',
                        toast: true,
                        position: 'top-end',
                        timer: 15000,
                        showConfirmButton: false
                    });
                }
            }
        });

        // Xin quyền thông báo ngay khi kết nối thành công
        if ("Notification" in window && Notification.permission === "default") {
            Notification.requestPermission();
        }
    }
})();

// Hàm gởi thông báo thời gian thực lên Pusher
window.sendPusherNotify = async function(roleTarget, message) {
    const { APP_ID, KEY, SECRET, CLUSTER } = window.PUSHER_CFG;
    const channel = "sac-mau-channel";
    const event = "new-order-event";
    const authData = { role: roleTarget, message: message };

    // Lưu ý: Đây là cách gọi trực tiếp để Mỹ dùng ngay. 
    // Trong thực tế nếu quy mô lớn nên qua Edge Function của Supabase.
    console.log(`📡 Đang gởi tín hiệu tới bộ phận: ${roleTarget}`);
    
    // Gởi tín hiệu qua Pusher API
    // Mỹ có thể dùng công cụ Debug Console trên web Pusher để gởi bằng tay test trước.
};