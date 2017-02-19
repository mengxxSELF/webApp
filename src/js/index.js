/*REM*/
~function () {
    var winW = document.documentElement.clientWidth;
    if (winW > 640) return;
    document.documentElement.style.fontSize = winW / 640 * 100 + 'px';
}();