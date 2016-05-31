function Matrix(rows, cols, containerID) {
	this.rows = rows;
	this.cols = cols;
	this.containerID = containerID;

	// Создание матрицы
	var matrix = $('#' + containerID);
	var size = this.rows * this.cols;

	for (var i = 0; i < size; i++) {
		matrix.append('<div class="cell"></div>');
	}

	// Поиск ячейки по координатам
	this.getCellNode = function(row, col) {
		var cellAddress = (row - 1) * this.cols + col - 1;
		var cell = matrix.children().eq(cellAddress);
		return cell;
	}

	// Проверка ячейки на наличие в ней змеи
	this.getCell = function(row, col) {
		var cell = this.getCellNode(row, col);
		if (cell.hasClass('snake'))
			return true
		else
			return false
	}

	// Подсветить ячейку со змеёй
	this.setCell = function(row, col) {
		var cell = this.getCellNode(row, col);
		cell.toggleClass('snake');
	}

	// Подсветить ячейку с едой
	this.setFood = function(row, col) {
		var cell = this.getCellNode(row, col);
		cell.addClass('food');
	}

	// Проверка ячейки на наличие в ней еды
	this.getFood = function(row, col) {
		var cell = this.getCellNode(row, col);
		if (cell.hasClass('food')) {
			cell.removeClass('food');
			return true;
		}	else
				return false
	}
}