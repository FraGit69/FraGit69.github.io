class Personaggio{
    constructor(x, y, dimx, dimy, health, img){
        this.dimx = dimx;
        this.dimy = dimy;
        this.image = img;
        this.imgInit = img;
        this.x = x;
        this.force = 0;
        this.y = y;
        this.yInit = y;
        this.speed = 5;
        this.inventory = [];
        this.bullets = [];
        this.cellsInv = 10;
        this.health = health;
        this.maxHealt = health;
        this.vy = 0; // velocità verticale
        this.gravity = 0.1; // gravità
        this.punchX = 0;
        this.punchy = 0;
        this.scale = 1;
        this.armaFocused = 0;
    }

    show(img, enemy){
        fill(255, 0, 0);
        rect(this.x, this.y, this.dimx, -10);
        fill(0, 255, 0);
        rect(this.x, this.y, this.dimx*this.health/this.maxHealt, -10);
        push(); // salva l'attuale sistema di coordinate
        translate(this.x + this.dimx / 2, this.y + this.dimy / 2); // sposta l'origine al centro dell'immagine
        
        if(goLeft)
            this.scale = -1; // specchia l'immagine sull'asse x
        if(goRight)
            this.scale = 1;
        if (shoot && mouseX<this.x)
            this.scale = -1;
        if(shoot && mouseX>this.x)
            this.scale = 1;
        scale(this.scale, 1);
        image(this.image, -this.dimx / 2, -this.dimy / 2, this.dimx, this.dimy); // disegna l'immagine rispetto alla nuova origine
        pop(); // ripristina il sistema di coordinate precedente
        if(livello>2)
            if(this.inventory.length>0){
                push();
                translate(this.x + this.dimx / 2, this.y + this.dimy / 2);
                scale(this.scale, 1);
                this.inventory[this.armaFocused].update(0, 0);
                
                pop();
                if(this.bullets.length!=NaN)
                    for(let i = 0; i<this.bullets.length; i++){
                        if(!this.bullets[i].outOfBound()){
                            if(enemy!=NaN){
                                if(this.bullets[i].checkCollision(enemy))
                                    this.bullets.splice(i, 1); // Rimuovi il proiettile
                                else
                                    this.bullets[i].show(img);
                            }
                        }else{
                            this.bullets.splice(i, 1); // Rimuovi il proiettile
                            i--; // Decrementa l'indice per evitare di saltare il prossimo proiettile
                        }
                        
                    }
            }
    }

    addArma(arma){
        this.inventory.push(arma);
    }

    setArma(n){
        this.armaFocused = (this.armaFocused+n)%this.inventory.length;
        if(this.armaFocused===-1){
            this.armaFocused=this.inventory.length-1;
        }
    }

    update(){
        if(goLeft)
            this.force = -this.speed;
        else if(goRight)
            this.force = this.speed;
        else
            this.force =  0;
        if(goUp && this.y === this.yInit){
            this.vy = -5;
            this.gravity = 0.1;
        }
        if(shift){
            this.gravity = 3;
        }
        if(shoot){
            if (this.inventory.length > 0) {
                this.inventory[this.armaFocused].shoot(this.bullets, this.x + this.dimx / 2 + 90, this.y + this.dimy / 2 - this.inventory[this.armaFocused].dimy/2);
            }
        }
    }

    move(){
        //avanti o indietro
        this.x += this.force;

        //salto
        this.vy += this.gravity;
        this.y += this.vy;
        
        //verifico che le due coordinate
        this.x = constrain(this.x, 0, width-this.dimx);
        this.y = constrain(this.y, this.dimy, height-this.dimy);
        if (this.y >= this.yInit) {
            this.y = this.yInit;
            this.vy = 0;
        }
        for(let i = 0; i<this.bullets.length; i++)
            this.bullets[i].move();
    }

    getX(){
        return this.x;
    }

    getSpeed(){
        return this.speed;
    }

    setSpeed(speed){
        this.speed = speed;
    }

    causeDamage(damage){
        this.health -= damage;
    }
}