import { Module } from '@nestjs/common';

import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './common/config/env.config';
import { JoiValidationSchema } from './common/config/joi.validation';

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [EnvConfiguration],
			validationSchema: JoiValidationSchema,
		}),
		MongooseModule.forRoot(process.env.MONGO_DB_CONNECTION, {
			dbName: 'pokemon-db',
		}),
		PokemonModule,
		CommonModule,
		SeedModule,
	],
})
export class AppModule {}
