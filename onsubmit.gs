// Replace 'YOUR_BUCKET_NAME' with your actual GCS bucket name
var BUCKET_NAME = '<cloud storage bucket name>';
const DRIVE_FILE_ID = '<Google drive file ID>';
const STORAGE_BUCKET = '<cloud storage bucket name>';

function onSubmit() {
  var form = FormApp.openById('1DG_kd6nJ_tE8evwUp1_8gJNVTNLaep9bXK6VPNJoNXU');
  var formResponses = form.getResponses();
  
  // Get the latest form response
  var latestResponse = formResponses[formResponses.length-1];
  var itemResponses = latestResponse.getItemResponses();
  
  // Extract responses from each item
  var responses = itemResponses.map(function(itemResponse) {
    return itemResponse.getResponse();
  });
  
  // Convert responses to CSV format
  var csv = responses.join(',') + '\n';
  
  // Create a file name based on the timestamp
  var fileName = 'UWBC - Survey for Menstrual Products Demand (Responses) - Form Responses 1.csv';
  
  // Save CSV file to Google Drive
  var folder = DriveApp.getRootFolder(); // Change this to your desired folder if needed
  var file = folder.createFile(fileName, csv, MimeType.CSV);
  
  // Log the file URL
  Logger.log('File URL: ' + file.getUrl());

  const file01 = DriveApp.getFileById(DRIVE_FILE_ID);
  const blob = file.getBlob();
  const bytes = blob.getBytes();

  const API = `https://www.googleapis.com/upload/storage/v1/b`;
  const location = encodeURIComponent(`${file01.getName()}`);
  const url = `${API}/${STORAGE_BUCKET}/o?uploadType=media&name=${location}`;

  const service = getStorageService();
  const accessToken = service.getAccessToken();

  const response = UrlFetchApp.fetch(url, {
    method: 'POST',
    contentLength: bytes.length,
    contentType: blob.getContentType(),
    payload: bytes,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const result = JSON.parse(response.getContentText());
  Logger.log(JSON.stringify(result, null, 2));
}
