const imgArr = [];
imgArr.birthday = 'Take some cake, you earned it!';
imgArr.clown = 'Remember they\'re for fun, not for scares.';
imgArr.rain = 'Don\'t let it weather your mind.';
imgArr.read = 'Not a phone in sight, just living in the moment.';
imgArr.shovel = 'The harvest will be bountiful!';
imgArr.work = 'Working hard or hardly working?';

const imgTxt = document.getElementById('image-txt');
const imgSection = document.getElementById('images');

window.onload = () => {
	for (const key in imgArr) {
		const img = document.createElement('img');
		img.setAttribute('src', `images/${key}.jpg`);

		img.onclick = () => {
			imgTxt.innerHTML = '';

			const div = document.createElement('div');

			const h3 = document.createElement('h3');
			h3.innerHTML = key;
			div.append(h3);

			const p = document.createElement('p');
			p.innerHTML = imgArr[key];
			div.append(p);

			imgTxt.append(div);
		};

		imgSection.append(img);
	}
};