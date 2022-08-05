"use strict";(self.webpackChunkbp_frontend_typescript=self.webpackChunkbp_frontend_typescript||[]).push([[931],{7222:function(e,s,n){var t=n(7022),a=n(184);s.Z=function(e){return(0,a.jsx)(t.Z,{className:"container-content my-sm-4 my-xl-5 pb-3 pb-sm-4 pb-lg-5",children:e.children})}},9737:function(e,s,n){n.r(s);var t=n(5861),a=n(885),i=n(7757),r=n.n(i),o=n(2791),c=n(9743),l=n(2677),d=n(3855),u=n(6871),v=n(7222),x=n(5711),m=n(1578),h=n(2247),p=n(2451),f=n(184);s.default=function(e){var s=(0,o.useState)(),n=(0,a.Z)(s,2),i=n[0],j=n[1],b=(0,u.UO)(),N=(0,m.Z)(),g=(0,h.Z)("/users/".concat(null===b||void 0===b?void 0:b.userId,"/tests/").concat(null===b||void 0===b?void 0:b.evalTestId)),Z=(0,o.useState)({isLoading:!0}),w=(0,a.Z)(Z,2),y=w[0],C=w[1];(0,o.useEffect)((function(){var e=function(){var e=(0,t.Z)(r().mark((function e(){var s,n;return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return C({isLoading:!0}),e.prev=1,e.next=4,g.get("");case 4:s=e.sent,n=s.data,j(n),C({status:"success",isLoading:!1}),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(1),C({status:"err",isLoading:!1,msg:e.t0.response.data.message?e.t0.response.data.message:e.t0.message});case 13:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(){return e.apply(this,arguments)}}();e()}),[]);var L=function(e,s){var n=null===i||void 0===i?void 0:i.answers.filter((function(n){return n.questionId===e&&n.full_answer===s}));return n&&n.length>0},T=function(e){var s=null===i||void 0===i?void 0:i.answers.filter((function(s){return s.questionId===e}));return s&&s.length>0?s[0].full_answer:""},P=function(e){var s=null===i||void 0===i?void 0:i.answers.filter((function(s){return s.questionId===e}));if(s&&s.length>0){var n=0;return s.forEach((function(e){return n+=+e.points})),n}return 0},E=function(e,s){return{isCorrect:e.options.some((function(s){return s.title===T(e.id)})),correctAnswers:e.options.map((function(e){return e.title}))}};return y.isLoading?(0,f.jsx)("div",{className:"centered",children:(0,f.jsx)(x.Z,{})}):"err"!==y.status||y.isLoading?i?(0,f.jsxs)(v.Z,{children:[(0,f.jsx)(c.Z,{children:(0,f.jsx)(l.Z,{children:(0,f.jsx)("header",{className:"text-center",children:(0,f.jsxs)("h1",{className:"display-2 txt-main mb-3 mb-lg-4",children:[null===N||void 0===N?void 0:N.evaluatedTestTitle,(0,f.jsx)("br",{})," ",i.test.title]})})})}),(0,f.jsxs)(c.Z,{className:"px-1 px-md-3 px-lg-4 px-xl-5",children:[i.testUpdated&&(0,f.jsx)("div",{className:"centered error-msg",children:(0,f.jsx)("p",{className:"h1",children:null===N||void 0===N?void 0:N.evalTestTestWasModifiedLabel})}),(0,f.jsx)("div",{className:"centered",children:(0,f.jsxs)("h2",{className:"line-height-md",children:[null===N||void 0===N?void 0:N.numberOfPointsEarnedLabel,": ",null===i||void 0===i?void 0:i.resultPoints,"/",null===i||void 0===i?void 0:i.maxPoints," (",((null===i||void 0===i?void 0:i.resultPoints)/(null===i||void 0===i?void 0:i.maxPoints)*100).toFixed(2),"%)",(0,f.jsx)("br",{}),null===N||void 0===N?void 0:N.oppenedTestAtLabel,":"," ",new Date(i.started_at).toLocaleString(),(0,f.jsx)("br",{}),null===N||void 0===N?void 0:N.submitTestTimeLabel,":"," ",new Date(i.finished_at).toLocaleString()]})}),i.testUpdated&&(0,f.jsxs)("section",{className:"text-center",children:[(0,f.jsx)("h2",{children:null===N||void 0===N?void 0:N.completedAnswersLabel}),(0,f.jsx)("p",{className:"h2 error-msg",children:null===N||void 0===N?void 0:N.pointsMayNotCorrespondToFinalResultLabel}),(0,f.jsxs)("table",{className:"mt-4 table",children:[(0,f.jsx)("thead",{children:(0,f.jsxs)("tr",{children:[(0,f.jsx)("th",{children:null===N||void 0===N?void 0:N.answerLabel}),(0,f.jsx)("th",{children:null===N||void 0===N?void 0:N.correctAnswerCheckBoxLabel}),(0,f.jsx)("th",{children:null===N||void 0===N?void 0:N.numberOfPointsEarnedLabel})]})}),(0,f.jsx)("tbody",{children:i.answers.map((function(e){return(0,f.jsxs)("tr",{children:[(0,f.jsx)("td",{children:e.full_answer}),(0,f.jsx)("td",{children:e.isCorrect?null===N||void 0===N?void 0:N.yesAnswer:null===N||void 0===N?void 0:N.noAnswer}),(0,f.jsx)("td",{children:e.points})]},e.id)}))})]})]}),!i.testUpdated&&i.test.questions.map((function(e,s){return(0,f.jsxs)("div",{children:[(0,f.jsxs)("h2",{className:"h4",children:[s+1,". ",e.title," (",Math.max(+P(e.id).toFixed(2),0),"/",e.points,"b)"]}),(0,f.jsx)(d.Z.Group,{className:"mt-4 mb-3",children:e.type===p.TC.INPUT?(0,f.jsxs)("div",{children:[(0,f.jsx)(d.Z.Control,{value:T(e.id),readOnly:!0,className:"".concat(E(e,T(e.id)).isCorrect?"is-valid":"is-invalid")}),!E(e,T(e.id)).isCorrect&&(0,f.jsxs)("p",{children:["Spr\xe1vna odpove\u010f:"," ",E(e,T(e.id)).correctAnswers.map((function(s,n){return(0,f.jsxs)("span",{children:[s,","," "]},"".concat(e.id).concat(s).concat(n))}))]})]},e.id+s+".text"):e.options.map((function(s,n){return(0,f.jsxs)("div",{children:[(0,f.jsx)("span",{className:"ms-2 ms-sm-3",children:String.fromCharCode("A".charCodeAt(0)+n)}),(0,f.jsx)(d.Z.Check,{readOnly:!0,type:e.type===p.TC.MULTIPLE_CHOICES?"checkbox":"radio",checked:L(e.id,s.title),name:""+e.id,className:"d-inline-block ms-1 ms-sm-3"}),(0,f.jsx)(d.Z.Label,{className:"ms-2 ms-sm-3 ".concat(s.isCorrect?"text-success":!s.isCorrect&&L(e.id,s.title)?"text-danger":""),children:s.title})]},s.id)}))})]},e.id)}))]})]}):(0,f.jsx)("p",{className:"centerVertical h1 bg-info py-2 px-3",children:"".concat(null===N||void 0===N?void 0:N.evaluatedTestNotFound," ").concat(b.evalTestId)}):(0,f.jsx)("p",{className:"centerVertical h1 bg-info py-2 px-3 text-center",children:y.msg==="Evaluated test with id ".concat(b.evalTestId," not found")?"".concat(null===N||void 0===N?void 0:N.evaluatedTestNotFound," ").concat(b.evalTestId):"You dont have permission to perform this action!"===y.msg?null===N||void 0===N?void 0:N.unauthorizedErr:y.msg})}},2677:function(e,s,n){var t=n(885),a=n(1413),i=n(5987),r=n(1694),o=n.n(r),c=n(2791),l=n(162),d=n(184),u=["as","bsPrefix","className"],v=["className"],x=["xxl","xl","lg","md","sm","xs"];var m=c.forwardRef((function(e,s){var n=function(e){var s=e.as,n=e.bsPrefix,t=e.className,r=(0,i.Z)(e,u);n=(0,l.vE)(n,"col");var c=[],d=[];return x.forEach((function(e){var s,t,a,i=r[e];delete r[e],"object"===typeof i&&null!=i?(s=i.span,t=i.offset,a=i.order):s=i;var o="xs"!==e?"-".concat(e):"";s&&c.push(!0===s?"".concat(n).concat(o):"".concat(n).concat(o,"-").concat(s)),null!=a&&d.push("order".concat(o,"-").concat(a)),null!=t&&d.push("offset".concat(o,"-").concat(t))})),[(0,a.Z)((0,a.Z)({},r),{},{className:o().apply(void 0,[t].concat(c,d))}),{as:s,bsPrefix:n,spans:c}]}(e),r=(0,t.Z)(n,2),c=r[0],m=c.className,h=(0,i.Z)(c,v),p=r[1],f=p.as,j=void 0===f?"div":f,b=p.bsPrefix,N=p.spans;return(0,d.jsx)(j,(0,a.Z)((0,a.Z)({},h),{},{ref:s,className:o()(m,!N.length&&b)}))}));m.displayName="Col",s.Z=m},9743:function(e,s,n){var t=n(1413),a=n(5987),i=n(1694),r=n.n(i),o=n(2791),c=n(162),l=n(184),d=["bsPrefix","className","as"],u=["xxl","xl","lg","md","sm","xs"],v=o.forwardRef((function(e,s){var n=e.bsPrefix,i=e.className,o=e.as,v=void 0===o?"div":o,x=(0,a.Z)(e,d),m=(0,c.vE)(n,"row"),h="".concat(m,"-cols"),p=[];return u.forEach((function(e){var s,n=x[e];delete x[e],s=null!=n&&"object"===typeof n?n.cols:n;var t="xs"!==e?"-".concat(e):"";null!=s&&p.push("".concat(h).concat(t,"-").concat(s))})),(0,l.jsx)(v,(0,t.Z)((0,t.Z)({ref:s},x),{},{className:r().apply(void 0,[i,m].concat(p))}))}));v.displayName="Row",s.Z=v},2391:function(e){var s=function(){};e.exports=s}}]);
//# sourceMappingURL=931.eaae9026.chunk.js.map