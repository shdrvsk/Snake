$(document).ready(function() {
	var interval;
	// var playerName = prompt("Введите имя:");
	var playerScore = 0;
	// Создание матрицы
	var matrix = new Matrix(20, 20, 'matrix');
	// Создание змеи
	var snake = new Snake([{x:1, y:3}, {x:1,y:2}, {x:1,y:1}], 'right');
	matrix.setCell(snake.body[0].x, snake.body[0].y);
	matrix.setCell(snake.body[1].x, snake.body[1].y);
	matrix.setCell(snake.body[2].x, snake.body[2].y);

	createFood();

	// Генерация еды
	function createFood() {
		do {	
			var food = new Food(randomInteger(1,matrix.cols), randomInteger(1,matrix.cols));
			matrix.setFood(food.row, food.col);
		} while (matrix.getCell(food.row, food.col))
	}

	// Движение змеи
	function moveSnake(dir) {
		dir = snake.dir;
		snake.body.unshift({});
		if (snake.dir == 'left' && snake.body[1].y > 1 ||
			snake.dir == 'up' && snake.body[1].x > 1 ||
			snake.dir == 'right' && snake.body[1].y < matrix.cols ||
			snake.dir == 'down' && snake.body[1].x < matrix.cols) {
			snake.move()
		} else {
			gameOver();
		}
	}

	// Действия при конце игры
	function gameOver() {
		$('.snake').css('background-color', 'red');
		clearInterval(interval);
		// sendResults(playerName, playerScore);
	}

	// function sendResults(name, score) {
	// 	var data = {
	// 		"name": name,
	// 		"score": score
	// 	}
	// 	$.get("ajax.php", data, getResults);
	// }

	// function getResults(data) {
	// 	var res = JSON.parse(data);
	// 	$('#score').html(res.name + " : " + res.score);
	// }


	// Генерация случайного числа
	function randomInteger(min, max) {
	    var rand = min - 0.5 + Math.random() * (max - min + 1)
	    rand = Math.round(rand);
	    return rand;
  	}

	// Изменение направления движения
	$(document).keydown(function(event) {
		if (event.keyCode == 37 && snake.dir != 'right')
				snake.dir = 'left'
			else if (event.keyCode == 38 && snake.dir != 'down')
				snake.dir = 'up'
			else if (event.keyCode == 39 && snake.dir != 'left')
				snake.dir = 'right'
			else if (event.keyCode == 40 && snake.dir != 'up')
				snake.dir = 'down'
	});

	// Ядро игры
  	function gameplay() {
		moveSnake();

		// Проверка на наличие еды
		if (!matrix.getFood(snake.body[0].x, snake.body[0].y)) {
			matrix.setCell(snake.body[snake.body.length-1].x, snake.body[snake.body.length-1].y);
			snake.body.pop();
		} else {
			createFood();
			$('#score').text(++playerScore);
		}
		
		// Проверка на наличие змеи
		if (matrix.getCell(snake.body[0].x, snake.body[0].y)) {
			gameOver();
			return;
		}
		matrix.setCell(snake.body[0].x, snake.body[0].y);
	}

	var interval = setInterval(gameplay, 100);
});


