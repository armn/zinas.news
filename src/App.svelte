<script context="module">
	import "dayjs/esm/locale/lv";
	import dayjs from "dayjs/esm";
  
	dayjs.locale("lv"); 
  </script>
<script>

	import Time from "svelte-time";
	const ZINAS_NEWS_API = "https://white-feather-2517.fly.dev";

	let news; 
	async function getNews() {
		const data = await fetch(ZINAS_NEWS_API);
		const results = await data.json();


		const apollo = results.apollo.items.map(item => {
			return appendSource(item, "apollo")
		})

		const delfi = results.delfi.items.map(item => {
			return appendSource(item, "delfi")
		})

		const tvnet = results.tvnet.items.map(item => {
			return appendSource(item, "tvnet")
		})

		news = [...apollo, ...delfi, ...tvnet];

		news.sort(function(a, b) {
  			return new Date(b.pubDate) - new Date(a.pubDate);
		});
	}
	
	getNews();

	function appendSource(item, source) {
		return {... item, source: source};
	}
</script>

<main>
{#if news}

<section class="news">

{#each news as item}
<article class="article">
	<a href="{item.link}" target="_blank">
		{#if item.enclosure && item.enclosure.url}<img src="{item.enclosure?.url}" alt="{item.title}" />{/if}
		<h2>{item.title}</h2>
	</a>
	<div class="content">
    <p>{@html item.content}</p>
	</div>
	<footer>
		<!-- {#if item.creator}<small>{item.creator}</small>{/if} -->
		<Time live relative timestamp="{item.pubDate}" />
		<a href="https://{item.source}.lv" target="_blank"><img src="/{item.source}.svg" class="logo {item.source}" alt="{item.source}" /></a>
	</footer>
</article>
{/each}
</section>
{/if}
</main>


<style>
.news {
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 2rem;
	justify-content: center;
}

@media (min-width: 768px) {
	.news {
		grid-template-columns: repeat(2, 1fr);
	}
}


@media (min-width: 1200px) {
	.news {
		grid-template-columns: repeat(3, 1fr);
	}
}


@media (min-width: 1920px) {
	.news {
		grid-template-columns: repeat(4, 1fr);
	}
}

@media (min-width: 2160px) {
	.news {
		grid-template-columns: repeat(5, 1fr);
	}
}

@media (min-width: 3000px) {
	.news {
		grid-template-columns: repeat(6, 1fr);
	}
}

footer {
	margin-top: auto;
	display: flex;
	align-items: center;
	width: 100%;
	padding: 1rem;
}


footer a {
	display: block;
	margin-left: auto;
}

footer img {
	height: 30px;
}

h2 {
	padding: 1rem 1rem 0 1rem;
	margin: 0;
}

a {
	color: #121212;
	text-decoration: none;
}

a:hover, a:focus {
	text-decoration: underline;
}

p {
	margin: 0 0 1rem 0;
}

.delfi {
	height: 1.4rem;
}

article {
  background-clip: border-box;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, .15);
  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, .08) 0 .125rem .25rem;
  color: #121212;
  display: flex;
  flex-direction: column;
  font-family: system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  min-width: 0;
  overflow-wrap: break-word;
  position: relative;
  word-wrap: break-word;
}

.article img {
	width: 100%;
}

article .content {
	padding: 1rem;
}

</style>