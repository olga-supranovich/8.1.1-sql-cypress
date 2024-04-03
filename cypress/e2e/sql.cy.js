describe("connect to test db", () => {
  it("create test db", () => {
    cy.task(
      "queryDb",
      "CREATE TABLE Students (StudentID int, FirstName varchar(255), StudentGroup varchar(255), City varchar(255))"
    );
  });

  it("add entries", () => {
    cy.task(
      "queryDb",
      `INSERT INTO Students (StudentID, FirstName, StudentGroup, City) VALUES
      (1, "Ivan", "02-2024", "Madrid"),
      (2, "Maria", "03-2024", "Warsaw"),
      (3, "Olga", "03-2024", "Rome"),
      (4, "Maria", "03-2024", "Warsaw"),
      (5, "Petr", "04-2024", "Minsk");`
    ).then((result) => {
      expect(result.affectedRows).to.equal(5);
    });
  });

  it("test query", () => {
    cy.task(
      "queryDb",
      `SELECT FirstName from Students where StudentGroup="03-2024"`
    ).then((result) => {
      cy.log(JSON.stringify(result));
    });
  });

  it("delete test db", () => {
    cy.task("queryDb", "DROP TABLE Students");
  });
});
