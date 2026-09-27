-- Query general del enunciado.
SELECT
	C.CustomerName,
	CC.CustomerCategoryName,
	BG.BuyingGroupName,
	P1.FullName AS PrimaryContactPerson,
	P2.FullName AS AlternateContactPerson,
	C.CustomerName,
	DM.DeliveryMethodName,
	Ci.CityName,
	Ci.CityID AS PostalCityID,
	C.PhoneNumber,
	C.FaxNumber,
	C.PaymentDays,
	C.WebsiteURL,
	CONCAT(C.DeliveryAddressLine2, ' - ', C.DeliveryPostalCode) as Direction,
	C.DeliveryLocation
	
FROM Sales.Customers C

INNER JOIN Sales.CustomerCategories CC ON C.CustomerCategoryID = CC.CustomerCategoryID
INNER JOIN Sales.BuyingGroups BG ON C.BuyingGroupID = BG.BuyingGroupID
INNER JOIN Application.People P1 ON C.PrimaryContactPersonID = P1.PersonID
INNER JOIN Application.People P2 ON C.AlternateContactPersonID = P2.PersonID
INNER JOIN Sales.Customers C1 ON C.BillToCustomerID = C1.CustomerID
INNER JOIN Application.DeliveryMethods DM ON C.DeliveryMethodID = DM.DeliveryMethodID
INNER JOIN Application.Cities Ci ON C.DeliveryCityID = Ci.CityID

ORDER BY C.CustomerName ASC;
