-- Query general del enunciado
SELECT
	SI.StockItemName,
	S.WebsiteURL AS SupplierWebsiteURL,
	C.ColorName,
	UPT.PackageTypeName AS UnitPackageName,
	OPT.PackageTypeName AS OuterPackageName,
	SI.RecommendedRetailPrice,
	SI.TypicalWeightPerUnit,
	SI.SearchDetails AS KeyWords,
	SI.QuantityPerOuter,
	SI.Brand,
	SI.Size,
	SI.TaxRate,
	SI.UnitPrice,
	'No existe esta columna, preguntar' AS QuantityOnHand,
	S.DeliveryLocation AS SupplierLocation
	
FROM Warehouse.StockItems SI

INNER JOIN Purchasing.Suppliers S ON SI.SupplierID = S.SupplierID
INNER JOIN Warehouse.Colors C ON SI.ColorID = C.ColorID
INNER JOIN Warehouse.PackageTypes UPT ON SI.UnitPackageID = UPT.PackageTypeID
INNER JOIN Warehouse.PackageTypes OPT ON SI.OuterPackageID = OPT.PackageTypeID

ORDER BY SI.StockItemName ASC;
