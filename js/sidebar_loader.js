(function() {
    function initSidebar() {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (!user) { window.location.href = 'login.html'; return; }

        const moduleString = user.Danh_Sach_Module || "";
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

        // GIỮ NGUYÊN CẤU TRÚC VÀ THỨ TỰ MENU 2 CẤP CỦA MỸ
        const menuContainer = document.getElementById('dynamic-menu');
        
        // Phân loại module theo nhóm nhưng giữ nguyên thứ tự khai báo trong APP_MODULES
        const groups = {};
        window.APP_MODULES.forEach(mod => {
            if (myModules.includes(mod.id)) {
                if (!groups[mod.group]) groups[mod.group] = [];
                groups[mod.group].push(mod);
            }
        });

        // Duyệt qua từng nhóm để vẽ (Giữ đúng thứ tự các nhóm của Mỹ)
        const groupOrder = ["Kinh doanh", "Sản xuất", "Kho", "Kế toán", "Quản trị"];
        
        groupOrder.forEach(groupName => {
            if (groups[groupName]) {
                const groupDiv = document.createElement('div');
                groupDiv.className = 'sm-group';
                groupDiv.innerHTML = `
                    <div class="sm-group-title" onclick="this.parentElement.classList.toggle('active')">
                        <span>${getGroupIcon(groupName)} ${groupName.toUpperCase()}</span>
                        <span class="arrow">▼</span>
                    </div>
                    <div class="sm-group-items">
                        ${groups[groupName].map(m => `
                            <a href="${m.file}" id="${m.id}" class="sm-nav-link">
                                ${m.icon} ${m.label}
                            </a>
                        `).join('')}
                    </div>
                `;
                menuContainer.appendChild(groupDiv);
            }
        });
    }

    function getGroupIcon(name) {
        const icons = { "Kinh doanh": "📝", "Sản xuất": "🛠️", "Kế toán": "💰", "Nhân viên": "⏰", "Kho": "📦", "Quản trị": "🛡️" };
        return icons[name] || "📁";
    }

    window.toggleMobileSidebar = function() { document.body.classList.toggle('sm-open'); };
    window.logoutAction = function() { localStorage.removeItem('currentUser'); window.location.href = 'login.html'; };

    const style = document.createElement('style');
    style.textContent = `
        /* 1. XỬ LÝ THANH TRƯỢT (SCROLLBAR) CHO ĐẸP VÀ NHỎ GỌN */
        .sm-menu-box::-webkit-scrollbar { width: 4px; }
        .sm-menu-box::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); }
        .sm-menu-box::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
        .sm-menu-box::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.4); }
        
        /* Nếu muốn ẩn hẳn thanh trượt nhưng vẫn cuộn được, hãy dùng dòng này thay thế dòng trên: */
        /* .sm-menu-box { scrollbar-width: none; -ms-overflow-style: none; } */
        /* .sm-menu-box::-webkit-scrollbar { display: none; } */

        .sm-sidebar { width: 250px; height: 100vh; position: fixed; left: 0; top: 0; background: #2D5A27; color: white; z-index: 10001; transition: 0.3s; display: flex; flex-direction: column; }
        .sm-header { padding: 20px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1); }
        .sm-user-info { font-size: 11px; color: #a5d6a7; display: block; margin-top: 8px; background: rgba(0,0,0,0.2); padding: 5px; border-radius: 4px; }
        .sm-menu-box { flex: 1; overflow-y: auto; padding-bottom: 60px; }
        
        .sm-group { border-bottom: 1px solid rgba(255,255,255,0.05); }
        .sm-group-title { padding: 12px 15px; cursor: pointer; font-weight: bold; font-size: 13px; color: #8eb38a; display: flex; justify-content: space-between; align-items: center; }
        .sm-group-items { display: none; background: #1e3d1a; }
        .sm-group.active .sm-group-items { display: block; }
        .sm-group.active .sm-group-title { color: white; }
        .sm-group.active .arrow { transform: rotate(180deg); }

        .sm-nav-link { display: block; padding: 10px 20px 10px 35px; color: #cbd5e0; text-decoration: none; font-size: 13px; border-left: 3px solid transparent; }
        .sm-nav-link:hover { background: #1a3617; color: white; border-left-color: #FF8C00; }
        .sm-nav-link.always-show { padding: 15px 20px; font-weight: bold; color: #fff; border-bottom: 1px solid rgba(255,255,255,0.1); }
        
        .sm-logout-box { position: absolute; bottom: 0; width: 100%; padding: 10px; background: #2D5A27; box-sizing: border-box; }
        .sm-logout-box button { width: 100%; padding: 8px; background: #c0392b; color: white; border: none; cursor: pointer; border-radius: 4px; }
        
        .sm-mobile-btn { display: none; position: fixed; top: 10px; left: 10px; z-index: 10000; background: #2D5A27; color: white; border: none; padding: 8px 12px; border-radius: 4px; }
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