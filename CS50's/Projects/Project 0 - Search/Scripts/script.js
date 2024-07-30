const

pre_fix         = "I'm Feeling",

search_url      = "https://google.com/search?q=",

lucky_topics    = [
    {
        title: 'Curious',
        url: search_url + 'keming'
    },
    {
        title: 'Hungry',
        url: search_url + 'pizza+near+me'
    },
    {
        title: 'Adventurous',
        url: search_url + 'roll+a+die'
    },
    {
        title: 'Playful',
        url: 'https://doodles.google/doodle/wilbur-scovilles-151st-birthday/'
    },
    {
        title: 'Stellar',
        url: search_url + 'reflection+nebula&um=1&ie=UTF-8&sxsrf=ADLYWIKebPgoLX8rShxEZpC54W1g5ssOAw:1722088445943&udm=2'
    },
    {
        title: 'Doodley',
        url: 'https://doodles.google/'
    },
    {
        title: 'Trendy',
        url: 'https://trends.google.com/trends/trendingsearches/daily?geo=US&hl=en-GB'
    },
    {
        title: 'Artistic',
        url: 'https://artsandculture.google.com/asset/DwHa_BZQUdYEzw'
    },
    {
        title: 'Funny',
        url: search_url + 'friends+phoebe'
    },
],

randomNumber = ( limiter = 0 ) => Math.floor(Math.random() * limiter),

getSentence = ( phrase = 'Lucky' ) => {
    let sentence = pre_fix;

    return ( typeof phrase === 'string' )
    ? sentence.concat(' ', phrase)
    : sentence.concat(' ', lucky_topics[0].title);
},

onPointerLeave = (e, triggerInput, containerEl, containerStyle) => {
    e.preventDefault();
    e.stopImmediatePropagation();

    // reset trigger input visibility
    triggerInput.setAttribute('style', 'visibility: inherit;');

    let presentBlock = document.querySelector('.gbqfba.gbqfba-hvr');

    // remove aria label

    // update presentation element attributes
    presentBlock.setAttribute('style', '');
    presentBlock.setAttribute('aria-label', '');

    // inner block
    ( containerStyle ) 
    ? containerEl.setAttribute(containerStyle) 
    : containerEl.setAttribute('style', "");
    containerEl.classList.remove('animate-down');
    containerEl.classList.remove('animate-up');
    
    // reset container attributes
    /*document.querySelector('.gbqfba.gbqfba-hvr > .container').setAttribute(
        'style', 
        "left: 0px; position: absolute; right: 0px; white-space: nowrap;"
    );*/
},


onPointerOver = (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    
    const // variables

        // setup
        random              = randomNumber(lucky_topics.length),
        lucky               = lucky_topics[random],
        luckyURL            = lucky.url,
        luckyText           = getSentence(lucky.title),
        luckyIndex          = lucky_topics.indexOf(lucky),

        // lucky div element
        presentationEl      = document.querySelector('.gbqfba.gbqfba-hvr'),
        presentationElStyle = 'display: block;',

        // lucky div > div element
        containerEl     = document.querySelector('.gbqfba.gbqfba-hvr > .container'),
        containerDivEl  = document.querySelector('.gbqfba.gbqfba-hvr > .container > div > span'),
        containerStyle  = containerEl.getAttribute('style');

    // outer block
    presentationEl.setAttribute('style', presentationElStyle);
    presentationEl.setAttribute('aria-label', luckyText);

    // Inner Block
    ( luckyIndex >= (lucky_topics.length/2) )
    ? containerEl.classList.add('animate-up')
    : containerEl.classList.add('animate-down');

    containerEl.setAttribute(
        'style',
        ( containerStyle )
        ? 
            ( luckyIndex > 0 )
            ? 
                containerStyle + 'top: -' + luckyIndex * containerDivEl.offsetHeight  + 'px;'
            : 
                containerStyle + 'top: 0px;'
        : 
            ( luckyIndex > 0 ) 
            ? 
                'top: -' + luckyIndex * containerDivEl.offsetHeight  + 'px;'
            : 
                'top: 0px;'
    );

    // Hide Trigger
    e.target.setAttribute('style', 'visibility: hidden;');

    // prevent flicker after luck item found
    presentationEl.addEventListener('pointerleave', (event) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        onPointerLeave(event, e.target, containerEl, containerStyle);
    });

    presentationEl.addEventListener('click', () => {
        ( lucky.url )
        ? window.location = lucky.url
        : null
    });
},



lucky_events = (e) => {
    let luckyInput = document.getElementById('lucky');

    luckyInput.addEventListener('pointerenter', onPointerOver);
},

init_lucky = () => addEventListener('DOMContentLoaded', lucky_events);

// Initialize on window load
window.onload = init_lucky();