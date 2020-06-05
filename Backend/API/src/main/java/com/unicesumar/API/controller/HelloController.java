package com.unicesumar.API.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RestController
public class HelloController {


	@RequestMapping("/")
	public String hello() {
		return "Hello World!";
	}
}

/*
INSERT INTO Pontuacao(quantidade_Acertos, tempo_Gasto, pontuacao_Total, nome_Usuario) VALUES(15, 904200,99.5,'Guilherme');
INSERT INTO Pontuacao(quantidade_Acertos, tempo_Gasto, pontuacao_Total, nome_Usuario) VALUES(15, 900000,100.0,'Thiago');

INSERT INTO Usuario(nome, senha, pontuacao_id) VALUES('Guilherme', '123456', 1);
INSERT INTO Usuario(nome, senha, pontuacao_id) VALUES('Thiago', '123456', 2);

INSERT INTO Alternativa(enunciado,verdadeira,justificativa) VALUES('alternativa aleatoria', 1, '');
INSERT INTO Alternativa(enunciado,verdadeira,justificativa) VALUES('alternativa aleatoria errada', 0, 'Porque é falso');
INSERT INTO Alternativa(enunciado,verdadeira,justificativa) VALUES('alternativa aleatoria2 errada', 0, 'Porque é falso');
INSERT INTO Alternativa(enunciado,verdadeira,justificativa) VALUES('alternativa aleatoria3 errada', 0, 'Porque é falso');
INSERT INTO Alternativa(enunciado,verdadeira,justificativa) VALUES('alternativa aleatoria4 errada', 0, 'Porque é falso');

INSERT INTO Pergunta(enunciado) VALUES('marque a verdadeira');

INSERT INTO Pergunta_Alternativas(PERGUNTA_ID,ALTERNATIVAS_ID) VALUES(1,1);
INSERT INTO Pergunta_Alternativas(PERGUNTA_ID,ALTERNATIVAS_ID) VALUES(1,2);
INSERT INTO Pergunta_Alternativas(PERGUNTA_ID,ALTERNATIVAS_ID) VALUES(1,3);
INSERT INTO Pergunta_Alternativas(PERGUNTA_ID,ALTERNATIVAS_ID) VALUES(1,4);
INSERT INTO Pergunta_Alternativas(PERGUNTA_ID,ALTERNATIVAS_ID) VALUES(1,5); 
*/