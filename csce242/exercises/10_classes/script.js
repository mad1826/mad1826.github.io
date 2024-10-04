class Dog {
	constructor(title, breed, color, age, size, pic) {
		this.title = title;
		this.breed = breed;
		this.color = color;
		this.age = age;
		this.size = size;
		this.pic = pic;
	}

	get item() {
		const section = document.createElement('section');
		section.classList.add('dog');

		const span = document.createElement('a');
		span.href = '#';
		span.innerHTML = ' &#x2964;';

		const title = document.createElement('h2');
		title.innerHTML = this.title;
		title.append(span);
		section.append(title);

		const columns = document.createElement('div');
		columns.classList.add('columns');

		const firstColumn = document.createElement('div');
		const img = document.createElement('img');
		img.setAttribute('src', `images/${this.pic}`);
		firstColumn.append(img);

		columns.append(firstColumn);

		const secondColumn = document.createElement('div');
		secondColumn.classList.add('hidden');

		const breed = document.createElement('p');
		breed.innerHTML = `Breed: ${this.breed}`;
		secondColumn.append(breed);

		const color = document.createElement('p');
		color.innerHTML = `Color: ${this.color}`;
		secondColumn.append(color);

		const age = document.createElement('p');
		age.innerHTML = `Age: ${this.age}`;
		secondColumn.append(age);

		const size = document.createElement('p');
		size.innerHTML = `Size: ${this.size}`;
		secondColumn.append(size);

		columns.append(secondColumn);

		section.append(columns);

		span.onclick = () => {
			secondColumn.classList.toggle('hidden');
		};

		return section;
	}
}

const dogs = [];
// const myDog = new Dog('molly', 'pit bull', 'brown', 4, 'xs', 'images/molly.jpg')
dogs.push(new Dog('Coco', 'Morkie', 'Black', 5, 'small', 'yorkie.jpg'));
dogs.push(new Dog('Sam', 'Golden', 'Yellow', 1, 'med', 'golden-retriever.jpg'));
dogs.push(new Dog('Gerald', 'Pit Bull', 'White', 3, 'lg', 'pitt-bull.jpg'));

dogs.forEach(dog => {
	document.getElementById('dog-list').append(dog.item);
});