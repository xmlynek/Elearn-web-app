"use strict";(self.webpackChunkbp_frontend_typescript=self.webpackChunkbp_frontend_typescript||[]).push([[9],{8145:function(r,e,i){var s=i(6864),a=i(847),o=i(6006),l=i(3360),n=i(1578),d=i(184);e.Z=function(r){var e,i=(0,n.Z)(),m=r.formData?{firstname:r.formData.firstname,lastname:r.formData.lastname,email:r.formData.email,password:"",role:r.formData.role}:{email:"",firstname:"",lastname:"",role:a.i4.STUDENT,password:"",confirmPassword:"",confirmProcessData:!r.registration};return e=r.registration?o.Ry({firstname:o.Z_().trim().required(null===i||void 0===i?void 0:i.isRequiredErr),lastname:o.Z_().trim().required(null===i||void 0===i?void 0:i.isRequiredErr),email:o.Z_().email(null===i||void 0===i?void 0:i.wrongEmailFormatErr).trim().required(null===i||void 0===i?void 0:i.isRequiredErr),password:o.Z_().trim().required(null===i||void 0===i?void 0:i.isRequiredErr).min(8,null===i||void 0===i?void 0:i.passwordLengthErr).max(255,null===i||void 0===i?void 0:i.maxCharLengthErr).matches(/\d/,null===i||void 0===i?void 0:i.passwordMustContainNumberErr).matches(/[a-zA-Z]/,null===i||void 0===i?void 0:i.passwordMustContainLetterErr),confirmPassword:o.Z_().trim().required(null===i||void 0===i?void 0:i.isRequiredErr).oneOf([o.iH("password")],null===i||void 0===i?void 0:i.passwordMustMatchErr),confirmProcessData:o.O7().required(null===i||void 0===i?void 0:i.isRequiredErr).oneOf([!0],null===i||void 0===i?void 0:i.isRequiredErr)}):o.Ry({firstname:o.Z_().trim().required(null===i||void 0===i?void 0:i.isRequiredErr),lastname:o.Z_().trim().required(null===i||void 0===i?void 0:i.isRequiredErr),email:o.Z_().email(null===i||void 0===i?void 0:i.wrongEmailFormatErr).trim().required(null===i||void 0===i?void 0:i.isRequiredErr),password:o.Z_().trim().required(null===i||void 0===i?void 0:i.isRequiredErr).min(8,null===i||void 0===i?void 0:i.passwordLengthErr).max(255,null===i||void 0===i?void 0:i.maxCharLengthErr).matches(/\d/,null===i||void 0===i?void 0:i.passwordMustContainNumberErr).matches(/[a-zA-Z]/,null===i||void 0===i?void 0:i.passwordMustContainLetterErr)}),r.allowRoleChange&&r.ignorePassword&&(e=o.Ry({firstname:o.Z_().trim().required(null===i||void 0===i?void 0:i.isRequiredErr),lastname:o.Z_().trim().required(null===i||void 0===i?void 0:i.isRequiredErr),email:o.Z_().email(null===i||void 0===i?void 0:i.wrongEmailFormatErr).trim().required(null===i||void 0===i?void 0:i.isRequiredErr),role:o.Z_().trim().required(null===i||void 0===i?void 0:i.isRequiredErr)})),(0,d.jsx)(d.Fragment,{children:(0,d.jsx)(s.J9,{onSubmit:function(e){r.onSubmit(e)},initialValues:m,validationSchema:e,children:function(e){var o=e.errors,n=e.touched;return(0,d.jsxs)(s.l0,{className:"form-floating mb-3",children:[(0,d.jsx)("div",{className:"mt-3 mb-4",children:(0,d.jsxs)("div",{className:"form-control",children:[(0,d.jsx)("label",{htmlFor:"firstname",children:null===i||void 0===i?void 0:i.firstNameLabel}),(0,d.jsx)(s.gN,{id:"firstname",name:"firstname",className:"form-control ".concat(o.firstname&&n.firstname?"is-invalid":"")}),(0,d.jsx)(s.Bc,{name:"firstname",children:function(r){return(0,d.jsx)("div",{className:"error-msg",children:r})}})]})}),(0,d.jsx)("div",{className:"mt-3 mb-4",children:(0,d.jsxs)("div",{className:"form-control",children:[(0,d.jsx)("label",{htmlFor:"lastname",children:null===i||void 0===i?void 0:i.lastNameLabel}),(0,d.jsx)(s.gN,{id:"lastname",name:"lastname",className:"form-control ".concat(o.lastname&&n.lastname?"is-invalid":"")}),(0,d.jsx)(s.Bc,{name:"lastname",children:function(r){return(0,d.jsx)("div",{className:"error-msg",children:r})}})]})}),(0,d.jsx)("div",{className:"mt-3 mb-4",children:(0,d.jsxs)("div",{className:"form-control",children:[(0,d.jsx)("label",{htmlFor:"email",children:"Email"}),(0,d.jsx)(s.gN,{id:"email",name:"email",className:"form-control ".concat(o.email&&n.email?"is-invalid":"")}),(0,d.jsx)(s.Bc,{name:"email",children:function(r){return(0,d.jsx)("div",{className:"error-msg",children:r})}})]})}),!r.ignorePassword&&(0,d.jsx)("div",{className:"mt-3 mb-4",children:(0,d.jsxs)("div",{className:"form-control",children:[(0,d.jsx)("label",{htmlFor:"password",children:null===i||void 0===i?void 0:i.passwordLabel}),(0,d.jsx)(s.gN,{id:"password",name:"password",type:"password",className:"form-control ".concat(o.password&&n.password?"is-invalid":"")}),(0,d.jsx)(s.Bc,{name:"password",children:function(r){return(0,d.jsx)("div",{className:"error-msg",children:r})}})]})}),r.registration&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("div",{className:"mt-3 mb-4",children:(0,d.jsxs)("div",{className:"form-control",children:[(0,d.jsx)("label",{htmlFor:"confirmPassword",children:null===i||void 0===i?void 0:i.confirmPasswordLabel}),(0,d.jsx)(s.gN,{id:"confirmPassword",name:"confirmPassword",type:"password",className:"form-control ".concat(o.password&&n.password?"is-invalid":"")}),(0,d.jsx)(s.Bc,{name:"confirmPassword",children:function(r){return(0,d.jsx)("div",{className:"error-msg",children:r})}})]})}),(0,d.jsx)("div",{className:"mt-3 mb-4",children:(0,d.jsx)("div",{className:"form-control",children:(0,d.jsxs)("div",{className:"form-check",children:[(0,d.jsx)(s.gN,{id:"confirmProcessData",name:"confirmProcessData",type:"checkbox",className:"form-check-input"}),(0,d.jsx)("label",{htmlFor:"confirmProcessData",className:"form-check-label",children:null===i||void 0===i?void 0:i.consentToDataProcessingLabel}),(0,d.jsx)(s.Bc,{name:"confirmProcessData",children:function(r){return(0,d.jsx)("div",{className:"error-msg",children:r})}})]})})})]}),r.allowRoleChange&&(0,d.jsx)("div",{className:"mt-3 mb-4",children:(0,d.jsxs)("div",{className:"form-control",children:[(0,d.jsx)("label",{htmlFor:"confirmPassword",children:null===i||void 0===i?void 0:i.userRoleLabel}),(0,d.jsxs)(s.gN,{name:"role",as:"select",className:"form-control ".concat(o.role&&n.role?"is-invalid":""),children:[(0,d.jsx)("option",{value:a.i4.STUDENT,children:a.i4.STUDENT}),(0,d.jsx)("option",{value:a.i4.TEACHER,children:a.i4.TEACHER}),(0,d.jsx)("option",{value:a.i4.ADMIN,children:a.i4.ADMIN})]}),(0,d.jsx)(s.Bc,{name:"role",children:function(r){return(0,d.jsx)("div",{className:"error-msg",children:r})}})]})}),(0,d.jsx)("div",{className:"text-center",children:(0,d.jsx)(l.Z,{type:"submit",className:"width-responsive",children:r.onSubmitText})})]})}})})}},5009:function(r,e,i){i.r(e);var s=i(2791),a=i(6871),o=i(3504),l=i(5711),n=i(8145),d=i(1578),m=i(2308),t=i(184);e.default=function(r){var e=(0,s.useContext)(m.Z),i=(0,d.Z)(),c=e.isLoggedIn,u=e.user,v=e.resetStateVariables,h=(0,a.s0)();return(0,s.useEffect)((function(){v(),c&&u&&h("/")}),[c,u,h,v]),(0,t.jsxs)("section",{className:"logreg-container",children:[(0,t.jsx)("h3",{className:"text-center",children:null===i||void 0===i?void 0:i.registrationNavbarHeader}),(0,t.jsx)(n.Z,{registration:!0,onSubmitText:null===i||void 0===i?void 0:i.registrationSubmitButtonTitle,onSubmit:function(r){e.register({firstname:r.firstname,lastname:r.lastname,confirmPassword:r.confirmPassword,password:r.password,email:r.email})}}),(0,t.jsx)("div",{className:"mt-4 text-center",children:(0,t.jsxs)("p",{children:[null===i||void 0===i?void 0:i.alreadyRegisteredQuestion,(0,t.jsx)(o.rU,{to:"/login",className:"ms-2",children:null===i||void 0===i?void 0:i.logInLabel})]})}),""!==e.error&&(0,t.jsx)("div",{className:"centered h4 error-msg",children:(0,t.jsx)("p",{children:e.error})}),e.isLoading&&""===e.error&&(0,t.jsx)("div",{className:"centered",children:(0,t.jsx)(l.Z,{})})]})}}}]);
//# sourceMappingURL=9.c44e4970.chunk.js.map