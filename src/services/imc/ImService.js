class ImcService {

    calculaImc(data) {
        let peso = data.peso;
        let altura = data.altura;

    //A equação é o valor do peso em quilogramas dividido pela 
    //altura em centímetros. Em seguida, é preciso dividir o 
    //resultado novamente pela altura em centímetros e multiplicar o resultado por 10.000.
        let valor_imc = (peso / altura) / altura * 10000;

        if(valor_imc < 17) return "Seu IMC é igual: " + Math.round(valor_imc) +" - Muito abaixo do peso"
        else if(valor_imc < 18.49) return "Seu IMC é igual: " + Math.round(valor_imc) +" - Abaixo do peso"
        else if(valor_imc < 24.99) return "Seu IMC é igual: " + Math.round(valor_imc) + " - Parabéns, seu peso é saudável!"
        else if(valor_imc < 29.99) return "Seu IMC é igual: " + Math.round(valor_imc) + " - Acima do peso"
        else if(valor_imc < 34.99) return "Seu IMC é igual: " + Math.round(valor_imc) + " - Obesidade I"
        else if(valor_imc < 39.99) return "Seu IMC é igual: " + Math.round(valor_imc) + " - Obesidade II (severa)"
        else if(valor_imc > 40) return "Seu IMC é igual: " + Math.round(valor_imc) + " - Obesidade III (mórbida)"
        else return 'Valor indefinido';
    }
}

export default new ImcService();