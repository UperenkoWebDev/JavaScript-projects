'use strict';
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
let errors = [],
	err = 1;

//*Show Loading spinner
function showLoadingSpinner() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}
//*Hide loading spinner
function removeLoadingSpinner() {
	if (!loader.hidden) {
		loader.hidden = true;
		quoteContainer.hidden = false;
	}
}
//*Get  Quote From API
async function getQuote() {
	//!Show loading anim if quote is not there yet
	showLoadingSpinner();
	const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
	const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

	try {
		const response = await fetch(proxyUrl + apiUrl);
		const data = await response.json();
		//*If author field is blank add 'unknown'/ 
		if (data.quoteAuthor === '') {
			authorText.innerText = 'Unknown'
		} else {
			authorText.innerText = data.quoteAuthor;
		}
		if (data.quoteText.length > 50) {
			quoteText.classList.add('long-quote');
		} else {
			quoteText.classList.remove('long-quote');
		}
		// console.log(data);
		quoteText.innerText = data.quoteText;
		// throw new Error('oops'); //fake error for the test
	} catch (error) {
		getQuote();
		//!Error counter
		errors.push(error);
		if (errors.length == 3) {
			alert('To many errors');
		}
		// console.log('whopops,no quote', error);	
	}
	//!Stop loader ans show quote
	removeLoadingSpinner();
}
//*Tweet Quote
function tweetQuote() {
	const quote = quoteText.innerText;
	const author = authorText.innerText;
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
	window.open(twitterUrl, '_blank');
}
//Event Listerens
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);
//On Load
getQuote();

