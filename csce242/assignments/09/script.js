class Bird {
	constructor(name, size, lifespan, food, habitat, fact, description, pic) {
		this.name = name;
		this.size = size;
		this.lifespan = lifespan;
		this.food = food;
		this.habitat = habitat;
		this.fact = fact;
		this.description = description;
		this.pic = pic;
	}

	get section() {
		const section = document.createElement('section');

		section.append(this.getH2(), this.getImg());

		section.onclick = () => {
			document.getElementById('modal').style.display = 'block';

			const modalContent = document.getElementById('modal-content');
			modalContent.innerHTML = '';
			modalContent.append(this.expandedSection);
		};

		return section;
	}

	get expandedSection() {
		const container = document.createElement('div');
		container.id = 'modal-content';
		container.classList.add('w3-container');

		const span = document.createElement('span');

		span.onclick = () => {
			document.getElementById('modal').style.display = 'none';
		};
		span.classList.add('w3-button', 'w3-display-topright');
		span.innerHTML = '&times;';

		container.append(span);

		container.append(this.getH2(), this.getImg());

		this.appendParagraph(container, this.size, 'Size');
		this.appendParagraph(container, this.lifespan, 'Lifespan');
		this.appendParagraph(container, this.food, 'Food');
		this.appendParagraph(container, this.habitat, 'Habitat');
		this.appendParagraph(container, this.fact, 'Interesting Fact');
		this.appendParagraph(container, this.description);

		return container;
	}

	getH2() {
		const h2 = document.createElement('h2');
		h2.innerHTML = this.name;
		return h2;
	}

	getImg() {
		const img = document.createElement('img');
		img.src = `images/${this.pic}`;
		return img;
	}

	appendParagraph(container, content, label) {
		const p = document.createElement('p');

		if (label === undefined) {
			p.innerHTML = content;
		}
		else {
			p.innerHTML = `<strong>${label}</strong>: ${content}`;
		}

		container.append(p);
	}
}

const birds = [
	new Bird('Hummingbird', '2-5 inches', '3-5 years', 'Nectar (Sugar water)', 'Trees', 'They\'re nicknamed "Hummers"', 'They\'re some tiny thirsty lil\' fellows!', 'hummingbird.jpg'),
	new Bird('Blue Jay', '10-12 inches', '7 years', 'Acorns, Bird eggs', 'Forests', 'They sometimes mimic the sounds of a hawk to appear as predators to animals around it.', 'It\'s hard to miss these loud egg thieves!', 'blue-jay.jpg'),
	new Bird('Cardinal', '8-9 inches', '15 years', 'Seeds, Grains, Fruits', 'Woodland edges, Towns', 'A group of cardinal birds is called a Vatican, similar to the cardinals of the Catholic Church.', 'Are you seeing red? Try to also see orange, yellow, and even pink!', 'cardinal.jpg'),
	new Bird('Robin', '9-11 inches', '2 years', 'Insects, Fruits', 'Forests, Parks, Gardens', 'They can become "drunk" if their diet shifts toward main honeysuckle berries.', 'Catch a dynamic duo of robins during the winter roosting season!', 'robin.jpg')
];

const container = document.getElementById('container');

birds.forEach(bird => {
	container.append(bird.section);
});