
const lista_memes = [
	{
		"src": "https://www.reddit.com/r/memes/comments/gyfedz/a_short_story/",
		"src_img": "https://preview.redd.it/70zdjiilli351.jpg?width=640&crop=smart&auto=webp&s=0d49790c96f28fd1436d39eaf6b6c9502fbf40ff",
	},
	{
		"src": "https://www.reddit.com/r/memes/comments/fj45ih/this_house_aint_big_enough_for_the_six_of_us/",
		"src_img": "https://preview.redd.it/x4s2e60m7vm41.jpg?width=640&crop=smart&auto=webp&s=ae2a2b50646adce4fc8a800bac1c09a75c6ea52d",
	},
	{
		"src": "https://www.reddit.com/r/memes/comments/ig9u4z/she_did_her_best_ok/",
		"src_img": "https://preview.redd.it/g4vm7de3q4j51.jpg?width=640&crop=smart&auto=webp&s=6b1a2d277669b91f713fc7484e57e20de98b97c3",
	},
	{
		"src": "https://www.reddit.com/r/memes/comments/gi8l07/they_what/",
		"src_img": "https://external-preview.redd.it/wHP3JyFg8SVTsvZJCi36tMWUCYj_2f30LriRuVvD7wc.png?width=640&crop=smart&auto=webp&s=a8b33707460276faa7768d40d8e00ddf82c03d24",
	},
	{
		"src": "https://www.reddit.com/r/memes/comments/fw1ch6/finland_op/",
		"src_img": "https://preview.redd.it/ncrm4syv08r41.jpg?width=640&crop=smart&auto=webp&s=2ef1af85d06d064ecb8efea46724872a0ca30858",
	},
	{
		"src": "https://www.reddit.com/r/memes/comments/glwkpy/captain_holt_is_best_boi/",
		"src_img": "https://preview.redd.it/nzkdkyfr2hz41.jpg?width=640&crop=smart&auto=webp&s=09ae566dacc06dbc14cb402581cd0cbea34037c0",
	},
	{
		"src": "https://www.reddit.com/r/memes/comments/f8p6lf/i_mean_i_basically_made_him_rich/",
		"src_img": "https://preview.redd.it/yne085xajui41.jpg?width=640&crop=smart&auto=webp&s=da095b0d5d28530af2fb2e5b8580f0788026537b",
	},
	{
		"src": "https://www.reddit.com/r/memes/comments/id7tva/wow_someone_knows_we_exist/",
		"src_img": "https://preview.redd.it/dyecygddx4i51.jpg?width=640&crop=smart&auto=webp&s=21d033b67e158c661ecb3c2658d0ea025706f435",
	},
];

async function preia_imagini_server() {
	const res = await fetch('http://localhost:3000/api/v1/memes')
	return JSON.parse(await res.json())
}

function creazaMemeCard(src, src_img) {
	const meme = document.createElement("div");
	meme.classList.add("card")

	const img = document.createElement("img");
	img.src = src_img;
	meme.appendChild(img);

	const container = document.createElement("div");
	container.classList.add("container")

	if (src) {

		const text = document.createElement("p");
		text.innerHTML = "Sursă:"
		const link_sursa = document.createElement("a");
		link_sursa.href = src;
		link_sursa.innerHTML = "origine";


		container.appendChild(text);
		container.appendChild(link_sursa);
	}

	meme.appendChild(container);

	return meme
}

window.onload = () => {

	const lista_memes_root = document.querySelector('#lista-memes');
	if (!lista_memes_root) {
		console.log("Lista de meme-uri nu a fost gasita in pagina!");
		return
	}

	lista_memes.map((x) => {
		const meme = creazaMemeCard(x.src, x.src_img)
		lista_memes_root.appendChild(meme);
	});

	async function adauga_continut_utilizator() {
		const lista_memes_server = await preia_imagini_server();

		console.log(typeof lista_memes_server)


		lista_memes_server.map((x) => {
			const meme = creazaMemeCard(x.src, x.src_img)
			lista_memes_root.appendChild(meme);
		});
	}

	adauga_continut_utilizator()
}