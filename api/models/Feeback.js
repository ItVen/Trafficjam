/**
 * Feeback.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

 module.exports = {
 	tableName: 'feedback',
 	attributes: {
 		f_type:{
			type:'string',
		},
		f_content:{
			type:'string',
		},
		
	},
};

