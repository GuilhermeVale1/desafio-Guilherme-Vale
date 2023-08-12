class CaixaDaLanchonete {
    
    constructor(){
         this.cardapio = new Map ([
            ["cafe", 3.00],
            ["chantily", 1.50],
            ["suco", 6.20],
            ["sanduiche", 6.50],
            ["queijo", 2.00],
            ["salgado", 7.25],
            ["combo1", 9.50],
            ["combo2", 7.50]
        ]);
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        let dinheiro = 0;
        // Verifica se não existe item no carrinho 
        if(itens.length === 0){
            return "Não há itens no carrinho de compra!";
        }
        
        // Verifica se o método de pagamento é invalido
        if(metodoDePagamento != "dinheiro" && metodoDePagamento != "debito" && metodoDePagamento != "credito"){
            return "Forma de pagamento inválida!";     
        }
        // Vai passar por todos os itens do pedido
        for(let c=0 ; c < itens.length; c++){
            let codigo = itens[c].split(",");
            //Verifica se o item existe
            if(!this.cardapio.has(codigo[0])){
                return "Item inválido!";
            }
            // Verifica se a quantidade de itens do pedido é válida
            if(codigo[1] == 0){
                return 'Quantidade inválida!';
            }
            // Verifica os itens primários e secundarios ou se não tem nenhum item secundario
            if(this.itensPrincipais(itens , "cafe") && codigo[0] == "chantily"){
                dinheiro += (this.cardapio.get(codigo[0]) *  parseFloat(codigo[1]));
            }else if(this.itensPrincipais(itens , "sanduiche") && codigo[0] == "queijo"){
                dinheiro += (this.cardapio.get(codigo[0]) *  parseFloat(codigo[1]));
            }else if(codigo[0] != "queijo" && codigo[0] != "chantily"){
                dinheiro += (this.cardapio.get(codigo[0]) *  parseFloat(codigo[1]));
            }else{
                return 'Item extra não pode ser pedido sem o principal';
            }
        
        }
        //Verifica os métodos de pagamentos 
        if (metodoDePagamento == "dinheiro"){
            return ("R$ " + (dinheiro * 0.95).toFixed(2)).replace(".", ",");
        }else if (metodoDePagamento == "credito"){
            return ("R$ " + (dinheiro * 1.03).toFixed(2)).replace(".", ",");
        }
        else {
            return ("R$ " + dinheiro.toFixed(2)).replace(".", ",");
        }
    }
    // Verifica se o item está presente em itens
    itensPrincipais(itens , codigo){
        for(let c=0 ; c < itens.length; c++){
            if(itens[c].split(",")[0] === codigo){
                return true;
            }
        }
        return false;
    }
}
export { CaixaDaLanchonete };