
async function fetchChapterManga(id)
{
  const res = await fetch(`https://api.mangadex.org/manga/${id}/aggregate`);
  const result = await res.json();
  const volumes = Object.values(result.volumes);
  const latestVolume = volumes[volumes.length - 1];
  const chapters = Object.entries(latestVolume.chapters);

  // Sort chapters by the order they were added (assuming they're added in order)
  chapters.sort((a, b) => parseFloat(b[0]) - parseFloat(a[0]));

  let ChaptersObject = [];
  for(let i = 0; i < 3; i++) {
    if(chapters[i]) ChaptersObject.push(chapters[i][1]);
  }

  return ChaptersObject;
}
async function fetchFileName(id)
{
  const respond = await fetch(`https://api.mangadex.org/manga/${id}?includes[]=author&includes[]=artist&includes[]=cover_art`);
  const result = await respond.json();
  let fileName = [];
  result.data.relationships.map(item =>{
    if(item.type === "cover_art")
      {
        fileName.push(item.attributes.fileName);
      }
  });
  return fileName;
}
async function fetchCoverManga(id)
{
  const fileName = await fetchFileName(id);
  let coverArt = [];
  for(let i = 0; i < fileName.length; i++)
  {
    let respond = await fetch(`https://uploads.mangadex.org/covers/${id}/${fileName}.256.jpg`);
    coverArt.push(respond.url);
  }
  return coverArt;
}
export async function fetchMostViewed()
{
  const res = await fetch('https://api.mangadex.org/manga?order[followedCount]=desc');
  const mangaMostView = await res.json();
  const promises = mangaMostView.data.map(manga => fetchChapterManga(manga.id));
  const promisesTwo = mangaMostView.data.map(manga => fetchCoverManga(manga.id));
  const allChaptersMostView = await Promise.all(promises);
  const coverArtsMostView = await Promise.all(promisesTwo);
  console.log(mangaMostView[8])
  return {mangaMostView,coverArtsMostView,allChaptersMostView};
}
export async function fetchManga(page = 1) {
  try{
    let offset = (page - 1) * 10;
    console.log(offset);
    const res = await fetch(`https://api.mangadex.org/manga?limit=10&offset=${offset}`);
    // const mangas = await res.json();
    const result = await res.json();
    const mangas = result.data.sort((a, b) => new Date(b.attributes.updatedAt).getTime() - new Date(a.attributes.updatedAt).getTime());
    const promises = mangas.map(manga => fetchChapterManga(manga.id));
    const allChapters = await Promise.all(promises);
    const promisesTwo = mangas.map(manga => fetchCoverManga(manga.id));
    const coverArts = await Promise.all(promisesTwo);
    return {mangas,allChapters,coverArts};
  }catch(error)
  {
    console.error("Failed to fetch manga: ",error);
  }
}

export function slideTitle(manga,boolean)
{
  let title = manga.attributes.title.en;
  let displayTilte;
  if(typeof title === 'undefined')
  {
    for(let i = 0; i < manga.attributes.altTitles.length; i++)
    {
      if(manga.attributes.altTitles[i].en){
        title = manga.attributes.altTitles[i].en;
        break;
      }
    }
  }
  if (typeof title === 'undefined' || typeof title !== 'string') {
    return 'Invalid title';
  }
  if(boolean === true)
  {
    displayTilte = title.length > 15 ? title.slice(0, 17) + "..." : title;
  }
  else{
    displayTilte = title.length > 50 ? title.slice(0, 55) + "..." : title;;
  }
  return displayTilte;
}

export async function fetchAllTag()
{
  const respond = await fetch(`https://api.mangadex.org/manga/tag`);
  const tags = await respond.json();
  return {tags};
}


