export function progression(circle, ratio, dash) {
    if (circle === null) return
    if (ratio === 0) {
        circle.style.strokeDashoffset = "0";
    } else {
        dash = dash || dasharray(circle);
        circle.style.strokeDashoffset = (dash - dash * ratio) + "px";
    }
}

export function dasharray(circle) {
    return window.getComputedStyle(circle)
                 .getPropertyValue("stroke-dasharray")
                 .replace("px", "");
}
