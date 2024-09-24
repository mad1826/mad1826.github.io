const error = document.getElementById('error');
const current = document.getElementById('current');

document.getElementById('draw').onclick = () => {
	current.innerHTML = '';
	const amount = Number.parseFloat(document.getElementById('amount').value);
	if (amount <= 0) {
		error.innerHTML = '* Invalid Input';
		return;
	}

	const area = document.getElementById('drawable-area');
	area.innerHTML = '';
	error.innerHTML = '';
	for (let i = 0; i < amount; i++) {
		const star = document.createElement('div');
		star.classList.add('six-pointed-star');
		// Prevent stars from exceeding bounds of drawable area
		const wMax = 96;
		const hMax = 96;
		star.style.left = `${Math.random() * wMax}%`;
		star.style.top = `${Math.random() * hMax}%`;
		star.onclick = () => {
			error.innerHTML = '';
			current.innerHTML = `You are star #${i + 1}!`;
		};
		area.append(star);
	}
};