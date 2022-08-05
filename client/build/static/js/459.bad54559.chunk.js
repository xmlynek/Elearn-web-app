"use strict";(self.webpackChunkbp_frontend_typescript=self.webpackChunkbp_frontend_typescript||[]).push([[459],{459:function(s,e,r){r.r(e);var n=r(2791),o=r(6871),a=r(3504),i=r(335),c=r(6006),l=r(6864),t=r(3360),d=r(5711),m=r(184);e.default=function(s){var e=(0,n.useContext)(i.Z),r=e.isLoggedIn,h=e.resetPassword,w=e.resetStateVariables,u=e.isLoading,x=e.error,v=e.success,j=(0,o.s0)(),f=(0,o.UO)(),N=f.token?f.token:"";return(0,n.useEffect)((function(){w(),!r&&N||j("/",{replace:!0})}),[r,j,w,N]),(0,m.jsxs)("section",{className:"logreg-container text-start",children:[(0,m.jsx)("h3",{className:"text-center",children:"Obnovenie hesla"}),(0,m.jsx)(l.J9,{validationSchema:c.Ry({newPassword:c.Z_().trim().required("*Povinn\xe9").min(8,"Heslo mus\xed ma\u0165 aspo\u0148 8 znakov").max(255,"Maxim\xe1lny po\u010det znakov je 255").matches(/\d/,"Heslo mus\xed obsahova\u0165 aspo\u0148 jednu \u010d\xedslicu").matches(/[a-zA-Z]/,"Heslo mus\xed obsahova\u0165 aspo\u0148 jedno p\xedsmeno"),confirmNewPassword:c.Z_().trim().required("*Povinn\xe9").oneOf([c.iH("newPassword")],"Hesl\xe1 sa musia zhodova\u0165")}),initialValues:{newPassword:"",confirmNewPassword:""},onSubmit:function(s,e){var r=e.resetForm;h(s,N),r()},children:function(s){var e=s.errors,r=s.touched;return(0,m.jsxs)(l.l0,{className:"form-floating mb-3",children:[(0,m.jsx)("div",{className:"mt-3 mb-4",children:(0,m.jsxs)("div",{className:"form-control",children:[(0,m.jsx)("label",{htmlFor:"newPassword",children:"Nov\xe9 heslo"}),(0,m.jsx)(l.gN,{name:"newPassword",type:"password",className:"form-control ".concat(e.newPassword&&r.newPassword?"is-invalid":"")}),(0,m.jsx)(l.Bc,{name:"newPassword",children:function(s){return(0,m.jsx)("div",{className:"error-msg",children:s})}})]})}),(0,m.jsx)("div",{className:"mt-3 mb-4",children:(0,m.jsxs)("div",{className:"form-control",children:[(0,m.jsx)("label",{htmlFor:"confirmNewPassword",children:"Potvr\u010fte nov\xe9 heslo"}),(0,m.jsx)(l.gN,{name:"confirmNewPassword",type:"password",className:"form-control ".concat(e.confirmNewPassword&&r.confirmNewPassword?"is-invalid":"")}),(0,m.jsx)(l.Bc,{name:"confirmNewPassword",children:function(s){return(0,m.jsx)("div",{className:"error-msg",children:s})}})]})}),(0,m.jsx)("div",{className:"text-center",children:(0,m.jsx)(t.Z,{type:"submit",className:"width-50-991-100 ",children:"Obnovi\u0165 heslo"})})]})}}),u&&(0,m.jsx)("div",{className:"centered",children:(0,m.jsx)(d.Z,{})}),!u&&""!==x&&(0,m.jsx)("div",{className:"centered h4 error-msg",children:(0,m.jsxs)("p",{children:[x,(0,m.jsx)("br",{}),(0,m.jsx)(a.rU,{to:"/forgot-password",className:"ms-2 mt-2",children:"Znovu obnovi\u0165 heslo"})]})}),!u&&""===x&&v&&(0,m.jsx)("div",{className:"centered h4",children:(0,m.jsxs)("p",{children:["Va\u0161e heslo bolo \xfaspe\u0161ne zmenen\xe9. Je potrebn\xe9 sa znovu prihl\xe1si\u0165.",(0,m.jsx)(a.rU,{to:"/login",className:"ms-2",children:"Prihl\xe1si\u0165 sa"})]})})]})}}}]);
//# sourceMappingURL=459.bad54559.chunk.js.map