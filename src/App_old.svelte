<script context="module">
  import "dayjs/esm/locale/lv";
  import dayjs from "dayjs/esm";

  dayjs.locale("lv");
</script>

<script>
  import { onMount } from "svelte";

  import {
    apolloStore,
    delfiStore,
    tvnetStore,
    jaunsStore,
    lsmStore,
    themeStore,
  } from "./store";

  import Time from "svelte-time";
  const ZINAS_NEWS_API = "https://white-feather-2517.fly.dev";
//   const ZINAS_NEWS_API = "http://localhost:8080";

  let news;
  let filteredNews;

  async function getNews() {
    const data = await fetch(ZINAS_NEWS_API);
    const results = await data.json();
    let apollo, delfi, tvnet, lsm, jauns;

    if (results.apollo) {
      apollo = results.apollo?.items.map((item) => {
        return appendSource(item, "apollo");
      });
    } else {
      apollo = [];
    }

    if (results.delfi) {
      delfi = results.delfi?.items.map((item) => {
        return appendSource(item, "delfi");
      });
    } else {
      delfi = [];
    }

    if (results.tvnet) {
      tvnet = results.tvnet?.items.map((item) => {
        return appendSource(item, "tvnet");
      });
    } else {
      tvnet = [];
    }

    if (results.lsm) {
      lsm = results.lsm?.items.map((item) => {
        return appendSource(item, "lsm");
      });
    } else {
      lsm = [];
    }

    if (results.jauns) {
      jauns = results.jauns?.items.map((item) => {
        return appendSource(item, "jauns");
      });
    } else {
      jauns = [];
    }

    const unsortedNews = [...apollo, ...delfi, ...tvnet, ...lsm, ...jauns];

    news = unsortedNews.sort(function (a, b) {
      return new Date(b.pubDate) - new Date(a.pubDate);
    });

    filterNews();
  }

  function filterNews() {
    filteredNews = news.filter(function (item) {
      if ($apolloStore && item.source == "apollo") {
        return true;
      }
      if ($delfiStore && item.source == "delfi") {
        return true;
      }
      if ($tvnetStore && item.source == "tvnet") {
        return true;
      }
      if ($jaunsStore && item.source == "jauns") {
        return true;
      }
      if ($lsmStore && item.source == "lsm") {
        return true;
      }
    });
  }

  function appendSource(item, source) {
    return { ...item, source: source };
  }

  function toggleFilter(source) {
    switch (source) {
      case "apollo":
        apolloStore.set(!$apolloStore);
        break;
      case "delfi":
        delfiStore.set(!$delfiStore);
        break;
      case "tvnet":
        tvnetStore.set(!$tvnetStore);
        break;
      case "lsm":
        lsmStore.set(!$lsmStore);
        break;
      case "jauns":
        jaunsStore.set(!$jaunsStore);
        break;
    }

    filterNews();
  }

  function toggleTheme() {
	themeStore.set(!$themeStore);
  }

  onMount(async () => {
    await getNews();
  });
</script>

<main class:lights={!$themeStore}>
  {#if !news}
    <div class="loader">
      <div class="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  {/if}

  {#if news}
    <header>
      <section class="sources">
        <img
          src="/apollo.svg"
          alt="apollo"
          class:active={$apolloStore}
          on:click={() => toggleFilter("apollo")}
        />
		<img
          src="/delfi.svg"
          alt="delfi"
          class:active={$delfiStore}
          on:click={() => toggleFilter("delfi")}
        />
		<img
          src="/jauns.svg"
          alt="jauns"
          class:active={$jaunsStore}
          on:click={() => toggleFilter("jauns")}
        />
		<img
          src="/lsm.svg"
          alt="lsm"
          class:active={$lsmStore}
          on:click={() => toggleFilter("lsm")}
        />
		<img
          src="/tvnet.svg"
          alt="tvnet"
          class:active={$tvnetStore}
          on:click={() => toggleFilter("tvnet")}
        />
      </section>

	  <button type="button" class="theme" on:click={() => toggleTheme()}>💡</button>
    </header>

    <section class="news">
      {#each filteredNews as item}
        <article class="article">
          <a href={item.link} target="_blank">
            {#if item.enclosure && item.enclosure.url}<img
                src={item.enclosure?.url}
                alt={item.title}
                loading="lazy"
              />{/if}
            {#if item["media:content"]}<img
                src={item["media:content"]["$"].url}
                alt={item.title}
                loading="lazy"
              />{/if}
            <h2>{@html item.title}</h2>
          </a>
          <div class="content">
            <p>{@html item.content}</p>
          </div>
          <footer>
            <!-- {#if item.creator}<small>{item.creator}</small>{/if} -->
            <Time live relative timestamp={item.pubDate} />
            <a href="https://{item.source}.lv" target="_blank"
              ><img
                src="/{item.source}.svg"
                class="logo {item.source}"
                alt={item.source}
              /></a
            >
          </footer>
        </article>
      {/each}
    </section>
  {/if}
</main>

<style>

main {
	padding: 1rem;
}

	main.lights {
		background: #090811;
	}

	main.lights header {
		background: #41404e;
	}

	main.lights article {
		background: #2b2a35;
		color: white;
		border-color: rgb(10, 7, 7);
		box-shadow: rgba(226, 222, 222, 0.15) 0 0.125rem 0.25rem;
	}

	main.lights article a { 
		color: white;
	}
	header {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		background: white;
		padding: 0.5rem 0;
		margin-bottom: 1rem;
		border: 1px solid rgba(0, 0, 0, 0.15);
    	border-radius: 0.25rem;
		box-shadow: rgba(226, 222, 222, 0.15) 0 0.125rem 0.25rem;

	}

	button {
		cursor: pointer;
		background: transparent;
		border: none;
		font-size: 1.5rem;
	}
	.sources {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		flex-wrap: wrap;
	}
	header img {
		width: auto;
		height: 30px;
		margin: 1rem;
		opacity: 0.2;
		cursor: pointer;
		transition: opacity 0.2s linear;
	}

  @media (max-width: 820px) {
  header img {
    height: 20px;
  }
  }
	header img.active {
		opacity: 1;
	}

	header .theme {
		margin-left: auto;
		padding: 1rem;

	}
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
    margin: 1rem 1rem 0 1rem;
  }

  a {
    color: #121212;
    text-decoration: none;
  }

  a:hover,
  a:focus {
    text-decoration: underline;
  }
  .delfi {
    height: 1.4rem;
  }

  article {
    background-clip: border-box;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
    box-shadow: rgba(0, 0, 0, 0.08) 0 0.125rem 0.25rem;
    color: #121212;
    display: flex;
    flex-direction: column;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue",
      Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    min-width: 0;
    overflow-wrap: break-word;
    position: relative;
    word-wrap: break-word;
  }

  .article img {
    width: 100%;
    max-height: 250px;
    object-fit: cover;
  }

  article .content {
    padding: 1rem;
  }

  /* Loader */
  .loader {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-ellipsis div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #f24c48;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  .lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
</style>
