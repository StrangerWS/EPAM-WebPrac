/**
 * Created by DobryninAM on 10.05.2017.
 */
var objectsArray,
    inputString,
    regex = /\d+[.\d]*|\+|\*|\/|-|=/g,
    result,
    monthEnum = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'];

//Task 5.1
function countNumbers() {
    inputString = document.getElementById('numberCounter').value;

    if (inputString.length != 0 && inputString.indexOf('=') != -1) {
        objectsArray = inputString.match(regex);
        result = parseFloat(objectsArray[0]);

        for (var i = 1; i < objectsArray.indexOf('='); i += 2) {
            var operation = objectsArray[i];
            switch (operation) {
                case '+':
                    result += objectsArray[i + 1] - 0;
                    break;
                case '-':
                    result -= objectsArray[i + 1] - 0;
                    break;
                case '*':
                    result *= objectsArray[i + 1] - 0;
                    break;
                case '/':
                    result /= objectsArray[i + 1] - 0;
                    break;
            }
        }
        if (!isMyNaN(result)) {
            alert(result.toFixed(2));
        } else {
            alert("Input incorrect: Count Numbers");
        }
    }
}

//Task 5.2
function deleteRepeated() {
    inputString = document.getElementById('repeaterInput').value;
    var words = inputString.split(/[\s.?,:;!]/).filter(emptyLengthFilter),
        selectedWord,
        cnt;

    if (words.length > 1) {
        selectedWord = words[0];
        cnt = selectedWord.length;

        for (var i = 0; i < cnt; i++) {
            var symbol = selectedWord[i];

            if (checkAll(symbol, words)) {
                inputString = inputString.replace(new RegExp(symbol, 'g'), '');
            }
        }
    }

    if (inputString.length != 0) {
        alert(inputString);
    } else {
        alert("Input is null: Delete Repeated");
    }
}

//Task 5.3
function dateGetter() {
    var year = document.getElementById('getDateYear').value,
        month = document.getElementById('getDateMonth').selectedIndex,
        day = document.getElementById('getDateDay').value,
        hour = document.getElementById('getDateHour').value,
        minute = document.getElementById('getDateMinute').value,
        second = document.getElementById('getDateSecond').value,
        mask = document.getElementById('getDateMask').value,
        date = new Date(year, month, day, hour, minute, second);

    if (mask.length != 0
        && document.getElementById('getDateYear').value != 0
        || document.getElementById('getDateDay').value != 0
        || document.getElementById('getDateHour').value != 0
        || document.getElementById('getDateMinute').value != 0
        || document.getElementById('getDateSecond').value != 0) {
        alert(date.format(mask));
    } else {
        alert("Input incorrect: Get Date");
    }
}

//Utility functions
function emptyLengthFilter(str) {
    return str.length != 0;
}
function checkAll(symbol, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].indexOf(symbol) == -1) {
            return false;
        }
    }

    return true;
}
function leadZero(value) {
    return (parseInt(value) < 10) ? ("0" + value) : value;
}
Date.prototype.format = function (mask) {
    var dateFormatted = mask,
        replacer;
    for (var i = 0; i < dateFormatted.length; i++) {
        replacer = dateFormatted[i];
        if (dateFormatted[i] == dateFormatted[i + 1]) {
            if (dateFormatted[i] == dateFormatted[i + 2]) {
                if (dateFormatted[i] == dateFormatted [i + 3]) {
                    replacer += dateFormatted[i];
                    i++
                }
                replacer += dateFormatted[i];
                i++
            }
            replacer += dateFormatted[i];
            i++;
        }

        if (replacer == 'yyyy') {
            dateFormatted = dateFormatted.replace('yyyy', this.getFullYear());
        }
        if (replacer == 'yy') {
            dateFormatted = dateFormatted.replace('yy', this.getFullYear() % 100);
        }
        if (replacer == 'MMMM') {
            dateFormatted = dateFormatted.replace('MMMM', monthEnum[this.getMonth()]);
        }
        if (replacer == 'MMM') {
            dateFormatted = dateFormatted.replace('MMM', monthEnum[this.getMonth()].substr(0, 3));
        }
        if (replacer == 'MM') {
            dateFormatted = dateFormatted.replace('MM', leadZero(this.getMonth() + 1));
        }
        if (replacer == 'M') {
            dateFormatted = dateFormatted.replace('M', this.getMonth() + 1);
        }
        if (replacer == 'dd') {
            dateFormatted = dateFormatted.replace('dd', leadZero(this.getDate()));
        }
        if (replacer == 'd') {
            dateFormatted = dateFormatted.replace('d', this.getDate());
        }
        if (replacer == 'HH') {
            dateFormatted = dateFormatted.replace('HH', leadZero(this.getHours()));
        }
        if (replacer == 'H') {
            dateFormatted = dateFormatted.replace('H', this.getHours());
        }
        if (replacer == 'hh') {
            dateFormatted = dateFormatted.replace('hh', leadZero(this.getHours() % 12));
        }
        if (replacer == 'h' && dateFormatted[i - 1] != 'c') {
            dateFormatted = dateFormatted.replace('h', this.getHours() % 12);
        }
        if (replacer == 'mm') {
            dateFormatted = dateFormatted.replace('mm', leadZero(this.getMinutes()));
        }
        if (replacer == 'm' && dateFormatted[i - 1] != 'e') {
            dateFormatted = dateFormatted.replace('m', this.getMinutes());
        }
        if (replacer == 'ss') {
            dateFormatted = dateFormatted.replace('ss', leadZero(this.getSeconds()));
        }
        if (replacer == 's' && dateFormatted[i - 1] != 'u') {
            dateFormatted = dateFormatted.replace('s', this.getSeconds());
        }
    }
    return dateFormatted;
};
function isMyNaN(value) {
    return value !== value;
}
function changeLocale() {
    if (document.getElementById('locale').value == "English") {
        monthEnum = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'];
        document.getElementById('header').textContent = 'JS Basics';

        document.getElementById('numberCounter').placeholder = 'Enter phrase';
        document.getElementById('countLabel').textContent = 'Count numbers';
        document.getElementById('countBtn').textContent = 'Count';

        document.getElementById('repeaterLabel').textContent = 'Delete repeated';
        document.getElementById('repeaterInput').placeholder = 'Enter phrase';
        document.getElementById('repeaterBtn').textContent = 'Delete';

        document.getElementById('getDateLabel').textContent = 'Get Date';
        document.getElementById('getDateYear').placeholder = 'Year';
        document.getElementById('getDateDay').placeholder = 'Day';
        document.getElementById('getDateHour').placeholder = 'Hour';
        document.getElementById('getDateMinute').placeholder = 'Minute';
        document.getElementById('getDateSecond').placeholder = 'Second';
        document.getElementById('getDateMask').placeholder = 'Mask';
        document.getElementById('getDateBtn').textContent = 'Replace';


        document.getElementById('getDateMonth').options[0].textContent = "January";
        document.getElementById('getDateMonth').options[1].textContent = "Februar";
        document.getElementById('getDateMonth').options[2].textContent = "March";
        document.getElementById('getDateMonth').options[3].textContent = "April";
        document.getElementById('getDateMonth').options[4].textContent = "May";
        document.getElementById('getDateMonth').options[5].textContent = "June";
        document.getElementById('getDateMonth').options[6].textContent = "July";
        document.getElementById('getDateMonth').options[7].textContent = "August";
        document.getElementById('getDateMonth').options[8].textContent = "September";
        document.getElementById('getDateMonth').options[9].textContent = "October";
        document.getElementById('getDateMonth').options[10].textContent = "November";
        document.getElementById('getDateMonth').options[11].textContent = "December";

    }
    else if (document.getElementById('locale').value == "Русский") {
        monthEnum = [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь'];
        document.getElementById('header').textContent = 'Базис JS';

        document.getElementById('numberCounter').placeholder = 'Введите выражение';
        document.getElementById('countLabel').textContent = 'Калькулятор';
        document.getElementById('countBtn').textContent = 'Посчитать';

        document.getElementById('repeaterLabel').textContent = 'Удалить повторения';
        document.getElementById('repeaterInput').placeholder = 'Введите текст';
        document.getElementById('repeaterBtn').textContent = 'Удалить';

        document.getElementById('getDateLabel').textContent = 'Получить дату';
        document.getElementById('getDateYear').placeholder = 'Год';
        document.getElementById('getDateDay').placeholder = 'День';
        document.getElementById('getDateHour').placeholder = 'Час';
        document.getElementById('getDateMinute').placeholder = 'Минута';
        document.getElementById('getDateSecond').placeholder = 'Секунда';
        document.getElementById('getDateMask').placeholder = 'Маска';
        document.getElementById('getDateBtn').textContent = 'Заменить';

        document.getElementById('getDateMonth').options[0].textContent = "Январь";
        document.getElementById('getDateMonth').options[1].textContent = "Феваль";
        document.getElementById('getDateMonth').options[2].textContent = "Март";
        document.getElementById('getDateMonth').options[3].textContent = "Апрель";
        document.getElementById('getDateMonth').options[4].textContent = "Май";
        document.getElementById('getDateMonth').options[5].textContent = "Июнь";
        document.getElementById('getDateMonth').options[6].textContent = "Июль";
        document.getElementById('getDateMonth').options[7].textContent = "Август";
        document.getElementById('getDateMonth').options[8].textContent = "Сентябрь";
        document.getElementById('getDateMonth').options[9].textContent = "Октябрь";
        document.getElementById('getDateMonth').options[10].textContent = "Ноябрь";
        document.getElementById('getDateMonth').options[11].textContent = "Декабрь";
    }
}