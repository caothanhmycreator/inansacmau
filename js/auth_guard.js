(function() {
    // 1. Lấy thông tin User
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const path = window.location.pathname;
    const currentPageFile = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

    // 2. CHẶN ĐĂNG NHẬP (Giữ nguyên tính năng cũ)
    if (!user && !currentPageFile.includes('Login.html')) {
        window.location.href = 'Login.html';
        return;
    }

    // 3. KIỂM TRA QUYỀN VÀO TRANG (Giữ nguyên tính năng cũ)
    if (user && currentPageFile !== 'index.html' && currentPageFile !== 'Login.html') {
        const checkPermission = () => {
            const currentModule = window.APP_MODULES?.find(m => m.file === currentPageFile);
            if (currentModule && !user.modules.includes(currentModule.id)) {
                alert("Bạn không có quyền truy cập chức năng: " + currentModule.label);
                window.location.href = 'index.html';
            }
        };
        // Đợi APP_MODULES từ config.js sẵn sàng
        if (window.APP_MODULES) checkPermission();
        else document.addEventListener("DOMContentLoaded", checkPermission);
    }
})();

// Hàm logout dùng chung cho cả Iframe gọi ra
window.logout = function() {
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('sidebar_cache');
    window.location.href = 'Login.html';
};

// Hàm đóng mở sidebar cho Mobile
window.toggleMobileSidebar = function() {
    document.body.classList.toggle('sidebar-open');
};