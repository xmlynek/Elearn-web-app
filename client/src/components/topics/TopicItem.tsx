import classes from "./TopicItem.module.css";
import { Document } from "react-pdf/dist/esm/entry.webpack";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Page, pdfjs } from "react-pdf";
import { useState } from "react";

import LoadingSpinner from "../UI/LoadingSpinner";
import TopicClass from "../../models/TopicClass";

type Props = {
  topic: TopicClass;
};


const TopicItem: React.FC<Props> = (props) => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  const [numPages, setNumPages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
    setIsLoading(false);
  }

  return (
    <div id={classes.ResumeContainer}>
      <div className="centered">
        <h2 className="display-2 txt-main">{props.topic.title}</h2>
      </div>
      {isLoading && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <Document
        file={{
          data: props.topic.data.data,
        }}
        className={classes.PDFDocument}
        options={{ workerSrc: "/pdf.worker.js" }}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={console.error}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            className={`${classes.PDFPage} ${classes.PDFPageOne}`}
            renderTextLayer={true}
            scale={1.7}
            renderInteractiveForms={false}
          />
        ))}
      </Document>
    </div>
  );
};

export default TopicItem;
