module.exports = {
  onUpdate: function (table, key) {
    return `CREATE TRIGGER updated_at_${table}
              ON dbo.${table}
              AFTER UPDATE
              AS
                  BEGIN
                      UPDATE dbo.${table} SET updated_at = SYSDATETIME()
                      FROM Inserted i
                      WHERE ${table}.${key} = i.${key}
                  END`
  }
}
