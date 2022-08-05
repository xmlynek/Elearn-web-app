"use strict";(self.webpackChunkbp_frontend_typescript=self.webpackChunkbp_frontend_typescript||[]).push([[9],{8145:function(e,s,r){var a=r(6864),i=r(847),n=r(6006),o=r(3360),m=r(184);s.Z=function(e){var s,r=e.formData?{firstname:e.formData.firstname,lastname:e.formData.lastname,email:e.formData.email,password:"",role:e.formData.role}:{email:"",firstname:"",lastname:"",role:i.i4.USER,password:"",confirmPassword:"",confirmProcessData:!e.registration};return s=e.registration?n.Ry({firstname:n.Z_().trim().required("*Povinn\xe9"),lastname:n.Z_().trim().required("*Povinn\xe9"),email:n.Z_().email("Nespr\xe1vny form\xe1t emailu").trim().required("*Povinn\xe9"),password:n.Z_().trim().required("*Povinn\xe9").min(8,"Heslo mus\xed ma\u0165 aspo\u0148 8 znakov").max(255,"Maxim\xe1lny po\u010det znakov je 255").matches(/\d/,"Heslo mus\xed obsahova\u0165 aspo\u0148 jednu \u010d\xedslicu").matches(/[a-zA-Z]/,"Heslo mus\xed obsahova\u0165 aspo\u0148 jedno p\xedsmeno"),confirmPassword:n.Z_().trim().required("*Povinn\xe9").oneOf([n.iH("password")],"Hesl\xe1 sa musia zhodova\u0165"),confirmProcessData:n.O7().required("*Povinn\xe9").oneOf([!0],"*Povinn\xe9")}):n.Ry({firstname:n.Z_().trim().required("*Povinn\xe9"),lastname:n.Z_().trim().required("*Povinn\xe9"),email:n.Z_().email("Nespr\xe1vny form\xe1t emailu").trim().required("*Povinn\xe9"),password:n.Z_().trim().required("*Povinn\xe9").min(8,"Heslo mus\xed ma\u0165 aspo\u0148 8 znakov").max(255,"Maxim\xe1lny po\u010det znakov je 255").matches(/\d/,"Heslo mus\xed obsahova\u0165 aspo\u0148 jednu \u010d\xedslicu").matches(/[a-zA-Z]/,"Heslo mus\xed obsahova\u0165 aspo\u0148 jedno p\xedsmeno")}),e.allowRoleChange&&e.ignorePassword&&(s=n.Ry({firstname:n.Z_().trim().required("*Povinn\xe9"),lastname:n.Z_().trim().required("*Povinn\xe9"),email:n.Z_().email("Nespr\xe1vny form\xe1t emailu").trim().required("*Povinn\xe9"),role:n.Z_().trim().required("*Povinn\xe9")})),(0,m.jsx)(m.Fragment,{children:(0,m.jsx)(a.J9,{onSubmit:function(s){e.onSubmit(s)},initialValues:r,validationSchema:s,children:function(s){var r=s.errors,n=s.touched;return(0,m.jsxs)(a.l0,{className:"form-floating mb-3",children:[(0,m.jsx)("div",{className:"mt-3 mb-4",children:(0,m.jsxs)("div",{className:"form-control",children:[(0,m.jsx)("label",{htmlFor:"firstname",children:"Meno"}),(0,m.jsx)(a.gN,{id:"firstname",name:"firstname",className:"form-control ".concat(r.firstname&&n.firstname?"is-invalid":"")}),(0,m.jsx)(a.Bc,{name:"firstname",children:function(e){return(0,m.jsx)("div",{className:"error-msg",children:e})}})]})}),(0,m.jsx)("div",{className:"mt-3 mb-4",children:(0,m.jsxs)("div",{className:"form-control",children:[(0,m.jsx)("label",{htmlFor:"lastname",children:"Priezvisko"}),(0,m.jsx)(a.gN,{id:"lastname",name:"lastname",className:"form-control ".concat(r.lastname&&n.lastname?"is-invalid":"")}),(0,m.jsx)(a.Bc,{name:"lastname",children:function(e){return(0,m.jsx)("div",{className:"error-msg",children:e})}})]})}),(0,m.jsx)("div",{className:"mt-3 mb-4",children:(0,m.jsxs)("div",{className:"form-control",children:[(0,m.jsx)("label",{htmlFor:"email",children:"Email"}),(0,m.jsx)(a.gN,{id:"email",name:"email",className:"form-control ".concat(r.email&&n.email?"is-invalid":"")}),(0,m.jsx)(a.Bc,{name:"email",children:function(e){return(0,m.jsx)("div",{className:"error-msg",children:e})}})]})}),!e.ignorePassword&&(0,m.jsx)("div",{className:"mt-3 mb-4",children:(0,m.jsxs)("div",{className:"form-control",children:[(0,m.jsx)("label",{htmlFor:"password",children:"Heslo"}),(0,m.jsx)(a.gN,{id:"password",name:"password",type:"password",className:"form-control ".concat(r.password&&n.password?"is-invalid":"")}),(0,m.jsx)(a.Bc,{name:"password",children:function(e){return(0,m.jsx)("div",{className:"error-msg",children:e})}})]})}),e.registration&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)("div",{className:"mt-3 mb-4",children:(0,m.jsxs)("div",{className:"form-control",children:[(0,m.jsx)("label",{htmlFor:"confirmPassword",children:"Potvrdenie hesla"}),(0,m.jsx)(a.gN,{id:"confirmPassword",name:"confirmPassword",type:"password",className:"form-control ".concat(r.password&&n.password?"is-invalid":"")}),(0,m.jsx)(a.Bc,{name:"confirmPassword",children:function(e){return(0,m.jsx)("div",{className:"error-msg",children:e})}})]})}),(0,m.jsx)("div",{className:"mt-3 mb-4",children:(0,m.jsx)("div",{className:"form-control",children:(0,m.jsxs)("div",{className:"form-check",children:[(0,m.jsx)(a.gN,{id:"confirmProcessData",name:"confirmProcessData",type:"checkbox",className:"form-check-input"}),(0,m.jsx)("label",{htmlFor:"confirmProcessData",className:"form-check-label",children:"S\xfahlas\xedm so spracovan\xedm uveden\xfdch \xfadajov"}),(0,m.jsx)(a.Bc,{name:"confirmProcessData",children:function(e){return(0,m.jsx)("div",{className:"error-msg",children:e})}})]})})})]}),e.allowRoleChange&&(0,m.jsx)("div",{className:"mt-3 mb-4",children:(0,m.jsxs)("div",{className:"form-control",children:[(0,m.jsx)("label",{htmlFor:"confirmPassword",children:"Rola Pou\u017e\xedvate\u013ea"}),(0,m.jsxs)(a.gN,{name:"role",as:"select",className:"form-control ".concat(r.role&&n.role?"is-invalid":""),children:[(0,m.jsx)("option",{value:i.i4.USER,children:i.i4.USER}),(0,m.jsx)("option",{value:i.i4.TEACHER,children:i.i4.TEACHER}),(0,m.jsx)("option",{value:i.i4.ADMIN,children:i.i4.ADMIN})]}),(0,m.jsx)(a.Bc,{name:"role",children:function(e){return(0,m.jsx)("div",{className:"error-msg",children:e})}})]})}),(0,m.jsx)("div",{className:"text-center",children:(0,m.jsx)(o.Z,{type:"submit",className:"width-responsive",children:e.onSubmitText})})]})}})})}},5009:function(e,s,r){r.r(s);var a=r(2791),i=r(6871),n=r(3504),o=r(5711),m=r(8145),l=r(335),c=r(184);s.default=function(e){var s=(0,a.useContext)(l.Z),r=s.isLoggedIn,t=s.user,d=s.resetStateVariables,h=(0,i.s0)();return(0,a.useEffect)((function(){d(),r&&t&&h("/")}),[r,t,h,d]),(0,c.jsxs)("section",{className:"logreg-container",children:[(0,c.jsx)("h3",{className:"text-center",children:"Registr\xe1cia"}),(0,c.jsx)(m.Z,{registration:!0,onSubmitText:"Zaregistrova\u0165",onSubmit:function(e){s.register({firstname:e.firstname,lastname:e.lastname,confirmPassword:e.confirmPassword,password:e.password,email:e.email})}}),(0,c.jsx)("div",{className:"mt-4 text-center",children:(0,c.jsxs)("p",{children:["U\u017e m\xe1te \xfa\u010det?",(0,c.jsx)(n.rU,{to:"/login",className:"ms-2",children:"Prihl\xe1ste sa"})]})}),""!==s.error&&(0,c.jsx)("div",{className:"centered h4 error-msg",children:(0,c.jsx)("p",{children:s.error})}),s.isLoading&&""===s.error&&(0,c.jsx)("div",{className:"centered",children:(0,c.jsx)(o.Z,{})})]})}}}]);
//# sourceMappingURL=9.54dd030d.chunk.js.map