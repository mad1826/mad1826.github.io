/*
setInterval(() => {
	const currentSection = document.querySelector('.gallery .highlighted');

	if (!currentSection) {
		document.querySelector('.gallery section').classList.add('highlighted');
		return;
	}
	let nextSection = currentSection.nextElementSibling;

	if (nextSection === null) {
		nextSection = document.querySelector('.gallery section');
	}

	currentSection.classList.remove('highlighted');
	nextSection.classList.add('highlighted');
}, 500);
*/

let count = 1;

setInterval(() => {
	document.querySelectorAll('.items section').forEach(section => {
		section.classList.remove('highlighted');
	});

	document.querySelector(`.items section:nth-child(${count})`).classList.add('highlighted');

	count++;
	if (count > document.querySelectorAll('.items section').length) count = 1;
}, 500);