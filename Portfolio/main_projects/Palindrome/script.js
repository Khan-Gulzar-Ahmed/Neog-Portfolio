function reverseStr(str) {
    var listOfChars = str.split('');
    var reverseListOfChars = listOfChars.reverse();
    var reversedStr = reverseListOfChars.join('');
    return reversedStr;
  }
  
  function isPalindrome(str) {
    var reverse = reverseStr(str);
    return str === reverse;
  }
  
  function convertDateToStr(date) {
  
    var dateStr = { day: '', month: '', year: '' };
  
    if (date.day < 10) {
      dateStr.day = '0' + date.day;
    }
    else {
      dateStr.day = date.day.toString();
    }
  
    if (date.month < 10) {
      dateStr.month = '0' + date.month;
    }
    else {
      dateStr.month = date.month.toString();
    }
  
    dateStr.year = date.year.toString();
    return dateStr;
  }
  
  function getAllDateFormats(date) {
    var dateStr = convertDateToStr(date);
  
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
  
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
  }
  
  function checkPalindromeForAllDateFormats(date){
    var listOfPalindromes = getAllDateFormats(date);
  
    var flag = false;
  
    for(var i=0; i < listOfPalindromes.length; i++){
      if(isPalindrome(listOfPalindromes[i])){
        flag = true;
        break;
      }
    }
    
    return flag;
  }
  
  // check for leap year
  function isLeapYear(year){
    if(year % 400 === 0){
      return true;
    }
    if(year % 100 === 0){
      return false;
    }
    if(year % 4 === 0){
      return true;
    }
    return false;
  }
  
  // gets next date
  function getNextDate(date){
    var day = date.day + 1;  // increment the day  => 32
    var month = date.month;
    var year = date.year;
  
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 0 - 11
  
     // check for february
    if(month === 2){ 
      // check for leap year
      if(isLeapYear(year)){ // 2020 => true
         if(day > 29){ // false
           day = 1;
           month++;  // increment the month
         }
      }
      else {
         if(day > 28){
           day = 1;
           month++;  // increment the month
         }
      }
    }
    // check for other months
    else {
      //  check if the day exceeds the max days in month
      if(day > daysInMonth[month - 1]){ 
        day = 1; 
        month++;  // increment the month
      }
    }
  
    // increment the year if month is greater than 12
    if(month > 12){
      month = 1;
      year++; 
    }
  
    return {
      day: day,  
      month: month,
      year: year
    };
  }
  
  // get next palindrome date
  function getNextPalindromeDate(date){
    var ctr = 0;
    var nextDate = getNextDate(date);
  
    while(1){
      ctr++;
      var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
      if(isPalindrome){
        break;
      }
      nextDate = getNextDate(nextDate);
    }
    return [ctr, nextDate];
  }

  //  previous Palindrome
//
  //
  //
  //


  function getPrevDate(date){
    var day = date.day - 1;  // increment the day  => 32
    var month = date.month;
    var year = date.year;
  
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 0 - 11
  
     // check for february
    if(month === 3){ 
      // check for leap year
      if(isLeapYear(year)){ // 2020 => true
         if(day < 1){ // false
           day = 29;
           month--;  // increment the month
         }
      }
      else {
         if(day == 1){
           day = 28;
           month--;  // increment the month
         }
      }
    }
    // check for other months
    else {
      //  check if the day exceeds the max days in month
      if(day < 1 ){ 
        day = daysInMonth[month - 2]; 
        month--;  // increment the month
      }
    }
  
    // increment the year if month is greater than 12
    if(month == 1){
      month = 12;
      year--; 
    }
  
    return {
      day: day,  
      month: month,
      year: year
    };
  }
  
  // get next palindrome date
  function getPrevPalindromeDate(date){
    var ctr = 0;
    var prevDate = getPrevDate(date);
  
    while(1){
      ctr++;
      var isPalindrome = checkPalindromeForAllDateFormats(prevDate);
      if(isPalindrome){
        break;
      }
      prevDate = getPrevDate(prevDate);
    }
    return [ctr, prevDate];
  }

  
  

  // prevoius end
  //
  //
  var dateInputRef = document.querySelector('#date');
  var show = document.querySelector('#show');
  var result = document.querySelector('#result');
  var result2 = document.querySelector('#result2');
  
  function clickHandler(e){
    var bdayStr = dateInputRef.value; // 2020-10-11
    
    if(bdayStr !== ''){
      var listOfDate = bdayStr.split('-'); // ['2020', '10', '11']
  
      var date = {
        day: Number(listOfDate[2]),
        month: Number(listOfDate[1]),
        year: Number(listOfDate[0])
      };
      
      var isPalindrome = checkPalindromeForAllDateFormats(date);
  
      if(isPalindrome){
         result.innerText = 'Yay! your birthday is a palindrome!! 😎😎';
         result.style.color='Green';  
         result2.innerText='';
      }
      else {
        var [ctr, nextDate] = getNextPalindromeDate(date);
        var nextCtr=ctr;
        var [ctr,prevDate]=getPrevPalindromeDate(date);
        var prevCtr=ctr;
        if(nextCtr < prevCtr)
        {
        result.innerText = `The Next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${nextCtr} days! 😢😢`;
        result.style.color='blue';  
        result2.innerText = `The Previous palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed it by ${prevCtr} days! 😢😢`;
            result2.style.color='blue';  
        }
        else if(nextCtr > prevCtr )
        {
            result.innerText = `The Previous palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed it by ${prevCtr} days! 😢😢`;
            result.style.color='blue';  
            result2.innerText = `The Next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${nextCtr} days! 😢😢`;
        result2.style.color='blue';  
        }
        else{
            result.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${prevCtr} days! 😢😢`;
            result.style.color='blue';  
        }
      }
    }
  }
  
  show.addEventListener('click', clickHandler);