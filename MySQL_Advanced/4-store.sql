-- delimiter allows you to define the trigger code block
DELIMITER //
CREATE TRIGGER DecreaseItemQuantity
AFTER INSERT ON orders
FOR EACH ROW
BEGIN
    -- Update the quantity in the items table
    UPDATE items
    SET quantity = quantity - NEW.quantity
    WHERE item_id = NEW.item_id;
END;
//
DELIMITER ;
