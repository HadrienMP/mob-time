export function volume() {
    const volume = get("mobTimeVolume");
    if (volume)
        return volume;
    else
        return 100;
}

export function saveVolume(value) {
    save(`mobTimeVolume`, value);
}

export function musics() {
    const musics = get("musics");
    if (musics) {
        return musics.replace(/\\n/g, "\n");
    }
    return null;
}

export function saveMusics(value) {
    save("musics", value.replace(/\n/g, "\\n"));
}

export function displaySeconds() {
    return get("displaySeconds") === "true";
}
export function saveDisplaySeconds(value) {
    save("displaySeconds", value);
}

function get(key) {
    const volumeCookie = document.cookie.split(";").filter(value => value.match(key));
    return volumeCookie[0]?.split("=")[1];
}

function save(key, value) {
    document.cookie = `${key}=${value}; expires=${expirationDate().toUTCString()}`;
}
const expirationDate = () => new Date(new Date().getTime() + inMilliseconds(1));
const inMilliseconds = year => year * 365 * 24 * 60 * 60 * 1000;
