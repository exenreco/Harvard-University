const 
/**
 * User Style Select
 * 
 * Allows users to select a particular stylesheet base on 
 * there preference.
 */
userStyleSelect = (() => {
    let select  = document.getElementById('mode');

    select.addEventListener('DOMContentLoaded', (e) => {

        ( ! localStorage.getItem('exenrecoStyle') )
        ? localStorage.setItem('exenrecoStyle', select.value) 
        : localStorage.getItem('exenrecoStyle');

        let storage = localStorage.getItem('exenrecoStyle');

        if( storage === 'auto' || storage === 'dark' || storage === 'light' ) {
            select.value = localStorage.getItem('exenrecoStyle');
            document.body.classList.add(localStorage.getItem('exenrecoStyle') + '-mode');
        } else {
            select.value = 'auto';
            document.body.classList.add('auto-mode');
        }

        localStorage.setItem('exenrecoStyle', select.value);

        return;
    }, (() => {
        
        let storage = localStorage.getItem('exenrecoStyle');

        ( storage === 'auto' || storage === 'dark' || storage === 'light' )
        ? document.body.classList.add(localStorage.getItem('exenrecoStyle') + '-mode')
        : document.body.classList.add('auto-mode');

        select.childNodes.forEach((option, index) => {
            option.selected = ( localStorage.getItem('exenrecoStyle') === option.value )
            ? true     // set selected
            : false;   // remove selected
        });
    })());

    select.addEventListener('change', (e) => {

        let mode = select.value

        if( mode === 'auto' ) {
            document.body.classList.remove('dark-mode');
            document.body.classList.remove('light-mode');
            document.body.classList.add('auto-mode');
        } else if ( mode === 'dark' ) {
            document.body.classList.remove('auto-mode');
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
        } else if( mode === 'light' ) {
            document.body.classList.remove('dark-mode');
            document.body.classList.remove('auto-mode');
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('dark-mode');
            document.body.classList.remove('auto-mode');
            document.body.classList.add('auto-mode');
        }

        localStorage.setItem('exenrecoStyle', mode);
        return;
    });
}),

/**
 * Initialize Theme Select
 * 
 * Allows all functions to be accessed on dom load.
 * 
 * @type function
 * @since version 0.0.52
 * @returns null
 */
initializeThemeSelect = (() => {
    userStyleSelect(); // initialize like features
    return null;
});


// Initialize the span element when the page loads
window.onload = initializeThemeSelect();