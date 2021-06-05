(this["webpackJsonpreact-minesweeper"]=this["webpackJsonpreact-minesweeper"]||[]).push([[0],{50:function(e,t,a){},59:function(e,t,a){},67:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),s=a(20),i=a.n(s),c=(a(50),a(45)),l=a(14),o=a(4),u=a(18),h=a.n(u),d=a(29),j=a(10),m=a(11),v=a(13),p=a(12),b=a(0),g=function(e){Object(v.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(j.a)(this,a);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).handleClick=function(){var t=e.props.status,a=e.props.data,n=128&a.value,r=64&a.value;"failed"===t||"success"===t||n||r||e.props.onDig(e.props.data)},e}return Object(m.a)(a,[{key:"render",value:function(){var e=this.props.data,t=15&e.value,a=128&e.value,n=64&e.value,r=["cell",a?"digged":"",9===t?"mine":"",n?"marked":"","failed"===this.props.status||"success"===this.props.status?"inactive":""],s="";if(n)s="\u2605";else if(a)switch(t){case 9:s="\u96f7";break;case 0:s="";break;default:s=t}else"failed"===this.props.status&&9===t&&(s="\u96f7");return Object(b.jsx)("div",{className:r.join(" "),onClick:this.handleClick,children:s})}}]),a}(n.Component),f=a(69);var O=a(22),x=function(e){Object(v.a)(a,e);var t=Object(p.a)(a);function a(){var e;return Object(j.a)(this,a),(e=t.call(this)).container=null,e}return Object(m.a)(a,[{key:"componentDidUpdate",value:function(){var e=this.props.visible;if(!e&&this.container)document.body.removeChild(this.container),this.container=null;else if(e&&!this.container){var t=document.body,a=document.createElement("div");a.classList.add("dialog-container"),this.props.modalClass&&a.classList.add(this.props.modalClass),this.container=a,t.appendChild(a)}if(e){var n=["dialog-body"];this.props.customClass&&n.push(this.props.customClass),i.a.render(Object(b.jsx)("div",{className:n.join(" "),children:this.props.children}),this.container)}}},{key:"render",value:function(){return null}}]),a}(n.Component),w=a(70);function y(e,t,a){return e<t?t:e>a?a:e}var k=function(e){Object(v.a)(a,e);var t=Object(p.a)(a);function a(){var e;return Object(j.a)(this,a),(e=t.call(this)).state={display:!1,width:30,height:16,mines:99,errorMsg:null},e.resolve=null,e.reject=null,e.handleInputChange=function(t){var a=t.target,n=a.value;if(/^\d+$/.test(n))switch(n=Number(n),a.name){case"width":n=y(n,4,30);break;case"height":n=y(n,4,24);break;case"mines":n=y(n,4,719)}e.setState(Object(O.a)({},a.name,n))},e.setLevel=function(t){switch(t){case"beginner":e.setState({width:10,height:10,mines:10});break;case"medium":e.setState({width:16,height:16,mines:40});break;case"expert":e.setState({width:30,height:16,mines:99})}e.setState({errorMsg:null})},e.startGame=function(){var t=e.state,a=t.width,n=t.height,r=t.mines,s=[];if(/^\d+$/.test(a)||s.push("error_width"),/^\d+$/.test(n)||s.push("error_height"),/^\d+$/.test(r)||s.push("error_mines"),s.length)e.setState({errorMsg:s});else{var i=(a=Number(a))*(n=Number(n))-1;(r=Number(r))>i&&(r=i),e.resolve&&e.resolve({width:a,height:n,mines:r}),e.resolve=e.reject=null,e.setState({width:a,height:n,mines:r,display:!1})}},e.cancelSubmit=function(){e.reject&&e.reject("cancel"),e.resolve=e.reject=null,e.setState({display:!1,errorMsg:null})},e}return Object(m.a)(a,[{key:"open",value:function(e){var t=this;return new Promise((function(a,n){Object.assign(t,{resolve:a,reject:n}),t.setState(Object(o.a)(Object(o.a)({},e),{},{errorMsg:null,display:!0}))}))}},{key:"render",value:function(){var e=this,t=this.state.errorMsg;return Object(b.jsx)(w.a,{children:function(a){return Object(b.jsxs)(x,{visible:e.state.display,customClass:"settingDialog",children:[Object(b.jsxs)("div",{className:"levelSelection",children:[Object(b.jsx)("span",{className:"selectLevel",onClick:function(t){return e.setLevel("beginner")},children:a("Beginner")}),Object(b.jsx)("span",{className:"selectLevel",onClick:function(t){return e.setLevel("medium")},children:a("Middle")}),Object(b.jsx)("span",{className:"selectLevel",onClick:function(t){return e.setLevel("expert")},children:a("Expert")})]}),Object(b.jsxs)("table",{className:"gameSettingForm",children:[Object(b.jsxs)("colgroup",{children:[Object(b.jsx)("col",{className:"columnTitle"}),Object(b.jsx)("col",{className:"columnInput"})]}),Object(b.jsxs)("tbody",{children:[Object(b.jsxs)("tr",{className:"formItem",children:[Object(b.jsxs)("td",{className:"itemTitle",children:[a("Width")," (",4,"-",30,")"]}),Object(b.jsx)("td",{children:Object(b.jsx)("input",{name:"width",autoComplete:"off",maxLength:"2",value:e.state.width,onInput:e.handleInputChange})})]}),Object(b.jsxs)("tr",{className:"formItem",children:[Object(b.jsxs)("td",{className:"itemTitle",children:[a("Height")," (",4,"-",24,")"]}),Object(b.jsx)("td",{children:Object(b.jsx)("input",{name:"height",autoComplete:"off",maxLength:"2",value:e.state.height,onInput:e.handleInputChange})})]}),Object(b.jsxs)("tr",{className:"formItem",children:[Object(b.jsxs)("td",{className:"itemTitle",children:[a("Mines Count")," (2-",719,")"]}),Object(b.jsx)("td",{children:Object(b.jsx)("input",{name:"mines",autoComplete:"off",maxLength:"3",value:e.state.mines,onInput:e.handleInputChange})})]})]})]}),t&&Object(b.jsx)("div",{className:"errorMsg",children:t.map(a).join("\n")}),Object(b.jsxs)("div",{className:"footer",children:[Object(b.jsx)("button",{className:"startGame",onClick:e.startGame,children:Object(b.jsx)("span",{children:a("OK")})}),Object(b.jsx)("button",{className:"cancelSetting",onClick:e.cancelSubmit,children:Object(b.jsx)("span",{children:a("Cancel")})})]})]})}})}}]),a}(n.Component),N=9,S=function(e){Object(v.a)(a,e);var t=Object(p.a)(a);function a(){var e;return Object(j.a)(this,a),(e=t.call(this)).state={width:null,height:null,mines:null,board:[],operation:[],status:"initial"},e.$refs={settingDialog:Object(n.createRef)()},e.openSetting=Object(d.a)(h.a.mark((function t(){var a;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$refs.settingDialog.current.open({width:e.state.width,height:e.state.height,mines:e.state.mines});case 3:return a=t.sent,t.next=6,e.setState(a);case 6:e.startGame(),localStorage.setItem("react-minesweeper-settings",JSON.stringify(a)),t.next=13;break;case 10:t.prev=10,t.t0=t.catch(0),"cancel"!==t.t0&&console.error(t.t0);case 13:case"end":return t.stop()}}),t,null,[[0,10]])}))),e.startGame=function(){for(var t=[],a=e.state.width,n=e.state.height,r=0;r<n;r++){for(var s=[],i=0;i<a;i++)s.push({key:Math.random(),row:r,col:i,value:0});t.push({key:Math.random(),data:s})}e.setState({board:t,operation:[],status:"initial"})},e.handleDig=function(t){var a=e.state,n=a.board.map((function(e){return Object(o.a)(Object(o.a)({},e),{},{data:e.data.map((function(e){return Object(o.a)({},e)}))})})),r=a.status;if("failed"!==r&&"success"!==r){for("initial"===r&&(e.initMines(n,a.mines,t.row,t.col),r="running"),-1===e.dig(n,t.row,t.col)&&(r="failed");"running"===r&&e.autoproc(n););if("running"===r&&e.gameFinished(n)){var s,i=Object(l.a)(n);try{var u=function(){var e=s.value;e.data.forEach((function(t,a){var n=15&t.value;N===n&&(e.data[a].value|=64)}))};for(i.s();!(s=i.n()).done;)u()}catch(d){i.e(d)}finally{i.f()}r="success"}var h=[].concat(Object(c.a)(a.operation),[{time:(new Date).getTime(),col:t.col,row:t.row}]);"failed"!==r&&"success"!==r||function(e,t){for(var a=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=e[0].data.length,r=e.length,s=[],i=0;i<r;i++)for(var c=0;c<n;c++){var o=e[i].data[c].value;N===(15&o)&&s.push({col:c,row:i})}var u=[];try{var h=localStorage.getItem("react-minesweeper-log");h&&(u=JSON.parse(h))}catch(p){console.error(p)}Array.isArray(u)||(u=[]);var j,m=Object(l.a)(u);try{for(m.s();!(j=m.n()).done;){var v=j.value;v.id||(v.id=Object(f.a)())}}catch(d){m.e(d)}finally{m.f()}u.push({id:Object(f.a)(),width:n,height:r,success:a,mines:s,operation:t}),localStorage.setItem("react-minesweeper-log",JSON.stringify(u))}(n,h,"success"===r),e.setState(Object(o.a)(Object(o.a)({},a),{},{operation:h,status:r,board:n}))}},e.openDataAnalysis=function(){window.location="#/dataAnalysis"},e}return Object(m.a)(a,[{key:"getNeighbours",value:function(e,t,a,n){for(var r=[],s=a-1;s<=a+1;s++)for(var i=n-1;i<=n+1;i++)s<0||s>=e||i<0||i>=t||s===a&&i===n||r.push({row:s,col:i});return r}},{key:"getNeighbourMineCount",value:function(e,t,a){var n,r,s,i=e.length,c=e[0].data.length,o=0,u=Object(l.a)(this.getNeighbours(i,c,t,a));try{for(u.s();!(s=u.n()).done;){var h=s.value;n=h.row,r=h.col;var d=e[n].data[r];N===(15&d.value)&&o++}}catch(j){u.e(j)}finally{u.f()}return o}},{key:"initMines",value:function(e,t,a,n){var r=e.length,s=e[0].data.length;if(t>=r*s)throw new RangeError("Too many mines");for(var i=[],c=0;c<r;c++)for(var l=0;l<s;l++)a===c&&n===l||i.push({row:c,col:l});for(var o=i.length,u=0;u<o;u++)if(!(Math.random()>.5)){var h=Math.floor(Math.random()*(o-u-1))+u+1;if(i[h]){var d=i[u];i[u]=i[h],i[h]=d}}for(var j=0;j<t&&i.length;j++){var m=Math.floor(Math.random()*(i.length-1));try{var v=i[m],p=v.row,b=v.col;e[p].data[b].value=N,i.splice(m,1)}catch(x){console.error(m,i.length,i[m])}}for(var g=0;g<r;g++)for(var f=0;f<s;f++){var O=e[g].data[f];N!==O.value&&(O.value=this.getNeighbourMineCount(e,g,f))}}},{key:"dig",value:function(e,t,a){var n=e[t].data[a],r=15&n.value;return 192&n.value?0:(e[t].data[a].value|=128,N===r?-1:1)}},{key:"mark",value:function(e,t,a){e[t].data[a].value|=64}},{key:"autoproc",value:function(e){for(var t=this,a=e.length,n=e[0].data.length,r=!1,s=0;s<a;s++)for(var i=0;i<n;i++){var c=e[s].data[i],l=15&c.value;if(N!==l&&192&c.value){var o=this.getNeighbours(a,n,s,i).filter((function(t){var a=t.row,n=t.col;return!(128&e[a].data[n].value)}));0===l?o.forEach((function(a){var n=a.row,s=a.col;t.dig(e,n,s)&&(r=!0)})):o.length===l&&o.forEach((function(a){var n=a.row,r=a.col;t.mark(e,n,r)}))}}for(var u=0;u<a;u++)for(var h=function(s){var i=e[u].data[s],c=15&i.value;if(N===c||!(192&i.value)||0===c)return"continue";var l=t.getNeighbours(a,n,u,s),o=0;return l.forEach((function(t){var a=t.row,n=t.col;64&e[a].data[n].value&&o++})),c!==o?"continue":(l.forEach((function(a){var n=a.row,s=a.col;192&e[n].data[s].value||(r=!0,t.dig(e,n,s))})),"failed"===t.status?{v:!1}:void 0)},d=0;d<n;d++){var j=h(d);if("continue"!==j&&"object"===typeof j)return j.v}return r}},{key:"gameFinished",value:function(e){for(var t=e.length,a=e[0].data.length,n=0;n<t;n++)for(var r=0;r<a;r++){var s=e[n].data[r],i=15&s.value;if(N!==i&&!(128&s.value))return!1}return!0}},{key:"componentDidMount",value:function(){var e=Object(d.a)(h.a.mark((function e(){var t;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.setState({width:30,height:16,mines:99});case 2:if(e.prev=2,!(t=localStorage.getItem("react-minesweeper-settings"))){e.next=8;break}return t=JSON.parse(t),e.next=8,this.setState({width:Number(t.width),height:Number(t.height),mines:Number(t.mines)});case 8:e.next=13;break;case 10:e.prev=10,e.t0=e.catch(2),console.error(e.t0);case 13:this.startGame();case 14:case"end":return e.stop()}}),e,this,[[2,10]])})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,t=this.state.status,a=t,n="";switch(t){case"success":n="Succeed";break;case"failed":n="Failed"}var r,s=this.state.mines,i=Object(l.a)(this.state.board);try{for(i.s();!(r=i.n()).done;){var c,o=r.value,u=Object(l.a)(o.data);try{for(u.s();!(c=u.n()).done;){64&c.value.value&&s--}}catch(h){u.e(h)}finally{u.f()}}}catch(h){i.e(h)}finally{i.f()}return Object(b.jsx)(w.a,{children:function(t){return Object(b.jsxs)("div",{className:"gamePage",children:[Object(b.jsxs)("div",{className:"titleBar",children:[Object(b.jsxs)("div",{class:"btnGroup",children:[Object(b.jsx)("span",{className:"newGame btn-link",onClick:e.startGame,children:t("New Game")}),Object(b.jsx)("span",{className:"back btn-link",onClick:e.openSetting,children:t("Settings")}),Object(b.jsx)("span",{className:"newGame btn-link",onClick:e.openDataAnalysis,children:t("Data Analysis")})]}),Object(b.jsxs)("div",{class:"statusGroup",children:[Object(b.jsxs)("span",{className:"steps",children:[t("Steps"),e.state.operation.length]}),Object(b.jsxs)("span",{className:"remainMines",children:[t("Remain"),s]})]})]}),Object(b.jsx)("div",{className:["statusLine",a].join(" "),children:n?t(n):null}),Object(b.jsx)("div",{className:"gamePadOuter",children:Object(b.jsx)("div",{className:"gamePad",children:e.state.board.map((function(t){return Object(b.jsx)("div",{className:"gamePadRow",children:t.data.map((function(t){return Object(b.jsx)(g,{data:t,onDig:e.handleDig,status:e.state.status},t.key)}))},t.key)}))})}),Object(b.jsx)(k,{ref:e.$refs.settingDialog})]})}})}}]),a}(n.Component),C=a(30),M=(a(59),a(39)),D=a.n(M),E=function(e){Object(v.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(j.a)(this,a);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).state={dataRaw:null,dataList:[]},e.exportJSON=function(){Object(C.saveAs)(new Blob([JSON.stringify(e.state.dataRaw)],{type:"text/plain;charset=utf-8"}),"minesweeper-log.json")},e.exportDBF=function(){var t,a=[],n=Object(l.a)(e.state.dataRaw);try{for(n.s();!(t=n.n()).done;){var r=t.value;a.push({ID:r.id,WIDTH:r.width,HEIGHT:r.height,MINES:r.mines.length,SUCCESS:r.success?"Y":"N",START:r.operation[0].time,TIME:((r.operation[r.operation.length-1].time-r.operation[0].time)/1e3).toFixed(2)})}}catch(s){n.e(s)}finally{n.f()}Object(C.saveAs)(new Blob([D.a.structure(a).buffer]),"mine.dbf")},e.goBack=function(){window.location="#/"},e}return Object(m.a)(a,[{key:"componentWillMount",value:function(){var e=function(){var e=[];try{var t=localStorage.getItem("react-minesweeper-log");t&&(e=JSON.parse(t))}catch(a){console.error(a)}return e}(),t=e.filter((function(e){return 10===e.width&&10===e.height&&10===e.mines.length})),a=e.filter((function(e){return 16===e.width&&16===e.height&&40===e.mines.length})),n=e.filter((function(e){return(30===e.width&&16===e.height||16===e.width&&30===e.height)&&99===e.mines.length}));this.setState({dataRaw:e,dataList:[Object(o.a)({label:"\u521d\u7ea7"},this.getStatResult(t)),Object(o.a)({label:"\u4e2d\u7ea7"},this.getStatResult(a)),Object(o.a)({label:"\u9ad8\u7ea7"},this.getStatResult(n))]})}},{key:"getStatResult",value:function(e){var t,a=0,n=0,r=0,s=0,i=Object(l.a)(e);try{for(i.s();!(t=i.n()).done;){var c=t.value;c.success&&a++,1===c.operation.length&&n++,r+=c.operation.length,s+=c.operation[c.operation.length-1].time-c.operation[0].time}}catch(o){i.e(o)}finally{i.f()}return{success_rate:e.length?a/e.length:0,one_click_finish:n,average_steps:e.length?r/e.length:0,average_time:e.length?s/e.length:0}}},{key:"render",value:function(){var e=this;return Object(b.jsx)(w.a,{children:function(t){return Object(b.jsxs)("div",{className:"dataAnalysis",children:[Object(b.jsxs)("div",{className:"toolbox",children:[Object(b.jsx)("span",{className:"btn-link",onClick:e.goBack,children:t("Back")}),Object(b.jsx)("span",{className:"btn-link",onClick:e.exportJSON,children:t("Export JSON")}),Object(b.jsx)("span",{className:"btn-link",onClick:e.exportDBF,children:t("Export DBF")})]}),Object(b.jsx)("table",{className:"mainTable",children:Object(b.jsxs)("tbody",{children:[Object(b.jsxs)("tr",{children:[Object(b.jsx)("th",{children:"\u7ea7\u522b"}),Object(b.jsx)("th",{children:"\u6210\u529f\u7387"}),Object(b.jsx)("th",{children:"\u5e73\u5747\u6b65\u6570"}),Object(b.jsx)("th",{children:"\u5e73\u5747\u7528\u65f6"}),Object(b.jsx)("th",{children:"\u4e00\u6b21\u6210\u529f\u6b21\u6570"})]}),e.state.dataList.map((function(e){return Object(b.jsxs)("tr",{children:[Object(b.jsx)("td",{children:e.label}),Object(b.jsxs)("td",{children:[(100*e.success_rate).toFixed(2),"%"]}),Object(b.jsxs)("td",{children:[e.average_steps.toFixed(2),"\u6b65"]}),Object(b.jsxs)("td",{children:[(e.average_time/1e3).toFixed(2),"s"]}),Object(b.jsx)("td",{children:e.one_click_finish})]},e.label)}))]})})]})}})}}]),a}(n.Component),B=a(42),I=a(2),_=a(44),F=a(19),A=a(41);_.a.use(F.e).use(A.a).init({resources:{zh:{translation:{Minesweeper:"\u626b\u96f7","New Game":"\u65b0\u6e38\u620f","Data Analysis":"\u6570\u636e\u5206\u6790",Settings:"\u8bbe\u7f6e",Steps:"\u6b65\u6570\uff1a",Remain:"\u5269\u4f59\u96f7\u6570\uff1a",Failed:"\u5931\u8d25\u4e86",Succeed:"\u6210\u529f\u4e86",Beginner:"\u521d\u7ea7",Middle:"\u4e2d\u7ea7",Expert:"\u9ad8\u7ea7",Width:"\u5bbd\u5ea6",Height:"\u9ad8\u5ea6","Mines Count":"\u96f7\u6570",OK:"\u786e\u5b9a",Cancel:"\u53d6\u6d88",error_width:"\u5bbd\u5ea6\u503c\u5fc5\u987b\u4e3a\u6574\u6570",error_height:"\u9ad8\u5ea6\u503c\u5fc5\u987b\u4e3a\u6574\u6570",error_mines:"\u96f7\u6570\u5fc5\u987b\u4e3a\u6574\u6570",Back:"\u8fd4\u56de","Export JSON":"\u5bfc\u51faJSON\u6570\u636e","Export DBF":"\u5bfc\u51faDBF\u6570\u636e"}},en:{translation:{Minesweeper:"Minesweeper","New Game":"New Game","Data Analysis":"Data Analysis",Settings:"Settings",Steps:"Steps: ",Remain:"Remain: ",Failed:"Failed",Succeed:"Succeed",Beginner:"Beginner",Middle:"Middle",Expert:"Expert",Width:"Width",Height:"Height","Mines Count":"Mines",OK:"OK",Cancel:"Cancel",error_width:"Width must be integer",error_height:"Height must be integer",error_mines:"Mines must be integer",Back:"Back","Export JSON":"Export As JSON","Export DBF":"Export As DBF"}},ja:{translation:{Minesweeper:"\u30de\u30a4\u30f3\u30b9\u30a4\u30fc\u30d1","New Game":"\u30b9\u30bf\u30fc\u30c8","Data Analysis":"\u30c7\u30fc\u30bf\u89e3\u6790",Settings:"\u8a2d\u5b9a",Steps:"\u64cd\u4f5c\u56de\u6570\uff1a",Remain:"\u6b8b\u308a\u5730\u96f7\uff1a",Failed:"\u5931\u6557\u3057\u307e\u3057\u305f",Succeed:"\u6210\u529f\u3057\u307e\u3057\u305f",Beginner:"\u521d\u7d1a",Middle:"\u4e2d\u7d1a",Expert:"\u4e0a\u7d1a",Width:"\u5e45",Height:"\u9ad8\u3055","Mines Count":"\u5730\u96f7\u306e\u6570",OK:"OK",Cancel:"\u30ad\u30e3\u30f3\u30bb\u30eb",error_width:"\u5e45\u306f\u6574\u6570\u3067\u306a\u3051\u308c\u3070\u306a\u308a\u307e\u305b\u3093",error_height:"\u9ad8\u3055\u306f\u6574\u6570\u3067\u306a\u3051\u308c\u3070\u306a\u308a\u307e\u305b\u3093",error_mines:"\u5730\u96f7\u306e\u6570\u306f\u6574\u6570\u3067\u306a\u3051\u308c\u3070\u306a\u308a\u307e\u305b\u3093",Back:"\u623b\u308b","Export JSON":"JSON\u3092\u30a8\u30af\u30b9\u30dd\u30fc\u30c8","Export DBF":"DBF\u3092\u30a8\u30af\u30b9\u30dd\u30fc\u30c8"}}},fallbackLng:"en",keySeparator:!1,interpolation:{escapeValue:!1},detection:{order:["querystring","navigator"],lookupQuerystring:"language",caches:[]}}).then((function(e){document.title=e("Minesweeper")})),i.a.render(Object(b.jsx)(r.a.StrictMode,{children:Object(b.jsxs)(B.a,{children:[Object(b.jsx)(I.b,{path:"/",exact:!0,component:S}),Object(b.jsx)(I.b,{path:"/dataAnalysis",exact:!0,component:E}),Object(b.jsx)(I.a,{to:"/",from:"*"})]})}),document.getElementById("root"))}},[[67,1,2]]]);
//# sourceMappingURL=main.a3b2b149.chunk.js.map