import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Dispatch, Fragment, SetStateAction } from "react";

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
    <div className="flex mt-3">
      <Pagination>
        <PaginationContent className="space-x-1">
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
                <Fragment key={index}>
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
                </Fragment>
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
