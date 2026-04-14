window.SB_CONFIG = {
  URL: "https://zatxvklirqvyacslkpgy.supabase.co",
  KEY: "sb_publishable_BTEsky-YqE0YVrEtTb91vA_V1XfrtyW"
};

/**
 * DANH SÁCH MODULE HỆ THỐNG IN ẤN SẮC MÀU
 */
window.APP_MODULES = [
  { id: "Tao_Don", label: "Tạo đơn hàng", icon: "🧾", file: "Tao_Don.html", group: "Kinh doanh" },
  { id: "Sua_Phieu_Dat_Hang", label: "Sửa phiếu đặt hàng", icon: "📋", file: "Sua_Don.html", group: "Kinh doanh" },
  { id: "Bang_Gia_San_Pham", label: "Bảng giá sản phẩm", icon: "🏷️", file: "Bang_Gia.html", group: "Kinh doanh" },
  { id: "Cong_No", label: "Công nợ khách hàng", icon: "💸", file: "Cong_No.html", group: "Kinh doanh" },
  { id: "Xu_Ly", label: "Xử lý đơn hàng", icon: "⚙️", file: "Xu_Ly.html", group: "Sản xuất" },
  { id: "Thiet_Ke", label: "Thiết kế đồ họa", icon: "🎨", file: "Thiet_Ke.html", group: "Sản xuất" },
  { id: "Duyet_File", label: "Duyệt File in", icon: "✅", file: "Duyet_File.html", group: "Sản xuất" },
  { id: "Cho_In", label: "Đơn chờ in", icon: "🖨️", file: "Cho_In.html", group: "Sản xuất" },
  { id: "Gia_Cong_Lien_Ket", label: "Gia công liên kết", icon: "🔗", file: "Gia_Cong.html", group: "Sản xuất" },
  { id: "Giao_Hang", label: "Giao hàng", icon: "🚚", file: "Giao_Hang.html", group: "Sản xuất" },
  { id: "Quan_Ly_Tien_Do", label: "Quản lý tiến độ", icon: "🛰️", file: "Tien_Do.html", group: "Sản xuất" },
  { id: "Kho_Vat_Tu", label: "Kho vật tư", icon: "🏗️", file: "Kho.html", group: "Kho" },
  { id: "Dinh_Muc_Nguyen_Lieu", label: "Định mức nguyên liệu", icon: "🧪", file: "Nguyen_Lieu.html", group: "Kho" },
  { id: "Thanh_Toan", label: "Thanh toán đơn hàng", icon: "💳", file: "Thanh_Toan.html", group: "Kế toán" },
  { id: "Thu_Chi", label: "Tiền mặt & Chi", icon: "💰", file: "Thu_Chi.html", group: "Kế toán" },
  { id: "Bao_Cao_Thu_Chi", label: "Báo cáo thu chi", icon: "📊", file: "BC_Thu_Chi.html", group: "Kế toán" },
  { id: "Quan_Tri_Don_Hang", label: "Quản trị đơn hàng", icon: "🗂️", file: "Quan_Tri.html", group: "Quản trị" },
  { id: "Bao_Cao_Cong_Viec", label: "Báo cáo công việc", icon: "📝", file: "BC_Cong_Viec.html", group: "Quản trị" },
  { id: "Cham_Cong", label: "Chấm công nhanh", icon: "🕒", file: "Cham_Cong.html", group: "Quản trị" },
  { id: "Quan_Ly_Luong", label: "Bảng tính lương", icon: "💵", file: "Quan_Ly_Luong.html", group: "Quản trị" },
  { id: "Admin_Quan_Ly_Nhan_Su", label: "Quản trị nhân sự", icon: "🛠️", file: "Admin_Quan_Ly_Nhan_Su.html", group: "Quản trị" }
];

window.formatDateTimeVN = function() {
  const d = new Date();
  const pad = (n) => n.toString().padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

/**
 * HỆ THỐNG THÔNG BÁO TỰ ĐỘNG (BẢN CHUẨN)
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

    async function runAutoScan() {
        try {
            const user = JSON.parse(localStorage.getItem('currentUser'));
            if (!user) return;
            const role = user.Vai_Tro || "";
            const states = NOTIFY_CONFIG[role] || [];
            if (states.length === 0) return;

            const h = { 'apikey': window.SB_CONFIG.KEY, 'Authorization': `Bearer ${window.SB_CONFIG.KEY}` };
            let q = states.includes("Tất cả") ? "" : `&Trang_Thai=in.(${states.join(',')})`;
            const r = await fetch(`${window.SB_CONFIG.URL}/rest/v1/NhatKy_BanHang?select=id,Trang_Thai,Ten_Khach${q}`, { headers: h });
            const data = await r.json();

            // Hiển thị trạng thái quét trong Console để Mỹ kiểm tra
            console.log(`%c[Sắc Màu] Đang quét cho ${role}... Thấy ${data.length} đơn.`, "color: #2D5A27; font-weight: bold;");

            let news = data.filter(i => !lastCheckData[i.id] || lastCheckData[i.id] !== i.Trang_Thai);
            data.forEach(i => lastCheckData[i.id] = i.Trang_Thai);

            if (isFirstLoad) { 
                isFirstLoad = false; 
                console.log("✅ Ghi nhớ dữ liệu ban đầu xong.");
                return; 
            }

            if (news.length > 0) {
                console.log("🔔 PHÁT HIỆN ĐƠN MỚI:", news[0]);
                new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3').play().catch(() => {});
                
                if (Notification.permission === "granted") {
                    new Notification("🔔 TIỆM IN SẮC MÀU", { 
                        body: `Bộ phận ${role} có đơn mới: ${news[0].Ten_Khach}`, 
                        requireInteraction: true 
                    });
                }
                
                const sw = window.Swal || window.parent.Swal;
                if (sw) sw.fire({ title: 'CÓ ĐƠN MỚI!', text: `Khách: ${news[0].Ten_Khach}`, icon: 'info', toast: true, position: 'top-end', timer: 8000, showConfirmButton: false });
            }
        } catch (e) { console.error("Lỗi Notify:", e); }
    }

    if ("Notification" in window && Notification.permission === "default") Notification.requestPermission();
    
    setInterval(runAutoScan, 20000); // 20 giây quét 1 lần
    setTimeout(runAutoScan, 3000);   // Chạy thử sau 3 giây khi load
})();