(function () {
    var savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', savedTheme);

    if (!localStorage.getItem('theme')) {
        localStorage.setItem('theme', savedTheme);
    }
})();