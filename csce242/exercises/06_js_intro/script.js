const myButton = document.getElementById('btn-click')

myButton.onclick = () => {
	document.getElementById('message').innerHTML = 'Hello World!'
	document.getElementById('stuff').classList.add('special')
};

const goodbye = document.getElementById('say-goodbye')
goodbye.onclick = () => {
	goodbye.innerHTML = 'Goodbye Everyone!';
	document.getElementById('stuff').classList.remove('special')
}

document.getElementById('hide').onclick = () => {
	const one = document.getElementsByClassName('one')[0]
	if (one.classList.contains('hidden')) one.classList.remove('hidden')
	else one.classList.add('hidden')
}

document.getElementById('anim').onclick = () => {
	const stuff = document.getElementById('stuff')
	if (stuff.classList.contains('animated')) stuff.classList.remove('animated')
	else stuff.classList.add('animated')
}