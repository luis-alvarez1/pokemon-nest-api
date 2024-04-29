import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
	MONGO_DB_CONNECTION: Joi.required(),
	PORT: Joi.number().default(3000),
});
