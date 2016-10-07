var timerId = null;
function iniciajogo(){

	var url = window.location.search;
	var nivel_jogo = url.replace("?","");
	var tempo_segundos = 0;
	var qtde_baloes = 12;
	if(nivel_jogo == 1){
		tempo_segundos = 60;
		var qtde_baloes = 12*5;
		cria_baloes(qtde_baloes);
	}
	if (nivel_jogo == 2) {
		tempo_segundos = 45;
		var qtde_baloes = 12*7;
		cria_baloes(qtde_baloes);		
	}
	if (nivel_jogo == 3) {
		tempo_segundos = 30;
		var qtde_baloes = 12*10;
		cria_baloes(qtde_baloes);
	}

	document.getElementById('cronometro').innerHTML = tempo_segundos;

	//imprimir qtde baloes inteiros
	document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;
	document.getElementById('baloes_estourados').innerHTML = 0;

	contagem_tempo(tempo_segundos + 1)
}

function contagem_tempo(segundos) {
	segundos = segundos - 1;

	if(segundos == -1){
		clearTimeout(timerId); //para a execução da função do settimeout
		game_over();
		return false;
	}

	document.getElementById('cronometro').innerHTML = segundos;

	timerId = setTimeout("contagem_tempo("+segundos+")",1000)
}

function game_over(){
	alert('Fim de jogo, você não conseguiu estourar todos os balões a tempo');
	document.getElementById(balao).setAttribute("cria_baloes","");
}

function cria_baloes(qtde_baloes) {
	
	for (var i = 1; i <= qtde_baloes; i++) {
		var balao = document.createElement("img");
		balao.src = 'imagens/balao_azul_pequeno.png';
		balao.style.margin = '7px'; 
		balao.id = 'b'+i;
		balao.onclick =  function() { estourar(this);}

		document.getElementById('cenario').appendChild(balao); 
	}
}

function estourar(e){

	var id_balao = e.id;

	document.getElementById(id_balao).setAttribute("onclick","");
	document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';

	pontuacao(-1);

}

function pontuacao(acao){

	var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
	var baloes_estourados  = document.getElementById('baloes_estourados').innerHTML;
	var contador = document.getElementById('baloes_inteiros').innerHTML;

	baloes_inteiros = parseInt(baloes_inteiros);
	baloes_estourados = parseInt(baloes_estourados);
	contador = parseInt(baloes_estourados);

	baloes_inteiros = baloes_inteiros + acao;
	baloes_estourados = baloes_estourados - acao;
	contador = (contador * 5) + 5;

	document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
	document.getElementById('baloes_estourados').innerHTML = baloes_estourados;
	document.getElementById('contador').value = contador;

	situacao_jogo(baloes_inteiros);

}	

function situacao_jogo(baloes_inteiros){
	if(baloes_inteiros == 0){
		alert('Parabéns, você conseguiu estourar todos os balões a tempo');
		parar_jogo();
	}
}

function parar_jogo(){
	clearTimeout(timerId);
}
