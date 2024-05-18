import{g as z,E as G,h as I,D as H,i as N,r as v,o as _,a as M,e as l,b as m,w as y,j as V,t as w,k as O,d as J,l as K,m as U,n as E,v as j,p as Q,c as R,F as W,q as X}from"./index-C3wEr5uv.js";function A(o){const p=(a,i,D)=>{G.confirm(a,"警告",{confirmButtonText:"確定",cancelButtonText:"取消",type:"warning"}).then(g=>{D(g)}).catch(()=>{I({type:"info",message:i})})},d=a=>a?a.replace(/,/g,"")*1:0,C=a=>a?a.toLocaleString("zh",{style:"decimal"}):0,b=a=>a?a.replace(/[^\d]/g,""):"",f=(a,i,D,g)=>a?new H(a).div(i).times(D).toFixed(g):0,t=z({total:0,increment(a){t.total+=a}});return{messageBox:p,addComma:C,minusComma:d,percentMethod:f,handleInteger:b,confirmState:t}}const Y={class:"card"},Z={class:"row horizontal v_center","data-space-bottom":"1.5rem"},tt={class:"row horizontal v_center"},et=l("p",{"data-space-right":"1rem"},"支付方式",-1),at={class:"row horizontal space_evenly center"},nt=l("span",{"data-space-left":"0.5rem"},"%",-1),ot={__name:"paymentCard",props:{deleteCard:{type:Boolean,default:!0},formData:Object,state:Object,finish:Function},emits:["delete:deleteItem","add:addTotal"],setup(o,{emit:p}){const{messageBox:d,addComma:C,minusComma:b,percentMethod:f,handleInteger:t}=A(),a=o,i=p,D=s=>s.getTime()<Date.now()-864e5,g=()=>i("delete:deleteItem"),x=()=>i("add:addTotal"),F=()=>{d("確認付款？","已取消付款",()=>{x()})},S=s=>{s=b(t(s));const e=b(a.state.total),n=f(s,e,100,6);a.formData.percent=n},L=s=>{a.formData.percent=s.replace(/[^\d.]/g,"").replace(/^0+(?=\d)/g,"");const e=b(a.state.total),n=f(a.formData.percent,100,e,0);a.formData.payment=n},k=()=>{d("確認刪除？","已取消刪除",()=>{g()})},B=s=>{S(s),$(s)},$=s=>{let e=C(b(t(s)));a.formData.payment=e};return N(()=>a.state.total,()=>{S(a.formData.payment)}),(s,e)=>{const n=v("el-radio"),c=v("el-radio-group"),r=v("el-button"),h=v("el-input"),P=v("el-form-item"),T=v("el-date-picker"),q=v("el-form");return _(),M("div",Y,[l("div",Z,[l("div",tt,[et,m(c,{modelValue:o.formData.paymentMethod,"onUpdate:modelValue":e[0]||(e[0]=u=>o.formData.paymentMethod=u),class:"ml-4",disabled:o.formData.isDisabled},{default:y(()=>[m(n,{value:"1",size:"large"},{default:y(()=>[V("現金")]),_:1}),m(n,{value:"2",size:"large"},{default:y(()=>[V("信用卡")]),_:1})]),_:1},8,["modelValue","disabled"])]),l("div",at,[l("h2",null,w(o.formData.paymentState),1),m(r,{disabled:o.formData.isDisabled,type:"danger",plain:"",onClick:e[1]||(e[1]=u=>F())},{default:y(()=>[V("確認付款")]),_:1},8,["disabled"])]),o.deleteCard?(_(),O(r,{key:0,type:"danger",text:"",circle:"",icon:J(K),onClick:e[2]||(e[2]=u=>k()),disabled:o.formData.isDisabled},null,8,["icon","disabled"])):U("",!0)]),m(q,{"label-width":"auto","label-position":"left",disabled:o.formData.isDisabled},{default:y(()=>[m(P,{label:"金額（整數）"},{default:y(()=>[m(h,{modelValue:o.formData.payment,"onUpdate:modelValue":e[3]||(e[3]=u=>o.formData.payment=u),style:{width:"240px"},onInput:e[4]||(e[4]=u=>B(o.formData.payment))},null,8,["modelValue"])]),_:1}),E(l("p",null,w(`缺${o.state.overPayment}元 (${o.state.overPercent}％)`),513),[[j,o.state.payState=="缺少"]]),E(l("p",null,w(`超收${o.state.overPayment}元`),513),[[j,o.state.payState=="超收"]]),m(P,{label:"所佔百分比"},{default:y(()=>[m(h,{modelValue:o.formData.percent,"onUpdate:modelValue":e[5]||(e[5]=u=>o.formData.percent=u),style:{width:"240px"},onInput:e[6]||(e[6]=u=>L(o.formData.percent))},null,8,["modelValue"]),nt]),_:1}),m(P,{label:"最晚付款日"},{default:y(()=>[m(T,{modelValue:o.formData.time,"onUpdate:modelValue":e[7]||(e[7]=u=>o.formData.time=u),type:"date","disabled-date":D,style:{width:"240px"}},null,8,["modelValue"])]),_:1})]),_:1},8,["disabled"])])}}},lt={class:"composables"},st={class:"row horizontal",style:{width:"600px"}},dt={class:"row horizontal v_center"},rt=l("h2",null,"支付總金額：",-1),mt=l("hr",{style:{width:"600px"},align:"left"},null,-1),it={class:"row horizontal","data-space-top":"1rem",style:{width:"600px"}},ct={"data-width":"50%"},ut=l("h1",{"data-space-bottom":"1.5rem"},"已支付金額",-1),yt={"data-width":"60%"},pt=l("h1",{"data-space-bottom":"1.5rem"},"付款次數 / 剩餘款項",-1),ft={class:"row vertical h_end","data-width":"35%"},ht={key:0,"data-space-top":"3rem"},bt={__name:"composables",setup(o){Q(()=>t.cardList.push(a));const{addComma:p,minusComma:d,percentMethod:C,handleInteger:b,confirmState:f}=A(),t=z({total:"",cardList:[],paymentFinish:!1,isFinish:!1,currentPayment:0,overPayment:0,overPercent:0,payState:"",confirmPayState:"",confirmCount:0,confirmOverPayment:0,confirmPayment:0}),a=z({payment:"",percent:"",time:"",deleteCard:!0,paymentState:"未付款",isDisabled:!1,paymentMethod:"1"}),i=()=>{const e={payment:"",percent:0,time:"",deleteCard:!0,paymentMethod:"1",paymentState:"未付款",isDisabled:!1};t.cardList.unshift(e)},D=e=>{t.cardList.splice(e,1),I.success("已刪除成功！")},g=R(()=>{let e=0;return e=t.cardList.length,e}),x=()=>{t.currentPayment=0;for(let e in t.cardList)t.currentPayment+=d(t.cardList[e].payment);t.currentPayment=p(t.currentPayment)},F=()=>{let e=d(t.total),n=d(t.overPayment);t.overPercent=C(n,e,100,6)},S=(e,n)=>{let c=d(e)-d(n),r={overPayment:0,payState:""};return c<0?(r.overPayment=p(Math.abs(c)),r.payState="超收"):c>0&&(r.overPayment=p(c),r.payState="缺少"),r},L=()=>{x();const{overPayment:e,payState:n}=S(t.total,t.currentPayment);t.overPayment=e,t.payState=n},k=()=>{const{overPayment:e,payState:n}=S(t.total,t.confirmPayment);t.confirmOverPayment=e,t.confirmPayState=n},B=(e,n)=>{let c=d(t.cardList[e].payment),r=d(t.total);f.increment(c),f.total<=r?(t.confirmPayment=p(f.total),k(),t.confirmCount++,t.cardList[e].paymentState="已付款",t.cardList[e].isDisabled=!0,$(),I.success("已付款成功")):(I.error("已支付金額超額，請重新輸入"),f.total-=c)},$=()=>{t.total==t.confirmPayment&&t.total!==0?t.paymentFinish=!0:t.paymentFinish=!1},s=e=>{let n=p(d(b(e)));t.total=n};return N(()=>t.total,()=>{L(),F(),k(),$()}),N(()=>t.cardList,()=>{L(),F()},{deep:!0}),(e,n)=>{const c=v("el-input"),r=v("el-button");return _(),M("div",lt,[l("div",st,[l("div",dt,[rt,m(c,{modelValue:t.total,"onUpdate:modelValue":n[0]||(n[0]=h=>t.total=h),style:{width:"150px"},onInput:n[1]||(n[1]=h=>s(t.total)),disabled:t.isFinish},null,8,["modelValue","disabled"])]),t.paymentFinish?U("",!0):(_(),O(r,{key:0,type:"info",plain:"",onClick:n[2]||(n[2]=h=>i())},{default:y(()=>[V("新增支付項目＋")]),_:1}))]),(_(!0),M(W,null,X(t.cardList,(h,P)=>(_(),O(ot,{key:P,deleteCard:P!==t.cardList.length-1,formData:h,state:t,finish:$,"onDelete:deleteItem":T=>D(P),"onAdd:addTotal":T=>B(P)},null,8,["deleteCard","formData","state","onDelete:deleteItem","onAdd:addTotal"]))),128)),mt,l("div",it,[l("div",ct,[ut,l("p",null,w(t.confirmPayment),1)]),l("div",yt,[pt,l("span",null,w(`${t.confirmCount}/${g.value}`),1),E(l("span",null,w(` ( 缺${t.confirmOverPayment}元 )`),513),[[j,t.confirmPayState=="缺少"]])]),l("div",ft,[m(r,{type:"danger",disabled:!t.paymentFinish,onClick:n[3]||(n[3]=h=>t.isFinish=!0)},{default:y(()=>[V("Submit")]),_:1},8,["disabled"]),t.isFinish?(_(),M("h2",ht,"已支付所有金額！")):U("",!0)])])])}}};export{bt as default};
