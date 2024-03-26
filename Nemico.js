class Nemico {
  constructor(x, y, dimx, dimy, health, speed, damage, img) {
    this.x = x;
    this.y = y;
    this.dimx = dimx;
    this.dimy = dimy;
    this.health = health;
    this.maxHealt = health;
    this.speed = speed;
    this.damage = damage;
    this.img = img;
    this.lastDamage = 0;
    this.dropRate = 0.3;
  }

  show() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.dimx, -10);
    fill(0, 255, 0);
    rect(this.x, this.y, this.dimx*this.health/this.maxHealt, -10);

    push(); // salva l'attuale sistema di coordinate
    translate(this.x + this.dimx / 2, this.y + this.dimy / 2); // sposta l'origine al centro dell'immagine
    if(this.muovi)
      this.scale = 1; // specchia l'immagine sull'asse x
    else
      this.scale = -1;
    scale(this.scale, 1);
    image(this.img, -this.dimx / 2, -this.dimy / 2, this.dimx, this.dimy);
    pop();
  }

  move(player) {
    if(this.x<player.x){
      this.x += this.speed;
      this.muovi = true;
    }
    else if(this.x > player.x){
      this.x -= this.speed;
      this.muovi = false;
    }
      
  }

  dropItem(){
    if(random(100)/100 > this.dropRate){
      return ;
    }
    else
      return null;
  }

  attack(player) {
    let currentTime = millis(); // Get the current time
    if(player.x + player.dimx > this.x && player.x < this.x + this.dimx && player.y + player.dimy > this.y && player.y < this.y + this.dimy && currentTime - this.lastDamage > 300){
      player.causeDamage(this.damage);
      this.lastDamage  = currentTime;
    }
  }

  causeDamage(damage){
    this.health -= damage;
  }
}