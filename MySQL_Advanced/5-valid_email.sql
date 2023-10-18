DELIMITER //

CREATE TRIGGER ResetValidEmail
AFTER UPDATE ON your_table_name
FOR EACH ROW
BEGIN
    -- Check if the (email) column has been updated
DELIMITER //
CREATE TRIGGER reset_valid_email
BEFORE UPDATE
ON users FOR EACH ROW
BEGIN
    IF NEW.email != OLD.email THEN
        SET NEW.valid_email = 0;
    END IF;
END;
//
DELIMITER ;
