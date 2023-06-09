SELECT
  unpv.EmailAddress,
  unpv.product_codes,
  ct.product_price AS price,
  unpv.productcoderefs AS old_column_sequence,
  CONCAT('ProductCodeRef',CAST((ROW_NUMBER() OVER (PARTITION BY unpv.EmailAddress ORDER BY unpv.EmailAddress,ct.product_price DESC)) AS varchar(5))) AS new_column_sequence
FROM
  (
    SELECT
      TOP 10 EmailAddress,
      ProductCodeRef1,
      ProductCodeRef2,
      ProductCodeRef3,
      ProductCodeRef4
    FROM
      GIO_USA_Abandon_Cart_V1
  ) AS temp UNPIVOT (
    product_codes FOR productcoderefs IN (
      ProductCodeRef1,
      ProductCodeRef2,
      ProductCodeRef3,
      ProductCodeRef4
    )
  ) AS unpv
  INNER JOIN ent.GIO_USA_Product_Catalog_DDM AS ct ON ct.product_code = unpv.product_codes
ORDER BY unpv.EmailAddress,ct.product_price DESC 
OFFSET 0 ROWS



SELECT EmailAddress, ProductCodeRef1 , ProductCodeRef2 , ProductCodeRef3 , ProductCodeRef4
FROM
(SELECT EmailAddress,product_codes,new_column_sequence FROM GIO_USA_col_to_rows) AS temp
PIVOT
(
MAX(temp.product_codes)
FOR temp.new_column_sequence IN ( ProductCodeRef1 , ProductCodeRef2 , ProductCodeRef3 , ProductCodeRef4)
) AS pvt



