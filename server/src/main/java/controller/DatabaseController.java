package controller;

import database_io.DatabaseInput;
import database_io.DatabaseOutput;
import org.springframework.beans.factory.annotation.Autowired;


public class DatabaseController {
    private DatabaseInput databaseInput = new DatabaseInput();
    @Autowired
    private DatabaseOutput databaseOutput;

    public DatabaseController() {
        databaseInput.insertSubject("mata", "YMR3730", "Kairi Kasemets");
    }
}
