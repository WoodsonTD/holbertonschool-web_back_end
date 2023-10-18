DELIMITER //

CREATE TRIGGER ResetValidEmail
AFTER UPDATE ON your_table_name
FOR EACH ROW
BEGIN
    -- Check if the (email) column has been updated
    IF NEW.email != OLD.email THEN
        -- Reset the (valid_email) attribute to its default value
        SET NEW.valid_email = default_value;  -- Replace (default_value) with the actual default value
    END IF;
END;
//
DELIMITER ;
