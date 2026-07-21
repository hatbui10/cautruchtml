function lines(id){
    return document.getElementById(id).value.split(/\n/).map(x=>x.trim()).filter(Boolean);
}

function build(){
    const css = lines('css'), js = lines('js'), ht = lines('html');
    const cssLinks = css.map(x=>'<link rel="stylesheet" href="css/'+x+'.css">').join('\n');
    const jsLinks = js.map(x=>'<script src="js/'+x+'.js"><\\/script>').join('\n');
    const menu = ht.map(x=>'<a href="'+x+'/">'+x+'</a>').join('\n');
    
    document.getElementById('cssOut').textContent = cssLinks;
    document.getElementById('jsOut').textContent = jsLinks;
    document.getElementById('htmlOut').textContent = menu;
    
    document.getElementById('indexOut').textContent = 
        '<!DOCTYPE html>\n<html lang="vi">\n<head>\n<meta charset="UTF-8">\n<title>' + document.getElementById('title').value + '</title>\n\n' + cssLinks + '\n</head>\n<body>\n<h1>' + document.getElementById('title').value + '</h1>\n' + menu + '\n\n' + jsLinks + '\n</body>\n</html>';
}

// Tự động chạy lần đầu khi mở trang
window.onload = function() {
    build();
};

function copyBox(id){
    const text = document.getElementById(id).textContent;
    navigator.clipboard.writeText(text).then(() => {
        alert('✨ Đã copy vào clipboard!');
    });
}

// ================= THÊM TÍNH NĂNG EXPORT & IMPORT =================

// 1. Export: Tải toàn bộ cấu hình hiện tại xuống thành file .json
function exportConfig() {
    const config = {
        title: document.getElementById('title').value,
        css: document.getElementById('css').value,
        js: document.getElementById('js').value,
        html: document.getElementById('html').value
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "project_config.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
}

// 2. Import: Đọc file .json cấu hình và điền lại vào các ô input
function importConfig(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const config = JSON.parse(e.target.result);
            
            if (config.title !== undefined) document.getElementById('title').value = config.title;
            if (config.css !== undefined) document.getElementById('css').value = config.css;
            if (config.js !== undefined) document.getElementById('js').value = config.js;
            if (config.html !== undefined) document.getElementById('html').value = config.html;

            // Chạy lại hàm build để cập nhật kết quả đầu ra ngay lập tức
            build();
            alert('✨ Import cấu hình thành công!');
        } catch (err) {
            alert('❌ Lỗi đọc file cấu hình! File JSON không hợp lệ.');
        }
        // Reset lại input file để có thể chọn lại chính file đó lần sau nếu muốn
        event.target.value = '';
    };
    reader.readAsText(file);
}
