InepMain = Class.create();
InepMain.prototype	= {
	popupGovernoFederal : Object,
	
	initialize : function(){
		Event.observe($('LinkMEC'), 'click', function(){
			window.location.href	= 'http://www.mec.gov.br/';
		});
		Event.observe($('LinkINEP'), 'click', function(e){
			window.location.href	= 'http://www.inep.gov.br/';
		});


		Event.observe($('LkMnSobreInep'), 'click', function(e){
			Event.stop(e);
			window.location.href	= lkMnSobreInep;
		});
		Event.observe($('LkMnGestao'), 'click', function(e){
			Event.stop(e);
			window.location.href	= lkMnGestao;
		});
		Event.observe($('LkMnConcursos'), 'click', function(e){
			Event.stop(e);
			window.location.href	= lkMnConcursos;
		});
		Event.observe($('LkMnImprensa'), 'click', function(e){
			Event.stop(e);
			window.location.href	= lkMnImprensa;
		});
	},
	
	changeBarraFederal : function(obj){
		this.popupGovernoFederal	= new Popup(obj.value);
		return false;
	}
}

/**
 * Controla o tamanho das fontes
 *
 * @param STRING strSymbol  			// Simbolo que controla a operacao, ou seja, + para aumentar, - para diminuir a fonte e 0 para retornar o tamanho original
 * @param INTEGER intPercentMax			// Percentual maximo que se queira aumentar uma fonte (lembrando que a fonte inicial possui percentual de 100) - parametro opcional
 * @param INTEGER intPercentMin			// Percentual minimo que se queira diminuir uma fonte (lembrando que a fonte inicial possui percentual de 100) - parametro opcional
 * @param INTEGER intPercentOperation	// Percentual que eh trabalhado em cada operacao - parametro opcional (default = 5)
 * @return BOOLEAN
 */
var intPercentFontSizeGlobal = 100;
function controlFontSize(strSymbol, intPercentMax, intPercentMin, intPercentOperation) {
	// Inserindo valores padroes nos parametros
	if ( ( strSymbol == undefined ) 
			|| ( ( strSymbol != "+" ) 
					&& ( strSymbol != "-" ) ) ) {
		strSymbol = "0";
	}
	if ( intPercentOperation == undefined ) {
		intPercentOperation = 5;
	}
	
	if (intPercentFontSizeGlobal == undefined ) {
		intPercentFontSizeGlobal = 100;
	}
	
	// Definindo tags que terao o controle de tam
	var arrTagFontSize = new Array("DIV", "LABEL", "INPUT", "TEXTAREA", "TH", "TD", "SPAN", "P", "A", "LI", "SELECT", "H1", "H2", "H3", "H4", "H5", "H6", "STRONG");
	
	// Realizando os devidos controles
	if ( strSymbol == "0" ) {
		var intPercentFontSize = 100;
	} else {
		eval( "var intPercentFontSize = intPercentFontSizeGlobal " + strSymbol + " " + intPercentOperation + ";" );
	}
	if ((intPercentMax != undefined ) 
			&& (intPercentFontSize > intPercentMax)) {
		return false;
	}
	if ((intPercentMin != undefined ) 
			&& (intPercentFontSize < intPercentMin)) {
		return false;			
	}
	
	for (var i = 0 ; i < arrTagFontSize.length; ++i ) {
		var strTagFontSize = arrTagFontSize[i];
		var arrTag = document.getElementsByTagName(strTagFontSize);
		
		for (var j = 0 ; j < arrTag.length ; j++) {
			var objTag = arrTag[j];
			
			var text = ( document.all ) ? objTag.innerText.replace(" " , "") : objTag.textContent.replace(" " , "");
			if (text != "") {
				var isChildInTagArray = false;
				
				for (var y = 0; y < arrTagFontSize.length; y++) {
					var arrayName = arrTagFontSize[y];
					isChildInTagArray = hasTagInElementChildren(objTag, arrayName);
					if (isChildInTagArray) {
						break;
					}
				}
				
				if (!isChildInTagArray) {
					intPercentFontSizeGlobal = intPercentFontSize;
					objTag.style.fontSize = intPercentFontSizeGlobal + "%";
				}
			}
		}
	}
	
	// Retorno da funcao
	return true;
}

function hasTagInElementChildren(element, tagName) {
	if (element == undefined 
			|| element.children == undefined 
			|| element.children.length == 0) {
		return false;
	}
	
	if (tagName == undefined) {
		return false;
	}
	
	var isChildInTagArray = false;
	var children = element.children;
	for (var x = 0; x < children.length; x++) {
		var child = children[x]
		if (child.tagName == tagName) {
			isChildInTagArray = true;
			break;
		}
		isChildInTagArray = hasTagInElementChildren(child, tagName);
		if (isChildInTagArray) {
			break;
		}
	}
	return isChildInTagArray;
}