(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{dqJS:function(t,n,o){"use strict";o.r(n),o.d(n,"CreatePageModule",function(){return h});var e=o("HJNQ"),i=o("tyNb"),r=o("rk6i"),s=o("fXoL"),a=o("mzha"),c=o("IfTO"),l=o("TEn/"),b=o("3Pt+");const u=function(){return["/formulations"]},d=[{path:"",component:(()=>{class t{constructor(t,n,o,e){this.formulationService=t,this.helperService=n,this.route=o,this.router=e,this.formulation=new r.a,this.editing=!1,this.sending_data=!1}ionViewWillEnter(){this.id=this.route.snapshot.paramMap.get("id")?parseInt(this.route.snapshot.paramMap.get("id")):null,this.id&&this.getFormulation()}ngOnInit(){}getFormulation(){this.formulationService.find([],{id:this.id}).then(t=>this.formulation=new r.a(t.formulation),t=>this.helperService.responseErrors(t))}save(){this.sending_data=!0,this.formulationService.storeOrUpdate(this.formulation).then(t=>{this.sending_data=!1,t.error||this.router.navigate(["formulations"],{state:{force:!0}}),this.helperService.toast(t.erorr?"danger":"success",t.message)},t=>{this.sending_data=!1,this.helperService.responseErrors(t)})}}return t.\u0275fac=function(n){return new(n||t)(s.Lb(a.a),s.Lb(c.a),s.Lb(i.a),s.Lb(i.f))},t.\u0275cmp=s.Fb({type:t,selectors:[["ng-component"]],decls:20,vars:4,consts:[["mode","ios"],["slot","start"],["mode","ios","text","","icon","chevron-back-outline","routerLink","back",3,"routerLink"],[1,"ion-no-padding"],["color","white","mode","ios"],["size","12"],["color","medium",1,"fw-600"],["type","text","placeholder","Name",1,"input-light",3,"ngModel","ngModelChange"],["size-sm","4"],["expand","full","shape","round","mode","ios","color","success",3,"click"]],template:function(t,n){1&t&&(s.Rb(0,"ion-header"),s.Rb(1,"ion-toolbar",0),s.Rb(2,"ion-buttons",1),s.Mb(3,"ion-back-button",2),s.Qb(),s.Rb(4,"ion-title"),s.zc(5),s.Qb(),s.Qb(),s.Qb(),s.Rb(6,"ion-content",3),s.Rb(7,"ion-row"),s.Rb(8,"ion-col",3),s.Rb(9,"ion-card",4),s.Rb(10,"ion-card-content"),s.Rb(11,"ion-row"),s.Rb(12,"ion-col",5),s.Rb(13,"ion-label",6),s.zc(14,"Name"),s.Qb(),s.Rb(15,"ion-input",7),s.Zb("ngModelChange",function(t){return n.formulation.name=t}),s.Qb(),s.Qb(),s.Qb(),s.Rb(16,"ion-row"),s.Rb(17,"ion-col",8),s.Rb(18,"ion-button",9),s.Zb("click",function(){return n.save()}),s.zc(19," Save "),s.Qb(),s.Qb(),s.Qb(),s.Qb(),s.Qb(),s.Qb(),s.Qb(),s.Qb()),2&t&&(s.zb(3),s.jc("routerLink",s.lc(3,u)),s.zb(2),s.Bc("",n.formulation.id?"Editing":"New"," Formulation"),s.zb(10),s.jc("ngModel",n.formulation.name))},directives:[l.n,l.O,l.g,l.d,l.e,l.Y,i.g,l.M,l.k,l.F,l.j,l.h,l.i,l.x,l.r,l.Z,b.g,b.h,l.f],styles:[".test[_ngcontent-%COMP%]   li.active[_ngcontent-%COMP%]{width:100%;background-color:red!important}.test[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{color:#00f}ng2-input-autocomplete[_ngcontent-%COMP%]{display:block;z-index:9999;position:absolute}"]}),t})()}];let h=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=s.Jb({type:t}),t.\u0275inj=s.Ib({imports:[[e.a,i.i.forChild(d)]]}),t})()}}]);