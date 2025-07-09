(function () {
    var savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    console.log('Current page:', window.location.href);
    console.log('localStorage theme:', localStorage.getItem('theme'));
    console.log('All localStorage:', localStorage);

    // List all localStorage keys
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        console.log(`${key}: ${localStorage.getItem(key)}`);
    }

    document.documentElement.setAttribute('data-theme', savedTheme);

    if (!localStorage.getItem('theme')) {
        localStorage.setItem('theme', savedTheme);
    }
})();