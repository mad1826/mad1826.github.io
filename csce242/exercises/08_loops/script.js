// when the hamburger is clicked, toggle between showing and hiding the nav items
const toggle = document.querySelector('#toggle-nav');

toggle.onclick = () => {
	const navItems = document.getElementById('nav-items');
	navItems.classList.toggle('hidden-small');
};

document.getElementById('btn-go').onclick = () => {
	const start = parseInt(document.getElementById('start').value);
	const end = parseInt(document.getElementById('end').value);

	const ul = document.getElementById('numbers');

	ul.innerHTML = '';

	const loop = i => {
		const li = document.createElement('li');
		li.innerHTML = `${i}`;
		ul.append(li);

		li.onclick = () => {
			alert(`Clicked #${i}!`);
		};
	};

	if (start < end) {
		for (let i = start; i <= end; i++) {
			loop(i);
		}
	}
	else {
		for (let i = start - 1; i >= end - 1; i--) {
			loop(i);
		}
	}
};