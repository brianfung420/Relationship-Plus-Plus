module.exports.getJson = function (form){
	let output = {};
	console.log(form,typeof form);
	output['opening'] = getOpeningArray(form);
	output['arrestedObject'] = getObjectArray(form);
	output['FinalFeedback'] = getFinalFeedback(form);
	return output;
}

function getOpeningArray(form){
	var opening = form['dialouge-content'];
	return opening;
}

function getObjectArray(form){
	let arrestedObject = [];
	var obj_point = form['object-mark'];
	var obj_feedback = form['object-feedback'];
	let tmp = {};
	if(Array.isArray(obj_point)){
		for(var i=0;i<obj_point.length;i++){
			tmp = {};
			tmp['pic'] = "";
			tmp['point'] = obj_point[i];
			tmp['feedback'] = obj_feedback[i];
			arrestedObject[i] = tmp;
		}
	}else{
		console.log("Not array");
		tmp['pic'] = "";
		tmp['point'] = obj_point;
		tmp['feedback'] = obj_feedback;
		arrestedObject = tmp;
	}
	console.log(arrestedObject);
	return arrestedObject;
}

function getFinalFeedback(form){
	let FinalFeedback = {};
	FinalFeedback["higherThen"] = {	'point':form['more-than-point'],
									'feedback':form['more-than-text']};
	FinalFeedback["belowThen"] = {	'point':form['less-than-point'],
									'feedback':form['less-than-text']};
	FinalFeedback["other"] = {'feedback':form['middle-text']};
	console.log(FinalFeedback);
	return FinalFeedback;
}
