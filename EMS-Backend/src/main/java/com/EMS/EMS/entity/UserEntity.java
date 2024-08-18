package com.EMS.EMS.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "user")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserEntity {

    @Id
    private String id;

    private String firstname = " ";

    private String lastname = " ";

    private String role = "user";

    private String email;

    private Long mobilenumber = 0L;

    private Long emergencynumber = 0L;

    private String bloodgroup = " ";

    private String gender = " ";

    private String password;
}
