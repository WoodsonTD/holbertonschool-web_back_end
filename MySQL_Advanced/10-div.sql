-- Task 10 Create a function 'SafeDiv' that divides (and returns)
DELIMITER //
CREATE FUNCTION SafeDiv (a INT, b INT) RETURNS FLOAT
BEGIN
    IF b = 0 THEN
        RETURN 0;
    ELSE
        RETURN a / b;
    END IF;
END;
//
DELIMITER ;
