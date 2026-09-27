-- Consulta general del encabezado de factura del enunciado.
SELECT
	I.InvoiceID,
	C.WebsiteURL AS CustomerWebsiteURL,
	DM.DeliveryMethodName,
	I.CustomerPurchaseOrderNumber,
	CP.FullName AS ContactPerson,
	SP.FullName AS SalesPerson,
	I.InvoiceDate,
	I.DeliveryInstructions
	
FROM Sales.Invoices I

INNER JOIN Sales.Customers C ON I.CustomerID = C.CustomerID
INNER JOIN Application.DeliveryMethods DM ON I.DeliveryMethodID = DM.DeliveryMethodID
INNER JOIN Application.People CP ON I.ContactPersonID = CP.PersonID
INNER JOIN Application.People SP ON I.SalespersonPersonID = SP.PersonID

ORDER BY C.CustomerName ASC;

-- Consulta general del detalle de factura del enunciado.
SELECT
	SI.StockItemName,
	IL.Quantity,
	IL.UnitPrice,
	IL.TaxRate,
	IL.TaxAmount,
	IL.ExtendedPrice
	
FROM Sales.InvoiceLines IL
INNER JOIN Warehouse.StockItems SI ON IL.StockItemID = SI.StockItemID
--WHERE InvoiceID = [input]
