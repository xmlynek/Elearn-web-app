import { useContext } from 'react';
import LanguageContext, { Language } from '../store/lang-context';

type Translations = {
  isRequiredErr: string;
  wrongEmailFormatErr: string;
  passwordLengthErr: string;
  maxCharLengthErr: string;
  passwordMustContainNumberErr: string;
  passwordMustContainLetterErr: string;
  passwordMustMatchErr: string;
  minPointsCountErr: string;
  questionMustContainAnswerErr: string;
  maxAmountOfAnswersErr: string;
  testMustContainQuestionErr: string;
  oneAnswerMustBeCorrectErr: string;
  mustInsertOnePDFFileErr: string;
  unauthorizedErr: string;
  testTitleHeader: string;
  testTitlePlaceholder: string;
  questionLabel: string;
  questionPlaceholder: string;
  numberOfPointsLabel: string;
  questionTypeLabel: string;
  questionSingleOptionType: string;
  questionMultipleOptionsType: string;
  questionTextInputType: string;
  answerLabel: string;
  correctAnswerCheckBoxLabel: string;
  addAnswerLabel: string;
  addQuestionLabel: string;
  noEvalTestsFound: string;
  evaluationPointsLabel: string;
  submitTestTimeLabel: string;
  testUpdateModalTitle: string;
  updateSubmitButtonLabel: string;
  videoUpdateModalTitle: string;
  deleteTestModalTitle: string;
  deleteTestModalLabel: string;
  deleteVideoModalTitle: string;
  deleteVideoModalLabel: string;
  deleteTopicModalTitle: string;
  deleteTopicModalLabel: string;
  deleteUserModalTitle: string;
  deleteUserModalLabel: string;
  titleLabel: string;
  numberOfQuestionsLabel: string;
  maxAmountOfPointsLabel: string;
  takeTestLabel: string;
  answerPlaceholder: string;
  topicListNavbarHeader: string;
  videoListNavbarHeader: string;
  testListNavbarHeader: string;
  userListNavbarHeader: string;
  userProfileNavbarHeader: string;
  registrationNavbarHeader: string;
  loginNavbarHeader: string;
  logoutNavbarHeader: string;
  modalLayoutBodyLabel: string;
  topicFormAddPDFFileLabel: string;
  topicFormDragSelectPDFFileLabel: string;
  typeLabel: string;
  confirmLabel: string;
  cancelLabel: string;
  deleteLabel: string;
  createLabel: string;
  updateLabel: string;
  redirectToHomepageLabel: string;
  currentPasswordLabel: string;
  newPasswordLabel: string;
  confirmNewPasswordLabel: string;
  changePasswordConfirmSubmitLabel: string;
  firstNameLabel: string;
  lastNameLabel: string;
  passwordLabel: string;
  confirmPasswordLabel: string;
  consentToDataProcessingLabel: string;
  userRoleLabel: string;
  evaluatedTestListLabel: string;
  showEvaluatedTestListLabel: string;
  fullNameLabel: string;
  authorLabel: string;
  lengthLabel: string;
  descriptionLabel: string;
  urlLinkLabel: string;
  videoMustBeAtLeast1minLongErr: string;
  videoMinutesLengthLabel: string;
  descriptionPlaceholder: string;
  noTopicsFound: string;
  topicListPageHeader: string;
  userListPageHeader: string;
  createNewTopicTitle: string;
  createNewUserTitle: string;
  createNewTestTitle: string;
  createNewVideoTitle: string;
  createVideoSubmitButtonTitle: string;
  createUserSubmitButtonTitle: string;
  createTopicSubmitButtonTitle: string;
  createTestSubmitButtonTitle: string;
  noUsersFound: string;
  noVideosFound: string;
  topicNotFound: string;
  topicUpdateModalTitle: string;
  forgotPasswordLabel: string;
  yourEmailLabel: string;
  sendEmailLabel: string;
  backToLoginPageLabel: string;
  emailWasSentWithInstructionsMessage: string;
  evaluatedTestNotFound: string;
  evaluatedTestTitle: string;
  evalTestTestWasModifiedLabel: string;
  numberOfPointsEarnedLabel: string;
  oppenedTestAtLabel: string;
  completedAnswersLabel: string;
  pointsMayNotCorrespondToFinalResultLabel: string;
  yesAnswer: string;
  noAnswer: string;
  mainPageTextLabel: string;
  mainPageButtonTitle: string;
  dataSuccessfullyChanged: string;
  invalidPassword: string;
  passwordSuccessfullyChanged: string;
  userNotFoundReauth: string;
  yourProfileHeader: string;
  updateProfileModalTitle: string;
  updateProfileModalButtonTitle: string;
  changePasswordModalTitle: string;
  changePasswordModalButtonTitle: string;
  registrationSubmitButtonTitle: string;
  alreadyRegisteredQuestion: string;
  logInLabel: string;
  restorePasswordHeader: string;
  restorePasswordAgainDueErrorHeader: string;
  restorePasswordSubmitButtonTitle: string;
  passwordSuccessfullyRestoredMesage: string;
  noTestsFound: string;
  testListHeader: string;
  testNotFound: string;
  testLabel: string;
  submitLabel: string;
  testSubmissionModalTitle: string;
  testSubmissionModalBody: string;
  userNotFoundWithId: string;
  videoListHeader: string;
  createAccountLabel: string;
  dontHaveAccountQuestion: string;
  userProfileOfHeader: string;
};

const translationsMap = new Map<Language | string, Translations>([
  [
    Language.SK,
    {
      isRequiredErr: '*Povinn??',
      wrongEmailFormatErr: 'Nespr??vny form??t emailu',
      passwordLengthErr: 'Heslo mus?? ma?? aspo?? 8 znakov',
      maxCharLengthErr: 'Maxim??lny po??et znakov je 255',
      passwordMustContainNumberErr: 'Heslo mus?? obsahova?? aspo?? jednu ????slicu',
      passwordMustContainLetterErr: 'Heslo mus?? obsahova?? aspo?? jedno p??smeno',
      passwordMustMatchErr: 'Hesl?? sa musia zhodova??',
      minPointsCountErr: 'Minim??lny po??et bodov je 1',
      questionMustContainAnswerErr: 'Ot??zka mus?? obsahova?? aspo?? jednu odpove??',
      maxAmountOfAnswersErr: 'Maxim??lny po??et odpoved?? je 6',
      testMustContainQuestionErr: 'Test mus?? obsahova?? aspo?? jednu ot??zku',
      oneAnswerMustBeCorrectErr:
        'Aspo?? jedna odpove?? mus?? by?? ozna??en?? ako spr??vna',
      mustInsertOnePDFFileErr: 'Mus??te vlo??i?? 1 PDF s??bor!',
      unauthorizedErr:
        'Na zobrazenie tejto str??nky nem??te dostato??n?? opr??vnenia!',
      testTitleHeader: 'N??zov testu',
      testTitlePlaceholder: 'Z??klady technol??gie UWB...',
      questionLabel: 'Ot??zka',
      questionPlaceholder: 'Ak?? je n??zov...',
      numberOfPointsLabel: 'Po??et bodov',
      questionTypeLabel: 'Typ ot??zky',
      questionSingleOptionType: 'Jedna mo??nos??',
      questionMultipleOptionsType: 'Viacero mo??nost??',
      questionTextInputType: 'Textov?? vstup',
      answerLabel: 'Odpove??',
      correctAnswerCheckBoxLabel: 'Spr??vna odpove??',
      addAnswerLabel: 'Prida?? odpove??',
      addQuestionLabel: 'Prida?? ot??zku',
      noEvalTestsFound: 'Neboli n??jden?? ??iadne vypracovan?? testy',
      evaluationPointsLabel: 'Hodnotenie',
      submitTestTimeLabel: 'D??tum a ??as odovzdania',
      testUpdateModalTitle: '??prava existuj??ceho testu',
      updateSubmitButtonLabel: 'Potvrdi?? zmeny',
      videoUpdateModalTitle: '??prava existuj??ceho videa',
      deleteTestModalTitle: 'Potvrdenie Vymazania testu',
      deleteTestModalLabel: 'Naozaj chcete vymaza?? tento test?',
      deleteVideoModalTitle: 'Potvrdenie vymazania videa',
      deleteVideoModalLabel: 'Naozaj chcete vymaza?? toto video?',
      deleteTopicModalTitle: 'Potvrdenie vymazania topiku',
      deleteTopicModalLabel: 'Naozaj chcete vymaza?? tento topik?',
      deleteUserModalTitle: 'Potvrdenie vymazania pou????vate??a',
      deleteUserModalLabel: 'Naozaj chcete vymaza?? tohto pou????vate??a?',
      titleLabel: 'N??zov',
      numberOfQuestionsLabel: 'Po??et ot??zok',
      maxAmountOfPointsLabel: 'Maxim??lny po??et bodov',
      takeTestLabel: 'P??sa?? test',
      answerPlaceholder: 'Va??a odpove??',
      topicListNavbarHeader: 'Zoznam topikov',
      videoListNavbarHeader: 'Vzdel??vacie vide??',
      testListNavbarHeader: 'Testovanie vedomost??',
      userListNavbarHeader: 'Pou????vatelia',
      userProfileNavbarHeader: 'Pou????vate??sk?? profil',
      registrationNavbarHeader: 'Registr??cia',
      loginNavbarHeader: 'Prihl??senie',
      logoutNavbarHeader: 'Odhl??si??',
      modalLayoutBodyLabel: 'Vypl??te nasledovn?? ??daje',
      topicFormAddPDFFileLabel: 'Kliknut??m alebo pretiahnut??m vlo??te PDF s??bor',
      topicFormDragSelectPDFFileLabel:
        'Sem natiahnite PDF s??bor alebo kliknute pre spustenie v??beru s??borov',
      typeLabel: 'Typ',
      confirmLabel: 'Potvrdi??',
      cancelLabel: 'Zru??i??',
      deleteLabel: 'Vymaza??',
      updateLabel: 'Upravi??',
      createLabel: 'Vytvori??',
      redirectToHomepageLabel: 'Domovsk?? str??nka',
      currentPasswordLabel: 'S????asn?? heslo',
      newPasswordLabel: 'Nov?? heslo',
      confirmNewPasswordLabel: 'Potvrdenie nov??ho hesla',
      changePasswordConfirmSubmitLabel: 'Potvrdi?? zmenu',
      firstNameLabel: 'Meno',
      lastNameLabel: 'Priezvisko',
      passwordLabel: 'Heslo',
      confirmPasswordLabel: 'Potvrdenie hesla',
      consentToDataProcessingLabel: 'S??hlas??m so spracovan??m uveden??ch ??dajov',
      userRoleLabel: 'Rola pou????vate??a',
      evaluatedTestListLabel: 'Vypracovan?? testy',
      showEvaluatedTestListLabel: 'Zobrazi?? vypracovan?? testy',
      fullNameLabel: 'Meno a priezvisko',
      authorLabel: 'Autor',
      lengthLabel: 'D????ka',
      descriptionLabel: 'Popis',
      urlLinkLabel: 'Odkaz',
      videoMustBeAtLeast1minLongErr: 'Video mus?? ma?? aspo?? 1 min??tu',
      videoMinutesLengthLabel: 'D????ka videa (min??ty)',
      descriptionPlaceholder: 'Kr??tke video obsahuj??ce...',
      noTopicsFound: '??iadne topiky neboli n??jden??',
      noVideosFound: '??iadne vide?? neboli n??jden??',
      topicListPageHeader: 'Zoznam Topikov',
      userListPageHeader: 'Zoznam pou????vate??ov',
      createNewTopicTitle: 'Vytvori?? nov?? topik',
      createNewUserTitle: 'Vytvori?? nov??ho pou????vate??a',
      createNewTestTitle: 'Vytvori?? nov?? test',
      createUserSubmitButtonTitle: 'Vytvori?? pou????vate??a',
      createNewVideoTitle: 'Vytvori?? nov?? video',
      createVideoSubmitButtonTitle: 'Vytvori?? video',
      createTopicSubmitButtonTitle: 'Vytvori?? topik',
      createTestSubmitButtonTitle: 'Vytvori?? test',
      noUsersFound: '??iadny pou????vatelia neboli n??jden??',
      topicNotFound: 'Topik nebol n??jden??',
      topicUpdateModalTitle: '??prava existuj??ceho Topiku',
      forgotPasswordLabel: 'Zabudnut?? heslo',
      yourEmailLabel: 'V???? email',
      sendEmailLabel: 'Posla?? Email',
      backToLoginPageLabel: 'Sp???? na prihl??senie',
      emailWasSentWithInstructionsMessage:
        'Na zadan?? Email bola odoslan?? spr??va s in??trukciami pre obnovenie hesla',
      evaluatedTestNotFound: 'Vysledok testu nebol n??jden?? s ID',
      evaluatedTestTitle: 'V??sledok testu',
      evalTestTestWasModifiedLabel:
        'Test bol upraven??. N??h??ad obsahuje len z??kladn?? inform??cie.',
      numberOfPointsEarnedLabel: 'Po??et z??skan??ch bodov',
      oppenedTestAtLabel: 'D??tum a ??as otvorenia',
      completedAnswersLabel: 'Vyplnen?? odpovede',
      pointsMayNotCorrespondToFinalResultLabel:
        'Bodovanie nemus?? odpoveda?? kone??n??mu v??sledku testu!',
      yesAnswer: '??no',
      noAnswer: 'Nie',
      mainPageTextLabel: 'Komunika??n?? technol??gia bud??cnosti',
      mainPageButtonTitle: 'Dozvedie?? sa viac',
      dataSuccessfullyChanged: '??daje boli ??spe??ne zmenen??',
      invalidPassword: 'Nespr??vne heslo',
      passwordSuccessfullyChanged: 'Heslo bolo ??spe??ne zmenen??',
      userNotFoundReauth: 'Pou????vate?? nebol n??jden??, sk??ste sa prihl??si?? znova',
      yourProfileHeader: 'V???? profil',
      updateProfileModalTitle: '??prava ??dajov',
      updateProfileModalButtonTitle: 'Upravi?? ??daje',
      changePasswordModalTitle: 'Zmena hesla',
      changePasswordModalButtonTitle: 'Zmeni?? heslo',
      registrationSubmitButtonTitle: 'Zaregistrova??',
      alreadyRegisteredQuestion: 'U?? m??te ????et?',
      logInLabel: 'Prihl??ste sa',
      restorePasswordHeader: 'Obnovenie hesla',
      restorePasswordSubmitButtonTitle: 'Obnovi?? heslo',
      passwordSuccessfullyRestoredMesage:
        'Va??e heslo bolo ??spe??ne zmenen??. Je potrebn?? sa znovu prihl??si??',
      restorePasswordAgainDueErrorHeader: 'Znovu obnovi?? heslo',
      noTestsFound: '??iadne testy neboli n??jden??',
      testListHeader: 'Zoznam Testov',
      testNotFound: 'Test nebol n??jden?? s ID',
      testLabel: 'Test',
      submitLabel: 'Odosla??',
      testSubmissionModalTitle: 'Odoslanie testu',
      testSubmissionModalBody: 'Naozaj chcete odosla?? a vyhodnoti?? tento test?',
      userNotFoundWithId: 'Pou????vate?? nebol n??jden?? s ID',
      videoListHeader: 'Zoznam Vide??',
      createAccountLabel: 'Zaregistrujte sa',
      dontHaveAccountQuestion: 'E??te nem??te ????et?',
      userProfileOfHeader: "Profil pou????vate??a",
    },
  ],
  [
    Language.EN,
    {
      isRequiredErr: '*Required',
      wrongEmailFormatErr: 'Incorrect email format',
      passwordLengthErr: 'Password must contain at least 8 characters',
      maxCharLengthErr: 'Maximum length is 255 characters',
      passwordMustContainNumberErr: 'Password must contain at least 1 number',
      passwordMustContainLetterErr: 'Password must containt at least 1 letter',
      passwordMustMatchErr: 'Passwords must match',
      minPointsCountErr: 'Minimum amount of points is 1',
      questionMustContainAnswerErr: 'Question must contain at least 1 answer',
      maxAmountOfAnswersErr: 'Maximum amount of answers is 6',
      testMustContainQuestionErr: 'Test must containt at least 1 question',
      oneAnswerMustBeCorrectErr: 'At least 1 answer has to be correct',
      mustInsertOnePDFFileErr: 'You must insert 1 PDF file!',
      unauthorizedErr: 'You are not authorized to view this page!',
      testTitleHeader: 'Test title',
      testTitlePlaceholder: 'Basics of UWB...',
      questionLabel: 'Question',
      questionPlaceholder: 'What is the name of...',
      numberOfPointsLabel: 'Number of points',
      questionTypeLabel: 'Question type',
      questionSingleOptionType: 'Single choice',
      questionMultipleOptionsType: 'Multiple choices',
      questionTextInputType: 'Text input',
      answerLabel: 'Answer',
      correctAnswerCheckBoxLabel: 'Correct answer',
      addAnswerLabel: 'Add answer',
      addQuestionLabel: 'Add question',
      noEvalTestsFound: 'No evaluated tests found',
      evaluationPointsLabel: 'Points',
      submitTestTimeLabel: 'Submitted at',
      testUpdateModalTitle: 'Test update',
      updateSubmitButtonLabel: 'Apply changes',
      videoUpdateModalTitle: 'Video update',
      deleteTestModalTitle: 'Confirm test deletion',
      deleteTestModalLabel: 'Do you really want to delete this test?',
      deleteVideoModalTitle: 'Confirm video deletion',
      deleteVideoModalLabel: 'Do you really want to delete this video?',
      deleteTopicModalTitle: 'Confirm topic deletion',
      deleteTopicModalLabel: 'Do you really want to delete this topic?',
      deleteUserModalTitle: 'Confirm user deletion',
      deleteUserModalLabel: 'Are you sure you want to delete this user?',
      titleLabel: 'Title',
      numberOfQuestionsLabel: 'Number of questions',
      maxAmountOfPointsLabel: 'Maximum number of points',
      takeTestLabel: 'Take a test',
      answerPlaceholder: 'Your answer',
      topicListNavbarHeader: 'Topics',
      videoListNavbarHeader: 'Videos',
      testListNavbarHeader: 'Tests',
      userListNavbarHeader: 'Users',
      userProfileNavbarHeader: 'Your profile',
      registrationNavbarHeader: 'Registration',
      loginNavbarHeader: 'Login',
      logoutNavbarHeader: 'Logout',
      modalLayoutBodyLabel: 'Fill in the following information',
      topicFormAddPDFFileLabel: 'Select a PDF file',
      topicFormDragSelectPDFFileLabel: 'Drag and drop or select a file here',
      typeLabel: 'Type',
      confirmLabel: 'Confirm',
      cancelLabel: 'Cancel',
      deleteLabel: 'Delete',
      updateLabel: 'Update',
      createLabel: 'Create',
      redirectToHomepageLabel: 'Homepage',
      currentPasswordLabel: 'Current password',
      newPasswordLabel: 'New password',
      confirmNewPasswordLabel: 'Confirm new password',
      changePasswordConfirmSubmitLabel: 'Apply',
      firstNameLabel: 'First name',
      lastNameLabel: 'Last name',
      passwordLabel: 'Password',
      confirmPasswordLabel: 'Confirm password',
      consentToDataProcessingLabel:
        'I consent to the processing of the mentioned data',
      userRoleLabel: 'User role',
      evaluatedTestListLabel: 'Evaluated tests',
      showEvaluatedTestListLabel: 'Show evaluated tests',
      fullNameLabel: 'Full name',
      authorLabel: 'Author',
      lengthLabel: 'Length',
      descriptionLabel: 'Description',
      urlLinkLabel: 'URL Link',
      videoMustBeAtLeast1minLongErr: 'Video must be at least 1 minute long',
      videoMinutesLengthLabel: 'Length (minutes)',
      descriptionPlaceholder: 'Animated video, that shows...',
      noTopicsFound: 'No topics found',
      topicListPageHeader: 'Topic list',
      userListPageHeader: 'List of users',
      createNewTopicTitle: 'Create new topic',
      createNewUserTitle: 'Create new user',
      createNewTestTitle: 'Create new test',
      createNewVideoTitle: 'Create new video',
      createVideoSubmitButtonTitle: 'Create video',
      createUserSubmitButtonTitle: 'Create user',
      createTopicSubmitButtonTitle: 'Create topic',
      createTestSubmitButtonTitle: 'Create test',
      noUsersFound: 'No users found',
      noVideosFound: 'No videos found',
      topicNotFound: 'Topic not found',
      topicUpdateModalTitle: 'Topic update',
      forgotPasswordLabel: 'Forgot password',
      yourEmailLabel: 'Your email',
      sendEmailLabel: 'Send email',
      backToLoginPageLabel: 'Back to login page',
      emailWasSentWithInstructionsMessage:
        'Email with instructions was sent to specified email address',
      evaluatedTestNotFound: 'Evaluated test not found with ID',
      evaluatedTestTitle: 'Test result',
      evalTestTestWasModifiedLabel:
        'Test was modified. The preview contains only basic information.',
      numberOfPointsEarnedLabel: 'Points earned',
      oppenedTestAtLabel: 'Oppened at',
      completedAnswersLabel: 'Completed answers',
      pointsMayNotCorrespondToFinalResultLabel:
        'Points may not correspond to the final test result!',
      yesAnswer: 'Yes',
      noAnswer: 'No',
      mainPageTextLabel: 'Communication technology of the future',
      mainPageButtonTitle: 'Learn more',
      dataSuccessfullyChanged: 'Informations were successfully changed',
      invalidPassword: 'Invalid password',
      passwordSuccessfullyChanged: 'Password was successfully changed',
      userNotFoundReauth: 'User not found, refresh this page or log in again',
      yourProfileHeader: 'Your profile',
      updateProfileModalTitle: 'Update profile',
      updateProfileModalButtonTitle: 'Update profile',
      changePasswordModalTitle: 'Change password',
      changePasswordModalButtonTitle: 'Change password',
      registrationSubmitButtonTitle: 'Sign up',
      alreadyRegisteredQuestion: 'Already have an account?',
      logInLabel: 'Log in',
      restorePasswordHeader: 'Restore password',
      restorePasswordSubmitButtonTitle: 'Restore password',
      passwordSuccessfullyRestoredMesage:
        'Your password was successfuly restored. You have to reauthenticate.',
      restorePasswordAgainDueErrorHeader: 'Restore password again',
      noTestsFound: 'No tests found',
      testListHeader: 'Test list',
      testNotFound: 'Test not found with ID',
      testLabel: 'Test',
      submitLabel: 'Submit',
      testSubmissionModalTitle: 'Test submission',
      testSubmissionModalBody:
        'Are you sure you want to submit and evaluate this test?',
      userNotFoundWithId: 'User was not found with ID',
      videoListHeader: 'Video list',
      createAccountLabel: 'Create account',
      dontHaveAccountQuestion: "Don't have an account?",
      userProfileOfHeader: "Profile of",
    },
  ],
]);

function useLangTranslation() {
  const { language } = useContext(LanguageContext);

  return translationsMap.get(language);
}

export default useLangTranslation;
