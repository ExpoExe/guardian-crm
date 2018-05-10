module.exports = function(schema) {

	var updateTimestemps = function(next){
		this.updatedAt = new Date();
		next();
	};
 
	schema.
		pre('save', updateTimestemps ).
		pre('update', updateTimestemps ).
		pre('findOneAndUpdate', updateTimestemps);
 };