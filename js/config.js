window.SB_CONFIG = {
  URL: "https://zatxvklirqvyacslkpgy.supabase.co",
  KEY: "sb_publishable_BTEsky-YqE0YVrEtTb91vA_V1XfrtyW"
};

window.APP_MODULES = [
  { id: "Tu_Van",              label: "Tư vấn & Báo giá",       icon: "💬", file: "Tu_Van.html",      group: "Kinh doanh" },
  { id: "Tao_Don",              label: "Tạo đơn hàng",       icon: "🧾", file: "Tao_Don.html",      group: "Kinh doanh" },
  { id: "Sua_Phieu_Dat_Hang",   label: "Sửa phiếu đặt hàng",     icon: "📋", file: "Sua_Don.html",      group: "Kinh doanh" },
  { id: "Bang_Gia_San_Pham",    label: "Bảng giá sản phẩm",      icon: "🏷️", file: "Bang_Gia.html",     group: "Kinh doanh" },
  { id: "Gia_Von",              label: "Giá Vốn",                 icon: "💰", file: "Gia_Von.html",     group: "Kinh doanh" },
  { id: "Cong_No",              label: "Công nợ khách hàng",     icon: "💸", file: "Cong_No.html",      group: "Kinh doanh" },
  { id: "Xu_Ly",                label: "Xử lý đơn hàng",         icon: "⚙️", file: "Xu_Ly.html",        group: "Sản xuất" },
  { id: "Thiet_Ke",             label: "Thiết kế đồ họa",        icon: "🎨", file: "Thiet_Ke.html",      group: "Sản xuất" },
  { id: "Duyet_File",           label: "Duyệt File in",          icon: "✅", file: "Duyet_File.html",    group: "Sản xuất" },
  { id: "Cho_In",               label: "Đơn chờ in",             icon: "🖨️", file: "Cho_In.html",       group: "Sản xuất" },
  { id: "Gia_Cong_Lien_Ket",    label: "Gia công liên kết",      icon: "🔗", file: "Gia_Cong.html",      group: "Sản xuất" },
  { id: "Giao_Hang",            label: "Giao hàng",              icon: "🚚", file: "Giao_Hang.html",     group: "Sản xuất" },
  { id: "Quan_Ly_Tien_Do",      label: "Quản lý tiến độ",        icon: "🛰️", file: "Tien_Do.html",       group: "Sản xuất" },
  { id: "Kho_Vat_Tu",           label: "Kho vật tư",             icon: "🏗️", file: "Kho.html",          group: "Kho" },
  { id: "Dinh_Muc_Nguyen_Lieu", label: "Định mức nguyên liệu",   icon: "🧪", file: "Nguyen_Lieu.html",   group: "Kho" },
  { id: "Thanh_Toan",           label: "Thanh toán đơn hàng",    icon: "💳", file: "Thanh_Toan.html",    group: "Kế toán" },
  { id: "Thu_Chi",              label: "Tiền mặt & Chi",         icon: "💵", file: "Thu_Chi.html",      group: "Kế toán" },
  { id: "Nhap_Hang",            label: "Nhập hàng & Hóa đơn",    icon: "📥", file: "Nhap_Hang.html",      group: "Kế toán" },
  { id: "Bao_Cao_Thu_Chi",      label: "Báo cáo thu chi",        icon: "📊", file: "BC_Thu_Chi.html",    group: "Kế toán" },
  { id: "Quan_Tri_Don_Hang",    label: "Quản trị đơn hàng",      icon: "🗂️", file: "Quan_Tri.html",      group: "Quản trị" },
  { id: "Bao_Cao_Cong_Viec",    label: "Báo cáo công việc",      icon: "📝", file: "BC_Cong_Viec.html",  group: "Quản trị" },
  { id: "Cham_Cong",            label: "Chấm công nhanh",        icon: "🕒", file: "Cham_Cong.html",     group: "Quản trị" },
  { id: "Quan_Ly_Luong",        label: "Bảng tính lương",        icon: "💵", file: "Quan_Ly_Luong.html", group: "Quản trị" },
  { id: "Khach_Hang",           label: "Khách hàng",             icon: "👥", file: "Khach_Hang.html",    group: "Quản trị" },
  { id: "Admin_Quan_Ly_Nhan_Su",label: "Quản trị nhân sự",       icon: "🛠️", file: "Admin_Quan_Ly_Nhan_Su.html", group: "Quản trị" },
  { id: "Bao_Gia",          label: "Báo Giá",             icon: "📋", file: "Bao_Gia.html",      group: "Văn bản" },
  { id: "Hop_Dong",         label: "✍️ Hợp đồng - Nghiệm thu",            icon: "🤝", file: "Hop_Dong.html",     group: "Văn bản" },
  { id: "Hoa_Don_Dien_Tu",  label: "Hóa đơn điện tử",     icon: "🧾", file: "Hoa_Don.html",      group: "Văn bản" }
];

window.formatDateTimeVN = function() {
  const d = new Date();
  const pad = (n) => n.toString().padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

async function guiThongBaoSacMau(tieude, noidung, targetRole = "", targetLink = "") {
    const URL_FUNCTION = "https://zatxvklirqvyacslkpgy.supabase.co/functions/v1/bright-handler";
    const finalLink = targetLink !== "" ? targetLink : (window.location.pathname.split('/').pop() || ""); 

    try {
        await fetch(URL_FUNCTION, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tieude: tieude, noidung: noidung, targetRole: targetRole, link: finalLink })
        });
    } catch (e) {
        console.error("Lỗi gửi thông báo:", e);
    }
}

// =====================================================================
// KHU VỰC THÔNG BÁO, ONESIGNAL & INJECT UI CHUÔNG ĐỘC LẬP
// =====================================================================
(function() {
    if (!document.getElementById('onesignal-sdk')) {
        const osScript = document.createElement('script');
        osScript.id = 'onesignal-sdk';
        osScript.src = "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";
        osScript.defer = true;
        document.head.appendChild(osScript);
    }

    const user = JSON.parse(localStorage.getItem('currentUser'));

    window.OneSignalDeferred = window.OneSignalDeferred || [];
    OneSignalDeferred.push(async function(oneSignal) {
        if (!oneSignal.initialized) {
            await oneSignal.init({
                appId: "e06b8b48-2adf-4970-b2b3-9b509e5357d8",
                allowLocalhostAsSecureOrigin: true,
            });
        }
        await oneSignal.Slidedown.promptPush();
        if (user && (user.Ho_Ten || user.name)) {
            const loginName = user.Ho_Ten || user.name;
            await oneSignal.login(loginName);
            await oneSignal.User.addTags({
                role: user.Vai_Tro || user.role || "N/A"
            });
        }
    });

    const style = document.createElement('style');
    style.textContent = `
        .sm-noti-wrapper { position: fixed; top: 15px; right: 25px; z-index: 9999; }
        .sm-bell-btn { font-size: 20px; cursor: pointer; position: relative; background: #fff; border: 1px solid #e2e8f0; border-radius: 50%; width: 45px; height: 45px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(0,0,0,0.05); transition: 0.2s; color: #2D5A27; }
        .sm-bell-btn:hover { background: #f8fafc; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.1); }
        .sm-badge { position: absolute; top: -2px; right: -2px; background: #e74c3c; color: white; font-size: 11px; padding: 2px 6px; border-radius: 12px; font-weight: bold; border: 2px solid white; box-shadow: 0 2px 4px rgba(231,76,60,0.3); }
        .sm-noti-popup { display: none; position: absolute; top: 55px; right: 0; width: 340px; background: white; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.15); z-index: 10005; color: #333; text-align: left; overflow: hidden; border: 1px solid #f0f0f0; }
        .noti-header { padding: 12px 15px; font-weight: bold; font-size: 14px; background: #fdfdfd; border-bottom: 1px solid #eee; color: #2D5A27; display: flex; justify-content: space-between; align-items: center; }
        .noti-list { max-height: 380px; overflow-y: auto; }
        .noti-item { padding: 12px 15px; border-bottom: 1px solid #f4f4f4; cursor: pointer; transition: 0.2s; position: relative; }
        .noti-item:hover { background: #fafafa; }
        .noti-item.unread { background: #f4f9f4; border-left: 4px solid #27ae60; }
        .noti-title { font-weight: bold; font-size: 13px; display: block; color: #2c3e50; padding-right: 20px; }
        .noti-time { font-size: 11px; color: #95a5a6; margin-top: 5px; display: block; }
        .btn-delete-single-noti { position: absolute; top: 12px; right: 12px; font-size: 14px; color: #e74c3c; opacity: 0.6; transition: 0.2s; background: transparent; border: none; outline: none; padding: 0; margin: 0; cursor: pointer; }
        .btn-delete-single-noti:hover { opacity: 1; transform: scale(1.2); }
        @media print { .sm-noti-wrapper { display: none !important; } }
        @media (max-width: 768px) { .sm-noti-wrapper { top: 10px; right: 15px; } .sm-noti-popup { width: 300px; } }
    `;
    document.head.appendChild(style);

    window.addEventListener('DOMContentLoaded', () => {
        if (!document.querySelector('.sm-noti-wrapper')) {
            const notiHTML = `
                <div class="sm-noti-wrapper no-print">
                    <div class="sm-bell-btn" onclick="toggleNotiPopup()">
                        🔔 <span id="noti-badge" class="sm-badge" style="display:none">0</span>
                    </div>
                    <div id="sm-noti-popup" class="sm-noti-popup">
                        <div class="noti-header">
                            <span>📢 THÔNG BÁO</span> 
                            <div style="display:flex; align-items:center; gap: 10px;">
                                <span id="btn-del-noti" onclick="deleteNotiByDate()" style="cursor:pointer; font-size:12px; color:#e74c3c; display:none;" title="Xóa thông báo theo ngày">🗑 Xóa</span>
                                <span onclick="markAllAsRead()" style="cursor:pointer; font-size:12px; color:#2980b9;" title="Đánh dấu đã đọc tất cả">✔ Đọc hết</span>
                                <span onclick="toggleNotiPopup()" style="cursor:pointer; opacity:0.5; font-size:16px; margin-left: 5px;">✕</span>
                            </div>
                        </div>
                        <div id="noti-list" class="noti-list">
                            <div style="padding:20px; text-align:center; font-size:12px; color:#999;">Đang tải...</div>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', notiHTML);
            
            // Check nếu là Admin thì hiện nút Xóa
            if (user && (user.Vai_Tro === 'Admin' || user.role === 'Admin')) {
                const btnDel = document.getElementById('btn-del-noti');
                if (btnDel) btnDel.style.display = 'inline-block';
            }

            setTimeout(loadNotifications, 500);
        }
    });
})();

window.toggleNotiPopup = function() {
    const p = document.getElementById('sm-noti-popup');
    p.style.display = (p.style.display === 'block') ? 'none' : 'block';
    if (p.style.display === 'block') loadNotifications();
};

window.unreadNotisData = []; // Lưu trữ danh sách chưa đọc

window.loadNotifications = async function() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) return;

    const role = user.Vai_Tro || user.role || "N/A";
    const loginName = user.Ho_Ten || user.name || "Unknown";
    const h = { 'apikey': window.SB_CONFIG.KEY, 'Authorization': `Bearer ${window.SB_CONFIG.KEY}` };
    
    try {
        let filterQuery = "";
        if (role !== "Admin") {
            filterQuery = `&or=(vai_tro_nhan.eq.${role},vai_tro_nhan.eq.All)`;
        }

        const url = `${window.SB_CONFIG.URL}/rest/v1/nhatky_thongbao?order=created_at.desc&limit=50${filterQuery}`;
        const res = await fetch(url, { headers: h });
        
        if (!res.ok) {
            document.getElementById('noti-list').innerHTML = '<div style="padding:20px; text-align:center; color:red; font-size:12px;">Lỗi tải dữ liệu.</div>';
            return;
        }

        const data = await res.json();
        const listEl = document.getElementById('noti-list');
        const badgeEl = document.getElementById('noti-badge');
        
        window.unreadNotisData = data.filter(n => !(n.nguoi_da_doc || "").includes(loginName));
        const unreadCount = window.unreadNotisData.length;
        
        if (unreadCount > 0) {
            badgeEl.innerText = unreadCount > 9 ? '9+' : unreadCount;
            badgeEl.style.display = 'block';
        } else {
            badgeEl.style.display = 'none';
        }

        if (data.length === 0) {
            listEl.innerHTML = '<div style="padding:20px; text-align:center; color:#999; font-size:12px;">Không có thông báo nào.</div>';
            return;
        }

        listEl.innerHTML = data.map(n => {
            const redirectLink = n.link ? n.link : ''; 
            const currentReaders = n.nguoi_da_doc || '';
            const isRead = currentReaders.includes(loginName);

            return `
            <div class="noti-item ${isRead ? '' : 'unread'}" onclick="markAsRead(${n.id}, '${redirectLink}', '${currentReaders}')">
                <span class="noti-title">${n.tieu_de}</span>
                <button class="btn-delete-single-noti" onclick="deleteSingleNoti(event, ${n.id})" title="Xóa thông báo này">✕</button>
                <div style="font-size:12px; margin:4px 0; color:#555;">${n.noi_dung}</div>
                <span class="noti-time">${new Date(n.created_at).toLocaleString('vi-VN', {hour:'2-digit', minute:'2-digit', day:'2-digit', month:'2-digit'})}</span>
            </div>
        `}).join('');
    } catch (e) { 
        console.error("Lỗi load thông báo:", e); 
    }
};

window.markAsRead = async function(id, redirectLink, currentReaders) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const loginName = user?.Ho_Ten || user?.name || "Unknown";

    if (!currentReaders.includes(loginName)) {
        const h = { 
            'apikey': window.SB_CONFIG.KEY, 
            'Authorization': `Bearer ${window.SB_CONFIG.KEY}`, 
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
        };

        const newReaders = currentReaders ? currentReaders + ',' + loginName : loginName;

        try {
            await fetch(`${window.SB_CONFIG.URL}/rest/v1/nhatky_thongbao?id=eq.${id}`, {
                method: 'PATCH',
                headers: h,
                body: JSON.stringify({ nguoi_da_doc: newReaders })
            });
        } catch (e) { console.error("Lỗi đánh dấu đã đọc:", e); }
    }
    
    if (redirectLink && redirectLink !== 'undefined' && redirectLink !== '') {
        window.location.href = redirectLink;
    } else {
        loadNotifications(); 
    }
};

// --- TÍNH NĂNG MỚI: ĐỌC TẤT CẢ ---
window.markAllAsRead = async function() {
    if (!window.unreadNotisData || window.unreadNotisData.length === 0) return;

    const user = JSON.parse(localStorage.getItem('currentUser'));
    const loginName = user?.Ho_Ten || user?.name || "Unknown";
    const h = { 
        'apikey': window.SB_CONFIG.KEY, 
        'Authorization': `Bearer ${window.SB_CONFIG.KEY}`, 
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
    };

    document.getElementById('noti-list').innerHTML = '<div style="padding:20px; text-align:center; font-size:12px; color:#999;">Đang đánh dấu đã đọc...</div>';

    const promises = window.unreadNotisData.map(n => {
        const currentReaders = n.nguoi_da_doc || '';
        const newReaders = currentReaders ? currentReaders + ',' + loginName : loginName;
        return fetch(`${window.SB_CONFIG.URL}/rest/v1/nhatky_thongbao?id=eq.${n.id}`, {
            method: 'PATCH',
            headers: h,
            body: JSON.stringify({ nguoi_da_doc: newReaders })
        });
    });

    await Promise.all(promises);
    loadNotifications();
};

// --- TÍNH NĂNG MỚI: XÓA THEO NGÀY (CHỈ ADMIN) ---
window.deleteNotiByDate = async function() {
    const { value: dateStr } = await Swal.fire({
        title: 'Xóa Thông Báo',
        text: 'Chọn ngày để xóa toàn bộ thông báo:',
        input: 'date',
        showCancelButton: true,
        confirmButtonText: 'XÓA NGAY',
        cancelButtonText: 'HỦY',
        confirmButtonColor: '#e74c3c'
    });

    if (dateStr) {
        Swal.fire({ title: 'Đang xử lý...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
        const h = { 'apikey': window.SB_CONFIG.KEY, 'Authorization': `Bearer ${window.SB_CONFIG.KEY}` };
        
        try {
            await fetch(`${window.SB_CONFIG.URL}/rest/v1/nhatky_thongbao?created_at=gte.${dateStr}T00:00:00&created_at=lte.${dateStr}T23:59:59.999`, {
                method: 'DELETE',
                headers: h
            });
            Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Đã xóa thành công!', showConfirmButton: false, timer: 1500 });
            loadNotifications();
        } catch(e) {
            console.error(e);
            Swal.fire('Lỗi', 'Không thể xóa thông báo', 'error');
        }
    }
};

// --- TÍNH NĂNG MỚI: XÓA TỪNG THÔNG BÁO BẰNG SWEETALERT2 ---
window.deleteSingleNoti = async function(event, id) {
    event.stopPropagation(); // Ngăn sự kiện click cha để không bị mở link hay đánh dấu đã đọc
    
    const result = await Swal.fire({
        title: 'Xóa thông báo',
        text: "Bạn có chắc chắn muốn xóa thông báo này?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#e74c3c',
        cancelButtonColor: '#95a5a6',
        confirmButtonText: 'XÓA',
        cancelButtonText: 'HỦY'
    });

    if (!result.isConfirmed) return;

    const h = { 'apikey': window.SB_CONFIG.KEY, 'Authorization': `Bearer ${window.SB_CONFIG.KEY}` };
    try {
        await fetch(`${window.SB_CONFIG.URL}/rest/v1/nhatky_thongbao?id=eq.${id}`, {
            method: 'DELETE',
            headers: h
        });
        // Tải lại list sau khi xóa thành công mà không đóng Popup
        loadNotifications();
    } catch(e) {
        console.error("Lỗi khi xóa thông báo:", e);
    }
};