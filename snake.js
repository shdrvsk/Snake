function Snake(body, dir) {
	this.body = body;
	this.dir = dir;

	// Изменение координат змеи при движении
	this.move = function() {
		switch(this.dir) {
			case 'left':
					this.body[0].x = this.body[1].x;
					this.body[0].y = this.body[1].y - 1;
				break;
			case 'up':
					this.body[0].x = this.body[1].x - 1;
					this.body[0].y = this.body[1].y;
				break;
			case 'right':
					this.body[0].x = this.body[1].x;
					this.body[0].y = this.body[1].y + 1;
				break;
			case 'down':
					this.body[0].x = this.body[1].x + 1;
					this.body[0].y = this.body[1].y;
		}
	}
}