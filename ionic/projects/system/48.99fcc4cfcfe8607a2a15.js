(window.webpackJsonp=window.webpackJsonp||[]).push([[48],{Yh8V:function(e,t,o){"use strict";o.r(t),o.d(t,"CreatePageModule",function(){return _});var n=o("tyNb"),i=o("HJNQ"),c=o("mrSG"),r=o("yoGk"),s=o("P/7m"),a=o("ktjF"),b=o("6rmw"),l=o("fXoL"),p=o("IfTO"),m=o("TEn/"),u=o("nMyB"),h=o("q9oa"),d=o("e/r2"),g=o("3Pt+"),j=o("9nqD");const R=function(e){return[e]},f=function(){return{prefix:"",suffix:" %",thousands:".",decimal:",",align:"left",precision:2,allowNegative:!1}},Q=[{path:"",component:(()=>{class e{constructor(e,t,o,n,i,c,r){this.route=e,this.router=t,this.helperService=o,this.modalController=n,this.projectCommentService=i,this.statusService=c,this.projectService=r,this.editing=!1,this.project_comment=new s.a,this.project=new b.a,this.statuses=[],this.project_comment=new s.a}ngOnInit(){this.project_id=this.route.snapshot.paramMap.get("id")?parseInt(this.route.snapshot.paramMap.get("id")):null,this.getProject(),this.getStatuses()}getStatuses(){this.statusService.get([]).then(e=>{this.statuses=e.statuses.map(e=>new a.a(e))},e=>{this.helperService.toastResponse(e)})}getProject(){this.projectService.find(["product.product_class"],{id:this.project_id}).then(e=>{this.project=e.project,this.project.finished&&(this.helperService.toast("danger","Project already finalized"),this.router.navigate(["projects"]))},e=>{this.helperService.toastResponse(e)})}save(){this.project_comment.project_id=this.project_id,this.projectCommentService.store(this.project_comment).then(e=>{if(e.error)return this.helperService.toast("danger",e.message),!1;this.helperService.toast("success",e.message),this.router.navigate(["projects/"+this.project_id+"/project-comments"])},e=>{this.helperService.responseErrors(e)})}selectStatus(){return Object(c.a)(this,void 0,void 0,function*(){const e=yield this.modalController.create({component:r.a,componentProps:{title:"Statuses",options:this.statuses}});yield e.present();const{data:t}=yield e.onWillDismiss();t&&this.project_comment.serialize({status:t,status_id:t.id})})}}return e.\u0275fac=function(t){return new(t||e)(l.Lb(n.a),l.Lb(n.f),l.Lb(p.a),l.Lb(m.S),l.Lb(u.a),l.Lb(h.a),l.Lb(d.a))},e.\u0275cmp=l.Fb({type:e,selectors:[["app-create"]],decls:42,vars:11,consts:[["mode","ios"],["slot","start"],["icon","chevron-back-outline","mode","ios","text","",3,"routerLink"],[1,"ion-no-padding"],["color","white","no-margin","","mode","ios"],["size","6"],["color","medium",1,"fw-600"],[1,"input-select",3,"click"],["name","caret-down-outline","color","medium",1,"ion-float-end"],["type","text","currencyMask","",1,"input-light",3,"ngModel","options","ngModelChange"],["rows","3","auto-grow","true",1,"input-light",3,"ngModel","ngModelChange"],["size-sm","4"],["expand","full","shape","round","mode","ios","color","success",3,"click"]],template:function(e,t){1&e&&(l.Rb(0,"ion-header"),l.Rb(1,"ion-toolbar",0),l.Rb(2,"ion-buttons",1),l.Mb(3,"ion-back-button",2),l.Qb(),l.Rb(4,"ion-title"),l.zc(5,"New Comment"),l.Qb(),l.Qb(),l.Qb(),l.Rb(6,"ion-content",3),l.Rb(7,"ion-row"),l.Rb(8,"ion-col",3),l.Rb(9,"ion-card",4),l.Rb(10,"ion-card-content"),l.Rb(11,"ion-row"),l.Rb(12,"ion-col",5),l.Rb(13,"ion-label",6),l.zc(14,"Status *"),l.Qb(),l.Rb(15,"div",7),l.Zb("click",function(){return t.selectStatus()}),l.zc(16),l.Mb(17,"ion-icon",8),l.Qb(),l.Qb(),l.Rb(18,"ion-col",5),l.Rb(19,"ion-label",6),l.zc(20,"Progress *"),l.Qb(),l.Rb(21,"input",9),l.Zb("ngModelChange",function(e){return t.project_comment.progress=e}),l.Qb(),l.Qb(),l.Rb(22,"ion-col",5),l.Rb(23,"ion-label",6),l.zc(24,"Regulatory Comments"),l.Qb(),l.Rb(25,"ion-textarea",10),l.Zb("ngModelChange",function(e){return t.project_comment.regulatory_comment=e}),l.Qb(),l.Qb(),l.Rb(26,"ion-col",5),l.Rb(27,"ion-label",6),l.zc(28,"Technical Comments"),l.Qb(),l.Rb(29,"ion-textarea",10),l.Zb("ngModelChange",function(e){return t.project_comment.technical_comment=e}),l.Qb(),l.Qb(),l.Rb(30,"ion-col",5),l.Rb(31,"ion-label",6),l.zc(32,"Risk"),l.Qb(),l.Rb(33,"ion-textarea",10),l.Zb("ngModelChange",function(e){return t.project_comment.risk=e}),l.Qb(),l.Qb(),l.Rb(34,"ion-col",5),l.Rb(35,"ion-label",6),l.zc(36,"Impact"),l.Qb(),l.Rb(37,"ion-textarea",10),l.Zb("ngModelChange",function(e){return t.project_comment.impact=e}),l.Qb(),l.Qb(),l.Qb(),l.Rb(38,"ion-row"),l.Rb(39,"ion-col",11),l.Rb(40,"ion-button",12),l.Zb("click",function(){return t.save()}),l.zc(41," Save "),l.Qb(),l.Qb(),l.Qb(),l.Qb(),l.Qb(),l.Qb(),l.Qb(),l.Qb()),2&e&&(l.zb(3),l.jc("routerLink",l.mc(8,R,"/projects/"+t.project_id+"/project-comments")),l.zb(13),l.Bc(" ",t.project_comment.status_id?t.project_comment.status.name:"Select status"," "),l.zb(5),l.jc("ngModel",t.project_comment.progress)("options",l.lc(10,f)),l.zb(4),l.jc("ngModel",t.project_comment.regulatory_comment),l.zb(4),l.jc("ngModel",t.project_comment.technical_comment),l.zb(4),l.jc("ngModel",t.project_comment.risk),l.zb(4),l.jc("ngModel",t.project_comment.impact))},directives:[m.n,m.O,m.g,m.d,m.e,m.Y,n.g,m.M,m.k,m.F,m.j,m.h,m.i,m.x,m.o,g.a,j.b,g.g,g.h,m.L,m.Z,m.f],styles:[""]}),e})()}];let _=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=l.Jb({type:e}),e.\u0275inj=l.Ib({imports:[[i.a,n.i.forChild(Q)]]}),e})()}}]);