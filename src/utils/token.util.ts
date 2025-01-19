const getCookieHelper = (cName: string): string => {

    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded.split('; ');

    let res: string = '';

    cArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    })

    return res
}

const setCookieHelper = (name: string, value: string, days: number) => {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function delCookie(name: string) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

const tokenUtil = {
    get: () => getCookieHelper('token'),
    set: (token: string) => setCookieHelper("token", token, 255),
    del: () => delCookie("token")
}

export default tokenUtil