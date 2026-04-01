(async function() {
  // 0. Lấy thông tin User ngay lập tức (không đợi DOM)
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const path = window.location.pathname;
  const currentPageFile = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

  // 1. Chặn nếu chưa đăng nhập (trừ trang Login.html)
  if (!user && !currentPageFile.includes('Login.html')) {
    window.location.href = 'Login.html';
    return;
  }

  // 2. Kiểm tra quyền vào trang hiện tại (nếu đã đăng nhập)
  if (user && currentPageFile !== 'index.html' && currentPageFile !== 'Login.html') {
    // Đợi config.js load xong APP_MODULES (nếu cần)
    const checkModule = () => {
        const currentModule = window.APP_MODULES?.find(m => m.file === currentPageFile);
        if (currentModule && !user.modules.includes(currentModule.id)) {
            alert("Bạn không có quyền truy cập chức năng: " + currentModule.label);
            window.location.href = 'index.html';
        }
    };
    if (window.APP_MODULES) checkModule();
    else document.addEventListener("DOMContentLoaded", checkModule);
  }

  // 3. Hàm nạp và dựng Sidebar (Tối ưu tốc độ)
  async function setupSidebar() {
    const sidebarBox = document.getElementById('sidebar-placeholder');
    if (!sidebarBox) return;

    // --- CƠ CHẾ CACHE: Hiển thị ngay nếu đã từng load ---
    const cachedHtml = sessionStorage.getItem('sidebar_cache');
    if (cachedHtml) {
        sidebarBox.innerHTML = cachedHtml;
        renderMenuItems(user, currentPageFile);
    }

    try {
      const resp = await fetch('sidebar.html');
      const html = await resp.text();
      
      // Nếu bản mới khác bản cũ thì cập nhật lại
      if (html !== cachedHtml) {
          sidebarBox.innerHTML = html;
          sessionStorage.setItem('sidebar_cache', html);
          renderMenuItems(user, currentPageFile);
      }
    } catch (e) { console.error("Lỗi nạp Sidebar:", e); }
  }

  function renderMenuItems(userData, currentFile) {
    const menuContainer = document.getElementById('dynamic-menu-container');
    if (!menuContainer || !userData) return;

    const userModules = userData.modules.split(',').map(s => s.trim());
    let menuHtml = "";

    window.APP_MODULES?.forEach(m => {
      if (userModules.includes(m.id)) {
        const activeClass = (m.file === currentFile) ? "active" : "";
        menuHtml += `<a href="${m.file}" class="menu-item ${activeClass}">${m.icon} ${m.label}</a>`;
      }
    });

    menuContainer.innerHTML = menuHtml;
    const userDisplay = document.getElementById('user-display');
    if (userDisplay) userDisplay.innerText = `${userData.name} (${userData.role})`;
  }

  // Chạy ngay khi DOM sẵn sàng
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupSidebar);
  } else {
    setupSidebar();
  }
})();

window.logout = function() {
  localStorage.removeItem('currentUser');
  sessionStorage.removeItem('sidebar_cache'); // Xóa cache khi thoát
  window.location.href = 'Login.html';
};