(this.webpackJsonprebuild=this.webpackJsonprebuild||[]).push([[5],{292:function(t,e,c){"use strict";c.r(e),c.d(e,"default",function(){return a});var e=c(3),u=c.n(e),d=c(6),b=c(11),j=c(14),n=c(17),h=c(0),x=c(8),f=c(19),O=c(1),w=n.ethers.constants.Zero,m={input:{clpt:w},output:{want:w,coll:w},tip:{share:"0.000",poolBalance:"0.00",fee:"0.0000",rate:{coll:0,want:0}},I:{clpt:""},old:{clpt:""}},v=function(t,e){return n.ethers.utils.formatUnits(t,e||18)},k=function(t,e){return n.ethers.utils.parseUnits(t||"0",e||18)};function a(){var t=Object(h.useContext)(x.d).state,a=(t.signer,t.controller),e=Object(h.useContext)(x.e),t=e.liteState,c=(t.bond,t.want),n=t.coll,s=t.pool,l=t.data,i=e.classesChild,r=e.handleClick,e=Object(h.useReducer)(function(t,e){return Object(b.a)(Object(b.a)({},t),e)},m),e=Object(j.a)(e,2),o=e[0],p=e[1];return Object(h.useEffect)(function(){return o==m||p(m)},[s]),Object(h.useEffect)(function(){Object(d.a)(u.a.mark(function t(){var e,c,n;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if((e=k(o.I.clpt)).eq(o.input.clpt)){t.next=6;break}return t.next=4,s.ct.get_dxdy(e).catch(function(t){return o.I.clpt.length>o.old.clpt.length&&o.I.clpt.length<v(o.input.clpt).length&&a.notify("balance","insufficient"),!1});case 4:(c=t.sent)&&(n={poolBalance:(v(l.swap.sx)/v(l.swap.sy,s.want.decimals)).toPrecision(3),share:(v(l.balance.clpt)/v(l.swap.sk)*100).toPrecision(3),rate:{coll:e.eq(w)?0:parseFloat(v(c[0])/o.I.clpt).toPrecision(3),want:e.eq(w)?0:parseFloat(v(c[1],s.want.decimals)/o.I.clpt).toPrecision(3)},fee:(v(c[0])*(1-v(l.swap.fee))).toFixed(4)},p({input:{clpt:e},output:{coll:c[0],want:c[1]},tip:n}));case 6:case"end":return t.stop()}},t)}))()},[o]),Object(h.useMemo)(function(){return Object(O.jsxs)("div",{className:i.root,children:[Object(O.jsxs)("div",{className:i.amount,children:[Object(O.jsx)("div",{children:Object(O.jsx)(f.a,{title:"clpt",State:{state:o,setState:p,token:s,max:l.balance.clpt,if_max:l.balance.clpt.gt("0")},style:{height:"239px"}})}),Object(O.jsx)("span",{className:i.icon,children:"navigate_next"}),Object(O.jsxs)("div",{children:[Object(O.jsx)(f.c,{title:"want",state:{state:o,token:c},style:{height:"90px"}}),Object(O.jsx)(f.c,{title:"coll",state:{state:o,token:n},style:{height:"90px"}})]})]}),Object(O.jsx)(f.d,{apy:"todo",info:Object(O.jsxs)("div",{children:[Object(O.jsxs)("div",{children:["Exchange Rate: ","1CLPT = ".concat(o.tip.rate.want," ").concat(c.symbol," + ").concat(o.tip.rate.coll," COLL")]}),Object(O.jsxs)("div",{children:["Share of Pool: ",o.tip.share," %"]}),Object(O.jsxs)("div",{children:["Pool Balance: ","1 ".concat(c.symbol," = ").concat(o.tip.poolBalance," COLL")]}),Object(O.jsxs)("div",{children:["Nominal swap fee: ",o.tip.fee," COLL"]})]})}),Object(O.jsxs)("div",{className:i.buttonTwo,children:[Object(O.jsxs)("div",{children:[Object(O.jsx)(f.j,{name:"Withdraw",onClick:Object(d.a)(u.a.mark(function t(){return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r("withdraw")(o.input.clpt);case 2:if(t.t0=t.sent,!t.t0){t.next=5;break}t.t0=p({I:{clpt:""}});case 5:return t.abrupt("return",t.t0);case 6:case"end":return t.stop()}},t)})),disabled:w.eq(o.output.want)||k(o.I.clpt).gt(l.balance.clpt)||!k(o.I.clpt).eq(o.input.clpt)}),Object(O.jsx)(f.j,{name:"Claim",onClick:function(){return r("claim")()},disabled:w.eq(l.earned.collar)})]}),Object(O.jsx)("div",{children:Object(O.jsx)(f.j,{name:"Withdraw & Claim",onClick:Object(d.a)(u.a.mark(function t(){return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r("burn_and_claim")(o.input.clpt);case 2:if(t.t0=t.sent,!t.t0){t.next=5;break}t.t0=p({I:{clpt:""}});case 5:return t.abrupt("return",t.t0);case 6:case"end":return t.stop()}},t)})),disabled:w.eq(o.output.want)||w.eq(l.earned.collar)||k(o.I.clpt).gt(l.balance.clpt)||!k(o.I.clpt).eq(o.input.clpt)})})]})]})},[o,l])}}}]);