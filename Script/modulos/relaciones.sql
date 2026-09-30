-- Query para conocer el nombre de una columna y tabla asociada a una foreign key.
SELECT 
  c.name AS foreignColumnName,
  OBJECT_NAME(f.referenced_object_id) AS [PK Table]
FROM sys.foreign_keys f
inner join sys.foreign_key_columns fk on f.parent_object_id = fk.parent_object_id and f.referenced_object_id = fk.referenced_object_id
inner join sys.tables as t on fk.parent_object_id = t.object_id
inner join sys.columns as c on fk.parent_object_id = c.object_id and fk.parent_column_id = c.column_id
WHERE f.parent_object_id = OBJECT_ID('WideWorldImporters.Sales.Customers');
