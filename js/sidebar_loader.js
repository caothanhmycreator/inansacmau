/**
 * SIDEBAR LOADER - BẢN KHÔI PHỤC LOGIC CỦA MỸ
 */
(function() {
    function initSidebar() {
        if (document.getElementById('sm-sidebar')) return;

        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (!user) { window.location.href = 'login.html'; return; }

        const userName = user.Ho_Ten || user.name || "Người dùng";
        const userRole = user.Vai_Tro || user.role || "N/A";
        
        // KHÔI PHỤC LOGIC QUYỀN CỦA MỸ (Có user.modules)
        const moduleString = user.Danh_Sach_Module || user.modules || "";
        const myModules = moduleString.split(',').map(s => s.trim());

        const sidebarHTML = `
            <div id="sm-overlay" onclick="toggleMobileSidebar()"></div>
            <div id="sm-sidebar" class="sm-sidebar">
                <div class="sm-header">
                    <img src="https://i.ibb.co/twFkxYFk/LOGO-SAC-MAU-CHUAN.png" width="60" onclick="window.location.href='index.html'" style="cursor:pointer">
                    <span id="user-display" class="sm-user-info">${userName} (${userRole})</span>
                </div>

                <div class="sm-menu-box">
                    <a href="index.html" class="nav-link always-show">🏠 TRANG CHỦ</a>

                    <div class="group">
                        <div class="group-title" onclick="this.parentElement.classList.toggle('active')">📝 ĐƠN HÀNG <span>▼</span></div>
                        <div class="group-items">
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
                            <a href="Admin_Quan_Ly_Nhan_Su.html" id="Admin_Quan_Ly_Nhan_Su" class="nav-link">⚙️ Quản lý nhân sự</a>
                        </div>
                    </div>
                </div>

                <div class="sm-logout-box">
                    <button onclick="logoutAction()" style="width:100%; padding:8px; background:#c0392b; color:white; border:none; cursor:pointer; border-radius:4px; font-weight:bold;">🚪 Đăng xuất</button>
                </div>
            </div>
            <button class="sm-mobile-btn" onclick="toggleMobileSidebar()">☰ MENU</button>
        `;

        if (document.body) {
            document.body.insertAdjacentHTML('afterbegin', sidebarHTML);
            
            // KHÔI PHỤC Y CHANG HÀM CHECK CŨ CỦA MỸ
            myModules.forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    el.style.display = 'block';
                }
            });

            document.querySelectorAll('.sm-sidebar .group').forEach(g => {
                if (g.querySelector('.always-show')) return;
                
                const hasVisibleLink = Array.from(g.querySelectorAll('.nav-link')).some(a => a.style.display === 'block');
                if (hasVisibleLink) {
                    g.style.display = 'block';
                } else {
                    g.style.display = 'none';
                }
            });
        }
    }

    window.toggleMobileSidebar = function() { document.body.classList.toggle('sm-open'); };
    window.logoutAction = function() { localStorage.removeItem('currentUser'); window.location.href = 'login.html'; };
const style = document.createElement('style');
    style.textContent = `
        .sm-sidebar { width: 250px; height: 100vh; position: fixed; left: 0; top: 0; background: #2D5A27; color: white; z-index: 10001; transition: 0.3s; display: flex; flex-direction: column; }
        .sm-header { padding: 15px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1); }
        .sm-user-info { font-size: 11px; color: #a5d6a7; background: rgba(0,0,0,0.2); padding: 5px; border-radius: 4px; display: block; margin-top: 8px; }
        
        /* Chỉnh lại khung cuộn để không đè lên nút đăng xuất */
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
        
        /* 🛠️ SỬA LẠI NÚT ĐĂNG XUẤT CHO GỌN ĐẸP VÀ KHÔNG BỊ LỖI VIỀN */
        .sm-logout-box { 
            width: 100%; 
            padding: 15px 20px; 
            background: #2D5A27; 
            box-sizing: border-box; 
            border-top: 1px solid rgba(255,255,255,0.1); /* Vạch kẻ ngăn cách mờ */
        }
        .sm-logout-box button { 
            width: 100%; 
            padding: 9px; 
            background: #c0392b; 
            color: white; 
            border: none; 
            border-radius: 6px; 
            cursor: pointer; 
            font-weight: bold; 
            font-size: 13px; 
            transition: 0.2s; 
        }
        .sm-logout-box button:hover { background: #e74c3c; } /* Đổi màu khi rê chuột */

        .sm-mobile-btn { display: none; position: fixed; top: 10px; left: 10px; z-index: 10002; background: #2D5A27; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor:pointer; }
        #sm-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 10000; }
        @media (max-width: 768px) {
            .sm-sidebar { left: -250px; }
            .sm-mobile-btn { display: block; }
            body.sm-open .sm-sidebar { left: 0; }
            body.sm-open #sm-overlay { display: block; }
        }
    `;
    document.head.appendChild(style);

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initSidebar();
    } else {
        document.addEventListener('DOMContentLoaded', initSidebar);
    }
})();