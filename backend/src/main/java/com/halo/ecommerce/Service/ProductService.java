package com.halo.ecommerce.Service;

import com.halo.ecommerce.Entity.Product;
import com.halo.ecommerce.Entity.Seller;
import com.halo.ecommerce.Exceptions.ProductException;
import com.halo.ecommerce.Request.CreateProductRequest;
import org.springframework.data.domain.Page;


import java.util.List;

public interface ProductService {

    public Product createProduct(CreateProductRequest createProductRequest, Seller seller) throws IllegalAccessException;
    public void deleteProduct(Long productId) throws ProductException;
    public Product updateProduct(Long productId, Product product) throws ProductException;
    Product findProductById(Long productId) throws ProductException;
    List<Product> searchProducts(String query);
    public Page<Product> getAllProducts(
            String category,
            String brand,
            String colors,
            String sizes,
            Integer minPrice,
            Integer maxPrice,
            Integer minDiscount,
            String sort,
            String stocks,
            Integer pageNumber
    );
    List<Product> getProductBySellerId(Long sellerId);

}
