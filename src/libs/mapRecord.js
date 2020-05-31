module.exports = cb => record => {
	let recordObject = null;

	if('toObject' in record){
		recordObject = record.toObject();
	} else {
		recordObject = record;
	}

	return cb(recordObject);
};
