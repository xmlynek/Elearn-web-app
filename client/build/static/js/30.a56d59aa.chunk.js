"use strict";(self.webpackChunkbp_frontend_typescript=self.webpackChunkbp_frontend_typescript||[]).push([[30],{4030:function(e,s,r){r.r(s);var a=r(6864),i=r(2791),n=r(3360),l=r(6871),t=r(3504),c=r(6006),o=r(5711),d=r(335),m=r(184);s.default=function(){var e,s=(0,i.useContext)(d.Z),r=s.isLoggedIn,h=s.user,x=s.error,u=s.isLoading,j=s.login,p=s.resetStateVariables,v=(0,l.s0)(),f=(0,l.TH)().state,N=null===f||void 0===f||null===(e=f.from)||void 0===e?void 0:e.pathname;return(0,i.useEffect)((function(){p(),r&&h&&v(N||"/",{replace:!0})}),[r,h,v,N,p]),(0,m.jsxs)("section",{className:"logreg-container text-start",children:[(0,m.jsx)("h3",{className:"text-center",children:"Prihl\xe1senie"}),(0,m.jsx)(a.J9,{validationSchema:c.Ry({email:c.Z_().email("Nespr\xe1vny form\xe1t emailu").trim().required("*Povinn\xe9"),password:c.Z_().required("*Povinn\xe9")}),initialValues:{email:"",password:""},onSubmit:function(e,s){var r=e.email,a=e.password,i=s.resetForm;j(r,a,N),i()},children:function(e){var s=e.errors,r=e.touched;return(0,m.jsxs)(a.l0,{className:"form-floating mb-3",children:[(0,m.jsx)("div",{className:"mt-3 mb-4",children:(0,m.jsxs)("div",{className:"form-control",children:[(0,m.jsx)("label",{htmlFor:"email",children:"Email"}),(0,m.jsx)(a.gN,{name:"email",className:"form-control ".concat(s.email&&r.email?"is-invalid":"")}),(0,m.jsx)(a.Bc,{name:"email",children:function(e){return(0,m.jsx)("div",{className:"error-msg",children:e})}})]})}),(0,m.jsx)("div",{className:"mt-3 mb-4",children:(0,m.jsxs)("div",{className:"form-control",children:[(0,m.jsx)("label",{htmlFor:"password",children:"Heslo"}),(0,m.jsx)(a.gN,{name:"password",type:"password",className:"form-control ".concat(s.password&&r.password?"is-invalid":"")}),(0,m.jsx)(a.Bc,{name:"password",children:function(e){return(0,m.jsx)("div",{className:"error-msg",children:e})}})]})}),(0,m.jsx)("div",{className:"text-center",children:(0,m.jsx)(n.Z,{type:"submit",className:"width-50-991-100 ",children:"Prihl\xe1si\u0165"})}),(0,m.jsxs)("div",{className:"mt-4 text-center",children:[(0,m.jsxs)("p",{children:["Zabudli ste heslo?",(0,m.jsx)(t.rU,{to:"/forgot-password",className:"ms-2",children:"Obnovte si ho"})]}),(0,m.jsxs)("p",{children:["E\u0161te nem\xe1te \xfa\u010det?",(0,m.jsx)(t.rU,{to:"/register",className:"ms-2",children:"Zaregistrujte sa"})]})]})]})}}),""!==x&&(0,m.jsx)("div",{className:"centered h4 error-msg",children:(0,m.jsx)("p",{children:x})}),u&&""===x&&(0,m.jsx)("div",{className:"centered",children:(0,m.jsx)(o.Z,{})})]})}}}]);
//# sourceMappingURL=30.a56d59aa.chunk.js.map