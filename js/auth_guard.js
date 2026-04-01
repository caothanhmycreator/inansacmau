(function() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const path = window.location.pathname;
  const file = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

  // 1. Chặn đăng nhập
  if (!user && !file.includes('Login.html')) {
    window.location.href = 'Login.html';
    return;
  }

  // 2. Kiểm tra quyền vào trang hiện tại (Dựa trên ID từng trang)
  if (user && file !== 'index.html' && file !== 'Login.html') {
    const check = () => {
      const mod = window.APP_MODULES?.find(m => m.file === file);
      if (mod && !user.modules.includes(mod.id)) {
        alert("Bạn không có quyền truy cập trang này!");
        window.location.href = 'index.html';
      }
    };
    if (window.APP_MODULES) check();
    else document.addEventListener("DOMContentLoaded", check);
  }
})();

window.logout = function() {
  localStorage.removeItem('currentUser');
  window.location.href = 'Login.html';
};

window.toggleMobileSidebar = function() {
  document.body.classList.toggle('sidebar-open');
};