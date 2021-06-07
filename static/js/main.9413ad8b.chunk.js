(this["webpackJsonpreact-minesweeper"]=this["webpackJsonpreact-minesweeper"]||[]).push([[0],{50:function(e,t,a){},59:function(e,t,a){},67:function(e,t,a){"use strict";a.r(t);var n=a(1),s=a.n(n),r=a(21),i=a.n(r),c=(a(50),a(45)),l=a(14),o=a(4),u=a(19),h=a.n(u),d=a(29),v=a(10),m=a(11),p=a(13),j=a(12),g=a(0),b=function(e){Object(p.a)(a,e);var t=Object(j.a)(a);function a(){var e;Object(v.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).handleClick=function(){var t=e.props.status,a=e.props.data,n=128&a.value,s=64&a.value;"failed"===t||"success"===t||n||s||e.props.onDig(e.props.data)},e}return Object(m.a)(a,[{key:"render",value:function(){var e=this.props.data,t=15&e.value,a=128&e.value,n=64&e.value,s=["cell",a?"digged":"",9===t?"mine":"",n?"marked":"","failed"===this.props.status||"success"===this.props.status?"inactive":""],r="";if(n)r="\u2605";else if(a)switch(t){case 9:r="\u96f7";break;case 0:r="";break;default:r=t}else"failed"===this.props.status&&9===t&&(r="\u96f7");return Object(g.jsx)("div",{className:s.join(" "),onClick:this.handleClick,children:r})}}]),a}(n.Component),f=a(69);var O=a(15),x=function(e){Object(p.a)(a,e);var t=Object(j.a)(a);function a(){var e;return Object(v.a)(this,a),(e=t.call(this)).container=null,e}return Object(m.a)(a,[{key:"componentDidUpdate",value:function(){var e=this.props.visible;if(!e&&this.container)document.body.removeChild(this.container),this.container=null;else if(e&&!this.container){var t=document.body,a=document.createElement("div");a.classList.add("dialog-container"),this.props.modalClass&&a.classList.add(this.props.modalClass),this.container=a,t.appendChild(a)}if(e){var n=["dialog-body"];this.props.customClass&&n.push(this.props.customClass),i.a.render(Object(g.jsx)("div",{className:n.join(" "),children:this.props.children}),this.container)}}},{key:"render",value:function(){return null}}]),a}(n.Component),w=a(70);function S(e,t,a){return e<t?t:e>a?a:e}var y,N=function(e){Object(p.a)(a,e);var t=Object(j.a)(a);function a(){var e;return Object(v.a)(this,a),(e=t.call(this)).state={display:!1,width:30,height:16,mines:99,errorMsg:null},e.resolve=null,e.reject=null,e.handleInputChange=function(t){var a=t.target,n=a.value;if(/^\d+$/.test(n))switch(n=Number(n),a.name){case"width":n=S(n,4,30);break;case"height":n=S(n,4,24);break;case"mines":n=S(n,4,719)}e.setState(Object(O.a)({},a.name,n))},e.setLevel=function(t){switch(t){case"beginner":e.setState({width:10,height:10,mines:10});break;case"medium":e.setState({width:16,height:16,mines:40});break;case"expert":e.setState({width:30,height:16,mines:99})}e.setState({errorMsg:null})},e.startGame=function(){var t=e.state,a=t.width,n=t.height,s=t.mines,r=[];if(/^\d+$/.test(a)||r.push("error_width"),/^\d+$/.test(n)||r.push("error_height"),/^\d+$/.test(s)||r.push("error_mines"),r.length)e.setState({errorMsg:r});else{var i=(a=Number(a))*(n=Number(n))-1;(s=Number(s))>i&&(s=i),e.resolve&&e.resolve({width:a,height:n,mines:s}),e.resolve=e.reject=null,e.setState({width:a,height:n,mines:s,display:!1})}},e.cancelSubmit=function(){e.reject&&e.reject("cancel"),e.resolve=e.reject=null,e.setState({display:!1,errorMsg:null})},e}return Object(m.a)(a,[{key:"open",value:function(e){var t=this;return new Promise((function(a,n){Object.assign(t,{resolve:a,reject:n}),t.setState(Object(o.a)(Object(o.a)({},e),{},{errorMsg:null,display:!0}))}))}},{key:"render",value:function(){var e=this,t=this.state.errorMsg;return Object(g.jsx)(w.a,{children:function(a){return Object(g.jsxs)(x,{visible:e.state.display,customClass:"settingDialog",children:[Object(g.jsxs)("div",{className:"levelSelection",children:[Object(g.jsx)("span",{className:"selectLevel",onClick:function(t){return e.setLevel("beginner")},children:a("Beginner")}),Object(g.jsx)("span",{className:"selectLevel",onClick:function(t){return e.setLevel("medium")},children:a("Middle")}),Object(g.jsx)("span",{className:"selectLevel",onClick:function(t){return e.setLevel("expert")},children:a("Expert")})]}),Object(g.jsxs)("table",{className:"gameSettingForm",children:[Object(g.jsxs)("colgroup",{children:[Object(g.jsx)("col",{className:"columnTitle"}),Object(g.jsx)("col",{className:"columnInput"})]}),Object(g.jsxs)("tbody",{children:[Object(g.jsxs)("tr",{className:"formItem",children:[Object(g.jsxs)("td",{className:"itemTitle",children:[a("Width")," (",4,"-",30,")"]}),Object(g.jsx)("td",{children:Object(g.jsx)("input",{name:"width",autoComplete:"off",maxLength:"2",value:e.state.width,onInput:e.handleInputChange})})]}),Object(g.jsxs)("tr",{className:"formItem",children:[Object(g.jsxs)("td",{className:"itemTitle",children:[a("Height")," (",4,"-",24,")"]}),Object(g.jsx)("td",{children:Object(g.jsx)("input",{name:"height",autoComplete:"off",maxLength:"2",value:e.state.height,onInput:e.handleInputChange})})]}),Object(g.jsxs)("tr",{className:"formItem",children:[Object(g.jsxs)("td",{className:"itemTitle",children:[a("Mines Count")," (2-",719,")"]}),Object(g.jsx)("td",{children:Object(g.jsx)("input",{name:"mines",autoComplete:"off",maxLength:"3",value:e.state.mines,onInput:e.handleInputChange})})]})]})]}),t&&Object(g.jsx)("div",{className:"errorMsg",children:t.map(a).join("\n")}),Object(g.jsxs)("div",{className:"footer",children:[Object(g.jsx)("button",{className:"startGame",onClick:e.startGame,children:Object(g.jsx)("span",{children:a("OK")})}),Object(g.jsx)("button",{className:"cancelSetting",onClick:e.cancelSubmit,children:Object(g.jsx)("span",{children:a("Cancel")})})]})]})}})}}]),a}(n.Component),k=9,C=function(e){Object(p.a)(a,e);var t=Object(j.a)(a);function a(){var e;return Object(v.a)(this,a),(e=t.call(this)).state={width:null,height:null,mines:null,board:[],operation:[],status:"initial"},e.$refs={settingDialog:Object(n.createRef)()},e.openSetting=Object(d.a)(h.a.mark((function t(){var a;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$refs.settingDialog.current.open({width:e.state.width,height:e.state.height,mines:e.state.mines});case 3:return a=t.sent,t.next=6,e.setState(a);case 6:e.startGame(),localStorage.setItem("react-minesweeper-settings",JSON.stringify(a)),t.next=13;break;case 10:t.prev=10,t.t0=t.catch(0),"cancel"!==t.t0&&console.error(t.t0);case 13:case"end":return t.stop()}}),t,null,[[0,10]])}))),e.startGame=function(){for(var t=[],a=e.state.width,n=e.state.height,s=0;s<n;s++){for(var r=[],i=0;i<a;i++)r.push({key:Math.random(),row:s,col:i,value:0});t.push({key:Math.random(),data:r})}e.setState({board:t,operation:[],status:"initial"})},e.handleDig=function(t){var a=e.state,n=a.board.map((function(e){return Object(o.a)(Object(o.a)({},e),{},{data:e.data.map((function(e){return Object(o.a)({},e)}))})})),s=a.status;if("failed"!==s&&"success"!==s){for("initial"===s&&(e.initMines(n,a.mines,t.row,t.col),s="running"),-1===e.dig(n,t.row,t.col)&&(s="failed");"running"===s&&e.autoproc(n););if("running"===s&&e.gameFinished(n)){var r,i=Object(l.a)(n);try{var u=function(){var e=r.value;e.data.forEach((function(t,a){var n=15&t.value;k===n&&(e.data[a].value|=64)}))};for(i.s();!(r=i.n()).done;)u()}catch(d){i.e(d)}finally{i.f()}s="success"}var h=[].concat(Object(c.a)(a.operation),[{time:(new Date).getTime(),col:t.col,row:t.row}]);"failed"!==s&&"success"!==s||function(e,t){for(var a=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=e[0].data.length,s=e.length,r=[],i=0;i<s;i++)for(var c=0;c<n;c++){var o=e[i].data[c].value;k===(15&o)&&r.push({col:c,row:i})}var u=[];try{var h=localStorage.getItem("react-minesweeper-log");h&&(u=JSON.parse(h))}catch(j){console.error(j)}Array.isArray(u)||(u=[]);var v,m=Object(l.a)(u);try{for(m.s();!(v=m.n()).done;){var p=v.value;p.id||(p.id=Object(f.a)())}}catch(d){m.e(d)}finally{m.f()}u.push({id:Object(f.a)(),width:n,height:s,success:a,mines:r,operation:t}),localStorage.setItem("react-minesweeper-log",JSON.stringify(u))}(n,h,"success"===s),e.setState(Object(o.a)(Object(o.a)({},a),{},{operation:h,status:s,board:n}))}},e.openDataAnalysis=function(){window.open("#/dataAnalysis")},e}return Object(m.a)(a,[{key:"getNeighbours",value:function(e,t,a,n){for(var s=[],r=a-1;r<=a+1;r++)for(var i=n-1;i<=n+1;i++)r<0||r>=e||i<0||i>=t||r===a&&i===n||s.push({row:r,col:i});return s}},{key:"getNeighbourMineCount",value:function(e,t,a){var n,s,r,i=e.length,c=e[0].data.length,o=0,u=Object(l.a)(this.getNeighbours(i,c,t,a));try{for(u.s();!(r=u.n()).done;){var h=r.value;n=h.row,s=h.col;var d=e[n].data[s];k===(15&d.value)&&o++}}catch(v){u.e(v)}finally{u.f()}return o}},{key:"initMines",value:function(e,t,a,n){var s=e.length,r=e[0].data.length;if(t>=s*r)throw new RangeError("Too many mines");for(var i=[],c=0;c<s;c++)for(var l=0;l<r;l++)a===c&&n===l||i.push({row:c,col:l});for(var o=i.length,u=0;u<o;u++)if(!(Math.random()>.5)){var h=Math.floor(Math.random()*(o-u-1))+u+1;if(i[h]){var d=i[u];i[u]=i[h],i[h]=d}}for(var v=0;v<t&&i.length;v++){var m=Math.floor(Math.random()*(i.length-1));try{var p=i[m],j=p.row,g=p.col;e[j].data[g].value=k,i.splice(m,1)}catch(x){console.error(m,i.length,i[m])}}for(var b=0;b<s;b++)for(var f=0;f<r;f++){var O=e[b].data[f];k!==O.value&&(O.value=this.getNeighbourMineCount(e,b,f))}}},{key:"dig",value:function(e,t,a){var n=e[t].data[a],s=15&n.value;return 192&n.value?0:(e[t].data[a].value|=128,k===s?-1:1)}},{key:"mark",value:function(e,t,a){e[t].data[a].value|=64}},{key:"autoproc",value:function(e){for(var t=this,a=e.length,n=e[0].data.length,s=!1,r=0;r<a;r++)for(var i=0;i<n;i++){var c=e[r].data[i],l=15&c.value;if(k!==l&&192&c.value){var o=this.getNeighbours(a,n,r,i).filter((function(t){var a=t.row,n=t.col;return!(128&e[a].data[n].value)}));0===l?o.forEach((function(a){var n=a.row,r=a.col;t.dig(e,n,r)&&(s=!0)})):o.length===l&&o.forEach((function(a){var n=a.row,s=a.col;t.mark(e,n,s)}))}}for(var u=0;u<a;u++)for(var h=function(r){var i=e[u].data[r],c=15&i.value;if(k===c||!(192&i.value)||0===c)return"continue";var l=t.getNeighbours(a,n,u,r),o=0;return l.forEach((function(t){var a=t.row,n=t.col;64&e[a].data[n].value&&o++})),c!==o?"continue":(l.forEach((function(a){var n=a.row,r=a.col;192&e[n].data[r].value||(s=!0,t.dig(e,n,r))})),"failed"===t.status?{v:!1}:void 0)},d=0;d<n;d++){var v=h(d);if("continue"!==v&&"object"===typeof v)return v.v}return s}},{key:"gameFinished",value:function(e){for(var t=e.length,a=e[0].data.length,n=0;n<t;n++)for(var s=0;s<a;s++){var r=e[n].data[s],i=15&r.value;if(k!==i&&!(128&r.value))return!1}return!0}},{key:"componentDidMount",value:function(){var e=Object(d.a)(h.a.mark((function e(){var t;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.setState({width:30,height:16,mines:99});case 2:if(e.prev=2,!(t=localStorage.getItem("react-minesweeper-settings"))){e.next=8;break}return t=JSON.parse(t),e.next=8,this.setState({width:Number(t.width),height:Number(t.height),mines:Number(t.mines)});case 8:e.next=13;break;case 10:e.prev=10,e.t0=e.catch(2),console.error(e.t0);case 13:this.startGame();case 14:case"end":return e.stop()}}),e,this,[[2,10]])})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,t=this.state.status,a=t,n="";switch(t){case"success":n="Succeed";break;case"failed":n="Failed"}var s,r=this.state.mines,i=Object(l.a)(this.state.board);try{for(i.s();!(s=i.n()).done;){var c,o=s.value,u=Object(l.a)(o.data);try{for(u.s();!(c=u.n()).done;){64&c.value.value&&r--}}catch(h){u.e(h)}finally{u.f()}}}catch(h){i.e(h)}finally{i.f()}return Object(g.jsx)(w.a,{children:function(t){return Object(g.jsxs)("div",{className:"gamePage",children:[Object(g.jsxs)("div",{className:"titleBar",children:[Object(g.jsxs)("div",{className:"btnGroup",children:[Object(g.jsx)("span",{className:"newGame btn-link",onClick:e.startGame,children:t("New Game")}),Object(g.jsx)("span",{className:"back btn-link",onClick:e.openSetting,children:t("Settings")}),Object(g.jsx)("span",{className:"newGame btn-link",onClick:e.openDataAnalysis,children:t("Data Analysis")})]}),Object(g.jsxs)("div",{className:"statusGroup",children:[Object(g.jsxs)("span",{className:"steps",children:[t("Steps"),e.state.operation.length]}),Object(g.jsxs)("span",{className:"remainMines",children:[t("Remain"),r]})]})]}),Object(g.jsx)("div",{className:["statusLine",a].join(" "),children:n?t(n):null}),Object(g.jsx)("div",{className:"gamePadOuter",children:Object(g.jsx)("div",{className:"gamePad",children:e.state.board.map((function(t){return Object(g.jsx)("div",{className:"gamePadRow",children:t.data.map((function(t){return Object(g.jsx)(b,{data:t,onDig:e.handleDig,status:e.state.status},t.key)}))},t.key)}))})}),Object(g.jsx)(N,{ref:e.$refs.settingDialog})]})}})}}]),a}(n.Component),M=a(30),A=(a(59),a(39)),E=a.n(A),D=function(e){Object(p.a)(a,e);var t=Object(j.a)(a);function a(){var e;Object(v.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={dataRaw:null,dataList:[]},e.exportJSON=function(){Object(M.saveAs)(new Blob([JSON.stringify(e.state.dataRaw)],{type:"text/plain;charset=utf-8"}),"minesweeper-log.json")},e.exportDBF=function(){var t,a=[],n=Object(l.a)(e.state.dataRaw);try{for(n.s();!(t=n.n()).done;){var s=t.value;a.push({WIDTH:s.width,HEIGHT:s.height,MINES:s.mines.length,SUCCESS:s.success?1:0,STEPS:s.operation.length,START:s.operation[0].time,TIME:s.operation[s.operation.length-1].time-s.operation[0].time})}}catch(r){n.e(r)}finally{n.f()}Object(M.saveAs)(new Blob([E.a.structure(a).buffer]),"mine.dbf")},e.goBack=function(){window.close(),window.location="#/"},e}return Object(m.a)(a,[{key:"componentWillMount",value:function(){var e=function(){var e=[];try{var t=localStorage.getItem("react-minesweeper-log");t&&(e=JSON.parse(t))}catch(a){console.error(a)}return e}(),t=e.filter((function(e){return 10===e.width&&10===e.height&&10===e.mines.length})),a=e.filter((function(e){return 16===e.width&&16===e.height&&40===e.mines.length})),n=e.filter((function(e){return(30===e.width&&16===e.height||16===e.width&&30===e.height)&&99===e.mines.length}));this.setState({dataRaw:e,dataList:[Object(o.a)({label:"Beginner"},this.getStatResult(t)),Object(o.a)({label:"Middle"},this.getStatResult(a)),Object(o.a)({label:"Expert"},this.getStatResult(n))]})}},{key:"getStatResult",value:function(e){var t,a=0,n=0,s=0,r=0,i=Object(l.a)(e);try{for(i.s();!(t=i.n()).done;){var c=t.value;c.success&&a++,1===c.operation.length&&n++,s+=c.operation.length,r+=c.operation[c.operation.length-1].time-c.operation[0].time}}catch(o){i.e(o)}finally{i.f()}return{success_rate:e.length?a/e.length:0,one_click_finish:n,average_steps:e.length?s/e.length:0,average_time:e.length?r/e.length:0}}},{key:"render",value:function(){var e=this;return Object(g.jsx)(w.a,{children:function(t){return Object(g.jsxs)("div",{className:"dataAnalysis",children:[Object(g.jsxs)("div",{className:"toolbox",children:[Object(g.jsx)("span",{className:"btn-link",onClick:e.goBack,children:t("Close")}),Object(g.jsx)("span",{className:"btn-link",onClick:e.exportJSON,children:t("Export JSON")}),Object(g.jsx)("span",{className:"btn-link",onClick:e.exportDBF,children:t("Export DBF")})]}),Object(g.jsx)("table",{className:"mainTable",children:Object(g.jsxs)("tbody",{children:[Object(g.jsxs)("tr",{children:[Object(g.jsx)("th",{children:t("Level")}),Object(g.jsx)("th",{children:t("Success Rate")}),Object(g.jsx)("th",{children:t("Average Steps")}),Object(g.jsx)("th",{children:t("Average Time")}),Object(g.jsx)("th",{children:t("One-step Success Times")})]}),e.state.dataList.map((function(e){return Object(g.jsxs)("tr",{children:[Object(g.jsx)("td",{children:t(e.label)}),Object(g.jsxs)("td",{children:[(100*e.success_rate).toFixed(2),"%"]}),Object(g.jsx)("td",{children:e.average_steps.toFixed(2)}),Object(g.jsxs)("td",{children:[(e.average_time/1e3).toFixed(2),"s"]}),Object(g.jsx)("td",{children:e.one_click_finish})]},e.label)}))]})})]})}})}}]),a}(n.Component),B=a(42),T=a(2),L=a(44),R={zh:{translation:{Minesweeper:"\u626b\u96f7","New Game":"\u65b0\u6e38\u620f","Data Analysis":"\u6570\u636e\u5206\u6790",Settings:"\u8bbe\u7f6e",Steps:"\u6b65\u6570\uff1a",Remain:"\u5269\u4f59\u96f7\u6570\uff1a",Failed:"\u5931\u8d25\u4e86",Succeed:"\u6210\u529f\u4e86",Beginner:"\u521d\u7ea7",Middle:"\u4e2d\u7ea7",Expert:"\u9ad8\u7ea7",Width:"\u5bbd\u5ea6",Height:"\u9ad8\u5ea6","Mines Count":"\u96f7\u6570",OK:"\u786e\u5b9a",Cancel:"\u53d6\u6d88",error_width:"\u5bbd\u5ea6\u503c\u5fc5\u987b\u4e3a\u6574\u6570",error_height:"\u9ad8\u5ea6\u503c\u5fc5\u987b\u4e3a\u6574\u6570",error_mines:"\u96f7\u6570\u5fc5\u987b\u4e3a\u6574\u6570",Back:"\u8fd4\u56de",Close:"\u5173\u95ed","Export JSON":"\u5bfc\u51faJSON\u6570\u636e","Export DBF":"\u5bfc\u51faDBF\u6570\u636e",Level:"\u7ea7\u522b","Success Rate":"\u6210\u529f\u7387","Average Steps":"\u5e73\u5747\u6b65\u6570","Average Time":"\u5e73\u5747\u7528\u65f6","One-step Success Times":"\u4e00\u6b65\u6210\u529f\u6b21\u6570"}},en:{translation:(y={Minesweeper:"Minesweeper","New Game":"New Game","Data Analysis":"Data Analysis",Settings:"Settings",Steps:"Steps: ",Remain:"Remain: ",Failed:"Failed",Succeed:"Succeed",Beginner:"Beginner",Middle:"Middle",Expert:"Expert",Width:"Width",Height:"Height","Mines Count":"Mines",OK:"OK",Cancel:"Cancel",error_width:"Width must be integer",error_height:"Height must be integer",error_mines:"Mines must be integer",Back:"Back",Close:"Close","Export JSON":"Export As JSON","Export DBF":"Export As DBF",Level:"Level","Success Rate":"Success Rate","Average Steps":"Avg. Steps","Average Time":"Avg. Time"},Object(O.a)(y,"Average Time","Avg. Time"),Object(O.a)(y,"One-step Success Times","One-step Success Times"),y)},ja:{translation:{Minesweeper:"\u30de\u30a4\u30f3\u30b9\u30a4\u30fc\u30d1","New Game":"\u30b9\u30bf\u30fc\u30c8","Data Analysis":"\u30c7\u30fc\u30bf\u89e3\u6790",Settings:"\u8a2d\u5b9a",Steps:"\u64cd\u4f5c\u56de\u6570\uff1a",Remain:"\u6b8b\u308a\u5730\u96f7\uff1a",Failed:"\u5931\u6557\u3057\u307e\u3057\u305f",Succeed:"\u6210\u529f\u3057\u307e\u3057\u305f",Beginner:"\u521d\u7d1a",Middle:"\u4e2d\u7d1a",Expert:"\u4e0a\u7d1a",Width:"\u5e45",Height:"\u9ad8\u3055","Mines Count":"\u5730\u96f7\u306e\u6570",OK:"OK",Cancel:"\u30ad\u30e3\u30f3\u30bb\u30eb",error_width:"\u5e45\u306f\u6574\u6570\u3067\u306a\u3051\u308c\u3070\u306a\u308a\u307e\u305b\u3093",error_height:"\u9ad8\u3055\u306f\u6574\u6570\u3067\u306a\u3051\u308c\u3070\u306a\u308a\u307e\u305b\u3093",error_mines:"\u5730\u96f7\u306e\u6570\u306f\u6574\u6570\u3067\u306a\u3051\u308c\u3070\u306a\u308a\u307e\u305b\u3093",Back:"\u623b\u308b",Close:"\u9589\u3058\u308b","Export JSON":"JSON\u3092\u30a8\u30af\u30b9\u30dd\u30fc\u30c8","Export DBF":"DBF\u3092\u30a8\u30af\u30b9\u30dd\u30fc\u30c8",Level:"\u30ec\u30d9\u30eb","Success Rate":"\u6210\u529f\u7387","Average Steps":"\u5e73\u5747\u64cd\u4f5c\u56de\u6570","Average Time":"\u5e73\u5747\u6642\u9593","One-step Success Times":"\u4e00\u56de\u306e\u64cd\u4f5c\u3067\u6210\u529f\u3067\u304d\u308b\u306e\u56de\u6570"}}},_=a(20),I=a(41);L.a.use(_.e).use(I.a).init({resources:R,fallbackLng:"en",keySeparator:!1,interpolation:{escapeValue:!1},detection:{order:["querystring","navigator"],lookupQuerystring:"language",caches:[]}}).then((function(e){document.title=e("Minesweeper")})),i.a.render(Object(g.jsx)(s.a.StrictMode,{children:Object(g.jsxs)(B.a,{children:[Object(g.jsx)(T.a,{path:"/",exact:!0,component:C}),Object(g.jsx)(T.a,{path:"/dataAnalysis",exact:!0,component:D})]})}),document.getElementById("root"))}},[[67,1,2]]]);
//# sourceMappingURL=main.9413ad8b.chunk.js.map