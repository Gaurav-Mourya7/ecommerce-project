package com.halo.ecommerce.Service.impl;

import com.halo.ecommerce.Entity.Category;
import com.halo.ecommerce.Entity.Product;
import com.halo.ecommerce.Entity.Seller;
import com.halo.ecommerce.Exceptions.ProductException;
import com.halo.ecommerce.Repository.CategoryRepository;
import com.halo.ecommerce.Repository.ProductRepository;
import com.halo.ecommerce.Request.CreateProductRequest;
import com.halo.ecommerce.Service.ProductService;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Slf4j
@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    @Override
    public Product createProduct(CreateProductRequest createProductRequest, Seller seller) throws IllegalAccessException {

        Category category1 = categoryRepository.findByCategoryId(createProductRequest.getCategory1());

        if (category1==null){
            Category category = new Category();
            category.setCategoryId(createProductRequest.getCategory1());
            category.setLevel(1);
            category1 = categoryRepository.save(category);
        }

        Category category2 = categoryRepository.findByCategoryId(createProductRequest.getCategory2());

        if (category2==null){
            Category category = new Category();
            category.setCategoryId(createProductRequest.getCategory2());
            category.setLevel(2);
            category.setParentCategory(category1);
            category2 = categoryRepository.save(category);
        }

        Category category3 = categoryRepository.findByCategoryId(createProductRequest.getCategory3());

        if (category3==null){
            Category category = new Category();
            category.setCategoryId(createProductRequest.getCategory3());
            category.setLevel(3);
            category.setParentCategory(category2);
            category3 = categoryRepository.save(category);
        }

        int discountPercentage = calculatedDiscountPercentage(createProductRequest.getMrpPrice(),createProductRequest.getSellingPrice());

        Product product = new Product();
        product.setSeller(seller);
        product.setCategory(category3);
        product.setCreatedAt(LocalDateTime.now());
        product.setDescription(createProductRequest.getDescription());
        product.setTitle(createProductRequest.getTitle());
        product.setColor(createProductRequest.getColor());
        product.setSellingPrice(createProductRequest.getSellingPrice());
        product.setImages(createProductRequest.getImages());
        product.setMrpPrice(createProductRequest.getMrpPrice());
        product.setSizes(createProductRequest.getSizes());
        product.setDiscountPercent(discountPercentage);

        return productRepository.save(product);
    }

    private int calculatedDiscountPercentage(int mrpPrice, int sellingPrice) throws IllegalAccessException {

        if (mrpPrice<=0) {
            throw new IllegalAccessException("Actual Price must be greater than 0");
        }
        double discountPrice = mrpPrice-sellingPrice;
        double discountPercentages = (discountPrice/mrpPrice)*100;
        return (int)discountPercentages;
    }

    @Override
    public void deleteProduct(Long productId) throws ProductException {

        Product product = findProductById(productId);
        productRepository.delete(product);
    }

    @Override
    public Product updateProduct(Long productId, Product product) throws ProductException {

        findProductById(productId);
        product.setId(productId);
        return productRepository.save(product);
    }

    @Override
    public Product findProductById(Long productId) throws ProductException {
        return productRepository.findById(productId).orElseThrow(()->
                new ProductException("product not found with id"+productId));
    }

    @Override
    public List<Product> searchProducts(String query) {
        return productRepository.searchProduct(query);
    }

    @Override
    public Page<Product> getAllProducts(String category, String brand, String color, String sizes, Integer minPrice, Integer maxPrice, Integer minDiscount, String sort, String stocks, Integer pageNumber) {

        Specification<Product>  specification = ((root, query, criteriaBuilder) ->{
            List<Predicate> predicates = new ArrayList<>();

            if (category!=null){
                Join<Product,Category> categoryJoin =root.join("category");
                predicates.add(criteriaBuilder.equal(categoryJoin.get("categoryId"),category));
            }
            if (color!=null && !color.isEmpty()){
                System.out.println("color"+color);
                predicates.add(criteriaBuilder.equal(root.get("color"),color));
            }
            if (sizes!=null && !sizes.isEmpty()){

                predicates.add(criteriaBuilder.equal(root.get("sizes"),sizes));
            }
            if (minPrice!=null){

                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("minPrice"),minPrice));
            }
            if (maxPrice!=null){

                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("maxPrice"),maxPrice));
            }
            if (minDiscount!=null){
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("minDiscount"),minDiscount));
            }
            if (stocks!=null){
                predicates.add(criteriaBuilder.equal(root.get("stocks"),stocks));
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
        Pageable pageable;
        if (sort != null && !sort.isEmpty()) {
            pageable = switch (sort) {
                case "price_low" -> PageRequest.of(pageNumber != null ? pageNumber : 0, 10,
                        Sort.by("sellerPrice").ascending());
                case "price_high" -> PageRequest.of(pageNumber != null ? pageNumber : 0, 10,
                        Sort.by("sellerPrice").descending());
                default -> PageRequest.of(pageNumber != null ? pageNumber : 0, 10,
                        Sort.by("sellerPrice").ascending());
            };
        }
        else {
            pageable = PageRequest.of(pageNumber!=null ? pageNumber:0,10,Sort.unsorted());
        }
        return productRepository.findAll(specification,pageable);
    }

    @Override
    public List<Product> getProductBySellerId(Long sellerId) {
        return productRepository.findBySellerId(sellerId);
    }
}
