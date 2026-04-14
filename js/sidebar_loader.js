/**
 * SIDEBAR LOADER - IN ẤN SẮC MÀU
 * Cập nhật: Sửa lỗi thiếu mục và ẩn thanh cuộn
 */
(function() {
    function initSidebar() {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (!user) { window.location.href = 'login.html'; return; }

        const moduleString = user.Danh_Sach_Module || user.modules || "";
        const myModules = moduleString.split(',').map(s => s.trim());
        const userRole = user.Vai_Tro || "N/A";
        const userName = user.Ho_Ten || user.name || "Người dùng";

        const sidebarHTML = `
            <div id="sm-overlay" onclick="toggleMobileSidebar()"></div>
            <div id="sm-sidebar" class="sm-sidebar">
                <div class="sm-header">
                    <img src="https://i.ibb.co/twFkxYFk/LOGO-SAC-MAU-CHUAN.png" width="60" onclick="window.location.href='index.html'">
                    <span class="sm-user-info">${userName}<br><small>(${userRole})</small></span>
                </div>
                <div class="sm-menu-box">
                    <a href="index.html" class="sm-nav-link always-show">🏠 TRANG CHỦ</a>
                    <div id="dynamic-menu"></div>
                </div>
                <div class="sm-logout-box">
                    <button onclick="logoutAction()">🚪 Đăng xuất</button>
                </div>
            </div>
            <button class="sm-mobile-btn" onclick="toggleMobileSidebar()">☰ MENU</button>
        `;

        document.body.insertAdjacentHTML('afterbegin', sidebarHTML);

        const menuContainer = document.getElementById('dynamic-menu');
        const groups = {};

        // 1. Gom nhóm tất cả module có trong config.js
        window.APP_MODULES.forEach(mod => {
            if (myModules.includes(mod.id)) {
                if (!groups[mod.group]) groups[mod.group] = [];
                groups[mod.group].push(mod);
            }
        });

        // 2. Định nghĩa thứ tự ưu tiên (Mỹ kiểm tra tên nhóm trong config.js để sửa cho khớp ở đây)
        const priorityOrder = ["Kinh doanh", "Sản xuất", "Kế toán", "Quản trị", "Kho"];
        
        // Lấy danh sách các nhóm thực tế có trong dữ liệu (để không bị sót nhóm nào)
        const allGroupsInConfig = Object.keys(groups);
        
        // Sắp xếp: Ưu tiên các nhóm trong priorityOrder trước, các nhóm còn lại xếp sau
        const sortedGroups = allGroupsInConfig.sort((a, b) => {
            let indexA = priorityOrder.indexOf(a);
            let indexB = priorityOrder.indexOf(b);
            if (indexA === -1) indexA = 99;
            if (indexB === -1) indexB = 99;
            return indexA - indexB;
        });

        // 3. Vẽ Menu
        sortedGroups.forEach(groupName => {
            const groupDiv = document.createElement('div');
            groupDiv.className = 'sm-group';
            groupDiv.innerHTML = `
                <div class="sm-group-title" onclick="this.parentElement.classList.toggle('active')">
                    <span>${getGroupIcon(groupName)} ${groupName.toUpperCase()}</span>
                    <span class="arrow">▼</span>
                </div>
                <div class="sm-group-items">
                    ${groups[groupName].map(m => `
                        <a href="${m.file}" class="sm-nav-link ${window.location.pathname.includes(m.file) ? 'active' : ''}">
                            ${m.icon} ${m.label}
                        </a>
                    `).join('')}
                </div>
            `;
            menuContainer.appendChild(groupDiv);
        });
    }

    function getGroupIcon(name) {
        const icons = { "Kinh doanh": "📝", "Sản xuất": "🛠️", "Kế toán": "💰", "Tài chính": "💰", "Nhân viên": "⏰", "Kho": "📦", "Quản trị": "🛡️" };
        return icons[name] || "📁";
    }

    window.toggleMobileSidebar = function() { document.body.classList.toggle('sm-open'); };
    window.logoutAction = function() { localStorage.removeItem('currentUser'); window.location.href = 'login.html'; };

    const style = document.createElement('style');
    style.textContent = `
        :root { --primary: #2D5A27; --accent: #FF8C00; }
        
        /* ẨN THANH TRƯỢT HOÀN TOÀN */
        .sm-menu-box::-webkit-scrollbar { display: none; }
        .sm-menu-box { -ms-overflow-style: none; scrollbar-width: none; }

        .sm-sidebar { width: 250px; height: 100vh; position: fixed; left: 0; top: 0; background: var(--primary); color: white; z-index: 10001; transition: 0.3s; display: flex; flex-direction: column; }
        .sm-header { padding: 20px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1); }
        .sm-user-info { font-size: 11px; color: #a5d6a7; display: block; margin-top: 8px; background: rgba(0,0,0,0.2); padding: 5px; border-radius: 4px; line-height: 1.4; }
        .sm-menu-box { flex: 1; overflow-y: auto; padding-bottom: 80px; }
        
        .sm-group-title { padding: 12px 15px; cursor: pointer; font-weight: bold; font-size: 13px; color: #8eb38a; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .sm-group-items { display: none; background: rgba(0,0,0,0.15); }
        .sm-group.active .sm-group-items { display: block; }
        .sm-group.active .sm-group-title { color: white; background: rgba(0,0,0,0.1); }
        .sm-group.active .arrow { transform: rotate(180deg); }

        .sm-nav-link { display: block; padding: 10px 15px 10px 35px; color: #cbd5e0; text-decoration: none; font-size: 13px; transition: 0.2s; border-left: 3px solid transparent; }
        .sm-nav-link:hover, .sm-nav-link.active { background: rgba(255,255,255,0.1); color: white; border-left-color: var(--accent); }
        .sm-nav-link.always-show { padding: 15px 20px; font-weight: bold; color: #fff; border-bottom: 1px solid rgba(255,255,255,0.1); }
        
        .sm-logout-box { position: absolute; bottom: 0; width: 100%; padding: 10px; background: var(--primary); box-sizing: border-box; border-top: 1px solid rgba(255,255,255,0.1); }
        .sm-logout-box button { width: 100%; padding: 8px; background: #c0392b; color: white; border: none; cursor: pointer; border-radius: 4px; font-weight: bold; }
        
        .sm-mobile-btn { display: none; position: fixed; top: 10px; left: 10px; z-index: 10000; background: var(--primary); color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; }
        #sm-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 10000; }

        @media (max-width: 768px) {
            .sm-sidebar { left: -250px; }
            .sm-mobile-btn { display: block; }
            body.sm-open .sm-sidebar { left: 0; }
            body.sm-open #sm-overlay { display: block; }
        }
    `;
    document.head.appendChild(style);
    document.addEventListener('DOMContentLoaded', initSidebar);
})();