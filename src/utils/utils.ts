
async function fetchLatestChapterManga(id)
{
  const res = await fetch(`https://api.mangadex.org/manga/${id}/aggregate?translatedLanguage[]=en`);
  const result = await res.json();
  const volumes = Object.values(result.volumes);
  if(volumes.length === 0) return null;
  const latestVolume = await volumes[volumes.length - 1];
  const chapters = Object.entries(latestVolume.chapters);
  // Sort chapters by the order they were added (assuming they're added in order)
  chapters.sort((a, b) => parseFloat(b[0]) - parseFloat(a[0]));

  let ChaptersObject = [];
  // true for latest and main page, false for all of the chapter in the latest volumes
  for(let i = 0; i < 3; i++) {
    if(chapters[i]) ChaptersObject.push(chapters[i][1]);
  }
  return ChaptersObject;
}
async function fetchFileNames(id)
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
async function fetchCoverMangas(id)
{
  const fileName = await fetchFileNames(id);
  let coverArt = [];
  for(let i = 0; i < fileName.length; i++)
  {
    let respond = await fetch(`https://uploads.mangadex.org/covers/${id}/${fileName}.512.jpg`);
    coverArt.push(respond.url);
  }
  return coverArt;
}
export async function fetchMostViewed()
{
  const res = await fetch('https://api.mangadex.org/manga?order[followedCount]=desc&availableTranslatedLanguage[]=en');
  const mangaMostView = await res.json();
  const promises = mangaMostView.data.map(manga => fetchLatestChapterManga(manga.id));
  const promisesTwo = mangaMostView.data.map(manga => fetchCoverMangas(manga.id));
  const allChaptersMostView = await Promise.all(promises);
  const coverArtsMostView = await Promise.all(promisesTwo);
  return {mangaMostView,coverArtsMostView,allChaptersMostView};
}
export async function fetchManga(page = 1) {
  try{
    let offset = (page - 1) * 10;
    const res = await fetch(`https://api.mangadex.org/manga?limit=10&offset=${offset}&availableTranslatedLanguage[]=en`);
    // const mangas = await res.json();
    const result = await res.json();
    const mangas = result.data.sort((a, b) => new Date(b.attributes.updatedAt).getTime() - new Date(a.attributes.updatedAt).getTime());
    const promises = mangas.map(manga => fetchLatestChapterManga(manga.id));
    const allChapters = await Promise.all(promises);
    const promisesTwo = mangas.map(manga => fetchCoverMangas(manga.id));
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
     displayTilte = title;//title.length > 50 ? title.slice(0, 50) + "..." : title;;
  }
  return displayTilte;
}

export async function fetchAllTag()
{
  const respond = await fetch(`https://api.mangadex.org/manga/tag`);
  const tags = await respond.json();
  return {tags};
}

async function fetchFileName(id)
{
  const respond = await fetch(`https://api.mangadex.org/manga/${id}?includes[]=author&includes[]=artist&includes[]=cover_art`);
  const result = await respond.json();
  let fileName;
  result.data.relationships.map(item =>{
    if(item.type === "cover_art")
      {
        fileName = item.attributes.fileName;
      }
  });
  return fileName;
}

async function fetchCoverManga(id)
{
  const fileName = await fetchFileName(id);
  let coverArt;
  let respond = await fetch(`https://uploads.mangadex.org/covers/${id}/${fileName}.256.jpg`);
  coverArt = respond.url;

  return coverArt;
}

export async function fetchMangaWithID(id)
{
  const respond = await fetch(`https://api.mangadex.org/manga/${id}`);
  const result = await respond.json();
  const manga = result.data;
  const allChapters = await fetchAllChapter(manga.id);
  const coverArt =  await fetchCoverManga(manga.id);
  return {manga,allChapters,coverArt};
}

export async function slideDescription(mangaDes)
{
  let description; 
  if(typeof mangaDes === `undefined` )
  {
    description = 'No description available';
  }
  else
  {
    description = mangaDes.slice(0, 247) + "...";
  }
  return description;
}

async function fetchAllChapter(id)
{
  const respond = await fetch(`https://api.mangadex.org/manga/${id}/aggregate?translatedLanguage[]=en`);
  const result = await respond.json();
  const volumes = Object.values(result.volumes);
  
  let allChapter = [];

  for(let item in volumes)
  {
    let volumeObject = {
      volume: volumes[item].volume,
      chapterArray: [],
    };
    Object.values(volumes[item].chapters).map(chapter => volumeObject.chapterArray.push(chapter));
    allChapter.push(volumeObject);
  }
  return allChapter;
}
export async function fetchRelatedMangaWithTags(mangaTagsObj,mangaId)
{
  // Add tag names to an array
  let includedTagNames = [];
  mangaTagsObj.map(tag => includedTagNames.push(tag.attributes.name.en));
  // Get all tags from external api
  const tagsRespond = await fetch(`https://api.mangadex.org/manga/tag`);
  const tags = await tagsRespond.json();
  // Filter tags ID based on tag names
  const includedTagIDs = tags.data.filter(tag => includedTagNames.includes(tag.attributes.name.en)).map(tag => tag.id);
  // Randomly select 3 tags
  const randomTags = includedTagIDs.sort(() => 0.5 - Math.random()).slice(0, 3);
  // Join the tag IDs with '&' then fetch the related manga
  const includedTags = randomTags.map(id => `includedTags[]=${id}`).join('&');
  const respond = await fetch(`https://api.mangadex.org/manga?includedTags=${includedTags}&availableTranslatedLanguage[]=en`);
  const data = await respond.json();
  // Filter out the current manga and get 5 related manga
  const mangaRelated = data.data.filter(manga => manga.id !== mangaId).slice(0,5);
  // Get cover art and latest chapter for each manga
  const promises =  mangaRelated.map(manga => fetchCoverMangas(manga.id));
  const coverArts = await Promise.all(promises);
  const promisesTwo = mangaRelated.map(manga => fetchLatestChapterManga(manga.id));
  const LatestChapter = await Promise.all(promisesTwo);
   
  return {mangaRelated,coverArts,LatestChapter};
}

export async function fetchChapterImages(idChapter)
{
  const respond = await fetch(`https://api.mangadex.org/at-home/server/${idChapter}`);
  const result = await respond.json();
  const host = result.baseUrl;
  const hash = result.chapter.hash;

  const promises = result.chapter.data.map(async chapter => fetch(`${host}/data/${hash}/${chapter}`));
  const images = await Promise.all(promises.map(promise => promise.then(response => response.url)));
  return images;
}

export async function searchManga(searchTerm)
{
  const respond = await fetch(`https://api.mangadex.org/manga?title=${searchTerm}&availableTranslatedLanguage[]=en&limit=4`);
  const result = await respond.json();
  const mangas = result.data;
  const promises = mangas.map(manga => fetchLatestChapterManga(manga.id));
  const allChapters = await Promise.all(promises);
  const promisesTwo = mangas.map(manga => fetchCoverMangas(manga.id));
  const coverArts = await Promise.all(promisesTwo);

  return {mangas,allChapters,coverArts};
}