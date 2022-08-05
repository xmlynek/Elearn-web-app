import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'react-bootstrap';
import * as Yup from 'yup';
import useLangTranslation from '../../hooks/useLangTranslation';
import VideoClass from '../../models/VideoClass';
import classes from './VideoForm.module.css';

type Props = {
  video?: VideoClass | null;
  onSubmit: (data: any) => void;
  submitBtnText: string | React.ReactNode;
};

type FormValues = {
  title: string;
  author: string;
  description: string;
  url: string;
  length: number;
};

const URL = 'https://www.youtube-nocookie.com/embed/';

const VideoForm: React.FC<Props> = (props) => {
  const translations = useLangTranslation();

  const initValues: FormValues =
    props.video != null
      ? {
          title: props.video.title,
          author: props.video.author,
          description: props.video.description,
          url: props.video.url.replace(URL, ''),
          length: props.video.length,
        }
      : {
          title: '',
          author: '',
          description: '',
          length: 0,
          url: '',
        };

  return (
    <Formik
      initialValues={initValues}
      validationSchema={Yup.object({
        title: Yup.string().trim().required(translations?.isRequiredErr),
        author: Yup.string().trim().required(translations?.isRequiredErr),
        description: Yup.string().trim().required(translations?.isRequiredErr),
        url: Yup.string().trim().required(translations?.isRequiredErr),
        length: Yup.number()
          .min(1, translations?.videoMustBeAtLeast1minLongErr)
          .required(translations?.isRequiredErr),
      })}
      onSubmit={(values, { setSubmitting }) => {
        values.url = URL + values.url;
        props.onSubmit(values);
        // alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ errors, touched }) => (
        <Form className={`form-floating mb-3 ${classes.form}`}>
          <div className="mt-3 mb-4">
            <label htmlFor="title">{translations?.titleLabel}</label>
            <Field
              name="title"
              type="text"
              className={`form-control ${
                errors.title && touched.title ? 'is-invalid' : ''
              }`}
              placeholder="UWB Technology"
            />
            <ErrorMessage name="title">
              {(msg) => <div className="error-msg">{msg}</div>}
            </ErrorMessage>
          </div>
          <div className="mt-1 mb-4">
            <label htmlFor="author">{translations?.authorLabel}</label>
            <Field
              name="author"
              type="text"
              className={`form-control ${
                errors.author && touched.author ? 'is-invalid' : ''
              }`}
              placeholder="FiRa Consortium"
            />
            <ErrorMessage name="author">
              {(msg) => <div className="error-msg">{msg}</div>}
            </ErrorMessage>
          </div>

          <div className="mt-1 mb-4">
            <label htmlFor="description">
              {translations?.descriptionLabel}
            </label>
            <Field
              name="description"
              as="textarea"
              rows="5"
              className={`form-control ${
                errors.description && touched.description ? 'is-invalid' : ''
              }`}
              placeholder={translations?.descriptionPlaceholder}
            />
            <ErrorMessage name="description">
              {(msg) => <div className="error-msg">{msg}</div>}
            </ErrorMessage>
          </div>

          <div className="mt-1 mb-4">
            <label htmlFor="url">{translations?.urlLinkLabel}</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text d-lg-block d-none">
                  {URL}
                </span>
                <span className="input-group-text d-md-block d-lg-none d-none">
                  youtube-nocookie.com/embed/
                </span>
                <span className="input-group-text d-sm-block d-md-none d-none">
                  youtube-nocookie.com/embed/
                </span>
                <span className="input-group-text d-sm-none">
                  ...nocookie.com/embed/
                </span>
              </div>
              <Field
                name="url"
                type="text"
                className={`form-control ${
                  errors.url && touched.url ? 'is-invalid' : ''
                }`}
                placeholder="J5HrtevCuXU"
              />
            </div>
            <ErrorMessage name="url">
              {(msg) => <div className="error-msg">{msg}</div>}
            </ErrorMessage>
          </div>

          <div className="mt-1 mb-4">
            <label htmlFor="length">
              {translations?.videoMinutesLengthLabel}
            </label>
            <Field
              name="length"
              type="number"
              className={`form-control ${
                errors.length && touched.length ? 'is-invalid' : ''
              }`}
              placeholder="5"
            />
            <ErrorMessage name="length">
              {(msg) => <div className="error-msg">{msg}</div>}
            </ErrorMessage>
          </div>

          <div className="text-center">
            <Button type="submit" className="width-responsive">
              {props.submitBtnText}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default VideoForm;
