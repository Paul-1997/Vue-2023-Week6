import{_ as L,b as f,s as p,d as D,S as P,f as T,a as m,e as t,g as d,h as y,F as A,i as N,t as h,w as M,r as x,o as _,j as w,k as E,v as k,n as V}from"./index-RvlfNf1O.js";var U={VITE_APP_API_URL:"https://vue3-course-api.hexschool.io",VITE_APP_API_NAME:"paul7426",BASE_URL:"/Vue-2023-Week6/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_APP_API_NAME:g,VITE_APP_API_URL:v}=U,S={data(){return{isLoading:!1,cart:{carts:[]},formData:{userName:"",userEmail:"",userTel:"",userAddress:"",userMsg:""}}},methods:{async getCarts(){var n,s;try{const a=await f.get(`${v}/v2/api/${g}/cart`);a.data.success&&(this.cart=a.data.data)}catch(a){const o=((s=(n=a==null?void 0:a.response)==null?void 0:n.data)==null?void 0:s.message)??"出錯了٩(ŏ﹏ŏ、)۶";p(o)}},async updateCart({id:n,product_id:s,qty:a,final_total:o},e){var b,u;if(a*e===o)return;const c={data:{product_id:s,qty:a}};try{const i=await f.put(`${v}/v2/api/${g}/cart/${n}`,c);D(i.data.message),this.getCarts()}catch(i){const C=((u=(b=i==null?void 0:i.response)==null?void 0:b.data)==null?void 0:u.message)??"出錯了٩(ŏ﹏ŏ、)۶";p(C)}},async removeCart(n){var s,a;try{const o=await f.delete(`${v}/v2/api/${g}/cart/${n}`);o.data.success&&(D(`該品項${o.data.message}`),this.getCarts())}catch(o){const e=((a=(s=o==null?void 0:o.response)==null?void 0:s.data)==null?void 0:a.message)??"出錯了٩(ŏ﹏ŏ、)۶";p(e)}},async removeAllCart(){var n,s;try{(await f.delete(`${v}/v2/api/${g}/carts`)).data.success&&(D("購物車已清空(๑•̀ㅂ•́)و✧"),this.getCarts())}catch(a){const o=((s=(n=a==null?void 0:a.response)==null?void 0:n.data)==null?void 0:s.message)??"出錯了٩(ŏ﹏ŏ、)۶";p(o)}},async createOrder(){var s,a;const n={data:{user:{name:this.formData.userName,email:this.formData.userEmail,tel:this.formData.userTel,address:this.formData.userAddress},message:this.formData.userMsg}};try{this.isLoading=!0,(await f.post(`${v}/v2/api/${g}/order`,n)).data.success&&(this.isLoading=!1,P.fire({icon:"success",title:"已送出表單!",showConfirmButton:!1,timer:1e3}),this.getCarts())}catch(o){this.isLoading&&(this.isLoading=!1);const e=((a=(s=o==null?void 0:o.response)==null?void 0:s.data)==null?void 0:a.message)??"出錯了٩(ŏ﹏ŏ、)۶";p(e)}}},computed:{getTotal(){return this.cart.total?T(+this.cart.total)||"$ 0 元":""}},mounted(){this.getCarts()}},I={id:"cartList",class:"container mt-4"},B={class:"text-end mb-3"},q={class:"table align-middle"},O=t("thead",null,[t("tr",null,[t("th"),t("th",null,"品名"),t("th",{style:{width:"150px"}},"數量/單位"),t("th",{class:"text-end"},"總價")])],-1),R={key:0},F=t("td",{colspan:"4"},[t("p",{class:"fw-bold fs-4 py-2 text-secondary text-center"},"購物車裡面沒有任何商品喔!(◞‸◟)")],-1),j=["onClick"],z={key:0,class:"text-success"},W={class:"input-group input-group-sm"},G={class:"input-group mb-3"},H=["onUpdate:modelValue","onBlur"],J={class:"input-group-text",id:"basic-addon2"},K={class:"text-end"},Q={key:0,class:"text-success"},X=t("td",{colspan:"3",class:"text-end"},"總計",-1),Y={class:"text-end"},Z={key:0},$=t("td",{colspan:"3",class:"text-end text-success"},"折扣價",-1),tt={class:"text-end text-success"},st={id:"orderForm",class:"my-5 row justify-content-center"},et={class:"mb-3"},at=t("label",{for:"email",class:"form-label"},"Email",-1),ot={class:"mb-3"},lt=t("label",{for:"name",class:"form-label"},"收件人姓名",-1),rt={class:"mb-3"},nt=t("label",{for:"tel",class:"form-label"},"收件人電話",-1),it={class:"mb-3"},dt=t("label",{for:"address",class:"form-label"},"收件人地址",-1),ct={class:"mb-3"},ut=t("label",{for:"message",class:"form-label"},"留言",-1),mt=t("div",{class:"text-end"},[t("button",{type:"submit",class:"btn btn-danger"},"送出訂單")],-1);function _t(n,s,a,o,e,c){const b=x("VueLoading"),u=x("v-field"),i=x("error-message"),C=x("v-form");return _(),m(A,null,[t("div",I,[t("div",B,[t("button",{class:"btn btn-outline-danger",type:"button",onClick:s[0]||(s[0]=(...l)=>c.removeAllCart&&c.removeAllCart(...l))}," 清空購物車 ")]),t("div",null,[t("table",q,[O,t("tbody",null,[e.cart.carts.length?y("",!0):(_(),m("tr",R,[d(b,{active:e.isLoading},null,8,["active"]),F])),(_(!0),m(A,null,N(e.cart.carts,l=>(_(),m("tr",{key:l.id},[t("td",null,[t("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:r=>c.removeCart(l.id)},"x ",8,j)]),t("td",null,[w(h(l.product.title)+" ",1),l.coupon?(_(),m("div",z," 已套用優惠券 ")):y("",!0)]),t("td",null,[t("div",W,[t("div",G,[E(t("input",{"onUpdate:modelValue":r=>l.qty=r,onBlur:r=>c.updateCart(l,l.product.price),class:"form-control"},null,40,H),[[k,l.qty,void 0,{number:!0}]]),t("span",J,h(l.product.unit),1)])])]),t("td",K,[e.cart.final_total!==e.cart.total?(_(),m("small",Q,"折扣價：")):y("",!0),w(" "+h(l.final_total),1)])]))),128))]),t("tfoot",null,[t("tr",null,[X,t("td",Y,h(c.getTotal),1)]),e.cart.final_total!==e.cart.total?(_(),m("tr",Z,[$,t("td",tt,h(e.cart.final_total),1)])):y("",!0)])])])]),t("div",st,[d(C,{ref:"form",class:"col-md-6",onSubmit:c.createOrder},{default:M(({errors:l})=>[t("div",et,[at,d(u,{id:"email",name:"email",type:"email",class:V(["form-control",{"is-invalid":l.email}]),placeholder:"請輸入 Email",rules:"email|required",modelValue:e.formData.userEmail,"onUpdate:modelValue":s[1]||(s[1]=r=>e.formData.userEmail=r)},null,8,["class","modelValue"]),d(i,{name:"email",class:"invalid-feedback"})]),t("div",ot,[lt,d(u,{id:"name",name:"姓名",type:"text",class:V(["form-control",{"is-invalid":l.姓名}]),placeholder:"請輸入姓名",rules:"required",modelValue:e.formData.userName,"onUpdate:modelValue":s[2]||(s[2]=r=>e.formData.userName=r),modelModifiers:{trim:!0}},null,8,["class","modelValue"]),d(i,{name:"姓名",class:"invalid-feedback"})]),t("div",rt,[nt,d(u,{id:"tel",name:"電話",type:"text",class:V(["form-control",{"is-invalid":l.電話}]),placeholder:"請輸入電話",rules:"required|min:8|max:10",modelValue:e.formData.userTel,"onUpdate:modelValue":s[3]||(s[3]=r=>e.formData.userTel=r)},null,8,["class","modelValue"]),d(i,{name:"電話",class:"invalid-feedback"})]),t("div",it,[dt,d(u,{id:"address",name:"地址",type:"text",class:V(["form-control",{"is-invalid":l.地址}]),placeholder:"請輸入地址",rules:"required",modelValue:e.formData.userAddress,"onUpdate:modelValue":s[4]||(s[4]=r=>e.formData.userAddress=r),modelModifiers:{trim:!0}},null,8,["class","modelValue"]),d(i,{name:"地址",class:"invalid-feedback"})]),t("div",ct,[ut,E(t("textarea",{id:"message",class:"form-control",cols:"30",rows:"10","onUpdate:modelValue":s[5]||(s[5]=r=>e.formData.message=r),style:{resize:"none"}},null,512),[[k,e.formData.message,void 0,{trim:!0}]])]),mt]),_:1},8,["onSubmit"])])],64)}const pt=L(S,[["render",_t]]);export{pt as default};