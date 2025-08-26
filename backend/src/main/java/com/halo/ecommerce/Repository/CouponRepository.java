package com.halo.ecommerce.Repository;

import com.halo.ecommerce.Entity.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CouponRepository extends JpaRepository<Coupon,Long>{

    Coupon findByCode(String code);
}
