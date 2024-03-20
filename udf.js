function transform(line){
	var values = line.split(',');	
	var obj = new Object();
	obj.Date = values[0];
	obj.Agency = values[1];
	obj.Email = values[2];
	obj.Phone = values[3];
	obj.City = values[4];
	obj.Frequency = values[6];
	obj.Pads = values[8];
	obj.Tampons = values[9];
	obj.Liners = values[10];
	obj.Reusable_Pads = values[11];
	obj.Menstrual_Underwear = values[12];
	obj.Menstrual_Cups = values[13];
	var jsonString = JSON.stringify(obj);
	return jsonString;
}
