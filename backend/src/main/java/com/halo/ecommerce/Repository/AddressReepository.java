package com.halo.ecommerce.Repository;

import com.halo.ecommerce.Entity.Address;
import org.apache.el.parser.JJTELParserState;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressReepository extends JpaRepository<Address,Long> {
}
