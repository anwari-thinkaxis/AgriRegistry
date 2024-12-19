-- Begin Transaction
BEGIN TRANSACTION;

BEGIN TRY
    -- Step 1: Insert a new location
    INSERT INTO Location (Id, Name)
    VALUES (1, 'Farm 1');

    -- Step 2: Update the location name
    UPDATE Location
    SET Name = 'Updated Farm 1'
    WHERE Id = 1;

    -- If everything goes well, commit the transaction
    COMMIT TRANSACTION;
    PRINT 'Transaction committed successfully.';
END TRY

BEGIN CATCH
    -- If any error occurs, rollback the transaction
    ROLLBACK TRANSACTION;

    -- Print the error message
    PRINT 'Transaction rolled back. Error details:';
    PRINT ERROR_MESSAGE();
END CATCH;
