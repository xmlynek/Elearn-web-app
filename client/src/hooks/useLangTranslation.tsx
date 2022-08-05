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
      isRequiredErr: '*Povinné',
      wrongEmailFormatErr: 'Nesprávny formát emailu',
      passwordLengthErr: 'Heslo musí mať aspoň 8 znakov',
      maxCharLengthErr: 'Maximálny počet znakov je 255',
      passwordMustContainNumberErr: 'Heslo musí obsahovať aspoň jednu číslicu',
      passwordMustContainLetterErr: 'Heslo musí obsahovať aspoň jedno písmeno',
      passwordMustMatchErr: 'Heslá sa musia zhodovať',
      minPointsCountErr: 'Minimálny počet bodov je 1',
      questionMustContainAnswerErr: 'Otázka musí obsahovať aspoň jednu odpoveď',
      maxAmountOfAnswersErr: 'Maximálny počet odpovedí je 6',
      testMustContainQuestionErr: 'Test musí obsahovať aspoň jednu otázku',
      oneAnswerMustBeCorrectErr:
        'Aspoň jedna odpoveď musí byť označená ako správna',
      mustInsertOnePDFFileErr: 'Musíte vložiť 1 PDF súbor!',
      unauthorizedErr:
        'Na zobrazenie tejto stránky nemáte dostatočné oprávnenia!',
      testTitleHeader: 'Názov testu',
      testTitlePlaceholder: 'Základy technológie UWB...',
      questionLabel: 'Otázka',
      questionPlaceholder: 'Aký je názov...',
      numberOfPointsLabel: 'Počet bodov',
      questionTypeLabel: 'Typ otázky',
      questionSingleOptionType: 'Jedna možnosť',
      questionMultipleOptionsType: 'Viacero možností',
      questionTextInputType: 'Textový vstup',
      answerLabel: 'Odpoveď',
      correctAnswerCheckBoxLabel: 'Správna odpoveď',
      addAnswerLabel: 'Pridať odpoveď',
      addQuestionLabel: 'Pridať otázku',
      noEvalTestsFound: 'Neboli nájdené žiadne vypracované testy',
      evaluationPointsLabel: 'Hodnotenie',
      submitTestTimeLabel: 'Dátum a čas odovzdania',
      testUpdateModalTitle: 'Úprava existujúceho testu',
      updateSubmitButtonLabel: 'Potvrdiť zmeny',
      videoUpdateModalTitle: 'Úprava existujúceho videa',
      deleteTestModalTitle: 'Potvrdenie Vymazania testu',
      deleteTestModalLabel: 'Naozaj chcete vymazať tento test?',
      deleteVideoModalTitle: 'Potvrdenie vymazania videa',
      deleteVideoModalLabel: 'Naozaj chcete vymazať toto video?',
      deleteTopicModalTitle: 'Potvrdenie vymazania topiku',
      deleteTopicModalLabel: 'Naozaj chcete vymazať tento topik?',
      deleteUserModalTitle: 'Potvrdenie vymazania používateľa',
      deleteUserModalLabel: 'Naozaj chcete vymazať tohto používateľa?',
      titleLabel: 'Názov',
      numberOfQuestionsLabel: 'Počet otázok',
      maxAmountOfPointsLabel: 'Maximálny počet bodov',
      takeTestLabel: 'Písať test',
      answerPlaceholder: 'Vaša odpoveď',
      topicListNavbarHeader: 'Zoznam topikov',
      videoListNavbarHeader: 'Vzdelávacie videá',
      testListNavbarHeader: 'Testovanie vedomostí',
      userListNavbarHeader: 'Používatelia',
      userProfileNavbarHeader: 'Používateľský profil',
      registrationNavbarHeader: 'Registrácia',
      loginNavbarHeader: 'Prihlásenie',
      logoutNavbarHeader: 'Odhlásiť',
      modalLayoutBodyLabel: 'Vyplňte nasledovné údaje',
      topicFormAddPDFFileLabel: 'Kliknutím alebo pretiahnutím vložte PDF súbor',
      topicFormDragSelectPDFFileLabel:
        'Sem natiahnite PDF súbor alebo kliknute pre spustenie výberu súborov',
      typeLabel: 'Typ',
      confirmLabel: 'Potvrdiť',
      cancelLabel: 'Zrušiť',
      deleteLabel: 'Vymazať',
      updateLabel: 'Upraviť',
      createLabel: 'Vytvoriť',
      redirectToHomepageLabel: 'Domovská stránka',
      currentPasswordLabel: 'Súčasné heslo',
      newPasswordLabel: 'Nové heslo',
      confirmNewPasswordLabel: 'Potvrdenie nového hesla',
      changePasswordConfirmSubmitLabel: 'Potvrdiť zmenu',
      firstNameLabel: 'Meno',
      lastNameLabel: 'Priezvisko',
      passwordLabel: 'Heslo',
      confirmPasswordLabel: 'Potvrdenie hesla',
      consentToDataProcessingLabel: 'Súhlasím so spracovaním uvedených údajov',
      userRoleLabel: 'Rola používateľa',
      evaluatedTestListLabel: 'Vypracované testy',
      showEvaluatedTestListLabel: 'Zobraziť vypracované testy',
      fullNameLabel: 'Meno a priezvisko',
      authorLabel: 'Autor',
      lengthLabel: 'Dĺžka',
      descriptionLabel: 'Popis',
      urlLinkLabel: 'Odkaz',
      videoMustBeAtLeast1minLongErr: 'Video musí mať aspoň 1 minútu',
      videoMinutesLengthLabel: 'Dĺžka videa (minúty)',
      descriptionPlaceholder: 'Krátke video obsahujúce...',
      noTopicsFound: 'Žiadne topiky neboli nájdené',
      noVideosFound: 'Žiadne videá neboli nájdené',
      topicListPageHeader: 'Zoznam Topikov',
      userListPageHeader: 'Zoznam používateľov',
      createNewTopicTitle: 'Vytvoriť nový topik',
      createNewUserTitle: 'Vytvoriť nového používateľa',
      createNewTestTitle: 'Vytvoriť nový test',
      createUserSubmitButtonTitle: 'Vytvoriť používateľa',
      createNewVideoTitle: 'Vytvoriť nové video',
      createVideoSubmitButtonTitle: 'Vytvoriť video',
      createTopicSubmitButtonTitle: 'Vytvoriť topik',
      createTestSubmitButtonTitle: 'Vytvoriť test',
      noUsersFound: 'Žiadny používatelia neboli nájdení',
      topicNotFound: 'Topik nebol nájdený',
      topicUpdateModalTitle: 'Úprava existujúceho Topiku',
      forgotPasswordLabel: 'Zabudnuté heslo',
      yourEmailLabel: 'Váš email',
      sendEmailLabel: 'Poslať Email',
      backToLoginPageLabel: 'Späť na prihlásenie',
      emailWasSentWithInstructionsMessage:
        'Na zadaný Email bola odoslaná správa s inštrukciami pre obnovenie hesla',
      evaluatedTestNotFound: 'Vysledok testu nebol nájdený s ID',
      evaluatedTestTitle: 'Výsledok testu',
      evalTestTestWasModifiedLabel:
        'Test bol upravený. Náhľad obsahuje len základné informácie.',
      numberOfPointsEarnedLabel: 'Počet získaných bodov',
      oppenedTestAtLabel: 'Dátum a čas otvorenia',
      completedAnswersLabel: 'Vyplnené odpovede',
      pointsMayNotCorrespondToFinalResultLabel:
        'Bodovanie nemusí odpovedať konečnému výsledku testu!',
      yesAnswer: 'Áno',
      noAnswer: 'Nie',
      mainPageTextLabel: 'Komunikačná technológia budúcnosti',
      mainPageButtonTitle: 'Dozvedieť sa viac',
      dataSuccessfullyChanged: 'Údaje boli úspešne zmenené',
      invalidPassword: 'Nesprávne heslo',
      passwordSuccessfullyChanged: 'Heslo bolo úspešne zmenené',
      userNotFoundReauth: 'Používateľ nebol nájdený, skúste sa prihlásiť znova',
      yourProfileHeader: 'Váš profil',
      updateProfileModalTitle: 'Úprava údajov',
      updateProfileModalButtonTitle: 'Upraviť údaje',
      changePasswordModalTitle: 'Zmena hesla',
      changePasswordModalButtonTitle: 'Zmeniť heslo',
      registrationSubmitButtonTitle: 'Zaregistrovať',
      alreadyRegisteredQuestion: 'Už máte účet?',
      logInLabel: 'Prihláste sa',
      restorePasswordHeader: 'Obnovenie hesla',
      restorePasswordSubmitButtonTitle: 'Obnoviť heslo',
      passwordSuccessfullyRestoredMesage:
        'Vaše heslo bolo úspešne zmenené. Je potrebné sa znovu prihlásiť',
      restorePasswordAgainDueErrorHeader: 'Znovu obnoviť heslo',
      noTestsFound: 'Žiadne testy neboli nájdené',
      testListHeader: 'Zoznam Testov',
      testNotFound: 'Test nebol nájdený s ID',
      testLabel: 'Test',
      submitLabel: 'Odoslať',
      testSubmissionModalTitle: 'Odoslanie testu',
      testSubmissionModalBody: 'Naozaj chcete odoslať a vyhodnotiť tento test?',
      userNotFoundWithId: 'Používateľ nebol nájdený s ID',
      videoListHeader: 'Zoznam Videí',
      createAccountLabel: 'Zaregistrujte sa',
      dontHaveAccountQuestion: 'Ešte nemáte účet?',
      userProfileOfHeader: "Profil používateľa",
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
