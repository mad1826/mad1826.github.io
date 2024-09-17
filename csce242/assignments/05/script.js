let count = 0;

document.getElementById('count-container').onclick = () => {
	count++;
	document.getElementById('count').innerHTML = count.toString();
};

document.getElementById('random-img').onclick = () => {
	location.reload();
};

document.getElementById('myRange').oninput = ev => {
	document.getElementById('movable-img').style.left = `${ev.target.value / 2}%`;
};