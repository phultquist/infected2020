function Gnat(x, y){
	this.x = x;
	this.y = y;
	this.vector = createVector(random(-3,3), random(-3,3));
	if (sd && random() < 0.8){
		this.vector = createVector(0,0);
	}
	this.infected = false;
	this.immune = false;
	this.timeInfected = 0;
}

var rightBound = (window.innerWidth - 50)/2

Gnat.prototype.show = function () {
	if (this.infected){
		fill(255,0,0)
	} else if (this.immune) {
		fill(150, 200, 250);
	} else {
		fill(255);
	}
	circle(this.x, this.y, radius*2);
};

Gnat.prototype.update = function () {
	if (this.x > rightBound || this.x < 0){
		this.vector.x *= -1
	}

	if (this.y > h || this.y < 0){
		this.vector.y *= -1
	}

	this.x += this.vector.x;
	this.y += this.vector.y;

	if (this.infected){
		this.timeInfected ++;
		for (k in clearGnats){
			if (dist(this.x, this.y, clearGnats[k].x, clearGnats[k].y) < radius*2){
				if (!clearGnats[k].immune){
					clearGnats[k].infected = true;
				}
			}
		}
		if (recovery.checked() && random() < 0.0005 && this.timeInfected > 400){
			this.infected = false;
			this.immune = true;
		}
	}
};
