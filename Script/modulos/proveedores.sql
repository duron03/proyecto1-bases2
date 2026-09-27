-- Query general del enunciado.
SELECT
	S.SupplierReference,
	S.SupplierName,
	SC.SupplierCategoryName,
	P1.FullName AS PrimaryContactPerson,
	P2.FullName AS AlternateContactPerson,
	DM.DeliveryMethodName,
	C.CityName,
	S.DeliveryPostalCode,
	S.PhoneNumber,
	S.FaxNumber,
	S.WebsiteURL,
	CONCAT('Delivery: ', DeliveryAddressLine1, ' ', DeliveryAddressLine2, ' - ', 'Postal: ', PostalAddressLine1, ' ', PostalAddressLine2) AS Direction,
	S.DeliveryLocation,
	S.BankAccountName,
	S.BankAccountNumber,
	S.PaymentDays
	
FROM Purchasing.Suppliers S

INNER JOIN Purchasing.SupplierCategories SC ON S.SupplierCategoryID = SC.SupplierCategoryID
INNER JOIN Application.People P1 ON S.PrimaryContactPersonID = P1.PersonID
INNER JOIN Application.People P2 ON S.AlternateContactPersonID = P2.PersonID
INNER JOIN Application.DeliveryMethods DM ON S.DeliveryMethodID = DM.DeliveryMethodID
INNER JOIN Application.Cities C ON S.DeliveryCityID = C.CityID

ORDER BY S.SupplierName ASC;
