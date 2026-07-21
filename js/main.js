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
