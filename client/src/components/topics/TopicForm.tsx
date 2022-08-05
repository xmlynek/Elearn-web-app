import React, { FormEvent, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import classes from './TopicForm.module.css';
import TopicClass from '../../models/TopicClass';
import Dropzone from 'react-dropzone';
import useLangTranslation from '../../hooks/useLangTranslation';

type Props = {
  formField?: TopicClass;
  onSubmit: (topic: FormData) => void;
  onSubmitText?: string | React.ReactNode;
};

const TopicForm: React.FC<Props> = (props) => {
  const translations = useLangTranslation();

  const [files, setFiles] = useState<Array<File>>([]);
  const [fileErr, setFileErr] = useState<String | null>(null);
  const [title, setTitle] = useState<any>(
    props.formField ? props.formField.title : ''
  );
  const [titleErr, setTitleErr] = useState<String | null>(null);

  const onDropHandler = (acceptedFiles: File[]) => {
    if (acceptedFiles.length !== 1) {
      setFileErr(translations!.mustInsertOnePDFFileErr);
      setFiles([]);
    } else {
      setFileErr(null);
      setFiles(acceptedFiles);
    }
  };

  const titleOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (e.target.value === '') {
      setTitleErr(translations!.isRequiredErr);
    } else {
      setTitleErr(null);
    }
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);

    let err = 0;
    if (title === '') {
      setTitleErr(translations!.isRequiredErr);
      err = 1;
    } else if (props.formField) {
      props.onSubmit(formData);
    }
    if (files.length !== 1) {
      setFileErr(translations!.mustInsertOnePDFFileErr);
      err = 1;
    }
    if (err) {
      return;
    }
    if (fileErr || titleErr) {
      return;
    }

    formData.append('file', files[0]);
    props.onSubmit(formData);
  };

  return (
    <Form onSubmit={submitHandler}>
      <hr />
      <Form.Label htmlFor="topic_title" className="h3">
        {translations?.titleLabel}
      </Form.Label>
      <Form.Control
        id="topic_title"
        value={title ? title : ''}
        onChange={titleOnChangeHandler}
      ></Form.Control>
      {titleErr && <p className="error-msg h5">{titleErr}</p>}
      <hr />
      <h2 className="h3">{translations?.topicFormAddPDFFileLabel}</h2>
      <Dropzone
        onDrop={onDropHandler}
        maxFiles={1}
        accept={{ 'application/pdf': ['.pdf'] }}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              {...getRootProps()}
              className={`${classes.dropZone} ${classes.dropzoneLabel}`}
            >
              <input {...getInputProps()} accept="application/pdf" />
              <p className={`h5`}>
                {files.length === 0 ? (
                  translations?.topicFormDragSelectPDFFileLabel
                ) : (
                  <span>
                    {translations?.titleLabel}: {files.at(0)?.name} <br />
                    {translations?.typeLabel}: {files.at(0)?.type}
                  </span>
                )}
              </p>
            </div>
          </section>
        )}
      </Dropzone>
      {fileErr && <p className="error-msg h4">{fileErr}</p>}
      <div className="text-center">
        <Button type="submit" className="width-responsive mt-4">
          {props.onSubmitText ? props.onSubmitText : 'Vytvoriť topik'}
        </Button>
      </div>
    </Form>
  );
};

export default TopicForm;
