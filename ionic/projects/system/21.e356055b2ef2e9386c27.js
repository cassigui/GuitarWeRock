(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{FvvT:function(e,n,i){"use strict";i.r(n),i.d(n,"IndexPageModule",function(){return O});var t=i("tyNb"),o=i("mrSG"),c=i("RqZA"),r=i("TEn/"),s=i("fXoL"),l=i("CzVY"),a=i("IfTO"),b=i("G2dz"),d=i("3Pt+"),u=i("ofXK");const h=["search"],f=function(){return["/access-levels/",0]};function g(e,n){1&e&&(s.Rb(0,"ion-button",24),s.Mb(1,"ion-icon",25),s.Qb()),2&e&&s.jc("routerLink",s.lc(1,f))}function p(e,n){1&e&&s.Mb(0,"ion-col",16)}const m=function(e){return["/access-levels/",e]};function v(e,n){if(1&e&&(s.Rb(0,"ion-button",31),s.Mb(1,"ion-icon",32),s.Rb(2,"span",28),s.zc(3,"edit"),s.Qb(),s.Qb()),2&e){const e=s.dc(2).$implicit;s.jc("routerLink",s.mc(1,m,e.id))}}const R=function(){return{update:"access_levels"}},Q=function(e){return[e]};function z(e,n){1&e&&(s.Rb(0,"ion-col",16),s.xc(1,v,4,3,"ion-button",30),s.Qb()),2&e&&(s.zb(1),s.jc("ifAuth",s.mc(2,Q,s.lc(1,R))))}function x(e,n){if(1&e){const e=s.Sb();s.Rb(0,"ion-item-option",33),s.Zb("click",function(n){s.sc(e);const i=s.dc().$implicit,t=s.qc(1);return s.dc().remove(i,n,t)}),s.Mb(1,"ion-icon",34),s.zc(2," delete "),s.Qb()}}const w=function(e,n){return{"text-success":e,"text-danger":n}},_=function(){return{delete:"access_levels"}};function k(e,n){if(1&e&&(s.Rb(0,"ion-item-sliding",null,26),s.Rb(2,"ion-item"),s.Rb(3,"ion-col",15),s.zc(4),s.Qb(),s.Rb(5,"ion-col"),s.zc(6),s.Qb(),s.Rb(7,"ion-col",16),s.Mb(8,"ion-icon",27),s.Rb(9,"span",28),s.zc(10),s.Qb(),s.Qb(),s.xc(11,z,2,4,"ion-col",17),s.Qb(),s.Rb(12,"ion-item-options"),s.xc(13,x,3,0,"ion-item-option",29),s.Qb(),s.Qb()),2&e){const e=n.$implicit;s.zb(4),s.Bc("#",e.id,""),s.zb(2),s.Bc(" ",e.name," "),s.zb(2),s.jc("ngClass",s.nc(6,w,e.active,!e.active)),s.zb(2),s.Ac(e.active?"Active":"Inactive"),s.zb(1),s.jc("ifAuth",s.mc(10,Q,s.lc(9,R))),s.zb(2),s.jc("ifAuth",s.mc(13,Q,s.lc(12,_)))}}function j(e,n){1&e&&(s.Rb(0,"div"),s.Mb(1,"ion-skeleton-text",35),s.Qb())}function A(e,n){if(1&e&&(s.Pb(0),s.xc(1,j,2,0,"div",18),s.Ob()),2&e){const e=s.dc();s.zb(1),s.jc("ngForOf",e.trs)}}function S(e,n){if(1&e){const e=s.Sb();s.Rb(0,"ion-row",36),s.Rb(1,"ion-col",37),s.Rb(2,"ion-icon",38),s.Zb("click",function(){return s.sc(e),s.dc().content.scrollToTop(500)}),s.Qb(),s.Rb(3,"ion-label",39),s.zc(4," Todos registros foram listados "),s.Mb(5,"ion-icon",40),s.Qb(),s.Qb(),s.Qb()}if(2&e){const e=s.dc();s.zb(2),s.jc("hidden",e.access_levels.length<10)}}function y(e,n){1&e&&(s.Rb(0,"ion-row",41),s.Rb(1,"ion-col"),s.Rb(2,"ion-label",42),s.zc(3,"  Não há registros. "),s.Qb(),s.Qb(),s.Qb())}const M=function(){return{create:"access_levels"}};let I=(()=>{class e{constructor(e,n){this.accessLevelService=e,this.helperService=n,this.access_levels=[],this.loading=!1,this.filters={name:null},this.total_of_data=0,this._paginate={take:20,page:1},this.trs=new Array(5),this.tds=new Array(1)}ngOnInit(){this.paginate(null,null)}getFilters(){var e={};return Object.keys(this.filters).forEach(n=>{this.filters[n]&&(e[n]="%"+this.filters[n]+"%")},this),e}paginate(e=null,n=null){return Object(o.a)(this,void 0,void 0,function*(){(null!==e||null==e&&null==n)&&(this.access_levels=[],this._paginate.page=1),this.loading=!0,this.accessLevelService.get([],this.getFilters(),this._paginate).then(i=>Object(o.a)(this,void 0,void 0,function*(){this.total_of_data=i.access_levels.total,this._paginate.page=i.access_levels.current_page+1;for(let e of i.access_levels.data)this.access_levels.push(new c.a(e));this.loading=!1,e&&e.target.complete(),n&&n.target.complete()}),e=>{this.helperService.responseErrors(e)})})}remove(e,n,i){return Object(o.a)(this,void 0,void 0,function*(){let t=yield this.helperService.popover(n,"He is sure?",[{text:"back",color:"gray",value:!1},{text:"remove",color:"danger",value:!0}]);t.onDidDismiss().then(n=>{!0===n.data?(this.helperService.loading("Removendo"),this.destroy(e,i)):i.close()}),t.present()})}destroy(e,n){this.accessLevelService.destroy(e.id).then(i=>{if(!i.error){var t=this.access_levels.findIndex(n=>n.id==e.id);t>-1&&this.access_levels.splice(t,1)}this.helperService.toast(i.error?"warning":"success",i.message),n.close()},e=>{this.helperService.responseErrors(e)}).then(()=>this.helperService.loading_dismiss())}toggleSearch(){this.showFilter=!this.showFilter,this.showFilter&&setTimeout(()=>{this.search.setFocus()},100)}}return e.\u0275fac=function(n){return new(n||e)(s.Lb(l.a),s.Lb(a.a))},e.\u0275cmp=s.Fb({type:e,selectors:[["app-index"]],viewQuery:function(e,n){if(1&e&&(s.Ec(h,1),s.Ec(r.k,1),s.Ec(r.p,1)),2&e){let e;s.pc(e=s.ac())&&(n.search=e.first),s.pc(e=s.ac())&&(n.content=e.first),s.pc(e=s.ac())&&(n.infiniteScroll=e.first)}},decls:33,vars:15,consts:[["mode","ios"],["mode","ios","slot","start"],[3,"click"],["slot","end"],["mode","ios","color","white",3,"routerLink",4,"ifAuth"],["mode","ios",3,"color","click"],["name","funnel"],[1,"ion-no-padding"],["slot","fixed",1,"text-darkprimary",3,"ionRefresh"],["pullingText","Atualizar","refreshingSpinner","dots","refreshingText","Atualizando"],["lines","full","mode","ios",1,"no-border","mb-0"],["mode","md","color","customer",3,"hidden"],["debounce","250","mode","ios","placeholder","name ...",1,"p0","input-light",3,"ngModel","ngModelChange","ionChange"],["search",""],["mode","md"],["size","2","size-md","1"],["size","2"],["size","2",4,"ifAuth"],[4,"ngFor","ngForOf"],[4,"ngIf"],["threshold","30px",3,"ionInfinite"],["loadingSpinner","none"],["class","no-border","text-center","",4,"ngIf"],["color","light","text-center","",4,"ngIf"],["mode","ios","color","white",3,"routerLink"],["name","add-circle"],["slidingItem",""],["name","radio-button-on-outline",3,"ngClass"],[1,"ion-hide-sm-down"],["color","danger","expandable","",3,"click",4,"ifAuth"],["routerDirection","forward","expand","block","color","primary",3,"routerLink",4,"ifAuth"],["routerDirection","forward","expand","block","color","primary",3,"routerLink"],["slot","start","name","create"],["color","danger","expandable","",3,"click"],["slot","start","name","trash"],["animated","",2,"width","100%","height","50px"],["text-center","",1,"no-border"],[1,"text-center"],["color","medium","size","large","name","caret-up-circle-outline",1,"mt-15","ion-float-end",3,"hidden","click"],["color","medium",1,"p20"],["name","thumbs-up","color","medium"],["color","light","text-center",""],["padding-top","","padding-bottom",""]],template:function(e,n){1&e&&(s.Rb(0,"ion-header"),s.Rb(1,"ion-toolbar",0),s.Mb(2,"ion-menu-button",1),s.Rb(3,"ion-title",2),s.Zb("click",function(){return n.content.scrollToTop(500)}),s.zc(4,"Access Levels"),s.Qb(),s.Rb(5,"ion-buttons",3),s.xc(6,g,2,2,"ion-button",4),s.Rb(7,"ion-button",5),s.Zb("click",function(){return n.toggleSearch()}),s.Mb(8,"ion-icon",6),s.Qb(),s.Qb(),s.Qb(),s.Qb(),s.Rb(9,"ion-content",7),s.Rb(10,"ion-refresher",8),s.Zb("ionRefresh",function(e){return n.paginate(e)}),s.Mb(11,"ion-refresher-content",9),s.Qb(),s.Rb(12,"ion-row"),s.Rb(13,"ion-col",7),s.Rb(14,"ion-list",10),s.Rb(15,"ion-item-divider",11),s.Rb(16,"ion-col"),s.Rb(17,"ion-searchbar",12,13),s.Zb("ngModelChange",function(e){return n.filters.name=e})("ionChange",function(){return n.paginate()}),s.Qb(),s.Qb(),s.Qb(),s.Rb(19,"ion-item-divider",14),s.Rb(20,"ion-col",15),s.zc(21,"#Id"),s.Qb(),s.Rb(22,"ion-col"),s.zc(23," Name "),s.Qb(),s.Rb(24,"ion-col",16),s.zc(25," Active "),s.Qb(),s.xc(26,p,1,0,"ion-col",17),s.Qb(),s.xc(27,k,14,15,"ion-item-sliding",18),s.xc(28,A,2,1,"ng-container",19),s.Rb(29,"ion-infinite-scroll",20),s.Zb("ionInfinite",function(e){return n.paginate(null,e)}),s.Mb(30,"ion-infinite-scroll-content",21),s.Qb(),s.xc(31,S,6,1,"ion-row",22),s.xc(32,y,4,0,"ion-row",23),s.Qb(),s.Qb(),s.Qb(),s.Qb()),2&e&&(s.zb(6),s.jc("ifAuth",s.mc(10,Q,s.lc(9,M))),s.zb(1),s.kc("color",n.showFilter?"medium":"white"),s.zb(8),s.jc("hidden",!n.showFilter),s.zb(2),s.jc("ngModel",n.filters.name),s.zb(9),s.jc("ifAuth",s.mc(13,Q,s.lc(12,R))),s.zb(1),s.jc("ngForOf",n.access_levels),s.zb(1),s.jc("ngIf",n.loading),s.zb(3),s.jc("ngIf",n.total_of_data===n.access_levels.length&&n.total_of_data>0),s.zb(1),s.jc("ngIf",!n.loading&&!n.access_levels.length))},directives:[r.n,r.O,r.A,r.M,r.g,b.a,r.f,r.o,r.k,r.C,r.D,r.F,r.j,r.y,r.t,r.G,r.Z,d.g,d.h,u.k,u.l,r.p,r.q,r.Y,t.g,r.w,r.s,u.j,r.v,r.u,r.H,r.x],styles:[""]}),e})();var F=i("HJNQ");const L=[{path:"",component:I}];let O=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=s.Jb({type:e}),e.\u0275inj=s.Ib({imports:[[F.a,t.i.forChild(L)]]}),e})()}}]);