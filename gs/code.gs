var ssid = "<< Google Sheet ID >>";
var tbrect = SpreadsheetApp.openById(ssid).getSheetByName("receipts");
var tbitms = SpreadsheetApp.openById(ssid).getSheetByName("items");

function getraw(no) {

  let raw = 'rawbt:';
  let receipt = tbrect.getDataRange().getDisplayValues().filter(row => parseInt(row[0]) == parseInt(no))[0];
  let items = tbitms.getDataRange().getDisplayValues().filter(row => parseInt(row[1]) == parseInt(no));

  raw += '//print?text=';
  raw += 'Receipt No: ' + receipt[0] + '%0A';
  raw += 'Date: ' + receipt[1] + '%0A';
  raw += 'Time: ' + receipt[2] + '%0A';
  raw += '----------------------------%0A';

  items.forEach(row => {
    raw += row[2] + '%0A(' + row[4] + ' x ' + row[5] + ')%09%09%09%09%09%09%09%09%09' + row[6] + '%0A';
  });

  raw += '----------------------------%0A';
  raw += 'Total:%20%09%09%09%09%09%09%09%09%09%09' + receipt[3] + '%0A';
  raw += 'Cash:%20%20%09%09%09%09%09%09%09%09%09%09' + receipt[4] + '%0A';
  raw += 'Change:%09%09%09%09%09%09%09%09%09%09' + receipt[5] + '%0A';
  raw += '----------------------------%0AThank you%0A';
  raw += '%1D%56%00';

  return raw;
}
