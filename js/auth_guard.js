(function() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const path = window.location.pathname;
  // Lấy tên file thực tế (VD: Sua_Don.html)
  const fileName = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

  // 1. Chặn đăng nhập (Trừ trang Login)
  if (!user && !fileName.toLowerCase().includes('login.html')) {
    window.location.href = 'Login.html';
    return;
  }

  // 2. Danh sách các trang mặc định ai cũng vào được
  const publicFiles = ['index.html', 'Login.html', 'login.html', 'profile.html'];

  if (user && !publicFiles.includes(fileName)) {
    
    const checkPermission = () => {
      // BƯỚC QUAN TRỌNG: Tra cứu ID chuẩn từ APP_MODULES dựa trên tên file
      // Ví dụ: file "Sua_Don.html" sẽ khớp với ID "Sua_Phieu_Dat_Hang"
      const currentModule = window.APP_MODULES?.find(m => m.file === fileName);
      
      // Nếu file này có định nghĩa trong config, lấy ID của nó. 
      // Nếu không (như file Admin_Quan_Ly_Nhan_Su.html), lấy tên file bỏ đuôi .html
      const pageIdToCheck = currentModule ? currentModule.id : fileName.replace('.html', '');

      // Lấy danh sách module Mỹ đã cấp trong Database
      const myModules = user.Danh_Sach_Module || user.modules || "";
      const allowedList = myModules.split(',').map(s => s.trim());

      // KIỂM TRA
      if (!allowedList.includes(pageIdToCheck)) {
        document.body.innerHTML = ""; // Xóa trắng trang ngay lập tức
        
        const msg = `Mỹ chưa cấp quyền cho bạn vào mục này! (${pageIdToCheck})`;
        
        if (typeof Swal !== 'undefined') {
          Swal.fire({
            icon: 'error',
            title: 'Từ chối truy cập',
            text: msg,
            confirmButtonColor: '#2D5A27'
          }).then(() => { window.location.href = 'index.html'; });
        } else {
          alert(msg);
          window.location.href = 'index.html';
        }
      }
    };

    // Đảm bảo APP_MODULES đã tải xong mới kiểm tra
    if (window.APP_MODULES) {
      checkPermission();
    } else {
      document.addEventListener('DOMContentLoaded', checkPermission);
    }
  }
})();

// Hàm đăng xuất
window.logout = function() {
  localStorage.removeItem('currentUser');
  window.location.href = 'Login.html';
};

// Hàm đóng/mở sidebar
window.toggleMobileSidebar = function() {
  document.body.classList.toggle('sidebar-open');
};