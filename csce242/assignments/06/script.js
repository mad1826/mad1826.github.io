const toggleNav = document.getElementById('toggle-nav');
toggleNav.onclick = () => {
	if (toggleNav.innerHTML === '▼') {
		toggleNav.innerHTML = '▲';
		document.getElementById('nav-items').classList.remove('hidden-small');
	}
	else {
		toggleNav.innerHTML = '▼';
		document.getElementById('nav-items').classList.add('hidden-small');
	}
};

const updateExercises = showExercise1 => {
	const ex1 = document.getElementById('color-slider');
	const ex2 = document.getElementById('picture-chooser');

	if (showExercise1) {
		ex2.classList.add('hidden');
		ex1.classList.remove('hidden');
	}
	else {
		ex1.classList.add('hidden');
		ex2.classList.remove('hidden');
	}
};

document.getElementById('show-one').onclick = () => {
	updateExercises(true);
};
document.getElementById('show-two').onclick = () => {
	updateExercises(false);
};

document.getElementById('slider').oninput = ev => {
	const { value } = ev.target;

	let text;
	if (value < 20) text = 'Cold';
	else if (value < 40) text = 'Cool';
	else if (value < 60) text = 'Lukewarm';
	else if (value < 80) text = 'Warm';
	else text = 'Hot';

	document.getElementById('color-slider').style.backgroundColor = `rgb(${value * 2.55}, 0, 0)`;
	document.getElementById('color-msg').innerHTML = text;
};

const onPictureChange = ev => {
	const inner = ev.target.innerHTML;
	const picture = document.getElementById('picture');

	let size;
	if (inner === 'Small') size = 50;
	else if (inner === 'Medium') size = 100;
	else if (inner === 'Large') size = 200;

	picture.src = `https://picsum.photos/${size}`;
};

document.getElementById('small').onclick = onPictureChange;
document.getElementById('medium').onclick = onPictureChange;
document.getElementById('large').onclick = onPictureChange;