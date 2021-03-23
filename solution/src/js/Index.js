let model = null;
let services = {};
let tempArr = [];
let calcData;
let view;
let controller;

async function loadData() {
	// local await fetch('../src/data/data.json')
	await fetch('./src/data/data.json')
		.then((response) => response.json())
		.then((data) => (services = data.kalkulaatoriAndmed));

	let defaultUserChoice = Object.keys(services)[0];
	model = new Model(defaultUserChoice);
	view = new View();
	controller = new Controller(model, view);
	controller.updateView(defaultUserChoice);
	controller.updateBubble();
	initializeEventListeners();
}

function initializeEventListeners() {
	document.querySelectorAll("input[name='services']").forEach((input) => {
		input.addEventListener('change', controller.changeService.bind(controller));
	});

	document.querySelector('#summa').addEventListener('input', (event) => {
		controller.changeProperty(event), controller.updateSliderProgress(event), controller.updateBubble();
	});
	document.querySelector('#periood').addEventListener('input', controller.changeProperty.bind(controller));
	document.querySelector('#sissemakse').addEventListener('input', controller.changeProperty.bind(controller));
}

//DEBOUNCE function for event based updates, didn't need it in the end.
// const debounce = (func, wait, immediate) => {
// 	var timeout;

// 	return function executedFunction() {
// 		var context = this;
// 		var args = arguments;

// 		var later = function() {
// 			timeout = null;
// 			if (!immediate) func.apply(context, args);
// 		};

// 		var callNow = immediate && !timeout;

// 		clearTimeout(timeout);

// 		timeout = setTimeout(later, wait);

// 		if (callNow) func.apply(context, args);
// 	};
// };
