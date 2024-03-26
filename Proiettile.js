class Proiettile{
    constructor(x, y, damage = 5){
        this.x = x;
        this.y = y;
        if(mouseX<x)
            this.speed = -7;
        else
            this.speed = 7;
        let angle = atan2(mouseY -this.y, mouseX - this.x); // Calcola l'angolo tra il mouse e il giocatore
        this.speed = 10;
        this.vx = cos(angle) * this.speed; // velocità orizzontale
        this.vy = sin(angle) * this.speed; // velocità verticale
        this.damage = damage;
    }

    getDamage(){
        return this.damage;
    }

    move(){
        this.x += this.vx;
        this.y += this.vy;
    }

    show(img){
        push(); // salva l'attuale sistema di coordinate
        translate(this.x, this.y); // sposta l'origine al centro del proiettile
        rotate(atan2(this.vy, this.vx)); // ruota l'immagine in base all'angolo di tiro
        image(img, -15, -15, 30, 30); // disegna l'immagine rispetto alla nuova origine
        pop(); // ripristina il sistema di coordinate precedente
    }

    checkCollision(enemy){
        let ret = false;
        if(enemy!== undefined && (this.x+10>=enemy.x && this.x<=enemy.x+enemy.dimx) && (this.y+10>=enemy.y && this.y<=enemy.y+enemy.dimy)){
            ret = true;
            enemy.causeDamage(this.damage);
        }
        return ret;
    }


    outOfBound(){
        return (this.x>width|| this.x<0) && (this.y>height || this.y<0);
    }
}
