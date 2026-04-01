document.addEventListener("DOMContentLoaded", async function() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  
  // 1. Chặn nếu chưa đăng nhập (trừ trang Login)
  if (!user && !window.location.pathname.includes('Login.html')) {
    window.location.href = 'Login.html';
    return;
  }

  // 2. Kiểm tra quyền vào trang hiện tại
  const path = window.location.pathname;
  const currentPageFile = path.substring(path.lastIndexOf('/') + 1);

  if (currentPageFile && currentPageFile !== 'index.html' && currentPageFile !== 'Login.html') {
    const currentModule = window.APP_MODULES.find(m => m.file === currentPageFile);
    // Nếu trang này có trong danh mục và User không có quyền tương ứng
    if (currentModule && !user.modules.includes(currentModule.id)) {
      alert("Bạn không có quyền truy cập chức năng: " + currentModule.label);
      window.location.href = 'index.html';
      return;
    }
  }

  // 3. Tự động nạp Sidebar nếu trang có chỗ chứa (<div id="sidebar-placeholder">)
  const sidebarBox = document.getElementById('sidebar-placeholder');
  if (sidebarBox) {
    try {
      const resp = await fetch('Index_SideBar.html');
      sidebarBox.innerHTML = await resp.text();
      
      const menuContainer = document.getElementById('dynamic-menu-container');
      const userModules = user.modules.split(',').map(s => s.trim());
      
      let menuHtml = "";
      window.APP_MODULES.forEach(m => {
        if (userModules.includes(m.id)) {
          const activeClass = (m.file === currentPageFile) ? "active" : "";
          menuHtml += `<a href="${m.file}" class="menu-item ${activeClass}">${m.icon} ${m.label}</a>`;
        }
      });
      menuContainer.innerHTML = menuHtml;
      document.getElementById('user-display').innerText = `${user.name} (${user.role})`;
    } catch (e) { console.error("Lỗi nạp Sidebar:", e); }
  }
});

window.logout = function() {
  localStorage.removeItem('currentUser');
  window.location.href = 'Login.html';
};