import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Dispatch, SetStateAction } from "react";

const CustomPagination = ({
  pageNumber,
  setPageNumber,
  totalPages,
}: {
  pageNumber: number;
  setPageNumber: Dispatch<SetStateAction<number>>;
  totalPages: number;
}) => {
  const handlePrev = () => {
    setPageNumber((prev) => (prev === 1 ? 1 : prev - 1));
  };

  const handleNext = () => {
    setPageNumber((prev) => (prev === totalPages ? totalPages : prev + 1));
  };

  return (
    <div className="flex gap-1">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePrev();
              }}
              className={`${pageNumber === 1 ? "cursor-not-allowed" : "cursor-pointer"}`}
            />
          </PaginationItem>

          {Array(totalPages)
            .fill(0)
            .map((_, index) => {
              const page = index + 1;
              return (
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    isActive={pageNumber === page}
                    onClick={(e) => {
                      e.preventDefault();
                      setPageNumber(page);
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNext();
              }}
              className={`${pageNumber === totalPages ? "cursor-not-allowed" : "cursor-pointer"}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default CustomPagination;
