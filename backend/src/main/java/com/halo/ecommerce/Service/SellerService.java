package com.halo.ecommerce.Service;

import com.halo.ecommerce.Domain.AccountStatus;
import com.halo.ecommerce.Entity.Seller;
import com.halo.ecommerce.Exceptions.SellerException;

import java.util.List;

public interface SellerService {

    public Seller getSellerProfile(String jwt) throws Exception;
    public Seller createSeller(Seller seller) throws Exception;
    public Seller getSellerById(Long id) throws SellerException;
    public Seller getSellerByEmail(String email) throws Exception;
    List<Seller> getAllSellers(AccountStatus status);
    Seller updateSeller(Long id,Seller seller) throws Exception;
    void deleteSeller(Long id) throws Exception;
    Seller verifyEmail(String email,String otp) throws Exception;
    Seller updateSellerAccountStatus(Long sellerId,AccountStatus status) throws Exception;
}
