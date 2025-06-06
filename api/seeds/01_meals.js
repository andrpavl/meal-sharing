/**
 * @param {import("knex").Knex} knex
 */
exports.seed = async function(knex) {
  await knex("reservation").del();
  await knex("review").del();
  await knex("meal").del();

  await knex("meal").insert([
    {
      id: 1,
      title: "Borscht Party",
      description: "Ukrainian beetroot soup with a dollop of sour cream",
      location: "Kyiv Kitchen",
      when: new Date("2025-06-10 18:00:00"),
      max_reservations: 10,
      price: 50.0,
      created_date: new Date("2025-06-01"),
      image_URL:
        "https://images.unsplash.com/photo-1648726445011-9fbf3a5ddb90?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      title: "Danish Smørrebrød Feast",
      description:
        "Traditional Danish open sandwiches with herring, eggs, and more",
      location: "Copenhagen Food Lab",
      when: new Date("2025-06-12 13:00:00"),
      max_reservations: 15,
      price: 75.0,
      created_date: new Date("2025-06-02"),
      image_URL:
        "https://media.istockphoto.com/id/1127835286/photo/traditional-danish-open-sandwich-or-sm%C3%B8rrebr%C3%B8d.webp?a=1&b=1&s=612x612&w=0&k=20&c=Vx3hn5xvyh2lPrNab1cINX8Po20dtNJOAKMvKg4SklE=",
    },
  ]);
};
