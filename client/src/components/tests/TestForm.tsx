import React, { useState } from "react";
import { Button } from "react-bootstrap";
import * as Yup from "yup";
import { Formik, Form, FieldArray, getIn } from "formik";

import TestQuestionClass, {
  TestQuestionType,
} from "../../models/TestQuestionClass";
import QuestionOptionClass from "../../models/QuestionOptionClass";
import TestClass from "../../models/TestClass";
import CustomField from "../UI/CustomField";

type Props = {
  formField?: TestClass;
  onSubmit: Function;
  submitBtnText: string;
  submitBtnVariant?: string;
};

enum FieldObjType {
  QUESTION_TITLE,
  QUESTION_POINTS,
  QUESTION_TYPE,
  OPTION_TITLE,
  OPTION_CORRECT,
  TEST_TITLE,
}

const TestForm: React.FC<Props> = (props) => {
  const [formData, setFormData] = useState<TestClass>(
    props.formField
      ? props.formField
      : new TestClass(1, "", -1, [
          new TestQuestionClass(
            Math.random(),
            1,
            1,
            "",
            TestQuestionType.INPUT,
            [
              new QuestionOptionClass(Math.random(), "", true),
              new QuestionOptionClass(Math.random(), "", true),
            ]
          ),
        ])
  );

  const addQuestionHandler = () => {
    setFormData((state) => {
      const newState = state;
      newState.questions.push(
        new TestQuestionClass(
          Math.random(),
          newState.questions.length + 1,
          1,
          "",
          TestQuestionType.INPUT,
          [new QuestionOptionClass(Math.random(), "", true)]
        )
      );
      return newState;
    });
  };

  const deleteQuestionHandler = (questionId: number, setValues: Function) => {
    setFormData((state) => {
      const newState = state;
      newState.questions = newState.questions.filter(
        (question) => question.id !== questionId
      );
      return newState;
    });
    setValues(formData);
  };

  const addOptionHandler = (questionId: number) => {
    setFormData((state) => {
      const newState = state;
      const questionIndex = newState.questions.findIndex(
        (q) => q.id === questionId
      );
      newState.questions[questionIndex].options.push(
        new QuestionOptionClass(
          Math.random(),
          "",
          newState.questions[questionIndex].type === TestQuestionType.INPUT
            ? true
            : false
        )
      );
      return newState;
    });
  };

  const deleteOptionHandler = (
    questionId: number,
    optionId: number,
    setValues: Function
  ) => {
    setFormData((state) => {
      const newState = state;
      const questionIndex = newState.questions.findIndex(
        (q) => q.id === questionId
      );
      newState.questions[questionIndex].options = newState.questions[
        questionIndex
      ].options.filter((option) => option.id !== optionId);
      return newState;
    });
    setValues(formData);
  };

  const onChangeHandler = (
    event: React.FormEvent<any>,
    field: FieldObjType,
    fieldName: string,
    setValues: Function,
    handleChange: Function,
    questionId?: number,
    optionId?: number
  ) => {
    setFormData((state) => {
      const value = event.currentTarget.value;
      const newState = state;
      if (field === FieldObjType.TEST_TITLE) newState.title = value;

      if (questionId) {
        const question = newState.questions.at(
          newState.questions.findIndex((question) => question.id === questionId)
        );
        if (!question) return state;

        if (optionId) {
          const option = question.options.at(
            question.options.findIndex((option) => option.id === optionId)
          );
          if (!option) return state;

          if (field === FieldObjType.OPTION_TITLE) option.title = value;
          if (field === FieldObjType.OPTION_CORRECT) {
            if (question.type === TestQuestionType.SINGLE_CHOICE) {
              question.options.forEach(
                (opt) => (opt.isCorrect = opt.id === option.id ? true : false)
              );
            }
            option.isCorrect = event.currentTarget.checked;
          }
        }

        if (field === FieldObjType.QUESTION_TITLE) question.title = value;
        if (field === FieldObjType.QUESTION_POINTS) question.points = value;

        if (field === FieldObjType.QUESTION_TYPE) {
          question.type = value;
          // (re)set option correctness
          question.options.forEach(
            (option) =>
              (option.isCorrect =
                question.type === TestQuestionType.INPUT ? true : false)
          );
        }
      }
      return newState;
    });
    setValues(formData);
    handleChange(fieldName);
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("*Povinné"),
    questions: Yup.array()
      .of(
        Yup.object().shape({
          points: Yup.number().min(1, "Minimálny počet bodov je 1"),
          title: Yup.string().required("*Povinné"),
          type: Yup.string().required("*Povinné"),
          options: Yup.array()
            .of(
              Yup.object().shape({
                title: Yup.string().required("*Povinné"),
                correct: Yup.boolean(),
              })
            )
            .min(1, "Otázka musí obsahovať aspoň jednu odpoveď")
            .required("*Povinné")
            .max(6, "Maximálny počet odpovedí je 6"),
        })
      )
      .min(1, "Test musí obsahovať aspoň jednu otázku")
      .required("*Povinné"),
  });

  const validateHandler = (values: TestClass) => {
    let errors: any = {};
    try {
      validationSchema.validateSync(values, { abortEarly: false });
    } catch (error: any) {
      errors = error.inner.reduce((errors: any, error: any) => {
        return {
          ...errors,
          [error.path]: error.message,
        };
      });
    } finally {
      return values.questions.some((q) =>
        q.options.every((o) => o.isCorrect === false)
      )
        ? {
            ...errors,
            optNotSelected: "Aspoň jedna odpoveď musí byť označená ako správna",
          }
        : errors;
    }
  };

  return (
    <Formik
      initialValues={formData}
      enableReinitialize
      validateOnBlur
      validate={validateHandler}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        // console.log(JSON.stringify(values, null, 2));
        props.onSubmit(formData);
      }}
    >
      {({ errors, values, touched, setValues, handleChange, setErrors }) => (
        <Form className="form">
          <div className="list-group-item mt-3 ">
            <CustomField
              label="Názov testu"
              name={"title"}
              error={errors.title && touched.title ? true : false}
              placeholder={"Veľký test..."}
              onChange={(e: any) => {
                onChangeHandler(
                  e,
                  FieldObjType.TEST_TITLE,
                  "title",
                  setValues,
                  handleChange
                );
              }}
            />

            {/* zero questions error message */}
            {typeof errors.questions === "string" ? (
              <div className="centered error-msg">
                <h4>{errors.questions}</h4>
              </div>
            ) : null}

            <FieldArray name="questions">
              {(arrayHelpers) =>
                values.questions.map((question, questionIndex) => {
                  const getError = (fieldName: string) => {
                    return (
                      getIn(errors, fieldName) && getIn(touched, fieldName)
                    );
                  };

                  return (
                    <div key={questionIndex}>
                      <hr />
                      <div className="list-group-item mt-3 ">
                        <CustomField
                          key={`Otázka ${questionIndex + 1}`}
                          label={`Otázka ${questionIndex + 1}`}
                          name={`questions.${questionIndex}.title`}
                          withCloseButton={{
                            onDelete: deleteQuestionHandler.bind(
                              null,
                              question.id,
                              setValues
                            ),
                          }}
                          as={"textarea"}
                          error={getError(`questions.${questionIndex}.title`)}
                          placeholder={"Aký je názov..."}
                          onChange={(e: any) =>
                            onChangeHandler(
                              e,
                              FieldObjType.QUESTION_TITLE,
                              `questions.${questionIndex}.title`,
                              setValues,
                              handleChange,
                              question.id
                            )
                          }
                        />

                        <div className="row mt-3">
                          <div className="col-12 col-md-6">
                            <div className="form-control">
                              <CustomField
                                label={"Počet bodov"}
                                name={`questions.${questionIndex}.points`}
                                error={getError(
                                  `questions.${questionIndex}.points`
                                )}
                                className={"mb-2"}
                                type={"number"}
                                placeholder={"1"}
                                onChange={(e: any) =>
                                  onChangeHandler(
                                    e,
                                    FieldObjType.QUESTION_POINTS,
                                    `questions.${questionIndex}.points`,
                                    setValues,
                                    handleChange,
                                    question.id
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className="col mt-sm-3 mt-md-0">
                            <div className="form-control">
                              <CustomField
                                name={`questions.${questionIndex}.type`}
                                label={"Typ otázky"}
                                as="select"
                                className={"mb-2"}
                                error={getError(
                                  `questions.${questionIndex}.type`
                                )}
                                onChange={(e: any) =>
                                  onChangeHandler(
                                    e,
                                    FieldObjType.QUESTION_TYPE,
                                    `questions.${questionIndex}.type`,
                                    setValues,
                                    handleChange,
                                    question.id
                                  )
                                }
                              >
                                <option value={TestQuestionType.INPUT}>
                                  Textový vstup
                                </option>
                                <option value={TestQuestionType.SINGLE_CHOICE}>
                                  Jedna možnosť
                                </option>
                                <option
                                  value={TestQuestionType.MULTIPLE_CHOICES}
                                >
                                  Viacero možností
                                </option>
                              </CustomField>
                            </div>
                          </div>
                        </div>

                        {/* zero options error message */}
                        {typeof getIn(
                          errors,
                          `questions.${questionIndex}.options`
                        ) === "string" ? (
                          <div className="centered error-msg">
                            <h4>
                              {getIn(
                                errors,
                                `questions.${questionIndex}.options`
                              )}
                            </h4>
                          </div>
                        ) : null}

                        <FieldArray name={`questions.${questionIndex}.options`}>
                          {(arrayHelpers) =>
                            question.options.map((option, optionIndex) => {
                              return (
                                <div key={option.id} className="mt-3 mb-4">
                                  <div className="list-group-item">
                                    <div className="form-group">
                                      <CustomField
                                        name={`questions.${questionIndex}.options.${optionIndex}.title`}
                                        withCloseButton={{
                                          onDelete: deleteOptionHandler.bind(
                                            null,
                                            question.id,
                                            option.id,
                                            setValues
                                          ),
                                        }}
                                        label={`Odpoveď ${optionIndex + 1}`}
                                        onChange={(e: any) => {
                                          onChangeHandler(
                                            e,
                                            FieldObjType.OPTION_TITLE,
                                            `questions.${questionIndex}.options.${optionIndex}.title`,
                                            setValues,
                                            handleChange,
                                            question.id,
                                            option.id
                                          );
                                        }}
                                        error={getError(
                                          `questions.${questionIndex}.options.${optionIndex}.title`
                                        )}
                                      />
                                      <div className="mt-2">
                                        <label
                                          htmlFor={`questions.${questionIndex}.options.${optionIndex}`}
                                          className="me-3 form-label"
                                        >
                                          Správna odpoveď
                                        </label>
                                        {
                                          <input
                                            name={`option${questionIndex}`}
                                            id={`questions.${questionIndex}.options.${optionIndex}`}
                                            type={`${
                                              question.type ===
                                                TestQuestionType.MULTIPLE_CHOICES ||
                                              question.type ===
                                                TestQuestionType.INPUT
                                                ? "checkbox"
                                                : "radio"
                                            }`}
                                            checked={option.isCorrect}
                                            disabled={
                                              question.type ===
                                              TestQuestionType.INPUT
                                                ? true
                                                : false
                                            }
                                            onClick={(e) => {
                                              if (
                                                question.type ===
                                                  TestQuestionType.SINGLE_CHOICE &&
                                                question.options.length > 1 &&
                                                question.options.every(
                                                  (opt) => opt.isCorrect
                                                )
                                              ) {
                                                onChangeHandler(
                                                  e,
                                                  FieldObjType.OPTION_CORRECT,
                                                  `questions.${questionIndex}.options.${optionIndex}.correct`,
                                                  setValues,
                                                  handleChange,
                                                  question.id,
                                                  option.id
                                                );
                                              }
                                            }}
                                            onChange={(e) => {
                                              onChangeHandler(
                                                e,
                                                FieldObjType.OPTION_CORRECT,
                                                `questions.${questionIndex}.options.${optionIndex}.correct`,
                                                setValues,
                                                handleChange,
                                                question.id,
                                                option.id
                                              );
                                            }}
                                          />
                                        }
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          }
                        </FieldArray>

                        {/* no correct option selected error  */}
                        {question.options.length > 0 &&
                          question.options.every(
                            (opt) => opt.isCorrect === false
                          ) &&
                          getIn(errors, `optNotSelected`) && (
                            <div className="centered error-msg">
                              <h5>{getIn(errors, `optNotSelected`)}</h5>
                            </div>
                          )}

                        {/* button that adds new option */}
                        <div className="centered my-1 mb-3">
                          <Button
                            className="width-25-991-60"
                            variant="secondary"
                            onClick={() => {
                              addOptionHandler(question.id);
                              setValues(formData);
                            }}
                          >
                            Pridať odpoveď
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })
              }
            </FieldArray>

            {/* button that adds new question */}
            <div className="centered mt-4 mb-3">
              <Button
                className="width-35-991-80"
                onClick={() => {
                  addQuestionHandler();
                  setValues(formData);
                }}
              >
                Pridať Otázku
              </Button>
            </div>
          </div>

          <div className="text-center mt-4 mb-2">
            <Button
              className="width-50-991-100"
              type="submit"
              variant={`${
                props.submitBtnVariant ? props.submitBtnVariant : "success"
              }`}
            >
              {props.submitBtnText}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TestForm;
