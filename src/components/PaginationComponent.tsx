'use client'
 
import * as React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"

import { usePathname } from 'next/navigation'
export default function PaginationComponent({page = 1,totalManga = 76161,title="",queryParams=""})
{
    let currentPage = Number(page);

    const totalPages = Math.ceil(totalManga / 10);
    const startPage = Math.max(1,currentPage - 1);
    const endPage = Math.min(totalPages,currentPage + 2);
    const pathname = usePathname();
    
    return(
    <Pagination>
        <PaginationContent className="gap-2">
            <PaginationItem className="bg-[#3f3f3f] text-[#999] rounded-md">
                <PaginationPrevious className={`text-[16px] ${currentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-[#FFD700]'}`} 
                href={currentPage === 1 ? '#' : `${pathname}${queryParams !== "" ? `?${queryParams}&` : ""}${title !== "" ? `?title=${title}&` : ""}${(queryParams === "" && title ==="") ? "?" : ""}page=${currentPage - 1}`}/>
            </PaginationItem>
            {[...Array(endPage - startPage + 1)].map((_,i)=>(
            <PaginationItem key={i} className={currentPage === startPage + i ? "bg-[#FFD700] text-[#000000] rounded-md" : "bg-[#3f3f3f] rounded-md"}>
                <PaginationLink href={`${pathname}${queryParams !== "" ? `?${queryParams}&` : ""}${title !== "" ? `?title=${title}&` : ""}${(queryParams === "" && title ==="") ? "?" : ""}page=${startPage + i}`} className="hover:bg-[#FFD700] text-[16px]">{startPage + i}</PaginationLink>
            </PaginationItem>
            ))}
            <PaginationItem className="bg-[#3f3f3f] text-[#999] rounded-md">
                <PaginationNext className="hover:bg-[#FFD700] text-[16px]" href={`${pathname}${queryParams !== "" ? `?${queryParams}&` : ""}${title !== "" ? `?title=${title}&` : ""}${(queryParams === "" && title ==="") ? "?" : ""}page=${currentPage + 1}`}/>
            </PaginationItem>
        </PaginationContent>
    </Pagination>
    );
}