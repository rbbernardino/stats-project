
Formulario=Class.create();var inepFirstFieldWithError=true;var inepResetFieldFocus=false;Formulario.prototype={error:[],erEmail:RegExp(/^[\w-]+(\.[\w-]+)*@(([A-Za-z\d][A-Za-z\d-]{0,61}[A-Za-z\d]\.)+[A-Za-z]{2,6}|\[\d{1,3}(\.\d{1,3}){3}\])$/),erDDD:RegExp(/^\d{2}$/),erTelefone:RegExp(/^\(\d{2}\)\d{4,5}\-\d{4}$/),erCEP:RegExp(/^\d{5}\-\d{3}$/),erCPF:RegExp(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/),erCNPJ:RegExp(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/),erData:RegExp(/^\d{2}\/\d{2}\/\d{4}$/),maskCEP:String('99999-999'),maskCPF:String('999.999.999-99'),maskCNPJ:String('99.999.999/9999-99'),maskData:String('99/99/9999'),initialize:function(){this.error=[];},Msgs:{minLength:String('N&atilde;o pode conter menos de %n caracteres'),maxLength:String('N&atilde;o pode conter mais de %n caracteres'),notNull:String('Campo Obrigat&oacute;rio'),cepFormato:String('<strong>Formato</strong> inv&aacute;lido'),cpfFormato:String('<strong>Formato</strong> inv&aacute;lido'),dataFormato:String('<strong>Formato</strong> inv&aacute;lido'),cnpjFormato:String('<strong>Formato</strong> inv&aacute;lido'),dataInvalida:String('<strong>Data</strong> inv&aacute;lida'),telefoneFormato:String('<strong>Formato</strong> inv&aacute;lido'),emailFormato:String('<strong>Formato</strong> inv&aacute;lido'),cpfNumero:String('<strong>CPF</strong> inv&aacute;lido'),cnpjNumero:String('<strong>CNPJ</strong> inv&aacute;lido'),dataNumero:String('<strong>N&uacute;mero</strong> inv&aacute;lido'),onlyNumero:String('Este campo s&oacute; aceita <strong>N&uacute;meros</strong>')},addErro:function(field,error){field=$(field);if(!field||!field.nextSibling){return;}
field.addClassName('Error');var next=field.nextSibling;var i=0;while(next.nodeName.toUpperCase()!='DIV'||next.className!="Error"){next=next.nextSibling;if(++i==10||!next){return next;}}
next.innerHTML="- "+error+"<br />";Element.show(next);this.error.push(error);},removeErro:function(field){field=$(field);if(!field||!field.nextSibling){return;}
field.removeClassName('Error');var next=field.nextSibling;var i=0;while(next.nodeName!='DIV'||next.className!="Error"){next=next.nextSibling;if(++i==10||!next){return next;}}
if(next.innerHTML){next.innerHTML='';Element.hide(next);}},notNullValidate:function(fieldName,error,formName,sufix){var element=$(fieldName);var form=$(formName);var error=(error)?error:this.Msgs.notNull;if(sufix=='Radio'||sufix=='Check'){if(!form.serialize(true)[fieldName]){this.addErro(fieldName,error);}
return;}
if(!element.value||element.value=='org.jboss.seam.ui.NoSelectionConverter.noSelectionValue'){this.addErro(fieldName,error);}},minLengthValidate:function(field,minLength,error){field=$(field);error=(error)?error:this.Msgs.minLength;error=error.replace('%n',minLength);if(field.value.length<minLength){this.addErro(field,error);}},maxLengthValidate:function(field,maxLength,error){field=$(field);error=(error)?error:this.Msgs.maxLength;error=error.replace('%n',maxLength);if(field.value.length>maxLength){this.addErro(field,error);}},cepValidate:function(field,error){field=$(field);error=(error)?error:this.Msgs.cepFormato;if(!field.value.match(this.erCEP)){this.addErro(field,error);}},emailValidate:function(field,error){field=$(field);if(!field.value){return;}
error=(error)?error:this.Msgs.emailFormato;if(!field.value.match(this.erEmail)){this.addErro(field,error);}},cpfValidate:function(field,errorFormato,errorNumero){field=$(field);if(!field.value){return;}
errorFormato=(errorFormato)?errorFormato:this.Msgs.cpfFormato;errorNumero=(errorNumero)?errorNumero:this.Msgs.cpfNumero;if(!field.value.match(this.erCPF)){this.addErro(field,errorFormato);}
var i;s=field.value;s=s.replace(/\.|\-/g,'');var c=s.substr(0,9);var dv=s.substr(9,2);var d1=0;for(i=0;i<9;i++){d1+=c.charAt(i)*(10-i);}
if(d1==0){return this.addErro(field,errorNumero);}
d1=11-(d1%11);d1=(d1>9)?0:d1
if(dv.charAt(0)!=d1){return this.addErro(field,errorNumero);}
d1*=2;for(i=0;i<9;i++){d1+=c.charAt(i)*(11-i);}
d1=11-(d1%11);d1=(d1>9)?0:d1
if(dv.charAt(1)!=d1){return this.addErro(field,errorNumero);}},cnpjValidate:function(field,errorFormato,errorNumero){field=$(field);if(!field.value){return;}
errorFormato=(errorFormato)?errorFormato:this.Msgs.cnpjFormato;errorNumero=(errorNumero)?errorNumero:this.Msgs.cnpjNumero;var valor=field.value;valor=valor.replace(/\.|\-|\//g,'');valor=valor;if(!$(field).value.match(this.erCNPJ)){this.addErro(field,errorFormato);}
soma2=soma1=0;for(i=11,j=2,k=3;i>=0;i--){c=valor.charAt(i)-'0';soma1+=c*j;soma2+=c*k;j=(j+1)%10;if(j==0){j=2;}
k=(k+1)%10;if(k==0){k=2;}}
d1=soma1%11;if(d1<2){d1=0;}else{d1=11-d1;}
soma2+=d1*2;d2=soma2%11;if(d2<2){d2=0;}else{d2=11-d2;}
valid=valor.charAt(12)-'0'==d1&&valor.charAt(13)-'0'==d2;if(!valid){this.addErro(field,errorNumero);}},dataValidate:function(field,errorFormato,errorNumero,errorData){field=$(field);if(!field.value){return;}
errorFormato=(errorFormato)?errorFormato:this.Msgs.dataFormato;errorNumero=(errorNumero)?errorNumero:this.Msgs.dataNumero;errorData=(errorData)?errorData:this.Msgs.dataInvalida;if(!field.value.match(this.erData)){this.addErro(field,errorFormato);}
var parts=field.value.split('\/');var dia=parseFloat(parts[0]);var mes=parseFloat(parts[1]);var ano=parseFloat(parts[2]);var diasTot=new Array(31,28,31,30,31,30,31,31,30,31,30,31);if(mes==2&&(ano%400==0||(ano%4==0&&ano%100!=0))){diasTot[mes-1]++;}
if((ano<1582||ano>4881)||(mes<1||mes>12)||(dia<1||dia>diasTot[mes-1])){this.addErro(field,errorData);}},telefoneValidate:function(field,error){field=$(field);if(!field.value){return;}
error=(error)?error:this.Msgs.telefoneFormato;if(!field.value.match(this.erTelefone)){this.addErro(field,error);}},onlyNumberValidate:function(error){field=$(field);if(!field.value){return;}
error=(error)?error:this.Msgs.onlyNumero;if((field.value*1)!=field.value){this.addErro(field,error);}},Util:{removeLetras:function(input){var output;if(Object.isString(input)){output=input.replace(/[a-zA-Z]/g,'');return output;}
else if(input.value){input.value=input.value.replace(/[a-zA-Z]/g,'');return true;}},keyCodeIsNumber:function(keyCode){return((keyCode>=48&&keyCode<=57)||(keyCode>=96&&keyCode<=105))||false;},keyCodeIsEscaped:function(keyCode){return(keyCode==8||keyCode==46)||false;},handleObrigatorio:function(fieldName,holder,formName,sufix){var element=$(fieldName);var form=$(formName);var hasObrigatorio=Element.hasClassName(holder,'Obrigatorio');var hasObrigatorioOK=Element.hasClassName(holder,'ObrigatorioOK');if(((sufix=='Input'||sufix=='Select')&&(element.value&&element.value!='org.jboss.seam.ui.NoSelectionConverter.noSelectionValue'))||((sufix=='Radio'||sufix=='Check')&&(form.serialize(true)[fieldName]))){if(hasObrigatorio){holder.removeClassName('Obrigatorio');}
if(!hasObrigatorioOK){holder.addClassName('ObrigatorioOK');}}
else{if(hasObrigatorioOK){holder.removeClassName('ObrigatorioOK');}
if(!hasObrigatorio){holder.addClassName('Obrigatorio');}}}}}
Formulario.Mask=Class.create();Formulario.Mask.prototype={target:Object,regExp:RegExp,expression:String,placeHolder:'_',started:false,charMap:{'9':"[0-9]",'a':"[A-Za-z]",'*':"[A-Za-z0-9]"},setPlaceHolder:function(placeHolder){this.placeHolder=placeHolder;},addPlaceholder:function(c,r){this.charMap[c]=r;},caret:function(begin,end){var target=this.target;if(target.length==0){return;}
if(typeof begin=='number'){end=(typeof end=='number')?end:begin;if(target.setSelectionRange){target.focus();target.setSelectionRange(begin,end);}else if(target.createTextRange){var range=target.createTextRange();range.collapse(true);range.moveEnd('character',end);range.moveStart('character',begin);range.select();}}
else{if(target.setSelectionRange){begin=target.selectionStart;end=target.selectionEnd;}else if(document.selection&&document.selection.createRange){var range=document.selection.createRange();begin=0-range.duplicate().moveStart('character',-100000);end=begin+range.text.length;}
return{begin:begin,end:end};}},initialize:function(target,expression,doit){doit=(!doit);this.target=$(target);this.expression=expression;if(doit){this.doit();}},doit:function(){if(this.started){return;}
var placeHolder=this.placeHolder;var target=this.target;var expression=this.expression;var self=this;var completed=null
var expString=new Array();var locked=new Array();var buffer=new Array();var firstNonMaskPos=null;var valid=null;var ignore=null;expression.split('').each(function(s,i){expString+=self.charMap[s]||((s.match(/[A-Za-z0-9]/)?"":"\\")+s);});var regExp=new RegExp(expString);this.regExp=regExp;expression.split('').each(function(s,i){locked[i]=(self.charMap[s]==null);buffer[i]=locked[i]?s:self.placeHolder;if(!locked[i]&&firstNonMaskPos==null){firstNonMaskPos=i;}});var focusEvent=function(){checkVal();writeBuffer();setTimeout(function(){self.caret(valid?expression.length:firstNonMaskPos);},0);};var keydownEvent=function(e){var pos=self.caret();var k=e.keyCode;ignore=(k<16||(k>16&&k<32)||(k>32&&k<41));if((pos.begin-pos.end)!=0&&(!ignore||k==8||k==46)){clearBuffer(pos.begin,pos.end);}
if(k==8){while(pos.begin-->=0){if(!locked[pos.begin]){buffer[pos.begin]=placeHolder;writeBuffer();self.caret(Math.max(firstNonMaskPos,pos.begin));Event.stop(e);return false;}}}else if(k==46){clearBuffer(pos.begin,pos.begin+1);writeBuffer();self.caret(Math.max(firstNonMaskPos,pos.begin));Event.stop(e);return false;}else if(k==27){clearBuffer(0,expression.length);writeBuffer();$(this).caret(firstNonMaskPos);Event.stop(e);return false;}};var keypressEvent=function(e){if(ignore){ignore=false;if(e.keyCode==8){Event.stop(e);return false;}
else{return null;}}
e=e||window.event;var k=e.charCode||e.keyCode||e.which;var pos=self.caret();if(k>=96&&k<=105){k=k-48}
if(e.ctrlKey||e.altKey){return true;}else if((k>=41&&k<=122)||k==32||k>186){var p=seekNext(pos.begin-1);if(p<expression.length){if(new RegExp(self.charMap[expression.charAt(p)]).test(String.fromCharCode(k))){buffer[p]=String.fromCharCode(k);writeBuffer();var next=seekNext(p);self.caret(next);}}}
Event.stop(e);return false;};var clearBuffer=function(start,end){for(var i=start;i<end&&i<expression.length;i++){if(!locked[i])
buffer[i]=placeHolder;}};var writeBuffer=function(){return target.value=buffer.join('')+'';};var checkVal=function(){var test=target.value;var pos=0;for(var i=0;i<expression.length;i++){if(!locked[i]){buffer[i]=placeHolder;while(pos++<test.length){var reChar=new RegExp(self.charMap[expression.charAt(i)]);if(test.charAt(pos-1).match(reChar)){buffer[i]=test.charAt(pos-1);break;}}}}
var s=writeBuffer();if(!s.match(regExp)){target.value='';clearBuffer(0,expression.length);valid=false;}else
valid=true;};var seekNext=function(pos){while(++pos<expression.length){if(!locked[pos])
return pos;}
return expression.length;};target.maxLength=expression.length;target.size=expression.length;Event.observe(target,'focus',focusEvent);Event.observe(target,'blur',checkVal);Event.observe(target,'keydown',keydownEvent);Event.observe(target,'keypress',keypressEvent);if(target.value){checkVal();writeBuffer();}
this.started=true;}}
Formulario.SeamField=Class.create();Formulario.SeamField.prototype={handleValidate:function(){},handleRequired:function(){},handleBlur:function(){},handleKeypress:function(){},handleChange:function(){},handleClick:function(){},handleSubmit:function(){},mask:function(){},formName:String(''),name:String(''),submitSemValidar:function(formName){Event.stopObserving($(formName));$(formName).submit();},initialize:function(sufix,name,formName,required,mask,jsValidator,onBlurValidate){var code=new String("");if(mask!=''){this.mask=new Formulario.Mask(name+"Decorate:"+name+sufix,mask);}
this.formName=formName;this.name=name;code+=" this.handleSubmit = function(e) { ";if(inepFirstFieldWithError){code+="   inepResetFieldFocus = true; ";inepFirstFieldWithError=false;}
code+="   var errorLength = "+formName+".error.length; ";code+="   var validateInt = seamField_"+name+".handleValidate(); ";code+="   if (validateInt > errorLength) { ";code+="     if (inepResetFieldFocus) { ";code+="       $('"+name+"Decorate:"+name+sufix+(sufix=="Radio"?":0":"")+"').focus(); ";code+="       inepResetFieldFocus = false; ";code+="     } ";code+="     Event.stop(e); ";code+="   } ";code+=" }; ";code+=" this.handleValidate = function(e) { "+
formName+".removeErro($('"+name+"Decorate:"+name+sufix+"')); ";if(required){code+=formName+".notNullValidate('"+name+"Decorate:"+name+sufix+"', '', '"+formName+"', '"+sufix+"'); ";}
if(jsValidator!=''){code+=formName+"."+jsValidator+"($('"+name+"Decorate:"+name+sufix+"')); ";}
code+="return "+formName+".error.length;"+"};"+"this.handleRequired = function(e){ ";code+="};"+"this.handleBlur = function(e){"+"setTimeout(seamField_"+name+".handleValidate,0);"+"setTimeout(seamField_"+name+".handleRequired,0);"+"};"+"this.handleKeypress = this.handleRequired;"+"this.handleChange  = this.handleBlur;"+"this.handleClick  = this.handleBlur;"+"Event.observe(window, 'load', this.handleRequired);"+"Event.observe($('"+formName+"'), 'submit', this.handleSubmit);"+"Event.observe($('"+name+"Decorate:"+name+sufix+"'), 'keypress', this.handleKeypress);";if(onBlurValidate=='true'){code+="Event.observe($('"+name+"Decorate:"+name+sufix+"'), 'blur', this.handleBlur);";}
if(sufix=='Radio'||sufix=='Check'){code+="Event.observe($('"+name+"Decorate:"+name+sufix+"'), 'click', this.handleClick);";}
if(sufix=='Select'){code+="Event.observe($('"+name+"Decorate:"+name+sufix+"'), 'change', this.handleChange);";}
eval(code);}}
function trim(s)
{return ltrim(rtrim(s));}
function ltrim(s)
{if(s==null||s.length==0)
return s;if(s.indexOf(' ')==0)
return trim(s.substring(1));return s;}
function rtrim(s)
{if(s==null||s.length==0)
return s;if(s.indexOf(' ')==s.length-1)
return trim(s.substring(0,s.length-1));return s;}
var comacento="áàãâäéèẽêëíìĩîïóòõôöúùũûüçñÁÀÃÂÄÉÈẼÊËÍÌĨÎÏÓÒÕÔÖÚÙŨÛÜÇÑ ";var semacento="aaaaaeeeeeiiiiiooooouuuuucnAAAAAEEEEEIIIIIOOOOOUUUUUCN ";function onlyAlfa(fld)
{var s=ltrim(fld.value);while(s.indexOf('  ')!=-1)
s=s.replace('  ',' ');var sr='';var pos=null;for(var i=0;i<s.length;i++)
{pos=comacento.indexOf(s.charAt(i));if(pos!=-1)
sr+=semacento.charAt(pos);else
if(s.charAt(i)>='A'&&s.charAt(i)<='Z'||s.charAt(i)>='a'&&s.charAt(i)<='z')
sr+=s.charAt(i);}
fld.value=sr.toUpperCase();}
function onlyNumberAndLetter(fld)
{var s=ltrim(fld.value);while(s.indexOf('  ')!=-1)
s=s.replace('  ',' ');var sr='';var pos=null;for(var i=0;i<s.length;i++)
{pos=comacento.indexOf(s.charAt(i));if(pos!=-1)
sr+=semacento.charAt(pos);else
if(s.charAt(i)>='A'&&s.charAt(i)<='Z'||s.charAt(i)>='a'&&s.charAt(i)<='z'||s.charAt(i)>='0'&&s.charAt(i)<='9')
sr+=s.charAt(i);}
fld.value=sr.toUpperCase();}
function onlyNumberAndLetterEspecial(fld)
{var s=ltrim(fld.value);while(s.indexOf('  ')!=-1)
s=s.replace('  ',' ');var sr='';var pos=null;for(var i=0;i<s.length;i++)
{pos=comacento.indexOf(s.charAt(i));if(pos!=-1)
sr+=semacento.charAt(pos);else
if(s.charAt(i)>='A'&&s.charAt(i)<='Z'||s.charAt(i)>='a'&&s.charAt(i)<='z'||s.charAt(i)>='0'&&s.charAt(i)<='9'||s.charAt(i)=='ª'||s.charAt(i)=='º'||s.charAt(i)=='-'||s.charAt(i)=='°')
sr+=s.charAt(i);}
fld.value=sr.toUpperCase();}
function onlyNumber(fld)
{var s=ltrim(fld.value);while(s.indexOf('  ')!=-1)
s=s.replace('  ',' ');var sr='';var pos=null;for(var i=0;i<s.length;i++)
{if(s.charAt(i)>='0'&&s.charAt(i)<='9')
sr+=s.charAt(i);}
fld.value=sr.toUpperCase();}
function Formata(campo,tammax,teclapres,decimal){var tecla=teclapres.keyCode;onlyNumber(campo);vr=campo.value;tam=vr.length;dec=decimal
if(tam<tammax&&tecla!=8){tam=vr.length;}
if(tam<=dec)
{campo.value=vr;}
if((tam>dec)&&(tam<=5)){campo.value=vr.substr(0,tam-2)+","+vr.substr(tam-dec,tam);}
if((tam>=6)&&(tam<=8)){campo.value=vr.substr(0,tam-5)+"."+vr.substr(tam-5,3)+","+vr.substr(tam-dec,tam);}
if((tam>=9)&&(tam<=11)){campo.value=vr.substr(0,tam-8)+"."+vr.substr(tam-8,3)+"."+vr.substr(tam-5,3)+","+vr.substr(tam-dec,tam);}
if((tam>=12)&&(tam<=14)){campo.value=vr.substr(0,tam-11)+"."+vr.substr(tam-11,3)+"."+vr.substr(tam-8,3)+"."+vr.substr(tam-5,3)+","+vr.substr(tam-dec,tam);}
if((tam>=15)&&(tam<=17)){campo.value=vr.substr(0,tam-14)+"."+vr.substr(tam-14,3)+"."+vr.substr(tam-11,3)+"."+vr.substr(tam-8,3)+"."+vr.substr(tam-5,3)+","+vr.substr(tam-2,tam);}}
function FormataTelefone(e,campo){var tecla=(window.event)?event.keyCode:e.which;vr=campo.value;vr=vr.replace(/D/g,"");vr=vr.replace(/^(d{2})(d)/g,"($1) $2");vr=vr.replace(/(d)(d{4})$/,"$1-$2");return vr;}
function valCPF(e,campo){var tecla=(window.event)?event.keyCode:e.which;if((tecla>47&&tecla<58)){mascara(campo,'###.###.###-##');return true;}
else{if(tecla!=8)return false;else return true;}}
function mascara(src,mask){var i=src.value.length;var saida=mask.substring(1,2);var texto=mask.substring(i);if(texto.substring(0,1)!=saida)
{src.value+=texto.substring(0,1);}}
function mascarat(o){v_obj=o
setTimeout("execmascara(v_obj)",1)}
function execmascara(v_obj){v_obj.value=mtel(v_obj.value)}
function mtel(v){v=v.replace(/\D/g,"");v=v.replace(/^(\d{2})(\d)/g,"($1)$2");v=v.replace(/(\d)(\d{4})$/,"$1-$2");return v;}