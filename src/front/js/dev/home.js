document.forms.mob.onsubmit = function (event) {
    event.preventDefault();
    window.location.replace(`/${document.getElementById('mob-name').value}`);
};
