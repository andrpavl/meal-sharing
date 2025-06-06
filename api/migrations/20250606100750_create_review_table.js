/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
	return knex.schema.createTable("review", (table) => {
		table.increments("id").primary();
		table.string("title", 100).notNullable();
		table.text("description");
		table.integer("meal_id").unsigned().notNullable();
		table.integer("stars", 5).notNullable();
		table.date("created_date").notNullable();
		table
			.foreign("meal_id")
			.references("id")
			.inTable("meal")
			.onDelete("CASCADE");
	});
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
	return knex.schema.dropTable("review");
}
