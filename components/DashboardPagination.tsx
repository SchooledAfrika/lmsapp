"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const DashboardPagination = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const page = searchParams.get("page") || 1;

  const params = new URLSearchParams(searchParams);

  const ITEM_PER_PAGE = 6;

  return (
    <Pagination className="font-subtext mt-24  mb-6 rounded-xl py-3">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => "prev"} href="#" />
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
        <PaginationItem className="">
          <PaginationLink href="#">4</PaginationLink>
        </PaginationItem>
        <PaginationItem className="md:block hidden">
          <PaginationLink href="#">5</PaginationLink>
        </PaginationItem>
        <PaginationItem className="md:block hidden">
          <PaginationLink href="#">6</PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext onClick={() => "next"} href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default DashboardPagination;
