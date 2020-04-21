const host = "http://49.234.239.133";

function formatUrl(url) {
    if (url.indexOf("http://") !== -1 || url.indexOf("https://") !== -1) {
        return url;
    }
    return host + url
}

export default {
    host,
    formatUrl
}

