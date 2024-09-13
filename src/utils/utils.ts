import { join } from "path";

export async function fetchLatestChapterManga(id)
{
  try {
    const res = await fetch(`https://api.mangadex.org/manga/${id}/aggregate?translatedLanguage[]=en`);
    if(!res.ok)
    {
      return [];
    }
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
  } catch (error) {
    console.error('Error fetching latest chapter:', error);
    return [];
  }  
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
async function fetchFileNames(id) {
  try {
    const response = await fetch(`https://api.mangadex.org/manga/${id}?includes[]=author&includes[]=artist&includes[]=cover_art`);
    if (!response.ok) {
      // throw new Error(`API request failed with status ${response.status}`);
      return [];
    }
    const result = await response.json();
    const fileName = result.data.relationships.filter(item => item.type === "cover_art").map(item => item.attributes.fileName);
    return fileName;
  } catch (error) {
    console.error('Error fetching file names:', error);
    return []; // Or handle the error differently (e.g., throw it for further handling)
  }
}

export async function fetchCoverMangas(id) {
  try {
    const fileName = await fetchFileNames(id);
    if (fileName.length === 0) {
      return []; // No cover art found
    }
    const coverArt = await Promise.all(fileName.map(async (fileName) => {
      const response = await fetch(`https://uploads.mangadex.org/covers/${id}/${fileName}.512.jpg`);
      if (!response.ok) {
        // throw new Error(`Failed to fetch cover image for ${fileName}`); // Handle specific error
        return []
      }
      return response.url;
    }));
    return coverArt;
  } catch (error) {
    console.error('Error fetching cover art:', error);
    return []; // Or handle the error differently (e.g., throw it for further handling)
  }
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
export async function fetchManga(page = 1,limit=10,title="",queryFilter: string ="") {
  try{
    let offset = (page - 1) * limit;
    // console.log(`https://api.mangadex.org/manga?limit=${limit}&offset=${offset}&availableTranslatedLanguage[]=en${title !== "" ? `&title=${title}` : ""}${queryFilter !== "" ? `&${queryFilter}` : ""}`);
    const res = await fetch(`https://api.mangadex.org/manga?limit=${limit}&offset=${offset}&availableTranslatedLanguage[]=en${title !== "" ? `&title=${title}` : ""}${queryFilter !== "" ? `&${queryFilter}` : ""}`);
    // const mangas = await res.json();
    if(!res.ok)
    {
      return {mangas:[],allChapters:[],coverArts:[],totalManga:0};
    }
    const result = await res.json();
    const totalManga = result.total;
    const mangas = result.data.sort((a, b) => new Date(b.attributes.updatedAt).getTime() - new Date(a.attributes.updatedAt).getTime());
    const promises = mangas.map(manga => fetchLatestChapterManga(manga.id));
    const allChapters = await Promise.all(promises);
    const promisesTwo = mangas.map(manga => fetchCoverMangas(manga.id));
    const coverArts = await Promise.all(promisesTwo);
    return {mangas,allChapters,coverArts,totalManga};
  }catch(error)
  {
    console.error("Failed to fetch manga: ",error);
    return {mangas:[],allChapters:[],coverArts:[],totalManga:0};
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
    // displayTilte = title.length >=20 ? title.slice(0, 20) + "..." : title;
    displayTilte = title;
  }
  else{
    if(title.length > 70)
    {
      displayTilte = title.slice(0, 60) + "...";
    }
    else
    {
      displayTilte = title;
    }
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
export async function fetchFollowedMangasWithID(idArray)
{
  
  const promises = idArray.map(id => fetchLatestChapterManga(id));
  const allChapters = await Promise.all(promises);
  const promisesTwo = idArray.map(id => fetchCoverMangas(id));
  const coverArts = await Promise.all(promisesTwo);
  const mangas = await Promise.all(idArray.map(async (id) => {
    const response = await fetch(`https://api.mangadex.org/manga/${id}`);
    const data = await response.json();
    return data;
  }));
  return {mangas,allChapters,coverArts};
  // idArray.map(id => {
  //   console.log("ID: ",id);
  //   // let manga,allChapters,coverArt;
  //   // const result = await fetchMangaWithID(id);
  //   // ({manga,allChapters,coverArt} = result);
  //   // mangas.push(manga);
  //   // chapters.push(allChapters);
  //   // coverArts.push(coverArt);
  // })
  return idArray;
  // try {
  //   idArray.map(id => async () => {
  //     console.log("ID: ",id);
  //     const respond = await fetch(`https://api.mangadex.org/manga/${id}`);
  //     if(!respond.ok) return [];
  //     const result = await respond.json();
  //     console.log("Mangas :",result);
  //     const allChapters = await fetchLatestChapterManga(result.data.id);
  //     const coverArt =  await fetchCoverMangas(result.data.id);
  //     mangas.push(result.data);
  //     chapters.push(allChapters);
  //     coverArts.push(coverArt);
  //   })
  //   return {mangas,chapters,coverArts};
  // } catch (error) {
  //   return {mangas:[],allChapters:[],coverArts:[]};
  // }
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
    // description = mangaDes;
  }
  return description;
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
  console.log("Result: ",result);
  const promises = mangas.map(manga => fetchLatestChapterManga(manga.id));
  const allChapters = await Promise.all(promises);
  const promisesTwo = mangas.map(manga => fetchCoverMangas(manga.id));
  const coverArts = await Promise.all(promisesTwo);
  return {mangas,allChapters,coverArts};
}
export async function fetchAllReadChapter(email : string,mangaId : string,nextAuthUrl:string)
{
  try {        
      let link = new URL(`${nextAuthUrl}/api/readChapter/allReadChapter`);
      const respond = await fetch(link,{
          method: "POST",
          headers:{
              "Content-Type": "application/json"
          },
          body: JSON.stringify({email:email,mangaId:mangaId}),
      });
      if(respond.ok)
      {
          const data = await respond.json();
          return data;           
      }
      else{
          console.log("Chapter read failed");
          return null;
      }
  } catch (error) {
      console.log("Error during fetch all read chapter:",error);
  }
}

export async function fetchTagFilterId(filterArray : Array<string>)
{
  try {
    const response = await fetch(`https://api.mangadex.org/manga/tag`);
  
    if (!response.ok) {
      throw new Error(`Failed to fetch tags: ${response.status}`); // Include status code for more context
    }
  
    const data = await response.json();
    const includedTagIDs = data.data
      .filter(tag => filterArray.includes(tag.attributes.name.en))
      .map(tag => tag.id);
  
    return includedTagIDs;
  } catch (error) {
    console.error('Error fetching tag filter IDs:', error);
    // Consider handling the error gracefully within your React component to prevent breaking the application:
    return []; // Return an empty array or handle it differently based on your use case
  }  
}
export async function fetchTagFilterWithID(filterArray: Array<string>)
{
  try {
    const respond = await fetch(`https://api.mangadex.org/manga/tag`);
    if(!respond.ok)
    {
      throw new Error(`API request failed with status: ${respond.status}`);
    }
    const data = await respond.json();
    const includedTagIDs = data.data.filter(tag => filterArray.includes(tag.id))
    .map(tag => tag.attributes.name.en);

    return includedTagIDs;
  } catch (error) {
    console.error(`Error fetching tag filter with ID:`, error);
    return [];
  }
}
export async function fetchMangasWithFilter(filters : {[key:string]:any},tagIDs: Array<string>)
{
  try {
    let queryTagIDs = tagIDs.map(tagID => `includedTags[]=${tagID}`).join('&');
    const queryTagFilters = Object.keys(filters).filter(key => filters[key].toString() !== 'any')
    .map(key => `${key}[]=${filters[key]}`)
    .join('&');

    let queryParams = queryTagIDs.concat('&',queryTagFilters);
    const respond = await fetch(`https://api.mangadex.org/manga?${queryParams}&`,{
      method: "GET",
      headers:{
        "Content-Type": "application/json"
      }
    });
    if(!respond.ok)
    {
      throw new Error(`API request mangas with filter failed with status: ${respond.status}`);
    }
    const result = await respond.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error('Error fetching mangas:', error);
    return [];
  }
}

