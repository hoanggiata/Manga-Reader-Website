"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
export default function GenreSelection({ genres,filters,includedTags }) {
  const [activeIndices, setActiveIndices] = useState([]);
  const [activeIndicesID, setActiveIndicesID] = useState([]);
  const [inputValue, setInputValue] = useState("");
  // const [filteredGenresIds, setFilteredGenresIds] = useState([]);
  const [shouldFetch, setShouldFetch] = useState(false);
  const router = useRouter();
  function handleOnClickGenres(event) {
    let key = event.target.dataset.value;
    let keyID = event.target.dataset.id;
    const newActiveIndices = [...activeIndices];
    const newActiveIndicesID = [...activeIndicesID];
    if (newActiveIndices.includes(key) && newActiveIndicesID.includes(keyID)) {
      const indexToRemove = newActiveIndices.indexOf(key);
      newActiveIndices.splice(indexToRemove, 1);
      newActiveIndicesID.splice(indexToRemove, 1);
    } else {
      newActiveIndices.push(key);
      newActiveIndicesID.push(keyID);
    }
    setActiveIndices(newActiveIndices);
    setActiveIndicesID(newActiveIndicesID);
    setInputValue(newActiveIndices.join(","));   
  }
  const handleFilter = () => { 
      setShouldFetch(true);    
  }
  const handleExistFilter = () => {
    const filtersKeys = Object.keys(filters);
    const ExistActiveIndices = [...activeIndices];
    const ExistActiveIndicesID = [...activeIndicesID];
    if(Array.isArray(includedTags) && includedTags.length > 0)
    {
      includedTags.forEach(tagID => {
        const element = document.getElementById(`genre-${tagID}`)?.dataset.value;     
        ExistActiveIndices.push(element);
        ExistActiveIndicesID.push(tagID);
        setActiveIndices(ExistActiveIndices);
        setActiveIndicesID(ExistActiveIndicesID);
      })
    }
    else if(typeof includedTags !== `undefined`)
    {
      const element = document.getElementById(`genre-${includedTags}`)?.dataset.value;
      ExistActiveIndices.push(element);
      ExistActiveIndicesID.push(includedTags);
      setActiveIndices(ExistActiveIndices);
      setActiveIndicesID(ExistActiveIndicesID);
    }
    filtersKeys.forEach(key => {
      const element = document.getElementById(key);
      const filterValue = filters[key].toString();
      if(filterValue !== "" && typeof filterValue !== "undefined")
      {
        element.value = filterValue;
      }
    })
  }
  useEffect(() => {
    handleExistFilter();
  },[]);

  useEffect(() => {
    const fetchData = async () => {   
      if (shouldFetch) { // Check if any genres are selected
        try {       
          const contentRating = document.getElementById("contentRating")?.value;
          const status = document.getElementById("status")?.value;
          const demographic = document.getElementById("publicationDemographic")?.value;
          let queryParams;
          const filters: {[key:string]:any} = {
            contentRating: [contentRating.toString()],
            status: [status.toString()],
            publicationDemographic: [demographic.toString()]
          }
          const queryTagFilters = Object.keys(filters).filter(key => filters[key].toString() !== 'any')
          .map(key => `${key}[]=${filters[key]}`)
          .join('&');  
          if(Array.isArray(activeIndicesID) && activeIndicesID.length > 0)
          {
            let queryTagIDs = activeIndicesID.map((tagID: string) => `includedTags[]=${tagID}`).join('&');
            queryParams = queryTagIDs.concat('&',queryTagFilters);
          }
          else
          {
            queryParams = queryTagFilters;
          }
          router.push(`/filter?${queryParams}`);
          
          // const fetchMangas = await fetchMangasWithFilter(filter,fetchedIds);         
          setShouldFetch(false);
        } catch (error) {
        }
        
      } else {
        // Handle the case where no genres are selected (optional)
        // setFilteredGenresIds([]); // Clear filtered IDs if no selections
      }
    };
    fetchData();
  }, [shouldFetch, activeIndicesID]);
  //Fetch Mangas With Filter

  return (
    <form className="text-white mb-[3rem]" onSubmit={(event) => event.preventDefault()}>
          {/* First Filter Section */}
          <div className="flex flex-col lg:flex-row">
              <div className="flex text-sm p-[5px] pl-[12px] pr-[6px] mr-[8px] mb-[15px] border rounded-[6px] border-gray-600 items-center w-[277px]">
                  <strong className="text-xs lg:text-sm flex-1">Content Rating</strong>
                  <div className="relative group w-max flex-[2]">
                      <select id="contentRating" className="ml-2 bg-[#1f1f1f] outline-none hover:cursor-pointer border-none">
                          <option className="min-h-[1.2em]" value={"any"} selected>Any</option>
                          <option className="min-h-[1.2em]" value={"safe"}>Safe</option>
                          <option className="min-h-[1.2em]" value={"suggestive"}>Suggestive</option>
                          <option className="min-h-[1.2em]" value={"erotica"}>Erotica</option>
                      </select>
                  </div>
              </div>
              <div className="flex text-sm p-[5px] pl-[12px] pr-[12px] mr-[8px] mb-[15px] border rounded-[6px] border-gray-600 items-center w-[277px]">
                  <strong className="text-xs lg:text-sm flex-1">Status</strong>
                  <div className="relative group w-4 flex-[2]">
                      <select id="status" className="ml-2 bg-[#1f1f1f] outline-none hover:cursor-pointer border-none">
                          <option className="min-h-[1.2em]" value={"any"} selected>Any</option>
                          <option className="min-h-[1.2em]" value={"ongoing"}>Ongoing</option>
                          <option className="min-h-[1.2em]" value={"completed"}>Completed</option>
                          <option className="min-h-[1.2em]" value={"hiatus"}>Hiatus</option>
                          <option className="min-h-[1.2em]" value={"cancelled"}>Cancelled</option>
                      </select>
                  </div>
              </div>
          </div>
          {/* Second Filter Section */}
          <div className="flex">
              {/* <div className="flex text-sm p-[5px] pl-[12px] pr-[6px] mr-[8px] mb-[8px] border rounded-[6px] border-gray-600 items-center w-46">
                  <strong className="text-xs lg:text-sm">Sort</strong>
                  <div className="relative group w-min ">
                      <select name="sort" className="ml-2 bg-[#1f1f1f] outline-none hover:cursor-pointer">
                          <option className="min-h-[1.2em]" value={"none"} selected>None</option>
                          <option className="min-h-[1.2em]">Best Match</option>
                          <option className="min-h-[1.2em]">Latest Upload</option>
                          <option className="min-h-[1.2em]">Oldest Upload</option>
                          <option className="min-h-[1.2em]">Highest Rating</option>
                          <option className="min-h-[1.2em]">Lowest Rating</option>
                          <option className="min-h-[1.2em]">Recently Added</option>
                      </select>
                  </div>
              </div> */}
              <div className="flex text-sm p-[5px] pl-[12px] pr-[6px] mb-[8px] border rounded-[6px] border-gray-600 items-center w-[277px]">
                  <strong className="text-xs lg:text-sm flex-1">Demographic</strong>
                  <div className="relative group flex-[2]">
                      <select id="publicationDemographic" className="ml-2 bg-[#1f1f1f] !focus:outline-none !focus:shadow-none hover:cursor-pointer border-none border-0 w-[83%]">
                          <option className="min-h-[1.2em]" value={"any"} selected>Any</option>
                          <option className="min-h-[1.2em]" value={"shounen"}>Shounen</option>
                          <option className="min-h-[1.2em]" value={"shoujo"}>Shoujo</option>
                          <option className="min-h-[1.2em]" value={"seinen"}>Seinen</option>
                          <option className="min-h-[1.2em]" value={"josei"}>Josei</option>                           
                      </select>
                  </div>
              </div>
              {/* <div className="flex text-sm p-[5px] pl-[12px] pr-[12px] mr-[8px] mb-[8px] border rounded-[6px] border-gray-600 items-center">
                  <strong>Publication year</strong>
                  <div className="relative group ">
                      <Input name="year" className="ml-2 bg-[#1f1f1f] outline-none border-0" type="number"></Input>
                  </div>
              </div> */}
          </div>
          {/* Genres Section */}
          <div className="mt-[1rem]">
              <div className="mb-[16px]">
                  <strong>Genres</strong>
              </div>
              {/* Genres buttons */}
              <div className="flex flex-wrap lg:overflow-hidden overflow-y-auto h-40 lg:h-auto">
                <input type="hidden" name="genres" id="genres" value={inputValue} />
                {genres.data.map((genre,index) => (
                  <div
                    key={genre.id}
                    data-value={genre.attributes.name.en}
                    data-id={genre.id}
                    id={`genre-${genre.id}`}
                    className={`bg-[#2f2f2f] rounded-[0.25rem] text-[13px] max-w-max mr-2 mb-2 p-2 cursor-pointer lg:hover:text-[#FFD700] ${activeIndices.includes(genre.attributes.name.en) ? "text-[#FFD700]" : "text-white"}`}
                    onClick={handleOnClickGenres}>
                    {genre.attributes.name.en}
                  </div>
                ))}
              </div>                                     
          </div>
          {/* Filter Button */}
          <div className="mt-[1.5rem]">
            <Button
              className={`bg-[#FFD700] text-[#000000] hover:bg-[#FFEC8B]`}
              onClick={handleFilter}>
                Filter
            </Button> 
          </div>
    </form>   
  );
}
