var arrayStoreInfo = new Array();

window.onload = function() {
	$("thead th").click(sorter);
}

function sorter() {
	var that = this;
	var index = $(this).index();
	getTableBodyTrTextContent(that);
	changClassName(that, index);
	display(that);
}

function getTableBodyTrTextContent(that) {
	var tableBodyTr = $(that).parents("table").children("tbody").children("tr");
	var len = tableBodyTr.length;

	for (var i = 0; i < len; i++) {
		var TdLength = tableBodyTr.eq(i).children().length;
		var tempArray = new Array();

		for (var j = 0; j < TdLength; j++) {
			tempArray[j] = tableBodyTr[i].children[j].textContent;
		}
		arrayStoreInfo[i] = tempArray;
	}
}

function changClassName(that, index) {
	$(that).addClass("click");
	$(that).siblings().removeClass("click").removeClass("descend").removeClass("ascend");
	if (isAscend(that)) {
		$(that).removeClass("descend").addClass("ascend");
		ascendSort(index);
	}
	else {
		$(that).removeClass("ascend").addClass("descend");
		descendSort(index);
	}
}

var isAscend = function() {
	var ascend = false;

	return function change() {
		ascend = !ascend;
		return ascend;
	}
}();

function ascendSort(index) {
  arrayStoreInfo.sort(function(a, b) {
     return a[index] > b[index];
  });
}

function descendSort(index) {
  arrayStoreInfo.sort(function(a, b) {
    return b[index] > a[index];
  });
}

function display(that) {
	var tableBodyTr = $(that).parents("table").children("tbody").children("tr");
	var len = tableBodyTr.length;

	for (var i = 0; i < len; i++) {
		var TdLength = tableBodyTr.eq(i).children().length;

		for (var j = 0; j < TdLength; j++) {
			tableBodyTr[i].children[j].textContent = arrayStoreInfo[i][j];
		}
	}
}