import { Box, Center, Flex, Image } from "@chakra-ui/react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import React, { useState } from "react";
import loading_img from "../../../../assets/Images/FitnessGramEventImages/loading.gif";
import { useSelector } from "react-redux";
import Pagination from "../../../Pagination";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	"pdfjs-dist/build/pdf.worker.min.js",
	import.meta.url,
).toString();
const Report = React.memo(() => {
	const totalPages = useSelector((state) => state.teacher.totalPages);

	const reportFilter = useSelector((state) => state.districtAdmin.reportFilter);

	const reportPdfData = useSelector(
		(state) => state.districtAdmin.reportPdfData,
	);
	const loading = useSelector((state) => state.profile.upLoading);
	const loading2 = useSelector((state) => state.profile.loading2);
	const loading3 = useSelector((state) => state.profile.upLoading2);


	const uint8Array = new Uint8Array(reportPdfData);
	const [numPages, setNumPages] = useState(null);

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}
	return (
		<>

			{reportFilter === "FitnessGram Completion Report" &&
			totalPages > 1 &&
			!loading2 ? (
				<Pagination />
			) : null}
			{loading || loading3 || loading2? (
				<Center h={"60vh"}>
					<Image src={loading_img} alt="loading img" />
				</Center>
			) : (
				<>
					<Flex
						height="45rem"
						p="4"
						justifyContent="center"
						overflowY="auto"
						bg="gray-4"
					>
						<Document
							file={{ data: uint8Array }}
							onLoadSuccess={onDocumentLoadSuccess}
						>
							{Array.from(new Array(numPages), (el, index) => (
								<div key={`page_${index + 1}`} style={{ marginBottom: "10px" }}>
									<Page pageNumber={index + 1} />
								</div>
							))}
						</Document>
					</Flex>
				</>
			)}
		</>
	);
});

export default Report;
