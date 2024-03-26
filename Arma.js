class Arma{
    constructor(firerate, cartige, img, damage){
        this.firerateS = 1000/firerate;
        this.capience = cartige;
        this.nBulletsInCardige = this.capience;
        this.timeBtwnBullets = 0;
        this.img = img;
        this.dimx = 100;
        this.dimy = this.dimx*this.img.height/this.img.width
        this.x = 0;
        this.y = 0;
        this.damage = damage;
        this.lastFire = 0;
    }

    shoot(bullets, x, y) {
        let currentTime = millis(); // Get the current time
        if (currentTime - this.lastFire > this.firerateS) {
            let p = new Proiettile(x, y, this.damage);
            bullets.push(p)
            this.lastFire = currentTime; // Update the time of the last bullet
        }
    }

    update(x, y){
        this.x = x;
        this.y = y-(this.dimy/2);
        image(this.img, this.x, this.y, this.dimx, this.dimy);
    }
}