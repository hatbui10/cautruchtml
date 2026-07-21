// Hàm tiện ích lấy các dòng không trống từ textarea
function getLines(id) {
    return document.getElementById(id).value.split(/\n/).map(x => x.trim()).filter(Boolean);
}

// 1. GENERATE EXPORT & IMPORT: Từ danh sách tên hàm sinh ra code Export và Import
function generateExportImportCode() {
    const funcNames = getLines('funcNameInput'); // Ô chứa danh sách tên hàm (mỗi dòng 1 tên)
    if (funcNames.length === 0) {
        alert('⚠️ Vui lòng nhập ít nhất một tên hàm!');
        return;
    }

    // A. Sinh code để gắn vào file chứa hàm (phía Export)
    const exportCode = funcNames.map(name => {
        return `export function ${name}() {\n    // Nội dung hàm ${name}\n}`;
    }).join('\n\n');

    // B. Sinh code để gọi ở file khác (phía Import)
    const joinedNames = funcNames.join(', ');
    const importCode = `import { ${joinedNames} } from "./tenFile.js";`;

    // Hiển thị ra các ô kết quả tương ứng trên giao diện
    document.getElementById('exportOut').textContent = exportCode;
    document.getElementById('importOut').textContent = importCode;
}

// 2. PARSE FROM CODE: Dán code có sẵn vào để tự động bóc tách ra danh sách tên hàm
function parseNamesFromCode() {
    const rawCode = document.getElementById('exportOut').value || prompt("Dán đoạn code export vào đây:");
    if (!rawCode) return;

    // Quét tìm tất cả các tên hàm theo dạng `export function [tên_hàm]`
    const regex = /export\s+function\s+([a-zA-Z0-9_$]+)/g;
    let match;
    let names = [];

    while ((match = regex.exec(rawCode)) !== null) {
        names.push(match[1]);
    }

    if (names.length > 0) {
        document.getElementById('funcNameInput').value = names.join('\n');
        generateExportImportCode(); // Tự động chạy lại để cập nhật import/export
        alert(`✨ Đã trích xuất thành công ${names.length} tên hàm!`);
    } else {
        alert('❌ Không tìm thấy định nghĩa "export function" nào!');
    }
}

// Nút copy nhanh
function copyText(elementId) {
    const text = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(text).then(() => {
        alert('✨ Đã copy vào clipboard!');
    });
}
