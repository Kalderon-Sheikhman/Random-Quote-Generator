const projectName = "random-quoter-webapp";

let quotesData;


/*Code by kdwebdeveloper, credit to Gabriel Nunes and Todd Chaffee in the generation of the JSON Quote with Camper */

let colors = [
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857',
    '#16a087',
    '#26ae76',
];

let currentQuote = '',
currentAuthor = '';

const getQuotes = () => {
    return $.ajax({
        headers: {
            Accept:'application/json'
        },
        url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
        success:function(jsonQuotes){
            if (typeof jsonQuotes ==='string'){
                quotesData = JSON.parse(jsonQuotes);
                console.log('quotesData');
                console.log(quotesData);
            }
        }

    });
}



const getRandomQuote = () => {
    return quotesData.quotes[
        Math.floor(Math.random() * quotesData.quotes.length)
    ];
}

const getQuote = () => {
    let randomQuote = getRandomQuote();
    currentQuote = randomQuote.quote;
    currentAuthor = randomQuote.author;

    $('#tweet-quote').attr(
        'href',
        'https://twitter.com/intent/tweet?hashtags=thekinping&related=freecodecamp&text=' +
        encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
    );

    $('.quote-text').animate({opacity: 0}, 500, function() {
        $(this).animate({opacity: 1}, 500);
        $('#text').text(randomQuote.quote);
    });

    $('.quote-author').animate({opacity:0},500, function(){
        $(this).animate({ opacity: 1},500);
        $('#author').html(randomQuote.author);
    });

    let color = Math.floor(Math.random() * colors.length);
    $('html body').animate(
        {
            backgroundColor:colors[color],
            color:colors[color]
        },
        800
    );
    $('.button').animate(
        {
            backgroundColor:colors[color]
        },1000
    );
}

$(document).ready(function(){
    getQuotes().then(() =>{
        getQuote();
    });

    $('#new-quote').on('click',getQuote);
})