import { Flex } from "@chakra-ui/react";
import React from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";

const PaginationComponent = (props) => {
	const { isPreviousButton, isNextButton,  ...paginationProps } = props;

	const totalPages = useSelector((state) => state?.teacher?.totalPages);

	const totalNoOfPages = useSelector(
		(state) => state.districtAdmin.totalNoOfPages,
	);

	const totalPages2 = useSelector((state) => state.teacher.totalPages2);



	const isPreviousButtonDisabled = isPreviousButton;
	const isNextButtonDisabled = isNextButton;
	return (
		<>
			{totalPages > 1 || totalNoOfPages > 1  || totalPages2 > 1 ? (
				<Flex justifyContent={{ base: "flex-end", lg: "flex-end" }} my="1">
					<ReactPaginate
						{...paginationProps}
						breakLabel="..."
						nextLabel="Next>"
						// onPageChange={handlePageNumber}
						pageRangeDisplayed={3}
						// pageCount={totalPages}
						marginPagesDisplayed={2}
						previousLabel="<Prev"
						renderOnZeroPageCount={null}
						containerClassName="pagination"
						pageLinkClassName="page-num"
						previousLinkClassName="page-num"
						nextLinkClassName="page-num"
						activeLinkClassName="active"
						disableInitialCallback="false"
						// forcePage={data?.pageNumber - 1}
						pageClassName="page-item"
						previousClassName={`page-item ${
							isPreviousButtonDisabled ? "disabled" : ""
						}`}
						nextClassName={`page-item ${
							isNextButtonDisabled ? "disabled" : ""
						}`}
						previousLinkDisabled={isPreviousButtonDisabled}
						nextLinkDisabled={isNextButtonDisabled}
					/>
				</Flex>
			) : null}
		</>
	);
};

export default PaginationComponent;
