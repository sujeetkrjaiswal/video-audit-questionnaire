(this["webpackJsonpvideo-audit"]=this["webpackJsonpvideo-audit"]||[]).push([[4],{1801:function(e,t,a){e.exports={questionContainer:"question_questionContainer__35IEG",marginVertical:"question_marginVertical__qQ9YO",option:"question_option__1AgUQ",label:"question_label__27iWB",marginBottom:"question_marginBottom__3q9BH",textAreaAnswer:"question_textAreaAnswer__2ohmD",headingWithExtras:"question_headingWithExtras__13RsD",screenshotBtnContainer:"question_screenshotBtnContainer__t34-l",submitBtnContainer:"question_submitBtnContainer__3s-T1",questionNavContainer:"question_questionNavContainer__10YoL"}},1806:function(e,t,a){e.exports={container:"question-list_container__1GsJq",filterContainer:"question-list_filterContainer__jozvT",select:"question-list_select__3LPv3",label:"question-list_label__8mPAt",submitBtnContainer:"question-list_submitBtnContainer__32m2p",badgeIcon:"question-list_badgeIcon__UJ9qD",questionList:"question-list_questionList__1sm9W",card:"question-list_card__apC3n",isFlagged:"question-list_isFlagged__1W8DO",isNotFlagged:"question-list_isNotFlagged__Bumfe",active:"question-list_active__4kEvV",questionItem:"question-list_questionItem__2UhmG",questionBody:"question-list_questionBody__jH6c_",tag:"question-list_tag__3ikYh"}},1849:function(e,t,a){e.exports={container:"video-quiz_container__2djgE",questionContent:"video-quiz_questionContent__Ige9r",questionList:"video-quiz_questionList__34cNv"}},1864:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),i=a(1856),r=a(109),s=(a(1834),a(48)),c=a(1866),o=a(1861),u=a(1853),m=a(1855),d=a(1868),v=a(1867),E=a(61),g=a(1786),f=a(101),b=a(1835),p=a.n(b),h=function(e){e&&e.media&&Array.isArray(e.media)&&e.media.forEach((function(e){e.url=e.url.substr(0,50)+"..."}))},C=function(){var e=Object(n.useContext)(f.b),t=e.answeredCount,a=(0,e.getQuestionsList)();return a.forEach((function(e){Array.isArray(e.answer)?e.answer.forEach((function(e){h(e)})):h(e.answer)})),l.a.createElement("section",null,t<a.length?l.a.createElement(v.a,{type:"warning",message:"Can not submit.",description:"All the questions are not answered"}):null,l.a.createElement(p.a,{src:a,collapsed:!0}))},_=a(102),O=a(1862),q=a(1858),y=a(1870),w=a(1871),k=a(1806),j=a.n(k),N=O.a.Paragraph,S={left:"-40%",right:"auto"},T=function(e){var t=e.question,a=l.a.createElement(q.a,{className:t.flagged?j.a.isFlagged:j.a.isNotFlagged},t.questionNo);return"SINGLE"===t.answerType&&t.answer?l.a.createElement(y.a,{count:l.a.createElement(_.CheckCircleFilled,{className:j.a.badgeIcon}),style:S},a):"MULTI"===t.answerType&&Array.isArray(t.answer)&&t.answer.length?l.a.createElement(y.a,{style:S,count:t.answer.length},a):a},A=function(e){var t,a=e.question.item;return l.a.createElement("div",{className:j.a.questionItem},l.a.createElement(T,{question:a}),l.a.createElement("div",null,l.a.createElement(N,{className:j.a.questionBody},a.questionBody),l.a.createElement("div",null,null===(t=a.tags)||void 0===t?void 0:t.map((function(e){return l.a.createElement(w.a,{color:"blue",key:e,className:j.a.tag},e)})))))},I=a(46),x=[12,12],B=c.a.Search,F=o.a.Option,L=function(){var e=Object(n.useContext)(f.b),t=e.search,a=e.tags,i=e.activeQuestionId,r=e.setActiveQuestionId,c=e.answeredCount,b=e.questions,p=Object(n.useState)(!1),h=Object(s.a)(p,2),_=h[0],O=h[1],q=Object(n.useState)(""),y=Object(s.a)(q,2),w=y[0],k=y[1],N=Object(n.useState)([]),S=Object(s.a)(N,2),T=S[0],L=S[1],z=Object(n.useState)(I.a.BOTH),U=Object(s.a)(z,2),V=U[0],M=U[1],Q=Object(n.useState)(I.a.BOTH),R=Object(s.a)(Q,2),H=R[0],D=R[1],G=Object(n.useState)([]),W=Object(s.a)(G,2),P=W[0],Y=W[1];Object(n.useEffect)((function(){var e=t({query:w,filterTags:T,filterCritical:V,filterFlag:H});Y(e)}),[V,H,T,w,t]);var J=Object(n.useCallback)((function(e){e&&r(e)}),[r]),X=Object(n.useCallback)((function(){O(!0)}),[]),K=Object(n.useCallback)((function(){O(!1)}),[]),Z=c<b.length;return l.a.createElement("section",{className:j.a.container},l.a.createElement(u.a,{gutter:x,className:j.a.filterContainer},l.a.createElement(m.a,{xs:24},l.a.createElement(B,{placeholder:"search query",onSearch:k,enterButton:!0})),l.a.createElement(m.a,{xs:12},l.a.createElement("span",{className:j.a.label},"Tags"),l.a.createElement(o.a,{mode:"multiple",placeholder:"Select tags",onChange:L,value:T,className:j.a.select},a.map((function(e){return l.a.createElement(F,{key:e,value:e},e)})))),l.a.createElement(m.a,{xs:6},l.a.createElement("span",{className:j.a.label},"Critical"),l.a.createElement(o.a,{placeholder:"Select Flag",onChange:M,className:j.a.select,value:V},l.a.createElement(F,{value:I.a.BOTH},"All"),l.a.createElement(F,{value:I.a.TRUE},"Critical"),l.a.createElement(F,{value:I.a.FALSE},"Non-Critical"))),l.a.createElement(m.a,{xs:6},l.a.createElement("span",{className:j.a.label},"Flag"),l.a.createElement(o.a,{placeholder:"Select Flag",onChange:D,className:j.a.select,value:H},l.a.createElement(F,{value:I.a.BOTH},"All"),l.a.createElement(F,{value:I.a.TRUE},"Flagged"),l.a.createElement(F,{value:I.a.FALSE},"UnFlagged")))),l.a.createElement("div",{className:j.a.questionList},P.map((function(e){return l.a.createElement(d.a,{hoverable:!0,size:"small",className:"".concat(j.a.card," ").concat(e.item.flagged?j.a.isFlagged:j.a.isNotFlagged," ").concat(i===e.item.id?j.a.active:""),key:e.item.id,onClick:function(){return J(e.item.id)}},l.a.createElement(A,{question:e}))})),0===P.length?l.a.createElement(v.a,{type:"warning",message:"No results to show",description:"Remove applied filters/query to view questions"}):null),l.a.createElement("div",{className:j.a.submitBtnContainer},l.a.createElement(E.a,{type:Z?"default":"primary",block:!0,danger:Z,onClick:X},Z?"Answered":"Submit"," (",c," /",b.length,")"),l.a.createElement(g.a,{title:"Submission",onCancel:K,visible:_,destroyOnClose:!0,width:"80%",footer:null},l.a.createElement(C,null))))},z=a(36),U=a(1860),V=a(139),M=a(1863),Q=a(1869),R=a(1788),H=a(1801),D=a.n(H),G=c.a.TextArea,W=function(e){var t=e.time,a=Object(n.useContext)(f.b).player,i=Object(n.useCallback)((function(e){a&&void 0!==e&&(a.currentTime(e),a.pause())}),[a]);return l.a.createElement("div",null,l.a.createElement("span",{className:D.a.label},"Recorded At : "),l.a.createElement(E.a,{type:"link",onClick:function(){return i(t)}},function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=Math.round(e),a=String(Math.floor(t/60)).padStart(2,"0"),n=String(t%60).padStart(2,"0");return" ".concat(a,":").concat(n)}(t)))},P=function(e){var t=e.value,a=e.setValue,i=e.label,r=e.extra,s=e.placeholder,c=void 0===s?"Enter your response here":s,o=Object(n.useCallback)((function(e){a(e.target.value)}),[a]);return l.a.createElement("div",null,l.a.createElement("div",{className:D.a.headingWithExtras},l.a.createElement("span",{className:"".concat(D.a.label," ").concat(D.a.marginBottom)},i),r),l.a.createElement(G,{rows:4,value:t,placeholder:c,onChange:o}))},Y=function(e){var t=e.value,a=e.label;return t?l.a.createElement("div",null,l.a.createElement("span",{className:D.a.label},a),l.a.createElement(G,{autoSize:!0,value:t,readOnly:!0,className:D.a.textAreaAnswer})):null},J=function(e){var t=e.tags;return t?l.a.createElement(l.a.Fragment,null,t.map((function(e){return l.a.createElement(w.a,{key:e,color:"blue"},e)}))):null},X=a(27),K=a(1854),Z=a(1859);var $=[16,16],ee=(c.a.TextArea,function(e){var t,a=e.question,i=e.answer,r=e.onChange,c=e.questionIdx,o=Object(n.useContext)(f.b),d=o.questions,v=o.setActiveQuestionId,g=o.setModelDocket,b=o.player,p=Object(n.useState)(i.remark),h=Object(s.a)(p,2),C=h[0],O=h[1],q=Object(n.useState)(i.answer),y=Object(s.a)(q,2),w=y[0],k=y[1],j=Object(n.useState)(i.media),N=Object(s.a)(j,2),S=N[0],T=N[1],A=Object(n.useCallback)((function(){r(Object(X.a)(Object(X.a)({},i),{},{remark:C,media:S,answer:w,timestamp:null===b||void 0===b?void 0:b.currentTime()}))}),[r,i,C,S,w,b]),I=Object(n.useCallback)((function(){var e=null===b||void 0===b?void 0:b.el(),t=null===e||void 0===e?void 0:e.querySelector("video");if(t)if(null===b||void 0===b?void 0:b.hasStarted()){var a=function(e){var t=document.createElement("canvas"),a=t.getContext("2d"),n=e.videoWidth,l=e.videoHeight;return t.width=n,t.height=l,a?(a.fillRect(0,0,n,l),a.drawImage(e,0,0,n,l),t.toDataURL("image/jpeg")):null}(t);if(null===a)return void K.a.warn({message:"Could not get Image Url"});var n={id:Object(R.a)(),url:a,type:"image/jpeg",title:"Screenshot at ".concat(null===b||void 0===b?void 0:b.currentTime())};T((function(e){return Array.isArray(e)?[].concat(Object(z.a)(e),[n]):[n]}))}else K.a.warn({message:"Can not take screenshot.",description:"You can not take screenshot before video has started"});else K.a.error({message:"Could not find Video"})}),[b]),x=Object(n.useCallback)((function(){c<d.length&&v(d[c+1].id)}),[d,v,c]),B=Object(n.useCallback)((function(){c>0&&v(d[c-1].id)}),[d,v,c]);return Object(n.useEffect)((function(){O(i.remark||""),k(i.answer||""),T(i.media)}),[i]),l.a.createElement(l.a.Fragment,null,l.a.createElement(u.a,{gutter:$},l.a.createElement(m.a,{sm:24,md:12},"TEXT"===a.questionType?l.a.createElement(P,{value:w,label:"Your Answer",setValue:k}):null,"MULTI_CHOICE"===a.questionType?l.a.createElement("div",null,l.a.createElement("span",{className:"".concat(D.a.label," ").concat(D.a.marginBottom)},"Options"),l.a.createElement("div",null,l.a.createElement(Z.default.Group,{value:w,onChange:function(e){return k(e.target.value)}},a.options.map((function(e){return l.a.createElement(Z.default,{key:e.id,value:e.id,className:D.a.option},e.label)}))))):null),l.a.createElement(m.a,{sm:24,md:12},l.a.createElement(P,{value:C,label:"Remarks",placeholder:"Enter additional remarks here ...",setValue:O,extra:(null===(t=a.docket)||void 0===t?void 0:t.length)?l.a.createElement(E.a,{type:"link",icon:l.a.createElement(_.FileOutlined,null),size:"small",onClick:function(){return a.docket&&g(a.docket,"View Dockets")}},"View Dockets (",a.docket.length,")"):null}),l.a.createElement(U.a,{className:D.a.screenshotBtnContainer},l.a.createElement(E.a,{type:"primary",ghost:!0,icon:l.a.createElement(_.CameraOutlined,null),size:"small",onClick:I},"Attach Screenshot"),l.a.createElement(E.a,{type:"primary",ghost:!0,icon:l.a.createElement(_.CameraOutlined,null),size:"small",disabled:!(null===S||void 0===S?void 0:S.length),onClick:function(){return S&&g(S,"View Current Screenshot")}},"View Screenshot (",(null===S||void 0===S?void 0:S.length)||0,")")))),l.a.createElement(u.a,null,l.a.createElement(m.a,{sm:8},void 0!==i.timestamp?l.a.createElement(W,{time:i.timestamp}):null),l.a.createElement(m.a,{sm:8,className:D.a.submitBtnContainer},l.a.createElement(E.a,{type:"primary",shape:"round",icon:l.a.createElement(_.SaveOutlined,null),onClick:A,disabled:!w},"Save Answer")),l.a.createElement(m.a,{sm:8,className:D.a.questionNavContainer},l.a.createElement(E.a,{type:"link",icon:l.a.createElement(_.LeftOutlined,null),disabled:c<=0,onClick:B}),l.a.createElement(E.a,{type:"text"},c+1," / ",d.length),l.a.createElement(E.a,{type:"link",icon:l.a.createElement(_.RightOutlined,null),disabled:c>=d.length-1,onClick:x}))))}),te=function(){return{id:Object(R.a)(),answer:"",remark:"",media:[],timestamp:void 0}},ae=O.a.Paragraph,ne=(c.a.TextArea,function(){var e,t=Object(n.useContext)(f.b),a=t.getQuestionById,i=t.updateQuestion,r=t.activeQuestionId,c=t.setModelDocket,o=(t.player,Object(n.useState)()),u=Object(s.a)(o,2),m=u[0],g=u[1],b=Object(n.useState)(te()),p=Object(s.a)(b,2),h=p[0],C=p[1],O=Object(n.useCallback)((function(e){if(m){if("SINGLE"===m.item.answerType)m.item.answer=e;else if("MULTI"===m.item.answerType){var t=m.item.answer||[],a=t.some((function(t){return t.id===e.id}));m.item.answer=a?t.map((function(t){return t.id===e.id?e:t})):[].concat(Object(z.a)(t),[e])}i(m.item.id,m.item)}}),[m,i]),q=Object(n.useCallback)((function(e){m&&m.item.flagged!==e&&(m.item.flagged=e,i(m.item.id,m.item))}),[m,i]);Object(n.useEffect)((function(){if(r){var e=a(r);g(e),console.log("Answer",null===e||void 0===e?void 0:e.item.answer),"SINGLE"===(null===e||void 0===e?void 0:e.item.answerType)?C(e.item.answer||te()):C(te())}else g(void 0),C(te())}),[r,a]);var y=Object(n.useMemo)((function(){if("MULTI_CHOICE"===(null===m||void 0===m?void 0:m.item.questionType)){var e={};return m.item.options.map((function(t){e[t.id]=t.label})),e}return{}}),[m]);if(!m)return null;var k=m.refIndex,j=m.item;return l.a.createElement("section",{className:D.a.questionContainer},l.a.createElement(d.a,{size:"small",title:"Question No: ".concat(j.questionNo),extra:l.a.createElement(U.a,null,l.a.createElement(J,{tags:j.tags}),j.isCritical?l.a.createElement(w.a,{color:"error"},"Critical"):l.a.createElement(w.a,null,"Non Critical"),l.a.createElement(V.a,{title:j.flagged?"Flagged":"Not Flagged"},l.a.createElement(M.a,{checked:j.flagged,checkedChildren:l.a.createElement(_.FlagOutlined,null),unCheckedChildren:l.a.createElement(_.FlagOutlined,null),onChange:q})))},l.a.createElement(ae,null,j.questionBody),l.a.createElement(ee,{question:j,answer:h,onChange:O,questionIdx:k})),"MULTI"===j.answerType?l.a.createElement(d.a,{size:"small",title:"Previous Answers",className:D.a.marginVertical},(null===(e=j.answer)||void 0===e?void 0:e.length)?null:l.a.createElement(v.a,{type:"info",message:"No Answers recorded yet."}),l.a.createElement(Q.a,null,Array.isArray(j.answer)?j.answer.map((function(e){var t,a;return l.a.createElement(Q.a.Item,null,l.a.createElement(W,{time:e.timestamp}),"TEXT"===(null===m||void 0===m?void 0:m.item.questionType)?l.a.createElement(Y,{label:"Answer",value:e.answer}):null,"MULTI_CHOICE"===(null===m||void 0===m?void 0:m.item.questionType)?l.a.createElement("div",null,l.a.createElement("span",{className:D.a.label},"Option Selected :"),l.a.createElement("span",null,y[e.answer])):null,l.a.createElement(Y,{label:"Remarks",value:e.remark}),l.a.createElement(U.a,{className:D.a.marginVertical},l.a.createElement(E.a,{icon:l.a.createElement(_.CameraOutlined,null),size:"small",onClick:function(){return e.media&&c(e.media,"View Screenshots")},disabled:!(null===(t=e.media)||void 0===t?void 0:t.length)},"View Screenshots (",(null===(a=e.media)||void 0===a?void 0:a.length)||0,")"),l.a.createElement(E.a,{icon:l.a.createElement(_.EditOutlined,null),size:"small",onClick:function(){return C(e)}},"Edit")))})):null)):null)}),le=a(1849),ie=a.n(le);t.default=function(){var e=Object(n.useContext)(f.b),t=e.videoUrl,a=e.setPlayer,s=e.activeQuestionId,c=e.player,o=e.getQuestionById,u=Object(n.useRef)(null);return Object(n.useEffect)((function(){if(null!==u.current){var e=Object(r.default)(u.current,{autoplay:!1,controls:!0,sources:[{src:t,type:"video/mp4"}]});return e.markers({markers:[],markerStyle:{width:"8px","background-color":"#ff4d4f"}}),a(e),function(){a((function(e){return e&&e.dispose(),null}))}}}),[a,u,t]),Object(n.useEffect)((function(){var e;if(c&&c.markers){var t=o(s);if(t){var a=t.item,n=[];"SINGLE"===a.answerType&&void 0!==(null===(e=a.answer)||void 0===e?void 0:e.timestamp)?n.push(a.answer.timestamp):"MULTI"===a.answerType&&Array.isArray(a.answer)&&a.answer.forEach((function(e){void 0!==e.timestamp&&n.push(e.timestamp)})),n.sort();var l=n.map((function(e){return{time:e,text:"Recorded"}}));c.markers.reset(l)}}}),[s,o,c]),l.a.createElement("section",{className:ie.a.container},l.a.createElement(i.a,{split:"vertical",minSize:350,defaultSize:350,maxSize:900,primary:"second"},l.a.createElement(i.a,{split:"horizontal",minSize:200,defaultSize:400,maxSize:700,pane2Style:{overflow:"hidden"}},l.a.createElement("div",{"data-vjs-player":!0},l.a.createElement("video",{ref:u,className:"video-js vjs-big-play-centered",crossOrigin:"anonymous"})),l.a.createElement("div",{className:ie.a.questionContent},l.a.createElement(ne,null))),l.a.createElement("div",{className:ie.a.questionList},l.a.createElement(L,null))))}}}]);
//# sourceMappingURL=4.fd76e3c5.chunk.js.map