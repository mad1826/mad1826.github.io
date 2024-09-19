// when the hamburger is clicked, toggle between showing and hiding the nav items
const toggle = document.querySelector('#toggle-nav');

toggle.onclick = () => {
	const navItems = document.getElementById('nav-items');
	navItems.classList.toggle('hidden-small');
};

document.getElementById('click-link').onclick = event => {
	event.preventDefault(); // don't go to link's destination
	console.log('you clicked a link');
};

document.getElementById('txt-color').oninput = event => {
	document.querySelector(':root').style.setProperty('--ball-color', event.target.value);
};

let pos = 0;

document.getElementById('move-down').onclick = () => {
	pos++;
	document.getElementById('ball').style.setProperty('top', pos + 'px');
};

document.getElementById('btn-show-color').onclick = () => {
	const color = document.getElementById('txt-enter-color').value.toLowerCase().trim();
	const messageP = document.getElementById('color-message');
	let mood = '';

	if (color === 'red') {
		mood = 'angry';
	}
	else if (color === 'blue') {
		mood = 'moody';
	}
	else {
		mood = 'undefined';
	}

	messageP.innerHTML = `You chose ${color} so you are ${mood}.`;
};

const max = 10_000;
let progress = 0;
document.getElementById('btn-donate').onclick = () => {
	const amountStr = document.getElementById('txt-donations').value.toLowerCase().trim();
	const amountNum = Number.parseFloat(amountStr);
	const error = document.getElementById('error-donation');

	if (isNaN(amountNum) || amountNum <= 0) {
		error.innerHTML = 'Amount must be a positive non-zero number';
		return;
	}

	error.innerHTML = '';
	progress += amountNum;
	const percent = Math.min(progress / max * 100, 100);
	const percentStr = `${percent}%`;

	document.getElementById('progress').innerHTML = percentStr;
	const bar = document.getElementById('progress-bar-actual');
	bar.style.height = percentStr;

	document.querySelector(':root').style.setProperty('--funds', percentStr);
};