'use client'

import React from "react";
import {Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const PageNav = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const page = searchParams.get("page") || 1;

  const params = new URLSearchParams(searchParams);

  const ITEM_PER_PAGE = 6;

 


 
  return (
   
       <Pagination className="font-subtext  w-[60%] mb-6 rounded-xl py-3">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
             onClick={() =>("prev")} href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem className="">
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem className="hidden xs:block md:block">
            <PaginationLink href="#">4</PaginationLink>
          </PaginationItem>
          <PaginationItem className="hidden xs:block md:block">
            <PaginationLink href="#">5</PaginationLink>
          </PaginationItem>
          
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem className="hidden xs:hidden md:block">
            <PaginationLink href="#">21</PaginationLink>
          </PaginationItem>
          <PaginationItem className="hidden xs:hidden md:block">
            <PaginationLink href="#">22</PaginationLink>
          </PaginationItem>
          <PaginationItem className="hidden xs:hidden md:block">
            <PaginationLink href="#">23</PaginationLink>
          </PaginationItem>
          <PaginationItem className="hidden xs:hidden md:block">
            <PaginationLink href="#">24</PaginationLink>
          </PaginationItem>
          <PaginationItem className="hidden xs:hidden md:block">
            <PaginationLink href="#">25</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext 
           onClick={() => ("next")} href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    
  );
};

export default PageNav;
