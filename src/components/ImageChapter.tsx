import * as React from "react";
import Image from "next/image";
import { fetchChapterImages } from "@/utils/utils";
export default async function ImageChapter({chapterID})
{
    const images = await fetchChapterImages(chapterID);
    return (
        <>
          {images.map((image, index) => (
            <div key={index} className="min-h-52 w-full flex justify-center">
              <Image
                className=""
                loading="lazy"
                src={image}
                alt="Manga Title"
                sizes="100vw"
                width={0}
                height={0}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          ))}
        </>
      );
}