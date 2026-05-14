// sidebar_loader.js
(function() {
    // 1. Chỉ nạp thư viện OneSignal nếu chưa có
    if (!document.getElementById('onesignal-sdk')) {
        const osScript = document.createElement('script');
        osScript.id = 'onesignal-sdk';
        osScript.src = "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";
        osScript.defer = true;
        document.head.appendChild(osScript);
    }

    const user = JSON.parse(localStorage.getItem('currentUser'));

    // 2. Khởi tạo OneSignal
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
})();

/**
 * SIDEBAR LOADER - PHIÊN BẢN TÍCH HỢP THÔNG BÁO
 */
(function() {
    function initSidebar() {
        if (document.getElementById('sm-sidebar')) return;

        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (!user) { window.location.href = 'Login.html'; return; }

        const userName = user.Ho_Ten || user.name || "Người dùng";
        const userRole = user.Vai_Tro || user.role || "N/A";
        
        const moduleString = user.Danh_Sach_Module || user.modules || "";
        const myModules = moduleString.split(',').map(s => s.trim());

        const sidebarHTML = `
            <div id="sm-overlay" onclick="toggleMobileSidebar()"></div>
            <div id="sm-sidebar" class="sm-sidebar">
                <div class="sm-header">
                    <img src="https://i.ibb.co/twFkxYFk/LOGO-SAC-MAU-CHUAN.png" width="60" onclick="window.location.href='index.html'" style="cursor:pointer">
                    
                    <!-- NÚT CHUÔNG THÔNG BÁO -->
                    <div class="sm-noti-wrapper">
                        <div class="sm-bell-btn" onclick="toggleNotiPopup()">
                            🔔 <span id="noti-badge" class="sm-badge" style="display:none">0</span>
                        </div>
                        <div id="sm-noti-popup" class="sm-noti-popup">
                            <div class="noti-header">
                                📢 THÔNG BÁO 
                                <span onclick="toggleNotiPopup()" style="float:right; cursor:pointer; opacity:0.5">✕</span>
                            </div>
                            <div id="noti-list" class="noti-list">
                                <div style="padding:20px; text-align:center; font-size:12px; color:#999;">Đang tải...</div>
                            </div>
                        </div>
                    </div>

                    <span id="user-display" class="sm-user-info">${userName} (${userRole})</span>
                </div>

                <div class="sm-menu-box">
                    <a href="index.html" class="nav-link always-show">🏠 TRANG CHỦ</a>

                    <div class="group">
                        <div class="group-title" onclick="this.parentElement.classList.toggle('active')">📝 ĐƠN HÀNG <span>▼</span></div>
                        <div class="group-items">
                            <a href="Tu_Van.html" id="Tu_Van" class="nav-link">💬 Tư vấn & Báo giá</a>
                            <a href="Tao_Don.html" id="Tao_Don" class="nav-link">📝 Tạo đơn mới</a>
                            <a href="Sua_Don.html" id="Sua_Phieu_Dat_Hang" class="nav-link">✏️ Sửa phiếu đặt</a>
                            <a href="Xu_Ly.html" id="Xu_Ly" class="nav-link">⚙️ Xử lý đơn</a>
                            <a href="Thanh_Toan.html" id="Thanh_Toan" class="nav-link">💳 Thanh toán</a>
                        </div>
                    </div>

                    <div class="group">
                        <div class="group-title" onclick="this.parentElement.classList.toggle('active')">🛠️ SẢN XUẤT <span>▼</span></div>
                        <div class="group-items">
                            <a href="Thiet_Ke.html" id="Thiet_Ke" class="nav-link">🎨 Thiết kế</a>
                            <a href="Duyet_File.html" id="Duyet_File" class="nav-link">✅ Duyệt File</a>
                            <a href="Cho_In.html" id="Cho_In" class="nav-link">🖨️ Đơn chờ In</a>
                            <a href="Gia_Cong.html" id="Gia_Cong_Lien_Ket" class="nav-link">🔨 Gia Công</a>
                            <a href="Giao_Hang.html" id="Giao_Hang" class="nav-link">🚚 Giao Hàng</a>
                        </div>
                    </div>

                    <div class="group">
                        <div class="group-title" onclick="this.parentElement.classList.toggle('active')">💰 TÀI CHÍNH <span>▼</span></div>
                        <div class="group-items">
                            <a href="Thu_Chi.html" id="Thu_Chi" class="nav-link">💵 Két & Chi</a>
                            <a href="BC_Thu_Chi.html" id="Bao_Cao_Thu_Chi" class="nav-link">📊 Báo cáo thu chi</a>
                            <a href="Cong_No.html" id="Cong_No" class="nav-link">💸 Công nợ</a>
                            <a href="Nhap_Hang.html" id="Nhap_Hang" target="_parent" class="nav-link">📥 Nhập Hàng</a>
                        </div>
                    </div>

                    <div class="group">
                        <div class="group-title" onclick="this.parentElement.classList.toggle('active')">⏰ NHÂN VIÊN <span>▼</span></div>
                        <div class="group-items">
                            <a href="Cham_Cong.html" id="Cham_Cong" class="nav-link">🕒 Chấm công nhanh</a>
                            <a href="Quan_Ly_Luong.html" id="Quan_Ly_Luong" class="nav-link">💰 Bảng tính lương</a>
                        </div>
                    </div>

                    <div class="group">
                        <div class="group-title" onclick="this.parentElement.classList.toggle('active')">📦 SẢN PHẨM <span>▼</span></div>
                        <div class="group-items">
                            <a href="Kho.html" id="Kho_Vat_Tu" class="nav-link">🏗️ Kho vật tư</a>
                            <a href="Bang_Gia.html" id="Bang_Gia_San_Pham" class="nav-link">🏷️ Bảng giá</a>
                            <a href="Nguyen_Lieu.html" id="Dinh_Muc_Nguyen_Lieu" class="nav-link">🧪 Nguyên liệu</a>
                        </div>
                    </div>

                    <div class="group" id="admin-only-group">
                        <div class="group-title" onclick="this.parentElement.classList.toggle('active')">🛡️ QUẢN TRỊ <span>▼</span></div>
                        <div class="group-items">
                            <a href="Tien_Do.html" id="Quan_Ly_Tien_Do" class="nav-link">📈 Tiến độ chung</a>
                            <a href="BC_Cong_Viec.html" id="Bao_Cao_Cong_Viec" class="nav-link">📝 Báo cáo công việc</a>
                            <a href="Quan_Tri.html" id="Quan_Tri_Don_Hang" class="nav-link">🗂️ Quản trị đơn</a>
                            <a href="Khach_Hang.html" id="Khach_Hang" class="nav-link">👥 Khách hàng</a>
                            <a href="Admin_Quan_Ly_Nhan_Su.html" id="Admin_Quan_Ly_Nhan_Su" class="nav-link">⚙️ Quản lý nhân sự</a>
                        </div>
                    </div>
              
                    <div class="group">
                        <div class="group-title" onclick="this.parentElement.classList.toggle('active')">📄 VĂN BẢN <span>▼</span></div>
                        <div class="group-items">
                            <a href="Bao_Gia.html" id="Bao_Gia" class="nav-link">📋 Báo Giá</a>
                            <a href="Hop_Dong.html" id="Hop_Dong" class="nav-link">✍️ Hợp đồng - Nghiệm thu</a>
                            <a href="Hoa_Don.html" id="Hoa_Don_Dien_Tu" class="nav-link">🧾 Hóa đơn điện tử</a>
                        </div>
                    </div>
                </div>

                <div class="sm-logout-box">
                    <button onclick="logoutAction()">🚪 Đăng xuất</button>
                </div>
            </div>
            <button class="sm-mobile-btn" onclick="toggleMobileSidebar()">☰ MENU</button>
        `;

        if (document.body) {
            document.body.insertAdjacentHTML('afterbegin', sidebarHTML);
            myModules.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.style.display = 'block';
            });

            document.querySelectorAll('.sm-sidebar .group').forEach(g => {
                const hasVisibleLink = Array.from(g.querySelectorAll('.nav-link')).some(a => a.style.display === 'block');
                g.style.display = hasVisibleLink ? 'block' : 'none';
            });

            // Tự động tải số lượng thông báo khi vừa load
            setTimeout(loadNotifications, 1500);
        }
    }

    // --- LOGIC THÔNG BÁO ---
    window.toggleNotiPopup = function() {
        const p = document.getElementById('sm-noti-popup');
        p.style.display = (p.style.display === 'block') ? 'none' : 'block';
        if (p.style.display === 'block') loadNotifications();
    };

    window.loadNotifications = async function() {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        const role = user.Vai_Tro || user.role || "N/A";
        const h = { 'apikey': window.SB_CONFIG.KEY, 'Authorization': `Bearer ${window.SB_CONFIG.KEY}` };
        
        try {
            // Lọc: vai_tro = Role hiện tại HOẶC vai_tro = All
            const res = await fetch(`${window.SB_CONFIG.URL}/rest/v1/NhatKy_ThongBao?or=(vai_tro_nhan.eq.${role},vai_tro_nhan.eq.All)&order=created_at.desc&limit=20`, { headers: h });
            const data = await res.json();
            
            const listEl = document.getElementById('noti-list');
            const badgeEl = document.getElementById('noti-badge');
            
            const unreadCount = data.filter(n => !n.da_doc).length;
            if (unreadCount > 0) {
                badgeEl.innerText = unreadCount > 5 ? '5+' : unreadCount;
                badgeEl.style.display = 'block';
            } else {
                badgeEl.style.display = 'none';
            }

            if (data.length === 0) {
                listEl.innerHTML = '<div style="padding:20px; text-align:center; color:#999; font-size:12px;">Không có thông báo nào.</div>';
                return;
            }

            listEl.innerHTML = data.map(n => `
                <div class="noti-item ${n.da_doc ? '' : 'unread'}" onclick="markAsRead(${n.id})">
                    <span class="noti-title">${n.tieu_de}</span>
                    <div style="font-size:12px; margin:2px 0; color:#555;">${n.noi_dung}</div>
                    <span class="noti-time">${new Date(n.created_at).toLocaleString('vi-VN', {hour:'2-digit', minute:'2-digit', day:'2-digit', month:'2-digit'})}</span>
                </div>
            `).join('');
        } catch (e) { console.error("Lỗi load thông báo:", e); }
    };

    window.markAsRead = async function(id) {
        const h = { 
            'apikey': window.SB_CONFIG.KEY, 
            'Authorization': `Bearer ${window.SB_CONFIG.KEY}`, 
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
        };
        try {
            await fetch(`${window.SB_CONFIG.URL}/rest/v1/NhatKy_ThongBao?id=eq.${id}`, {
                method: 'PATCH',
                headers: h,
                body: JSON.stringify({ da_doc: true })
            });
            loadNotifications();
        } catch (e) { console.error(e); }
    };

    window.toggleMobileSidebar = function() { document.body.classList.toggle('sm-open'); };
    window.logoutAction = function() { localStorage.removeItem('currentUser'); window.location.href = 'Login.html'; }; 

    // --- CSS STYLE ---
    const style = document.createElement('style');
    style.textContent = `
        .sm-sidebar { width: 250px; height: 100vh; position: fixed; left: 0; top: 0; background: #2D5A27; color: white; z-index: 10001; transition: 0.3s; display: flex; flex-direction: column; }
        .sm-header { padding: 15px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1); position: relative; }
        .sm-user-info { font-size: 11px; color: #a5d6a7; background: rgba(0,0,0,0.2); padding: 5px; border-radius: 4px; display: block; margin-top: 8px; }
        
        /* NOTIFICATION CSS */
        .sm-noti-wrapper { position: absolute; top: 15px; right: 15px; }
        .sm-bell-btn { font-size: 18px; cursor: pointer; position: relative; background: rgba(255,255,255,0.1); padding: 5px; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; }
        .sm-badge { position: absolute; top: -5px; right: -5px; background: #e74c3c; color: white; font-size: 10px; padding: 2px 5px; border-radius: 10px; font-weight: bold; border: 1px solid #2D5A27; }
        .sm-noti-popup { display: none; position: absolute; top: 40px; right: 0; width: 280px; background: white; border-radius: 8px; box-shadow: 0 5px 25px rgba(0,0,0,0.3); z-index: 10005; color: #333; text-align: left; overflow: hidden; }
        .noti-header { padding: 10px 15px; font-weight: bold; font-size: 13px; background: #f8f9fa; border-bottom: 1px solid #eee; color: #2D5A27; }
        .noti-list { max-height: 350px; overflow-y: auto; }
        .noti-item { padding: 12px 15px; border-bottom: 1px solid #f0f0f0; cursor: pointer; transition: 0.2s; }
        .noti-item:hover { background: #f9f9f9; }
        .noti-item.unread { background: #f0f7ef; border-left: 4px solid #2D5A27; }
        .noti-title { font-weight: bold; font-size: 13px; display: block; color: #333; }
        .noti-time { font-size: 10px; color: #999; margin-top: 4px; display: block; }
        
        .sm-menu-box { flex: 1; overflow-y: auto; scrollbar-width: none; }
        .sm-menu-box::-webkit-scrollbar { display: none; }
        .group { border-bottom: 1px solid rgba(255,255,255,0.05); }
        .group-title { padding: 12px 15px; cursor: pointer; font-weight: bold; display: flex; justify-content: space-between; font-size: 13px; color: #8eb38a; }
        .group-items { display: none; background: #1e3d1a; }
        .group.active .group-items { display: block; }
        .group.active .group-title { color: white; }
        .nav-link { display: none; padding: 10px 20px 10px 35px; color: #cbd5e0; text-decoration: none; font-size: 13px; border-left: 3px solid transparent; }
        .nav-link:hover { background: #1a3617; color: white; border-left-color: #FF8C00; }
        .nav-link.always-show { display: block !important; padding: 15px 20px; font-weight: bold; color: #fff; border-bottom: 1px solid rgba(255,255,255,0.1); }
        
        .sm-logout-box { width: 100%; padding: 15px 20px; background: #2D5A27; box-sizing: border-box; border-top: 1px solid rgba(255,255,255,0.1); }
        .sm-logout-box button { width: 100%; padding: 9px; background: #c0392b; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 13px; transition: 0.2s; }
        .sm-logout-box button:hover { background: #e74c3c; }

        .sm-mobile-btn { display: none; position: fixed; top: 10px; left: 10px; z-index: 10002; background: #2D5A27; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor:pointer; }
        #sm-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 10000; }
        @media (max-width: 768px) {
            .sm-sidebar { left: -250px; }
            .sm-mobile-btn { display: block; }
            body.sm-open .sm-sidebar { left: 0; }
            body.sm-open #sm-overlay { display: block; }
            .sm-noti-popup { right: -50px; width: 260px; } /* Chỉnh vị trí trên mobile */
        }
    `;
    document.head.appendChild(style);

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initSidebar();
    } else {
        document.addEventListener('DOMContentLoaded', initSidebar);
    }
})();