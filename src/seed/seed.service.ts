import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-api-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapter/axios.adapter';

@Injectable()
export class SeedService {
	constructor(
		@InjectModel(Pokemon.name)
		private readonly pokemonModel: Model<Pokemon>,

		private readonly http: AxiosAdapter,
	) {}

	async applySeed() {
		const data = await this.http.get<PokeResponse>(
			'https://pokeapi.co/api/v2/pokemon?limit=650',
		);

		const pokemonsToInsert: { name: string; pokeNumber: number }[] = [];

		data.results.forEach(async ({ name, url }) => {
			const segments = url.split('/');
			const pokeNumber: number = +segments[segments.length - 2];

			pokemonsToInsert.push({ name, pokeNumber });
		});

		this.pokemonModel.insertMany(pokemonsToInsert);

		return 'Seed Executed';
	}
}
