(this.webpackJsonprebuild=this.webpackJsonprebuild||[]).push([[4],{439:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return f}));var a=n(2),c=n.n(a),l=n(13),s=n(20),i=n(24),r=n(31),o=n(0),b=n(16),u=n(32),d=n(46),p=n(1),j=r.a.constants.Zero,x={input:{want:j,coll:j},output:{bond:j},tip:{fee:"0.0000",min:"0.000",slip:"0.00"},I:{want:"",coll:""},old:{want:"",coll:""}},m=function(e,t){return r.a.utils.formatUnits(e,t||18)},O=function(e,t){return r.a.utils.parseUnits(e||"0",t||18)};function f(){var e=Object(o.useContext)(b.d).state,t=e.signer,n=e.controller,a=Object(o.useContext)(b.e),r=a.liteState,f=r.bond,h=r.want,w=r.coll,y=r.pool,v=r.data,g=a.classesChild,k=(a.setLiteState,a.handleClick);x.tip.apy=v.apy.toPrecision(3);var _=Object(o.useReducer)((function(e,t){return Object(s.a)(Object(s.a)({},e),t)}),x),C=Object(i.a)(_,2),N=C[0],I=C[1];return Object(o.useEffect)((function(){return N==x||I(x)}),[y]),Object(o.useEffect)((function(){t&&!j.eq(v.swap.sk)&&Object(l.a)(c.a.mark((function e(){var t,a,l,s;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=O(N.I.want,y.want.decimals),a=O(N.I.coll),t.eq(N.input.want)&&a.eq(N.input.coll)||(l=t.add(a),s={fee:(m(t,y.want.decimals)*(1-m(v.swap.fee))).toFixed(4),min:(.995*m(l,y.bond.decimals)).toFixed(3),slip:n.calc_slip(v,[l,null],y).toPrecision(3),apy:v.apy.toPrecision(3)},I({input:{want:t,coll:a},output:{bond:l},tip:s}));case 3:case"end":return e.stop()}}),e)})))()}),[N]),Object(o.useMemo)((function(){return Object(p.jsxs)("div",{className:g.root,children:[Object(p.jsxs)("div",{className:g.amount,children:[Object(p.jsx)("div",{children:Object(p.jsx)(u.b,{title:["want","coll"],State:{state:N,setState:I,token:[h,w],max:[v.balance.want.lt(v.balance.call.sub(N.input.coll))?v.balance.want:v.balance.call.sub(N.input.coll),v.balance.coll.lt(v.balance.call.sub(N.input.want))?v.balance.coll:v.balance.call.sub(N.input.want)],if_max:[v.allowance.want.gt("100000000000000000000000000000000"),v.balance.coll.gt("0")]},style:{height:"90px"}})}),Object(p.jsx)("img",{alt:"",src:d.b,className:g.icon}),Object(p.jsx)("div",{children:Object(p.jsx)(u.c,{title:"bond",state:{state:N,token:f},style:{height:"90px"}})})]}),Object(p.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[Object(p.jsxs)("div",{style:{margin:"10px 0",fontFamily:"Helvetica",fontSize:"12px"},children:["Maximum debt = ",m(v.balance.call)," ",h.symbol]}),Object(p.jsx)(u.d,{apy:N.tip.apy,info:Object(p.jsxs)("div",{children:[Object(p.jsxs)("div",{children:["Slippage tolerance: ",N.tip.slip," %"]}),Object(p.jsxs)("div",{children:["Minimum recieved: ",N.tip.min," ",f.symbol]}),Object(p.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[Object(p.jsx)("span",{style:{marginRight:"5px"},children:"Route:"}),Object(p.jsx)("span",{children:w.symbol}),Object(p.jsx)("span",{className:"material-icons",children:"keyboard_double_arrow_right"}),Object(p.jsx)("span",{children:f.symbol}),Object(p.jsx)("span",{style:{margin:"0 5px"},children:"/"}),Object(p.jsx)("span",{children:h.symbol}),Object(p.jsx)("span",{className:"material-icons",children:"keyboard_double_arrow_right"}),Object(p.jsx)("span",{children:f.symbol})]}),Object(p.jsxs)("div",{children:["Nominal swap fee: ",N.tip.fee," ",h.symbol]})]})})]}),Object(p.jsx)("div",{className:g.buttonOne,children:Object(p.jsxs)("div",{children:[Object(p.jsx)(u.j,{name:"Approve",onClick:function(){return k("approve")(h)},disabled:!t||v.allowance.want.gt("100000000000000000000000000000000")}),Object(p.jsx)(u.j,{name:"Repay",onClick:Object(l.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k("repay")(N.input.want,N.input.coll);case 2:if(e.t0=e.sent,!e.t0){e.next=5;break}e.t0=I({I:{want:"",coll:""}});case 5:return e.abrupt("return",e.t0);case 6:case"end":return e.stop()}}),e)}))),disabled:j.eq(N.output.bond)})]})})]})}),[N,v])}}}]);