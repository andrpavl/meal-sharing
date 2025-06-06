/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
	return knex.schema.createTable("reservation", (table) => {
		table.increments("id").primary();
		table.integer("number_of_guests").unsigned().notNullable();
		table.integer("meal_id").unsigned().notNullable();
		table.date("created_date").notNullable();
		table.string("contact_phonenumber", 100).notNullable();
		table.string("contact_name", 100).notNullable();
		table.string("contact_email", 100).notNullable();
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
	return knex.schema.dropTable("reservation");
}
