if (typeof localStorage === "undefined" || localStorage === null) {
    const LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./mobs');
}

exports.get = name => localStorage.getItem(name);
exports.save = (name, document) => localStorage.setItem(name, document);
exports.delete = name => localStorage.removeItem(name);
