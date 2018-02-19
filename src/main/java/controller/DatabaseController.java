package controller;

import Database.DatabaseInput;
import Database.DatabaseOutput;
import org.springframework.beans.factory.annotation.Autowired;


public class DatabaseController {
    private DatabaseInput databaseInput = new DatabaseInput();
    @Autowired
    private DatabaseOutput databaseOutput;

    public DatabaseController() {
        databaseInput.insertSubject("mata", "YMR3730", "Kairi Kasemets");
    }
}
