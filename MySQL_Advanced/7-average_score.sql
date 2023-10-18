DELIMITER //

CREATE PROCEDURE ComputeAverageScoreForUser(IN in_user_id INT)
BEGIN
    DECLARE avg_score DECIMAL(10, 2);

    -- Calculate the average score for the user
    SELECT AVG(score) INTO avg_score FROM corrections WHERE user_id = in_user_id;

    -- Update or insert the average score into the user_scores table
    INSERT INTO user_scores (user_id, average_score)
    VALUES (in_user_id, avg_score)
    ON DUPLICATE KEY UPDATE average_score = avg_score;
END;
//
DELIMITER ;

