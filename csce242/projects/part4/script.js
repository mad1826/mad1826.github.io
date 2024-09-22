const toggle = document.querySelector('#toggle-nav');

toggle.onclick = () => {
	const navItems = document.getElementById('nav-items');
	navItems.classList.toggle('hidden-small');
};