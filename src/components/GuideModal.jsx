import React from "react";
import "../styles/GuideModal.css";

const GuideModal = ({ onClose }) => {
  return (
    <div className="guide-overlay" onClick={onClose}>
      <div className="guide-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Hướng dẫn sử dụng</h2>
        <ul>
          <li>
            <strong>Thêm cột:</strong> Nhấn nút "Add Column".
          </li>
          <li>
            <strong>Đổi tên cột:</strong> Nhấn đúp chuột vào tiêu đề.
          </li>
          <li>
            <strong>Thêm task:</strong> Nhấn "Add task" trong từng cột.
          </li>
          <li>
            <strong>Kéo thả:</strong> Di chuyển cột hoặc task giữa các cột.
          </li>
          <li>
            <strong>Chỉnh sửa task:</strong> Nhấn đúp chuột vào nội dung task.
          </li>
          <li>
            <strong>Xóa task/cột:</strong> Nhấn nút dấu x ở trên task.
          </li>
          <li>
            <strong>Giao diện:</strong> Có thể chuyển đổi Dark/Light Mode.
          </li>
          <li>
            <strong>Hiển thị:</strong> Ngày có màu đỏ là trễ - Ngày có màu cam là deadline trong ngày - Ngày có màu đen là còn deadline
          </li>
        </ul>
        <div className="atention">
          <h2>Chú ý</h2>
          <p>App này còn vài bug nhỏ và sẽ được sử lý ngay khi tìm ra</p>
        </div>
        <button onClick={onClose} className="close-guide-btn">
          Đóng
        </button>
      </div>
    </div>
  );
};

export default GuideModal;
