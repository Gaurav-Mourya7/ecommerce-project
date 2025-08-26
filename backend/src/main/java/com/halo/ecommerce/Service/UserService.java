package com.halo.ecommerce.Service;

import com.halo.ecommerce.Entity.User;

public interface UserService {

    public User findUserByJwtToken(String jwt) throws Exception;
    public User findUserByEmail(String email) throws Exception;
}
