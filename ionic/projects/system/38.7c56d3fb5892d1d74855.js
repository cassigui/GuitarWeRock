(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{"8Tm8":function(i,e,n){"use strict";n.r(e),n.d(e,"IndexPageModule",function(){return x});var o=n("tyNb"),t=n("HJNQ"),r=n("mrSG"),c=n("TEn/"),s=n("CzqR"),l=n("fXoL"),a=n("GS04"),b=n("IfTO"),d=n("3Pt+"),h=n("ofXK");const g=["search"],m=function(i){return["/microorganisms",i]};function u(i,e){if(1&i){const i=l.Sb();l.Rb(0,"ion-item",null,25),l.Rb(2,"ion-col",17),l.zc(3),l.Qb(),l.Rb(4,"ion-col",18),l.zc(5),l.Qb(),l.Rb(6,"ion-col",26),l.Rb(7,"ion-button",27),l.Mb(8,"ion-icon",28),l.zc(9," edit "),l.Qb(),l.Rb(10,"ion-button",29),l.Zb("click",function(n){l.sc(i);const o=e.$implicit;return l.dc().remove(o,n)}),l.Mb(11,"ion-icon",30),l.zc(12," remove "),l.Qb(),l.Qb(),l.Qb()}if(2&i){const i=e.$implicit;l.zb(3),l.Bc("#",i.id,""),l.zb(2),l.Bc(" ",i.name," "),l.zb(2),l.jc("routerLink",l.mc(3,m,i.id))}}function f(i,e){1&i&&(l.Rb(0,"div"),l.Mb(1,"ion-skeleton-text",31),l.Qb())}function p(i,e){if(1&i&&(l.Pb(0),l.xc(1,f,2,0,"div",19),l.Ob()),2&i){const i=l.dc();l.zb(1),l.jc("ngForOf",i.trs)}}function R(i,e){if(1&i){const i=l.Sb();l.Rb(0,"ion-row",32),l.Rb(1,"ion-col",33),l.Rb(2,"ion-icon",34),l.Zb("click",function(){return l.sc(i),l.dc().content.scrollToTop(500)}),l.Qb(),l.Rb(3,"ion-label",35),l.zc(4," Todos registros foram listados "),l.Mb(5,"ion-icon",36),l.Qb(),l.Qb(),l.Qb()}if(2&i){const i=l.dc();l.zb(2),l.jc("hidden",i.microorganisms.length<10)}}function v(i,e){1&i&&(l.Rb(0,"ion-row",37),l.Rb(1,"ion-col",33),l.Rb(2,"ion-label",38),l.zc(3,"  Não há registros. "),l.Qb(),l.Qb(),l.Qb())}const Q=function(){return["/microorganisms/create"]},z=[{path:"",component:(()=>{class i{constructor(i,e){this.microorganismService=i,this.helperService=e,this.microorganisms=[],this.loading=!1,this.filters={name:null},this.total_of_data=0,this._paginate={take:30,page:1},this.trs=new Array(5),this.tds=new Array(1)}ngOnInit(){}ionViewWillEnter(){this.paginate(null,null)}getFilters(){var i={};return Object.keys(this.filters).forEach(e=>{this.filters[e]&&(i[e]="%"+this.filters[e]+"%")},this),i}paginate(i=null,e=null){return Object(r.a)(this,void 0,void 0,function*(){(null!==i||null==i&&null==e)&&(this.microorganisms=[],this._paginate.page=1),this.loading=!0,this.microorganismService.get([],this.getFilters(),this._paginate).then(n=>Object(r.a)(this,void 0,void 0,function*(){this.total_of_data=n.microorganisms.total,this._paginate.page=n.microorganisms.current_page+1;for(let i of n.microorganisms.data)this.microorganisms.push(new s.a(i));this.loading=!1,i&&i.target.complete(),e&&e.target.complete()}),i=>{this.helperService.responseErrors(i)})})}remove(i,e){return Object(r.a)(this,void 0,void 0,function*(){let n=yield this.helperService.popover(e,"He is sure?",[{text:"back",color:"gray",value:!1},{text:"remove",color:"danger",value:!0}]);n.onDidDismiss().then(e=>{!0===e.data&&(this.helperService.loading("Removendo"),this.destroy(i))}),n.present()})}destroy(i){this.microorganismService.destroy(i.id).then(e=>{if(!e.error){var n=this.microorganisms.findIndex(e=>e.id==i.id);n>-1&&this.microorganisms.splice(n,1)}this.helperService.toast(e.error?"warning":"success",e.message)},i=>{this.helperService.responseErrors(i)}).then(()=>this.helperService.loading_dismiss())}toggleSearch(){this.showFilter=!this.showFilter,this.showFilter&&setTimeout(()=>{this.search.setFocus()},100)}}return i.\u0275fac=function(e){return new(e||i)(l.Lb(a.a),l.Lb(b.a))},i.\u0275cmp=l.Fb({type:i,selectors:[["app-index"]],viewQuery:function(i,e){if(1&i&&(l.Ec(g,1),l.Ec(c.k,1),l.Ec(c.p,1)),2&i){let i;l.pc(i=l.ac())&&(e.search=i.first),l.pc(i=l.ac())&&(e.content=i.first),l.pc(i=l.ac())&&(e.infiniteScroll=i.first)}},decls:35,vars:10,consts:[["mode","ios"],["mode","ios","slot","start"],[3,"click"],["slot","end"],["mode","ios","color","white",3,"routerLink"],["name","add-circle"],["mode","ios",3,"color","click"],["name","funnel"],[1,"ion-no-padding"],["slot","fixed",1,"text-darkprimary",3,"ionRefresh"],["pullingText","Atualizar","refreshingSpinner","dots","refreshingText","Atualizando"],["lines","full","mode","ios",1,"no-border","mb-0"],["color","customer","mode","md",3,"hidden"],["debounce","250","mode","ios","placeholder","id ...",1,"p0","input-light",3,"ngModel","ngModelChange","ionChange"],["search",""],["debounce","250","mode","ios","placeholder","nome ...",1,"p0","input-light",3,"ngModel","ngModelChange","ionChange"],["mode","md"],["size","3"],["size","6"],[4,"ngFor","ngForOf"],[4,"ngIf"],["threshold","30px",3,"ionInfinite"],["loadingSpinner","none"],["class","no-border","text-center","",4,"ngIf"],["color","light","text-center","",4,"ngIf"],["slidingItem",""],["size","3",1,"block","text-right"],["color","primary","expandable","",1,"text-center",3,"routerLink"],["slot","start","name","create",1,"m0"],["color","danger","expandable","",1,"text-center",3,"click"],["slot","start","name","trash",1,"m0"],["animated","",2,"width","100%","height","50px"],["text-center","",1,"no-border"],[1,"text-center"],["color","medium","size","large","name","caret-up-circle-outline","float-right","",1,"mt-15","ion-float-end",3,"hidden","click"],["color","medium",1,"p20"],["name","thumbs-up","color","medium"],["color","light","text-center",""],["padding-top","","padding-bottom",""]],template:function(i,e){1&i&&(l.Rb(0,"ion-header"),l.Rb(1,"ion-toolbar",0),l.Mb(2,"ion-menu-button",1),l.Rb(3,"ion-title",2),l.Zb("click",function(){return e.content.scrollToTop(500)}),l.zc(4,"Microorganisms"),l.Qb(),l.Rb(5,"ion-buttons",3),l.Rb(6,"ion-button",4),l.Mb(7,"ion-icon",5),l.Qb(),l.Rb(8,"ion-button",6),l.Zb("click",function(){return e.toggleSearch()}),l.Mb(9,"ion-icon",7),l.Qb(),l.Qb(),l.Qb(),l.Qb(),l.Rb(10,"ion-content",8),l.Rb(11,"ion-refresher",9),l.Zb("ionRefresh",function(i){return e.paginate(i)}),l.Mb(12,"ion-refresher-content",10),l.Qb(),l.Rb(13,"ion-row"),l.Rb(14,"ion-col",8),l.Rb(15,"ion-list",11),l.Rb(16,"ion-item-divider",12),l.Rb(17,"ion-col"),l.Rb(18,"ion-searchbar",13,14),l.Zb("ngModelChange",function(i){return e.filters.id=i})("ionChange",function(){return e.paginate()}),l.Qb(),l.Qb(),l.Rb(20,"ion-col"),l.Rb(21,"ion-searchbar",15,14),l.Zb("ngModelChange",function(i){return e.filters.name=i})("ionChange",function(){return e.paginate()}),l.Qb(),l.Qb(),l.Qb(),l.Rb(23,"ion-item-divider",16),l.Rb(24,"ion-col",17),l.zc(25,"#Id"),l.Qb(),l.Rb(26,"ion-col",18),l.zc(27,"Name"),l.Qb(),l.Mb(28,"ion-col",17),l.Qb(),l.xc(29,u,13,5,"ion-item",19),l.xc(30,p,2,1,"ng-container",20),l.Rb(31,"ion-infinite-scroll",21),l.Zb("ionInfinite",function(i){return e.paginate(null,i)}),l.Mb(32,"ion-infinite-scroll-content",22),l.Qb(),l.xc(33,R,6,1,"ion-row",23),l.xc(34,v,4,0,"ion-row",24),l.Qb(),l.Qb(),l.Qb(),l.Qb()),2&i&&(l.zb(6),l.jc("routerLink",l.lc(9,Q)),l.zb(2),l.kc("color",e.showFilter?"medium":"white"),l.zb(8),l.jc("hidden",!e.showFilter),l.zb(2),l.jc("ngModel",e.filters.id),l.zb(3),l.jc("ngModel",e.filters.name),l.zb(8),l.jc("ngForOf",e.microorganisms),l.zb(1),l.jc("ngIf",e.loading),l.zb(3),l.jc("ngIf",e.total_of_data===e.microorganisms.length&&e.total_of_data>0),l.zb(1),l.jc("ngIf",!e.loading&&!e.microorganisms.length))},directives:[c.n,c.O,c.A,c.M,c.g,c.f,c.Y,o.g,c.o,c.k,c.C,c.D,c.F,c.j,c.y,c.t,c.G,c.Z,d.g,d.h,h.k,h.l,c.p,c.q,c.s,c.H,c.x],encapsulation:2}),i})()}];let x=(()=>{class i{}return i.\u0275fac=function(e){return new(e||i)},i.\u0275mod=l.Jb({type:i}),i.\u0275inj=l.Ib({providers:[],imports:[[t.a,o.i.forChild(z)]]}),i})()}}]);