
export function formatTime(num) {
    let len = (num + ' ').length;
    let data = "";
    if (len === 10) {
        data = num * 1000;
    } else {
        data = num;
    }
    var date = new Date(data);
    let Y = date.getFullYear() + "-";
    let M = (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) + "-";
    let D = date.getDate() + " ";
    let h = date.getHours() + ':';
    let m = date.getMinutes() + ':';
    let s = date.getSeconds();
    return Y + M + D + h + m + s;

}