/**
 * Author: Exenreco Bell
 * Date: June 24, 2024
 * File Name: script.js
 * Description: search lucky event listener
*/

"use strict";

const

/**
 * Random Number Function
 * 
 * Returns a random number between the given max number and 0.
 * 
 * @type {function}
 * 
 * @param {integer} limiter - The max number that can be returned.
 * 
 * @returns {integer} - A number between 0 and the max number [limiter];
 * 
 * @since version 1.0.0
 */
randomNumber = ( limiter = 0 ) => Math.floor(Math.random() * limiter),

/**
 * SET ATTRIBUTE
 * 
 * Uses to multiple attributes to the given element.
 * 
 * @type {function}
 * 
 * @param {object} el - The targeted html element
 * 
 * @param {object} attrs - The attributes to add to the given element
 * 
 * @returns {void}
 * 
 * @since version 1.0.0
 */
setAttribute = (el = {}, attrs = {}) => {
    for(let key in attrs) { 
        el.setAttribute(key, attrs[key]);
    }
},

/**
 * GENERATE URL
 * 
 * Creates a url from the given object.
 * 
 * @type {function}
 * 
 * @param {object}
 * 
 * @param {boolean}
 * 
 * @return {string}
 * 
 * @since version 1.0.0
 */
generateURL = ( 
    parts           = {request: 'https://', site: 'google', domain: '.com', query: 'search?q='},
    useDomain       = false
) => {
    // Parts must be an object and have at least one property "site"
    if( ! parts || typeof parts !== 'object' || ! 'site' in parts ) {
        console.error(`
            GENERATE URL(FN): to create a url the property "site" must be provided! \n
            Example param: {site: "google"} \n
        `);
        return null;
    }

    let // scope variable
    url, request, site, domain, query;

    // URL: The string to return when valid
    url = '';

    // REQUEST: type of request => defaults to [https://] when invalid or undefined
    request = (
        'request' in parts && 
        ( 
            parts.request.toLocaleLowerCase() === 'https://' || 
            parts.request.toLocaleLowerCase() === 'http://' 
        )
    ) 
    ?   parts.request.toLocaleLowerCase() // use lower case user defined request type
    :   'https://'; // use default request type

    // SITE: the site name the request is being made to
    site = ( 'site' in parts && typeof parts.site === 'string' && parts.site.length > 0) 
    ? parts.site.toLocaleLowerCase() // use the site name provided by user
    : null; // site name is required

    // DOMAIN: user must specify if a domain should be included, when true
    // and no domain is provided, domain will automatically be set to ".com"
    domain = ( useDomain && useDomain === true )
    ?   // should use domain
        ( 'domain' in parts && typeof parts.domain === 'string' )
        ? parts.domain.toLocaleLowerCase() // domain is provided 
        : '.com' // no domain provided [uses .com as domain]
    : null; // domain will not be included

    // QUERY: A query string to append to the generated url
    // trailing slash will be included and will be removed when included in position "0"
    query = ( 'query' in parts && typeof parts.query === 'string' && parts.query.length > 0) 
    ? // Query string will be included
        ( parts.query[0] === '/' )
        ? parts.query[0].replace('/', '') // replace first occurrence of trailing shift from query string
        : parts.query // query string is ok    
    : null; // query string will not be included

    // Store generated url
    url = (request && typeof request === 'string' ) 
    ?   // request type has been provided 
        ( site && typeof site === 'string' )
        ?   // site name is provided
            ( domain && typeof domain === 'string' )
            ? // domain should be used
                (query && typeof query === 'string' )
                ? url.concat(request, site, domain, '/', query) // has query string 
                : url.concat(request, site, domain) // no query string
            : // domain not in uses
                (query && typeof query === 'string' )
                ? url.concat(request, site, '/', query) // domain not in uses but has query string
                : url.concat(request, site) // domain not in uses 
        : null // site name not provided
    :  null; // request type not provided

    return ( url && typeof url === 'string' ) ? url : null;
},

/**
 * SELECT LUCKY
 * 
 * Uses closure to select the targeted lucky item by it's index 
 * and create other unique properties for the selected item.
 * 
 * @type {function}
 * 
 * @param {integer} index - The index of the item to select in const lucky_topic {
 *  - example: lucky_index[index], 
 *  were index is = a qualifying number from 0 to lucky_index.length
 *  
 * }
 * 
 * @returns {object} {
 *  An object with methods to quickly access item properties 
 *    - method { getUrl } - returns the selected item url.
 *    - method { getIndex } - returns the selected item index.
 *    - method { getSelectedKeyword } - returns the selected item keyword.
 *    - method { getSelected } - returns the selected item as an object.
 *    - method { getSentence } - returns the sentence corresponding to the phrase.
 *    - method { getLog } - logs a list of defined properties to the console.
 * }
 * 
 * @since version 1.0.0
 */
selectLucky = ( index = 0 ) => (() => {
    let // scope variables

        // URL variable
        site, request, domain, query,

        // sentencing variables
        prefix, phrases, keyword, 

        // object variables
        selected, selectedIndex, sentence;

    site = 'google',

    request = 'https://',
    
    domain  = '.com',

    query = 'search?q=',

    prefix = "I'm Feeling",

    phrases = [
        { keyword: 'Curious', url: generateURL({
            site:   site,
            query:  `${query}I%27m+Feeling+Curious&csf=b&ct=ifl&cad=2:curious&ei=CpI2Z82YM4Gm0PEPnYfbyAg&ved=0ahUKEwjNxbfvht2JAxUBEzQIHZ3DFokQnRsIIA&rct=j`
        }, true) },

        { keyword: 'Hungry', url: generateURL({
            site:   site,
            query:  `${query}pizza+near+me`
        }, true) },

        { keyword: 'Adventurous', url: generateURL({ 
            site:   site,
            query:  `${query}flip+a+coin&csf=b&ct=ifl&cad=2:adventurous&ei=CpI2Z82YM4Gm0PEPnYfbyAg&ved=0ahUKEwjNxbfvht2JAxUBEzQIHZ3DFokQnRsIIA&rct=j` 
        }, true) },

        { keyword: 'Playful', url: generateURL({
            site:   `${site}`,
            query:  `${query}google+memory+game&csf=b&ct=ifl&cad=2:playful&ei=CpI2Z82YM4Gm0PEPnYfbyAg&ved=0ahUKEwjNxbfvht2JAxUBEzQIHZ3DFokQnRsIIA&rct=j`,
        }, true) },

        { keyword: 'Stellar', url: generateURL({
            site:   `${site}`,
            query:  `${query}ingenuity&csf=b&ct=ifl&cad=2:stellar&ei=CpI2Z82YM4Gm0PEPnYfbyAg&ved=0ahUKEwjNxbfvht2JAxUBEzQIHZ3DFokQnRsIIA&rct=j`,
        }, true) },

        { keyword: 'Doodley', url: generateURL({
            site:   `doodles.${site}`
        }, false) },

        { keyword: 'Trendy', url: generateURL({
            site:   `trends.${site}`,
            query:  `trending?geo=US`
        }, true) },

        { keyword: 'Artistic', url: generateURL({ 
            site:   `artsandculture.${site}`,
            query:  `asset/mwFGGdzKbfGMkg`,
        }, true) },

        { keyword: 'Funny', url: generateURL({
            site:   site,
            query:  `${query}friends+phoebe`
        }, true) },
    ],

    selected        = phrases[index],
    keyword         = selected.keyword,
    sentence        = prefix,
    sentence        = ( typeof keyword === 'string' )
                    ? sentence.concat(' ', keyword)
                    : sentence.concat(' ', 'error');
    selectedIndex   = phrases.indexOf(selected);

    return {

        /**
         * GET PHRASE COUNT
         * 
         * returns the total number of available phrases.
         * 
         * @type {method}
         * 
         * @returns {integer} Phrases.length - The length of the defined phrases variable
         * 
         * @since version 1.0.0
         */
        getPhraseCount: () => phrases.length,

        /**
         * GET SELECTED KEYWORD
         * 
         * Returns a string containing the selected keyword.
         * 
         * @type {method}
         * 
         * @returns {string} keyword - The selected keyword as an object.
         * 
         * @since version 1.0.0
         */
        getSelectedKeyword: () => keyword,

        /**
         * @type {method}
         * 
         * @param {*} index 
         * 
         * @returns 
         * 
         * @since version 1.0.0
         */
        selectPhrase: ( index, update = false ) => ( index && index >= 0 && index <= phrases.length )
        ? ( update && update === true ) 
            ? selected = phrases[index]
            : phrases[index]
        : phrases[index],

        setPhrase: ( select ) => ( 
            select && typeof select === 'integer' 
            && select >= 0 && select <= phrases.length 
        ) ? index = select : console.error('an integer is required!'),

        /**
         * GET SELECTED
         * 
         * Returns the selected object.
         * 
         * @type {method}
         * 
         * @returns {object} selected - The selected item as an object.
         * 
         * @since version 1.0.0
         */
        getSelected: () => selected,

        /**
         * GET URL
         * 
         * Returns a string containing the selected item url.
         * 
         * @type {method}
         * 
         * @returns {string} url - The selected item's url.
         * 
         * @since version 1.0.0
         */
        getUrl: () => phrases[selectedIndex].url,

        /**
         * GET INDEX
         * 
         * Returns the selected item index.
         * 
         * @type {method}
         * 
         * @returns {number} index - The selected item's index.
         * 
         * @since version 1.0.0
         */
        getIndex: () => selectedIndex,

        /**
         * GET SENTENCE
         * 
         * Returns the selected item's sentence.
         * 
         * @type {method}
         * 
         * @returns {string} sentence - The selected item's sentence as a string'.
         * 
         * @since version 1.0.0
         */
        getSentence: () => sentence,

        /**
         * MODULE LOG
         * 
         * Logs properties of the module object.
         * 
         * @type {method}
         * 
         * @returns {void} - Check console for a log of properties of the selected item.
         * 
         * @since version 1.0.0
         */
        moduleLog: () => console.log( `
            MODEL
            ----------------------------------------------------
            url:            ${phrases[selectedIndex].url}   \n
            index:          ${selectedIndex}                \n
            keyword:        ${keyword}                      \n
            sentence:       ${sentence}                     \n
            total Phrases:  ${ phrases.length}              \n
        `),
    };
})(),

/**
 * VIEW
 * 
 * The function that controls what happen when the lucky button is hovered.
 * 
 * @type {function}
 * 
 * @param {object} settings - a collection of required html attributes to create the scroll effect. { 
 * 
 * settings = {
 * 
 *      - parent {object} - the html present element by id
 * 
 *      - wrapper {object} - the container by id thats located in parent that nests presentation items.
 * 
 *      - submit {object} - The input element by id that triggers the view on mouse event.
 * 
 *      - random {integer} - The corresponding id of the targeted lucky item.
 * 
 * }}
 * 
 * @param {int} timer - the time in integer to clear the used interval.
 * 
 * @returns {function} - Anonymous function that creates an object of useful properties.
 * 
 * @since version 1.0.0
 */
View = ( settings = {}, timer = 10 ) => (() => {
    let // Scope variables

        // object variables
        lucky, marker,

        // element variables
        submit, parent, wrapper, wrapperItem,
        
        // calc variables
        parentHeight, wrapperHeight, itemHeight,   

        // animation variables
        from, to, counter, interval, intervalID;


    // initialize lucky 
    lucky = selectLucky(settings.random),


    // the targeted element
    submit = settings.submit,

    // the presentation parent element
    parent = settings.parent,

    // display parent to grab dimensions
    parent.style = `display: block;`,

    // the container inside parent element
    wrapper = settings.wrapper,

    // selector used for a single present item
    wrapperItem = wrapper.querySelector('div');


    /**
     * CALCULATIONS
     * 
     * We need total height of parent which will be divided by
     * the height of one child element * the number of defined phrases,
     * child elements are referred to as slot.
     */

    // the height offset of the parent element
    parentHeight = Math.floor( parent.offsetHeight ), 

    // The height of the items container
    wrapperHeight = Math.floor( wrapper.offsetHeight ),

    // the height of a single wrapper child
    itemHeight = Math.floor( wrapperItem.offsetHeight ),

    /**
     * MARKER
     * 
     * Returns an object containing the position of each presentation item height.
     * 
     * @type {function}
     * 
     * @return {object}
     * 
     * @since version 1.0.0
     */
    marker = (() => {
        let 
        // marker scope variables
            i,          // iterator
            marks = {}; // collection of markers

        for( i = 0; i <= lucky.getPhraseCount(); i++ ) {
            marks[`mark_${i}`] = Math.floor(i * itemHeight);
        }
        return marks;
    })();

    /**
     * ANIMATIONS
     * 
     * Variables used to create animation
     * 
     * From: the calculated position of the position being left
     * 
     * To: the calculated position of the position the wrapper is being moved to.
     */

    // Assign "to" to the selected marker by selected lucky index
    // the position where we want to animate to
    to = marker[`mark_${lucky.getIndex()}`],

    from = (marker[`mark_${5}`] === to)
    ? marker[`mark_${1}`]
    : marker[`mark_${5}`],

    // Assign counter to from var, this is used as the position being left
    counter = from,

    /**
     * INTERVAL
     * 
     * Used for animation control when mouse enters submit
     * 
     * @type {function}
     * 
     * @return {void}
     * 
     * @since version 1.0.0
     */
    interval = () => {
        // Check for when counter is less that wrapper from position
        counter < to
        ? counter++     // count upwards when counter less than from position
        : counter--;    // count downwards when counter greater than from position

        counter === to // when from position is equal to desired position
        ?   clearInterval(intervalID)                       // reset interval
        :   wrapper.style = `top: -${counter}px;`; // otherwise animate top
    };


    return {

        ...lucky, // allows access to lucky properties from view.

        onMouseLeave: ( event ) => {
            // only trigger when mouse leaves
            event.preventDefault();
            // prevent interference from other events
            event.stopImmediatePropagation();

            // undo whats done to parent in mouse enter event
            parent.removeAttribute('style');
            setAttribute(parent, {'aria-label': ''});

            // undo whats done to wrapper in mouse enter event
            wrapper.removeAttribute('style');

            // update submit input styles
            submit.style = 'visibility: inherit;';

            // reset pointer events
            parent.removeEventListener('click', pointerClick);
            parent.removeEventListener('mouseleave', pointerLeave);
        },

        onMouseEnter: ( event ) => {
            // only trigger when mouse leaves
            event.preventDefault();
            // prevent interference from other events
            event.stopImmediatePropagation();

            // update submit input styles
            submit.style = 'visibility: hidden;';

            // update parent label and style to go to selected
            setAttribute(parent, {
                'aria-label': lucky.getSelectedKeyword()
            });

            // update parent label and style to go to selected
            setAttribute(wrapper, {
                style: `top: -${from}px;`
            });

            
            clearInterval(intervalID);  // reset interval
            intervalID = setInterval( interval, timer); // set interval
        },

        onClick: ( event ) => {

            ( lucky && typeof lucky === 'object' 
                && 'getUrl' in lucky 
                && typeof lucky.getUrl() === 'string'
            )
            ?   // go to selected item url
                window.location = lucky.getUrl()
            :   // do nothing
                null
            ;

            // rest pointer leave
            parent.removeEventListener('mouseleave', pointerLeave)
        },

        viewLog: () => console.log(`
            VIEW
            ----------------------------------------------------
            Parent Height:          ${parentHeight}     \n
            Wrapper Height:         ${wrapperHeight}    \n
            Wrapper Item Height:    ${itemHeight}       \n
        `)
    };
})(),

/**
 * POINTER CLICK
 * 
 * Handles what happen when the lucky submit is clicked.
 * 
 * @type {function}
 * 
 * @param {object} event - Properties of the targeted submit input.
 * 
 * @param {object} updater - Properties of the view updater method.
 * 
 * @returns {void}
 * 
 * @since version 1.0.0
 */
pointerClick = ( event, updater) => updater.onClick(event),

/**
 * POINTER ENTER
 * 
 * Handles what happens when the pointer leaves the target.
 * 
 * @type { function }
 * 
 * @param {object} event - Properties of the targeted submit input.
 * 
 * @param {object} updater - Properties of the view updater method.
 * 
 * @returns {void}
 * 
 * @since version 1.0.0
 */
pointerLeave = ( event, updater ) => updater.onMouseLeave(event),

/**
 * POINTER ENTER
 * 
 * Handles what happens when the mouse hovers over the the lucky submit input.
 * 
 * @type {function}
 * 
 * @param {object} event - Properties of the targeted submit input.
 * 
 * @param {object} selectors - Other selectors that are required {
 *  - parent:   The element that nest wrapper element
 *  - wrapper:  The container of the parent element
 *  - submit:   The input that triggers the event.
 * 
 *  example:  {
 * 
 *      parent:     document.getElementById('parent'),
 * 
 *      wrapper:    document.getElementById('wrapper')
 * 
 *      submit:     document.getElementById('submit')
 * 
 *  }
 * }
 * 
 * @param {function} callback - What happens when mouse leaves the target.
 * 
 * @returns {void}
 * 
 * @since version: 1.0.0
 */
pointerEnter = (event, selectors = {}, callback = () => {} ) => {
    // only run mouse enter features
    event.preventDefault();
    
    // prevent interference from other events
    event.stopImmediatePropagation();

    const // scope variables

        // animation timing
        timer = 8,

        // initialize view
        updater = View({ ...selectors,
            submit: event.target,
            random: randomNumber( selectLucky( 0 ).getPhraseCount() )
        }, timer);

    // start mouseenter event
    updater.onMouseEnter(event),

    // what happens when submit is clicked and lucky is selected?
    selectors.parent.addEventListener('click',
        (e) => pointerClick(e, updater) // go to selected item url
    ),

    // what should happen when mouse leaves?
    selectors.parent.addEventListener('mouseleave',
        (e) => callback( e, updater ) // undo mouseenter activities
    );
    //updater.moduleLog();
    //updater.viewLog();
},

/**
 * LUCKY EVENT HANDLER
 * 
 * An anonymous function used as the controller
 * to initialize script and bind events to luck button {
 *  Dom content load not required, script is deferred!
 * }
 * 
 * @type {function} Anonymous - Initializes lucky button events
 * 
 * @returns {void}
 */
luckyEventHandler = (() => {
    
    let // scope variables
    submit, selectors;
 
    // lucky submit button
    submit = document.getElementById('lucky'), 

    // collection of required html selectors
    selectors  = {
        parent:     document.querySelector('.gbqfba.gbqfba-hvr'), // presentation element
        wrapper:    document.querySelector('.gbqfba.gbqfba-hvr > .container') // presentation child -> container
    },

    // listen for mouse enter event
    submit.addEventListener('pointerenter', 
        (e) => pointerEnter(
            e, // submit event
            selectors, // collection of selectors
            pointerLeave // leave callback
        )
    );
})();

// Initialize lucky event handler
( window && typeof window === 'object' ) 
? window.lucky = luckyEventHandler
: null;