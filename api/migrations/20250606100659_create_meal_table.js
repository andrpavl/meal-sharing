/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
	return knex.schema.createTable("meal", (table) => {
		table.increments("id").primary();
		table.string("title", 100).notNullable();
		table.text("description");
		table.string("location", 255).notNullable();
		table.dateTime("when").notNullable();
		table.integer("max_reservations").unsigned().notNullable();
		table.decimal("price", 10, 2);
		table.date("created_date").notNullable();
	});
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
	return knex.schema.dropTable("meal");
}
