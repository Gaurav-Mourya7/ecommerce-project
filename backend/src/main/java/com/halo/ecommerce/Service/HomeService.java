package com.halo.ecommerce.Service;

import com.halo.ecommerce.Entity.Home;
import com.halo.ecommerce.Entity.HomeCategory;

import java.util.List;

public interface HomeService {

    public Home createHomePageData(List<HomeCategory> allCategories);
}
