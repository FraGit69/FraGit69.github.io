Enum = {
    vita,
    colpi,
    potenziamento
};

class item{
    constructor(x, y, ground, tipo, adder){
        this.x = x;
        this.y = y;
        this.type = tipo;
        this.adder = adder;
        this.ground = ground;
        
    }

    show(){
        if(this.type === Enum.vita)
            image(benda, this.x, this.y, this.dimX, this.dimY);
        else if (this.type === Enum.colpi)
            image(ricarica, this.x, this.y, this.dimX, this.dimY);
        else if (this.type === Enum.potenziamento)
            imageU(potenziamento, this.x, this.y, this.dimX, this.dimY);
    }

    collect(player){
        if(player.x >= this.x && player.x<= this.x+this.dimX)
    }
}